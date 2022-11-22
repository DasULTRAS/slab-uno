let cardImg, bg;
let deck, hand;
let button;
// Console Game
let startButton, playerText, playerInput;
let game;

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

    /* Deck laden */
    deck = new Deck(cardImg);
    deck.shuffle();
    hand = new Hand();

    // Console Game
    console.log("How much Player are playing?");
    playerText = createElement('h2', "Wie viele Spieler gibt es?");
    playerInput = createInput('1');
    startButton = createButton("START GAME");

    // default background initialisation etc.
    windowResized();
}

function startGame(){
    console.log(playerInput.value());
}

function mousePressed() {
    deck.onClick(hand);
}

function draw() {
    console.log("draw...");
    background(bg);
    deck.display(0, 0);
    hand.display(50, windowHeight - cardImg.height / 8);
    hand.hoverEffect();
}

/**
 * Is called if window will resized
 */
function windowResized() {
    console.log("windowResized...");

    resizeCanvas(windowWidth, windowHeight);
    // Image background
    background(bg);

    // Console Game
    playerInput.position(((windowWidth - playerInput.width) / 2), 250);
    playerText.position(((windowWidth - playerText.width) / 2), 200);
    startButton.position(((windowWidth - playerText.width) / 2), 275);
}