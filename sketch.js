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

    frameRate(29);

    // creates a working ground
    createCanvas(windowWidth, windowHeight);

    // default background initialisation etc.
    windowResized();

    /* Deck laden */
    deck = new Deck(cardImg);
    deck.shuffel();
    hand = new Hand();
    button = createButton("Click me");
    button.position(0, 0);
    button.mousePressed(getCard);

    /* Tests */
    svg_xml = loadXML('img/default/UNO_cards_deck.svg')
    console.log("dd")
}

function getCard() {
    let card = deck.getFirstCard();
    if (card) {
        hand.cards.push(card);
    }
}

function draw() {
    console.log("draw...");
    hand.display(50, 50);
}

/**
 * Is called if window will resized
 */
function windowResized() {
    console.log("windowResized...");

    resizeCanvas(windowWidth, windowHeight);
    // Image background
    background(bg);
}