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
To host productive edit in `client/src/common/lobby.jsx` the Socket.io Server URL and
edit in `server/index.js` the *origin* to the UNO Server.
**Important:** Enable Websockets support in nginx.



## Tasks
- Christian
  - [ ] if main Cards are empty recycle played cards 
  - [ ] Implement the new UNO Cards:
    - Wild Shuffle Hands Card
    - Wild Customizable card
- Maxim
  - [X] Display the layout(without functions)
    - [X] Uno button
    - [X] Own player deck
    - [X] Draw card deck
    - [X] Middle deck

## Milestones

- [ ] abfrage, wenn hochformat bitte Handy drehen
- [ ] Karten einbinden (SVG)
- [ ] Karten in Stack speichern (Verteilstapel), verteilen (an Spieler) und ablegen (auf den Ablegstapel)
- [ ] Multiplayer (netzwerk basiert)
