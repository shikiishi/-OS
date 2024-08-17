export default function edgeDetection(imageData) {
    const width = imageData.width;
    const height = imageData.height;
    const data = imageData.data;
    const edgeData = new Uint8ClampedArray(data.length);

    const kernel = [
        [ 0, -1, 0],
        [-1, 5, -1],
        [ 0, -1, 0]  
    ];

    for (let y = 1; y < height - 1; y++) {
        for (let x = 1; x < width - 1; x++) {
            let r = 0, g = 0, b = 0;
            for (let ky = -1; ky <= 1; ky++) {
                for (let kx = -1; kx <= 1; kx++) { // kxは-1から1までの３回の繰り返し
                    const pixelIndex = ((y + ky) * width + (x + kx)) * 4;
                    r += data[pixelIndex] * kernel[ky + 1][kx + 1];
                    g += data[pixelIndex + 1] * kernel[ky + 1][kx + 1];
                    b += data[pixelIndex + 2] * kernel[ky + 1][kx + 1];
                }
            }
            const index = (y * width + x) * 4;
            edgeData[index] = r;
            edgeData[index + 1] = g;
            edgeData[index + 2] = b;
            edgeData[index + 3] = data[index + 3]; // alpha
        }
    }

    return new ImageData(edgeData, width, height);
}
