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
### With Docker-Compose
1. Build image an start docker
remove *-d* if you want console logs direct to console
```bash
docker-compose up -d
```
2. Stop Container
```bash
docker-compose down
```

## Tasks
- Christian
  - [ ] Search for icons/assets
    - [ ] Tap icon
    - [ ] icon (size: 192x192)
    - [ ] logo (size: 512x512)
  - [ ] Dockerize
    - [ ] Guide
    - [x] docker-compose.yml for development
    - [ ] docker-compose.yml for production
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
