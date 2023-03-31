function createOutline(ctx, width, height) {
    ctx.fillStyle = "#000000";
    ctx.strokeRect(0, 0, width, height);
}

function drawObject(ctx, width, height, colorPalette, bandsPositions) {
    // 0 = nothing, 1 = circle, 2 = triangle
    var r = randint(0, 3);
    r = 10;
    if (r == 0) {
        return;
    } else if (r == 1) {
        drawCircle(ctx, width, height, getArrayRandomElement(colorPalette), bandsPositions);
    } else if (r == 2) {
        drawTriangle(ctx, width, height, getArrayRandomElement(colorPalette), bandsPositions);
    } else {
        drawStar(ctx, width, height, getArrayRandomElement(colorPalette), bandsPositions);
    }
}

function drawCircle(ctx, width, height, color, bandsPositions) {
    console.log("drawing circle");
    var x = width / 2;
    var y = height / 2;
    var radius = height / 2;
    bandsPositions.forEach(element => {
        if (element["bandPositions"].length > 0) {
            if (element["is_vertical"]) {
                x = getArrayRandomElement(element["bandPositions"]) * element["bandSize"];
            } else {
                y = getArrayRandomElement(element["bandPositions"]) * element["bandSize"];
            }
            radius = element["bandSize"];
        }
    });

    console.log("center: " + x + " / " + y + " - radius: " + radius);

    const startAngle = 0; // Starting point on circle
    const endAngle = (Math.PI / 2) * randint(1, 3); // End point on circle
    const counterclockwise = randint(0, 2) % 2 !== 0; // clockwise or counterclockwise
    console.log(startAngle, endAngle, counterclockwise);

    ctx.fillStyle = getRGBA_object(color);
    ctx.beginPath();
    ctx.arc(x, y, radius, startAngle, endAngle, counterclockwise);
    ctx.lineTo(x, y);
    ctx.fill();
}


function drawTriangle(ctx, width, height, color, bandsPositions) {
    console.log("drawing triangle");

    var left = 0;
    var right = width / 2;
    var top = 0;
    var bottom = height / 2;

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
    ctx.fillStyle = getRGBA_object(color);
    ctx.beginPath();
    ctx.moveTo(left, top);
    ctx.lineTo(right, (top + bottom) / 2);
    ctx.lineTo(left, bottom);

    ctx.fill();
}

function drawStar(ctx, width, height, color, bandsPositions) {
    console.log("drawing star");

    var left = 0;
    var right = width / 2;
    var top = 0;
    var bottom = height / 2;

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

    var centerX = (left + right) / 2;
    var centerY = (top + bottom) / 2
    var scale = Math.min(centerX, centerY);
    var p_out = [];
    var p_in = [];
    var arms_nbr = gaussianRandom(3, 7);
    var insideRotation = gaussianRandom(90, 270);
    var inside_length = gaussianRandom(20, 50);
    console.log(arms_nbr, insideRotation, inside_length)
    var rotation = -5 * arms_nbr;
    ctx.save();
    ctx.translate(centerX, centerY);
    ctx.rotate(rotation * Math.PI / 180);
    ctx.fillStyle = getRGBA_object(color);

    for (var i = 0; i < arms_nbr; i++) {
        var x = Math.cos(i / arms_nbr * Math.PI * 2) * scale;
        var y = Math.sin(i / arms_nbr * Math.PI * 2) * scale;
        p_out.push([x, y]);

        var x = Math.cos((i + (insideRotation / 360)) / arms_nbr * Math.PI * 2) * scale * (inside_length / 100);
        var y = Math.sin((i + (insideRotation / 360)) / arms_nbr * Math.PI * 2) * scale * (inside_length / 100);
        p_in.push([x, y]);
    }
    ctx.beginPath();
    ctx.moveTo(p_out[0][0], p_out[0][1]);
    for (var i = 0; i < arms_nbr; i++) {
        ctx.lineTo(p_out[i][0], p_out[i][1]);
        ctx.lineTo(p_in[i][0], p_in[i][1]);
    }
    ctx.closePath();
    ctx.fill();
    ctx.restore();
}