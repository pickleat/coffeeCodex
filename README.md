# coffeeTimer

Goal: create a better coffee timer, initially for personal use.

Stretch-Goal: be able to pull data from bluetooth coffee scales (like Acaia) to actually agregate the brewing data.

Super-Stretch-Goal: create a web app that allows users to connect with their favorite baristas and make coffee the way the pros do, by mimicking their brew-guides.

## Brew Timer

- [x] Start, Stop
    - [x] Add styling so it actually looks like a minute timer "0:00" // Consider using a library, (like moment.js).
        - Opted not to for the time being
- [x] Events
    - [x] Be able to name events (e.g. Bloom, Pour, Pulse, Stir, Drip, etc...)
    - [ ] Algorithmically guess events (first is bloom) 
    - [x] Until Bluetooth functionality, be able to input volume and create a graph
- [x] Brewer Type (e.g. V60, Kalita, Chemex, etc...)
- [x] Input coffee (for now just a text input)
- [ ] Add Optional information: roaster, producer, MASL
- [ ] Export brew (make it pretty for people to export ☺️)

## Coffee Database

- [ ] User Save
- [ ] Save Brews
- [ ] Save Coffees
    - Issues:
        - Same coffee from different roasters
        - Same Coffee different **roasts**
        - Social element

## Design

- [ ] Don't do, until you are happy with FUNCTIONALITY. This is about self-restraint, Andy.