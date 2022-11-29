# SLAB-UNO

An UNO that aims to be a browser based multiplayer GAME.
Written in.

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
### With Docker-Compose (DEV)
1. build image and start docker
remove *-d* if you want console logs direct to console
```bash
docker-compose up -d --build
```
2. stop container
If you started detached stop with `STRG/CNTRL + C`  
```bash
docker-compose down
```

### With Docker-Compose (PROD)
1. build image and start docker
```bash
docker-compose -f docker-compose-prod.yml up -d --build
```
2. stop container
   If you started detached stop with `STRG/CNTRL + C`
```bash
docker-compose -f docker-compose-prod.yml down
```


## Tasks
- Christian
  - [ ] Search for icons/assets
    - [ ] Tap icon
    - [ ] icon (size: 192x192)
    - [ ] logo (size: 512x512)
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
