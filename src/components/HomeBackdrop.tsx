import Dither from "@/components/Dither"
import style from "@/styles/components/HomeBackdrop.module.scss"

const HomeBackdrop = () => (
  <div className={style.backdrop}>
    <Dither
      waveColor={[1, 1, 1]}
      pixelSize={4.5}
      disableAnimation={false}
      enableMouseInteraction
      mouseRadius={0.35}
      colorNum={3.5}
      waveAmplitude={0.2}
      waveFrequency={10}
      waveSpeed={0.1}
    />
  </div>
)

export default HomeBackdrop
