// https://codepen.io/Mamboleoo/pen/JKNbWv

var stars = [];
var amount = 5;

function Values() {
    this.arms = 5;
    this.inside = 50;
    this.rotation = 0;
    this.insideRotation = 180;
    this.chubby = true;
}

function Star(x, y) {

    this.scale = Math.min(ww / 2.2, wh / 2.2);
    this.x = ww / 2;
    this.y = wh / 2;
    this.opacity = 1;
    this.out = [];
    this.in = [];
    for (var i = 0; i < options.arms; i++) {
        var x = Math.cos(i / options.arms * Math.PI * 2) * this.scale;
        var y = Math.sin(i / options.arms * Math.PI * 2) * this.scale;
        this.out.push([x, y]);

        var x = Math.cos((i + (options.insideRotation / 360)) / options.arms * Math.PI * 2) * this.scale * (options.inside / 100);
        var y = Math.sin((i + (options.insideRotation / 360)) / options.arms * Math.PI * 2) * this.scale * (options.inside / 100);
        this.in.push([x, y]);
    }

}
Star.prototype.draw = function(i) {

    //Update
    ctx.save();
    ctx.translate(this.x, this.y);
    ctx.rotate(options.rotation * Math.PI / 180);
    //Star
    ctx.beginPath();
    if (options.chubby) {
        ctx.moveTo(this.in[0][0], this.in[0][1]);
    } else {
        ctx.moveTo(this.out[0][0], this.out[0][1]);
    }
    for (var i = 0; i < options.arms; i++) {
        var out = this.out[i];
        var inside = this.in[i];
        if (options.chubby) {
            ctx.bezierCurveTo(out[0], out[1], out[0], out[1], inside[0], inside[1]);
        } else {
            ctx.lineTo(out[0], out[1]);
            ctx.lineTo(inside[0], inside[1]);
        }
    }
    if (options.chubby) {
        ctx.bezierCurveTo(this.out[0][0], this.out[0][1], this.out[0][0], this.out[0][1], this.in[0][0], this.in[0][1]);
    }
    ctx.closePath();
    ctx.fill();

    ctx.beginPath();
    ctx.arc(0, 0, this.scale, 0, Math.PI * 2);
    ctx.stroke();

    ctx.restore();
}


var littleStar = new Star();