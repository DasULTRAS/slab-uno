export function degreesToRadians(degress) {
    return degress * (Math.PI/180);
}

export function radiansToDegress(radians) {
    return radians * (180/Math.PI);
}

export function getRotatedDimensions (angle_in_degrees, width, height) {
    var angle = angle_in_degrees * Math.PI / 180,
        sin   = Math.sin(angle),
        cos   = Math.cos(angle);
    var x1 = cos * width,
        y1 = sin * width;
    var x2 = -sin * height,
        y2 = cos * height;
    var x3 = cos * width - sin * height,
        y3 = sin * width + cos * height;
    var minX = Math.min(0, x1, x2, x3),
        maxX = Math.max(0, x1, x2, x3),
        minY = Math.min(0, y1, y2, y3),
        maxY = Math.max(0, y1, y2, y3);

    return [ Math.floor((maxX - minX)), Math.floor((maxY - minY)) ];
};