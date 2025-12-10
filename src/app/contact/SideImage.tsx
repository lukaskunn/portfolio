import React from "react";
// import AnimatePosOpacity from "../../src/utils/AnimatePosOpacity";
import Image from "next/image";

const SideImage = () => {
  return (
    // <AnimatePosOpacity
    //   from={{ y: "200px", opacity: 0 }}
    //   to={{ y: 0, opacity: 1 }}
    //   durationIn={0.8}
    //   durationOut={0.6}
    //   delay={0.8}
    //   set={{ y: "200px", opacity: 0 }}
    // >
      <Image
        src="/assets/images/contact/anime_retro_traffic_light.webp"
        alt="Contact animation"
        width={450}
        height={340}
      />
    // </AnimatePosOpacity>
  );
};

export default SideImage;
