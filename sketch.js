let cardImg, bg;
let deck, hand;
let button;
/**
 * function that loads content before showing site
 * while this function is loading div 'p5_loading' will be shown
 * https://github.com/processing/p5.js/wiki/p5.js-overview#loading-screen
 */
function preload() {
    console.log("preload...");
    // Top-left corner of the img is at (0, 0)
    // Width and height are the img's original width and height
    cardImg = loadImage('img/default/UNO_cards_deck.svg');
    bg = loadImage('img/default/backgrounds/defaultBG.webp');
}

/**
 * setup that loads on start
 */
function setup() {
    console.log("setup...");

    // default background initialisation etc.
    windowResized();

    /* TESTS */
    deck = new Deck(cardImg);
    deck.shuffle();
    hand = new Hand();
}

function mousePressed() {
    deck.onClick(hand);
}

function draw() {
    console.log("draw...");
    deck.display(0, 0);
    hand.display(50, windowHeight - cardImg.height/8);
}

/**
 * Is called if window will resized
 */
function windowResized() {
    console.log("windowResized...");

    // creates a working ground
    createCanvas(windowWidth, windowHeight);

    // Image background
    background(bg);
}