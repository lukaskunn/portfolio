export const ANIMATION_TIME = {
  title: 1.2,
  subtitle: 1.2,
  image: 2,
  header: 1.2,
  footer: 1.2,
  footerWorkMessage: 1.2,
}

const titleDelayBuffer = 1;
const imageDelayBuffer = titleDelayBuffer - 0.2;
// const imageDelayBuffer = titleDelayBuffer - 0.5;
const subtitleDelayBuffer = imageDelayBuffer;
// const subtitleDelayBuffer = imageDelayBuffer - 0.5;

export const ANIMATION_DELAYS = {
  title: titleDelayBuffer,
  image: ANIMATION_TIME.title + subtitleDelayBuffer,
  subtitle: ANIMATION_TIME.title + subtitleDelayBuffer,
  header: ANIMATION_TIME.title + subtitleDelayBuffer,
  footer: ANIMATION_TIME.title + subtitleDelayBuffer,
  // image: ANIMATION_TIME.title + imageDelayBuffer,
  // subtitle: ANIMATION_TIME.title + ANIMATION_TIME.image + subtitleDelayBuffer,
  // header: ANIMATION_TIME.title + ANIMATION_TIME.image + subtitleDelayBuffer,
  // footer: ANIMATION_TIME.title + ANIMATION_TIME.image + subtitleDelayBuffer,
}

// Global animation presets for awwwards-style animations
export const ANIMATION_PRESETS = {
  // Smooth entrance animations
  smoothEntrance: {
    duration: 0.8,
    ease: "power3.out",
  },
  // Fast snap animations
  snap: {
    duration: 0.4,
    ease: "power4.out",
  },
  // Elegant slow reveals
  elegantReveal: {
    duration: 1.2,
    ease: "power2.inOut",
  },
  // Letter by letter animations
  letterByLetter: {
    duration: 0.05,
    ease: "power2.out",
    stagger: 0.03,
  },
  // Fast letter animation
  fastLetterByLetter: {
    duration: 0.04,
    ease: "power2.out",
    stagger: 0.02,
  },
  // Clip path reveals
  clipPathReveal: {
    duration: 1.4,
    ease: "power4.inOut",
  },
  // Slide animations
  slideIn: {
    duration: 0.6,
    ease: "power3.out",
  },
  // Stagger animations for lists
  staggerList: {
    duration: 0.5,
    ease: "power3.out",
    stagger: 0.1,
  },
  // Hover animations
  hoverIn: {
    duration: 0.3,
    ease: "power2.out",
  },
  hoverOut: {
    duration: 0.4,
    ease: "power2.inOut",
  },
} as const;