var rSlider;
var gSlider;
var bSlider;

function setup() {
    createCanvas(500, 500);
    pixelDensity(1);

    rSlider = createSlider(0, 255, 50, 1);
    gSlider = createSlider(0, 255, 100, 1);
    bSlider = createSlider(0, 255, 255, 1);
}

function draw() {
    var julia_const = map(mouseX, 0, width, -1, 1);
    var julia_imag = map(mouseY, 0, height, -1, 1);
    var max_itr = 50;
    loadPixels();
    for (var x = 0; x < width; x++) {
        for (var y = 0; y < width; y++) {

            var u = map(x, 0, width, -1.5, 1.5);
            var v = map(y, 0, height, -1.5, 1.5);
            var n = 0;

            while (n < 100) {
                var x_temp = u * u - v * v;
                var y_temp = 2 * u * v;
                u = x_temp + julia_const;
                v = y_temp + julia_imag;
                if (abs(u + v) > 4) {
                    break;
                }
                n++;
            }
            var r = map(n, 0, max_itr, 0, rSlider.value());
            var g = map(n, 0, max_itr, 0, gSlider.value());
            var b = map(n, 0, max_itr, 0, bSlider.value());
            if (n === max_itr) {
                b = 0;
                r = 0;
                g = 0;
            }
            var pixel = (x + y * width) * 4;
            pixels[pixel] = r;
            pixels[pixel + 1] = g;
            pixels[pixel + 2] = b;
            pixels[pixel + 3] = 255;
        }
    }
    updatePixels();
}