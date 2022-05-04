function getAvg(data: number[]) {
    const total = data.reduce((acc, c) => acc + c, 0);
    return total / data.length;
}

function getSum(data: number[]) {
    return data.reduce((acc, c) => acc + c, 0);
}

function getTrendlinefFunc(data: { x: number, y: number }[]) {
    const xData = data.map((value) => value.x);
    const yData = data.map((value) => value.y);

    // average of X values and Y values
    const xMean = getAvg(xData);
    const yMean = getAvg(yData);

    // Subtract X or Y mean from corresponding axis value
    const xMinusxMean = xData.map((val) => val - xMean);
    const yMinusyMean = yData.map((val) => val - yMean);

    const xMinusxMeanSq = xMinusxMean.map((val) => val ** 2);

    const xy = [];
    for (let x = 0; x < data.length; x++) {
        xy.push(xMinusxMean[x] * yMinusyMean[x]);
    }

    const xySum = getSum(xy);

    // b1 is the slope
    const b1 = xySum / getSum(xMinusxMeanSq);
    // b0 is the start of the slope on the Y axis
    const b0 = yMean - b1 * xMean;

    // return the trendline formulate
    return (x: number) => b0 + b1 * x;
};

export default getTrendlinefFunc;