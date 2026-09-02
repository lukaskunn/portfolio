'use client'

import { useRef, useEffect, useMemo, type ComponentType } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import { EffectComposer, wrapEffect } from '@react-three/postprocessing';
import * as THREE from 'three';

import { waveVertexShader, waveFragmentShader, RetroEffectImpl } from '@/lib/ditherEffect';

// wrapEffect infers props from the ctor args (none here), so the uniform
// setters have to be declared. r3f applies them to the instance.
const RetroEffect = wrapEffect(RetroEffectImpl) as ComponentType<{
  colorNum: number;
  pixelSize: number;
}>;

interface WaveUniforms {
  [key: string]: THREE.IUniform<number | THREE.Vector2 | THREE.Color>;
  time: THREE.Uniform<number>;
  resolution: THREE.Uniform<THREE.Vector2>;
  waveSpeed: THREE.Uniform<number>;
  waveFrequency: THREE.Uniform<number>;
  waveAmplitude: THREE.Uniform<number>;
  waveColor: THREE.Uniform<THREE.Color>;
  mousePos: THREE.Uniform<THREE.Vector2>;
  enableMouseInteraction: THREE.Uniform<number>;
  mouseRadius: THREE.Uniform<number>;
}

export interface DitheredWavesProps {
  waveSpeed: number;
  waveFrequency: number;
  waveAmplitude: number;
  waveColor: [number, number, number];
  colorNum: number;
  pixelSize: number;
  disableAnimation: boolean;
  enableMouseInteraction: boolean;
  mouseRadius: number;
}

function DitheredWaves({
  waveSpeed,
  waveFrequency,
  waveAmplitude,
  waveColor,
  colorNum,
  pixelSize,
  disableAnimation,
  enableMouseInteraction,
  mouseRadius
}: DitheredWavesProps) {
  const mesh = useRef<THREE.Mesh>(null);
  const matRef = useRef<THREE.ShaderMaterial>(null);
  const mouseRef = useRef(new THREE.Vector2());
  const { viewport, size, gl } = useThree();

  const waveUniforms = useMemo<WaveUniforms>(() => ({
    time: new THREE.Uniform(0),
    resolution: new THREE.Uniform(new THREE.Vector2(0, 0)),
    waveSpeed: new THREE.Uniform(waveSpeed),
    waveFrequency: new THREE.Uniform(waveFrequency),
    waveAmplitude: new THREE.Uniform(waveAmplitude),
    waveColor: new THREE.Uniform(new THREE.Color(...waveColor)),
    mousePos: new THREE.Uniform(new THREE.Vector2(0, 0)),
    enableMouseInteraction: new THREE.Uniform(enableMouseInteraction ? 1 : 0),
    mouseRadius: new THREE.Uniform(mouseRadius)
    // eslint-disable-next-line react-hooks/exhaustive-deps -- uniforms are created once; prop changes are applied in useFrame
  }), []);

  const prevColor = useRef([...waveColor]);
  useFrame(({ clock }) => {
    // r3f clones uniforms per-material, so writes must target matRef, not waveUniforms
    const u = matRef.current?.uniforms;
    if (!u) return;

    if (!disableAnimation) {
      u.time.value = clock.getElapsedTime();
    }

    if (u.waveSpeed.value !== waveSpeed) u.waveSpeed.value = waveSpeed;
    if (u.waveFrequency.value !== waveFrequency) u.waveFrequency.value = waveFrequency;
    if (u.waveAmplitude.value !== waveAmplitude) u.waveAmplitude.value = waveAmplitude;

    if (!prevColor.current.every((v, i) => v === waveColor[i])) {
      u.waveColor.value.set(...waveColor);
      prevColor.current = [...waveColor];
    }

    u.enableMouseInteraction.value = enableMouseInteraction ? 1 : 0;
    u.mouseRadius.value = mouseRadius;

    if (enableMouseInteraction) {
      u.mousePos.value.copy(mouseRef.current);
    }
  });

  useEffect(() => {
    const u = matRef.current?.uniforms;
    if (!u) return;
    const dpr = gl.getPixelRatio();
    const newWidth = Math.floor(size.width * dpr);
    const newHeight = Math.floor(size.height * dpr);
    u.resolution.value.set(newWidth, newHeight);
  }, [size, gl]);

  useEffect(() => {
    if (!enableMouseInteraction) return;
    const el = gl.domElement;
    const onMove = (e: PointerEvent) => {
      const rect = el.getBoundingClientRect();
      const dpr = gl.getPixelRatio();
      mouseRef.current.set((e.clientX - rect.left) * dpr, (e.clientY - rect.top) * dpr);
    };
    window.addEventListener('pointermove', onMove, { passive: true });
    return () => window.removeEventListener('pointermove', onMove);
  }, [enableMouseInteraction, gl]);

  return (
    <>
      <mesh ref={mesh} scale={[viewport.width, viewport.height, 1]}>
        <planeGeometry args={[1, 1]} />
        <shaderMaterial
          ref={matRef}
          vertexShader={waveVertexShader}
          fragmentShader={waveFragmentShader}
          uniforms={waveUniforms}
        />
      </mesh>

      <EffectComposer>
        <RetroEffect colorNum={colorNum} pixelSize={pixelSize} />
      </EffectComposer>
    </>
  );
}

export default DitheredWaves
