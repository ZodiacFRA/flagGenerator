function drawSingleBandPass(ctx, width, height, colorPalette, bandsPositions) {
    const bandNbr = Math.max(0, gaussianRandom(-1, 7));
    const is_vertical = Math.random() < 0.5;
    var bandsColor = [...colorPalette];
    if (bandNbr > colorPalette.length) {
        for (let c = 0; c < bandNbr - colorPalette.length; c++) {
            bandsColor.push(getArrayRandomElement(colorPalette));
        }
    }
    shuffleArray(bandsColor);
    var bandsInfo = { "is_vertical": is_vertical, "bandPositions": [] }
    if (is_vertical == true) {
        const bandSize = width / bandNbr;
        bandsInfo["bandSize"] = bandSize;
        for (let i = 0; i < bandNbr; i++) {
            ctx.fillStyle = getRGBA_object(bandsColor[i]);
            ctx.fillRect(i * bandSize, 0, bandSize, height);
            bandsInfo["bandPositions"].push(i);
        }
    } else {
        const bandSize = height / bandNbr;
        bandsInfo["bandSize"] = bandSize;
        for (let i = 0; i < bandNbr; i++) {
            if (bandsColor[i][3] > 0) {
                ctx.fillStyle = getRGBA_object(bandsColor[i]);
                ctx.fillRect(0, i * bandSize, width, bandSize);
                bandsInfo["bandPositions"].push(i);
            }
        }
    }
    console.log(bandsInfo);
    bandsPositions.push(bandsInfo);
}

function drawBands(ctx, width, height, colorPalette) {
    var bandsPositions = [];
    drawSingleBandPass(ctx, width, height, colorPalette, bandsPositions);
    var superpositionColorPalette = [...colorPalette]
    for (let i = 0; i < colorPalette.length * 2; i++) {
        superpositionColorPalette.push([0, 0, 0, 0]);
    }
    drawSingleBandPass(ctx, width, height, superpositionColorPalette, bandsPositions);
    return bandsPositions;
}