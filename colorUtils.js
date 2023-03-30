var palette = [
    "#1a1c2c",
    "#5d275d",
    "#b13e53",
    "#ef7d57",
    "#ffcd75",
    "#a7f070",
    "#38b764",
    "#257179",
    "#29366f",
    "#3b5dc9",
    "#41a6f6",
    "#73eff7",
    "#f4f4f4",
    "#94b0c2",
    "#566c86",
    "#333c57",
]

function get_contrasting_color(previousColor, threshold) {
    var randomColor = getRandomColor();
    while (isSimilarLuminanceColor(previousColor, randomColor, threshold)) {
        randomColor = getRandomColor();
    }
    return randomColor;
}

// function getRandomColor(minLuminanceT = 30, maxLuminanceT = 150) {
//     var luminance = (minLuminanceT + maxLuminanceT) / 2;
//     while (luminance > minLuminanceT && luminance < maxLuminanceT) {
//         luminance = 0;
//         var res = []
//         for (var i = 0; i < 3; i++) {
//             var r = randint(0, 255);
//             res.push(r);
//             luminance += r;
//         }
//         luminance /= 3;
//     }
//     res.push(255);
//     return res;
// }

function getRGBA_object(c) {
    return "rgba(" + c[0] + "," + c[1] + "," + c[2] + "," + c[3] + ")";
}

function hexToRgb(hex) {
    var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? [
        parseInt(result[1], 16),
        parseInt(result[2], 16),
        parseInt(result[3], 16),
        255
    ] : null;
}

function isSimilarColor([r1, g1, b1, a1], [r2, g2, b2, a2], threshold = 200) {
    var diff = Math.abs(r1 - r2) + Math.abs(g1 - g2) + Math.abs(b1 - b2)
    if (diff >= threshold) {
        console.log(diff);
    }
    return diff < threshold;
}

function isSimilarLuminanceColor([r1, g1, b1, a1], [r2, g2, b2, a2], threshold = 100) {
    var l1 = (r1 + g1 + b1) / 3;
    var l2 = (r2 + g2 + b2) / 3;
    var diff = Math.abs(l2 - l1);
    if (diff >= threshold) {
        console.log(diff);
    }
    return diff < threshold;
}

function getColorPalette(colorNbr) {
    console.log("Choosing " + colorNbr + " colors from " + palette.length + " color palette")
    var myPalette = []
    for (let i = 0; i < palette.length; i++) {
        myPalette.push(hexToRgb(palette[i]));
    }
    res = [];
    var tmpPalette = [...myPalette];
    for (let i = 0; i < colorNbr; i++) {
        var randomIdx = Math.floor(Math.random() * tmpPalette.length);
        res.push(tmpPalette[randomIdx]);
        tmpPalette.splice(randomIdx, 1);
    }
    return res;
}


function oldGetColorPalette(colorNbr) {
    console.log("Generating " + colorNbr + " colors");
    var colorPalette = []
    for (let i = 0; i < colorNbr; i++) {
        var color;
        if (i == 0) {
            color = getRandomColor();
        } else {
            color = get_contrasting_color(colorPalette.slice(-1)[0]);
        }
        colorPalette.push(color);
    }
    return colorPalette;
}