let cards;

/**
 * function that loads content before showing site
 */
function preload() {
    // load image data
    cards = loadImage('img/default/cards.png');
}

/**
 * setup that loads on start
 */
function setup() {
    // creates a working ground
    createCanvas(windowWidth, windowHeight);

    // grey Background
    background(51);

    // Top-left corner of the img is at (0, 0)
    // Width and height are the img's original width and height
    let card_height = 134;
    let card_width = 85;
    image(cards, 0,0, 86*2,128*2, 0,0, card_width,card_height);
    image(cards, 187,187, 86*2,128*2, card_width*8,card_height*3, card_width,card_height);
    image(cards, 187*2,187*2, 86*2,128*2, card_width*10,card_height*4, card_width,card_height);
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
