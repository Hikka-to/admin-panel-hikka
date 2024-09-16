interface BlackZones {
    top: number;
    bottom: number;
    left: number;
    right: number;
}

interface RealImageSize {
    width: number;
    height: number;
    top: number;
    left: number;
    blackZones: BlackZones;
}

export function getRealImageSize(width: number, height: number, data: Uint8ClampedArray): RealImageSize {
    const topBlacks = (() => {
        let i = 0;
        for (; i < height; i++) {
            let isBlack = true;
            for (let j = 0; j < width; j++) {
                const pixel = i * width * 4 + j * 4;
                if (data[pixel] + data[pixel + 1] + data[pixel + 2] > 10) {
                    isBlack = false;
                    break;
                }
            }
            if (!isBlack) break;
        }
        return i;
    })();
    const bottomBlacks = topBlacks == height ? 0 : (() => {
        let i = height - 1;
        for (; i > topBlacks; i--) {
            let isBlack = true;
            for (let j = 0; j < width; j++) {
                const pixel = i * width * 4 + j * 4;
                if (data[pixel] + data[pixel + 1] + data[pixel + 2] > 10) {
                    isBlack = false;
                    break;
                }
            }
            if (!isBlack) break;
        }
        return height - i - 1;
    })();
    const leftBlacks = topBlacks == height ? width : (() => {
        let i = 0;
        for (; i < width; i++) {
            let isBlack = true;
            for (let j = topBlacks; j < height - bottomBlacks; j++) {
                const pixel = j * width * 4 + i * 4;
                if (data[pixel] + data[pixel + 1] + data[pixel + 2] > 10) {
                    isBlack = false;
                    break;
                }
            }
            if (!isBlack) break;
        }
        return i;
    })();
    const rightBlacks = topBlacks == height ? 0 : (() => {
        let i = width - 1;
        for (; i > leftBlacks; i--) {
            let isBlack = true;
            for (let j = topBlacks; j < height - bottomBlacks; j++) {
                const pixel = j * width * 4 + i * 4;
                if (data[pixel] + data[pixel + 1] + data[pixel + 2] > 10) {
                    isBlack = false;
                    break;
                }
            }
            if (!isBlack) break;
        }
        return width - i - 1;
    })();

    const resultWidth = width - leftBlacks - rightBlacks;
    const resultHeight = height - topBlacks - bottomBlacks;
    
    return {
        width: resultWidth,
        height: resultHeight,
        top: topBlacks,
        left: leftBlacks,
        blackZones: {
            top: topBlacks,
            bottom: bottomBlacks,
            left: leftBlacks,
            right: rightBlacks
        }
    };
}