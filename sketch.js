let card, metaData, bg;
/**
 * function that loads content before showing site
 * while this function is loading div 'p5_loading' will be shown
 * https://github.com/processing/p5.js/wiki/p5.js-overview#loading-screen
 */
function preload() {
    // Top-left corner of the img is at (0, 0)
    // Width and height are the img's original width and height
    card = new Card(loadImage('img/default/cards/1.png'));
    metaData = loadJSON('img/default/meta.json');
    bg = loadImage('img/default/backgrounds/defaultBG.webp');
}

/**
 * setup that loads on start
 */
function setup() {
    // creates a working ground
    createCanvas(windowWidth, windowHeight);

    // grey Background
    background(bg);

    /* TESTS */
    card.display(50, 50, 250, 389.6, color(255, 204, 0));
    console.log(metaData["textures"]);
    console.log("width: " + metaData.textures.cards.width);
    console.log("height: " + metaData.textures.cards.height);
}

function draw() {

}

/**
 * Is called if window will resized
 */
function windowResized() {
    resizeCanvas(windowWidth, windowHeight);
}