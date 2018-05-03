function setup() {
    createCanvas(500, 500);
    pixelDensity(1);
}

function draw() {
    var max_itr = 100;
    loadPixels();
    for (var x = 0; x < width; x++) {
        for (var y = 0; y < width; y++) {

            var u = map(x, 0, width, -1.5, 1.5);
            var v = map(y, 0, height, -1.5, 1.5);
            var original_u = u;
            var original_v = v;
            var n = 0;

            while (n < 100) {
                var x_temp = u * u - v * v;
                var y_temp = 2 * u * v;
                u = x_temp + original_u;
                v = y_temp + original_v;
                if (abs(u + v) > 16) {
                    break;
                }
                n++;
            }
            var bright = map(n, 0, max_itr, 0, 255);
            if (n === max_itr) {
                bright = 0;
            }

            var pixel = (x + y * width) * 4;
            pixels[pixel] = bright;
            pixels[pixel + 1] = bright;
            pixels[pixel + 2] = bright;
            pixels[pixel + 3] = 255;
        }
    }
    updatePixels();
}