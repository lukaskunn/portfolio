import Grainient from "@/components/Grainient"
import style from "@/styles/components/ServicesBackdrop.module.scss"

const ServicesBackdrop = () => (
  <div className={style.backdrop}>
    <Grainient
      color1="#cecece"
      color2="#000000"
      color3="#fdfcfd"
      timeSpeed={0.5}
      colorBalance={0.1}
      warpStrength={2}
      warpFrequency={5}
      warpSpeed={5}
      warpAmplitude={200}
      blendAngle={45}
      blendSoftness={0.5}
      rotationAmount={500}
      noiseScale={3}
      grainAmount={0.2}
      grainScale={2}
      grainAnimated={false}
      contrast={3.5}
      gamma={1}
      saturation={1}
      centerX={0}
      centerY={0}
      zoom={0.85}
    />
  </div>
)

export default ServicesBackdrop
