function createOutline(ctx, width, height) {
    ctx.fillStyle = "#000000";
    ctx.strokeRect(0, 0, width, height);
}

function drawObject(ctx, width, height, colorPalette, bandsPositions) {
    // 0 = nothing, 1 = circle, 2 = triangle
    var r = randint(0, 2);
    if (r == 0) {
        return;
    } else if (r == 1) {
        drawCircle(ctx, width, height, getArrayRandomElement(colorPalette), bandsPositions);
    } else {
        drawTriangle(ctx, width, height, getArrayRandomElement(colorPalette), bandsPositions);
    }
}

function drawCircle(ctx, width, height, color, bandsPositions) {
    console.log("=========================");
    console.log("drawing circle");
    ctx.fillStyle = getRGBA_object(color);
    ctx.beginPath();

    var x = width / 2;
    var y = height / 2;
    var radius = height / 2;
    var bandSize = height / 2;
    bandsPositions.forEach(element => {
        if (element["is_vertical"]) {
            x = getArrayRandomElement(element["bandPositions"]) * element["bandSize"];
        } else {
            y = getArrayRandomElement(element["bandPositions"]) * element["bandSize"];
        }
        bandSize = element["bandSize"];
        radius = element["bandSize"];
    });

    console.log("center: " + x + " / " + y + " - radius: " + radius);

    const startAngle = 0; // Starting point on circle
    const endAngle = Math.PI * randint(1, 4); // End point on circle
    const counterclockwise = randint(0, 2) % 2 !== 0; // clockwise or counterclockwise

    ctx.arc(x, y, radius, startAngle, endAngle, counterclockwise);
    ctx.fill();
}


function drawTriangle(ctx, width, height, color, bandsPositions) {
    console.log("=========================");
    console.log("drawing triangle");
    ctx.fillStyle = getRGBA_object(color);
    ctx.beginPath();

    var left = 0;
    var right = width / 2;
    var top = 0;
    var bottom = height;

    bandsPositions.forEach(element => {
        if (element["is_vertical"] && element["bandPositions"].length > 1) {
            var leftIdx = randint(0, element["bandPositions"].length - 2);
            left = element["bandPositions"][leftIdx] * element["bandSize"];
            var rightIdx = randint(leftIdx + 1, element["bandPositions"].length - 1);
            right = element["bandPositions"][rightIdx] * element["bandSize"];
        } else if (!element["is_vertical"] && element["bandPositions"].length > 1) {
            var topIdx = randint(0, element["bandPositions"].length - 2);
            top = element["bandPositions"][topIdx] * element["bandSize"];
            var bottomIdx = randint(topIdx + 1, element["bandPositions"].length - 1);
            bottom = element["bandPositions"][bottomIdx] * element["bandSize"];
        }
    });
    // console.log(left, top);
    // console.log(right, bottom);
    ctx.moveTo(left, top);
    ctx.lineTo(right, (top + bottom) / 2);
    ctx.lineTo(left, bottom);

    ctx.fill();
}