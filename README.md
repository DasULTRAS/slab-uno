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
  - [x] Search for icons/assets
    - [x] Tap icon
    - [x] icon (size: 192x192)
    - [x] logo (size: 512x512)
  - [x] Dockerized start
    - [x] Guide
    - [x] docker-compose.yml for development
    - [x] docker-compose.yml for production
- Maxim
  - [ ] Display the layout(without functions)
    - [ ] Uno button
    - [ ] Own player deck
    - [ ] Draw card deck
    - [ ] Middle deck

## Milestones

- [ ] abfrage, wenn hochformat bitte Handy drehen
- [ ] Karten einbinden (SVG)
- [ ] Karten in Stack speichern (Verteilstapel), verteilen (an Spieler) und ablegen (auf den Ablegstapel)
- [ ] Multiplayer (netzwerk basiert)
