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
