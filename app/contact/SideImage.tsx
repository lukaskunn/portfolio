import React from "react";
import AnimatePosOpacity from "../../src/utils/AnimatePosOpacity";

const SideImage = () => {
  return (
    <AnimatePosOpacity
      from={{ y: "200px", opacity: 0 }}
      to={{ y: 0, opacity: 1 }}
      durationIn={0.8}
      durationOut={0.6}
      delay={0.8}
      set={{ y: "200px", opacity: 0 }}
    >
      <img
        src="https://64.media.tumblr.com/1acd142680aeae7379ad1871d50ab113/tumblr_pxbg52Fhlm1xggw0so1_500.gifv"
        alt="Contact animation" // Added meaningful alt text
      />
    </AnimatePosOpacity>
  );
};

export default SideImage;
