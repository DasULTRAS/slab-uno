let card;
/**
 * function that loads content before showing site
 */
function preload() {
    // Top-left corner of the img is at (0, 0)
    // Width and height are the img's original width and height
    card = new Card(loadImage('img/default/cards.png'));
}

/**
 * setup that loads on start
 */
function setup() {
    // creates a working ground
    createCanvas(windowWidth, windowHeight);

    // grey Background
    background(51);

    card.display(0, 0);
}

function draw() {
    if (mouseIsPressed) {
        fill(0);
    } else {
        fill(255);
    }
    ellipse(mouseX, mouseY, 80, 80);
}

/**
 * Is called if window will resized
 */
function windowResized() {
    resizeCanvas(windowWidth, windowHeight);
}