# SLAB-UNO

An UNO that aims to be a browser based multiplayer GAME.
Written with [React](http://reactjs.org/) an [Socket.io](http://socket.io/) .

## Get started
### With Node.js local installed
1. Install node modules
```bash
npm install
```
2. Start the project
```bash
npm start 
```
### With Docker-Compose
1. build image and start docker (detached)
```bash
docker-compose up -d --build
```
2. stop container
If you started detached stop with `STRG/CNTRL + C`  
```bash
docker-compose down
```

## Hosting
To host productive edit in `client/src/common/Lobby.jsx` the Socket.io Server URL and
edit in `server/index.js` the *origin* to the UNO Server.
**Important:** Enable Websockets support in nginx.



## Tasks
- Christian
  - [ ] Implement the new UNO Cards:
    - Wild Shuffle Hands Card
    - Wild Customizable card
- Maxim
  - [ ] Chat design
    - [ ] begin from bottom
    - [ ] each text get a bg
    - [ ] scroll
  - [ ] Abfragen bei Karten wahl
    - [ ] Challenge Wild DRAW FOUR FOR NEXT PLAYER (challenge_wild_draw_four_request), wenn ja mitte einfach zurück senden
    - [ ] WILD CARDS welche Farbe
  - [ ] Hand format
    - 75% horizontal für Karten
    - wenn der Halbkreis zu groß wird werden die Karten kleiner skaliert

## Milestones

- [ ] abfrage, wenn hochformat bitte Handy drehen
- [x] Karten einbinden (SVG)
- [x] Karten in Stack speichern (Verteilstapel), verteilen (an Spieler) und ablegen (auf den Ablegstapel)
- [x] Multiplayer (netzwerk basiert)

## UNO RULES

### Basic
1. 7 cards will deal to each Player
   1. the top Card will flip and start the **discard pile** (cant be an action or wild card)
   2. the rest take place in the mid (hidden)
2. On a Players turn it is valid to do:
   1. play one card **matching the discard in color, number, or symbol**
   2. play a Wild card, or a playable Wild Draw Four card (see Penalties 2)
   3. draw the one card from the Deck, and play it if possible

### Special Cards
- [ ] **SKIP**
  - Next player in sequence misses a turn
- [ ] **REVERSE**
  - Order of play switches directions (clockwise to counterclockwise, or vice versa)
- [ ] **DRAW TWO**
  - Next player in sequence draws two cards and misses a turn
- [ ] **WILD**
  - Player declares the next color to be matched
  (may be used on any turn even if the player has matching color)
- [ ] **WILD DRAW FOUR** 
  - Player declares the next color to be matched; next player in sequence draws four cards and misses a turn. 
  May be legally played only if the player has no cards of the current color (see Penalties)

### Advanced
- [ ] A player who draws a card can only play this
- [ ] When a player plays a wild card, he can declare the current color
- [ ] If the draw deck runs out during play, the top discard is set aside and the rest of the pile is shuffled to create a new deck.

### Penalties
- [ ] If a player doesn't call **UNO** after laying down their penultimate card 
and before the next Player in row starts to take a turn. 
- [ ] If a player plays a **WILD_DRAW_FOUR** card, the next player can challenge him.
  - If he could only play the WILD_DRAW_FOUR card the next player must draw 6 Cards
  - If he have other options to play, he must draw the 4 cards
 