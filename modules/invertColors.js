export default function invertColors(imageData) {
    for (let i = 0; i < imageData.data.length; i += 4) {
      imageData.data[i] = 255 - imageData.data[i]; // red
      imageData.data[i + 1] = 255 - imageData.data[i + 1]; // green
      imageData.data[i + 2] = 255 - imageData.data[i + 2]; // blue
    }
    return imageData;
  }
