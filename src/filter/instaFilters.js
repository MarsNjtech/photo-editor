import { grayscale, contrast, brightness, colorFilter, saturation } from './filters'

// Moon: B/W, increase brightness and decrease contrast
function moon (pixels) {
  pixels = grayscale.apply(this, [pixels, 1])
  pixels = contrast.apply(this, [pixels, -0.04])
  pixels = brightness.apply(this, [pixels, 0.1])
  return pixels
};

function aden (pixels) {
  pixels = colorFilter.apply(this, [pixels, [228, 130, 225, 0.13]])
  pixels = saturation.apply(this, [pixels, -0.2])
  return pixels
}

function amaro (pixels) {
  pixels = saturation.apply(this, [pixels, 0.3])
  pixels = brightness.apply(this, [pixels, 0.15])
  return pixels
}

function brannan (pixels) {
  pixels = contrast.apply(this, [pixels, 0.2])
  pixels = colorFilter.apply(this, [pixels, [140, 10, 185, 0.1]])
  return pixels
};

export default [moon, aden, amaro, brannan]
