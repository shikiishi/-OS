export default function toGrayscale(imageData) {
    for (let i = 0; i < imageData.data.length; i += 4) {
      const avg = (imageData.data[i] + imageData.data[i + 1] + imageData.data[i + 2]) / 3;
      imageData.data[i] = avg; // red
      imageData.data[i + 1] = avg; // green
      imageData.data[i + 2] = avg; // blue
    }
    return imageData;
   }
