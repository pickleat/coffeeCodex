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

- [ ] Create user sign-in (offload to someone)
- [ ] User Settings/Save
- [ ] Save Brews
- [ ] Save Coffees
    - Issues:
        - Same coffee from different roasters
        - Same Coffee different **roasts**
        - Social element
- [ ] Social
    - [ ] Share? Have a feed of brews?
    - [ ] Link to roasters?

## Design

- [x] Don't do, until you are happy with FUNCTIONALITY. This is about self-restraint, Andy.
- [ ] Make each section its own grid section, make the final card a single card that can be exported.
- [ ] Do some design research to make sure it doesn't look bad
- [ ] Decide on a CSS structure (Sass, other framework, vanilla?)
- [ ] Decide on a color pallete
- [ ] Decide on fonts
- [ ] Don't over do it.

## Bluetooth

- Research
    - Google Devs: [Web Bluetooth](https://developers.google.com/web/updates/2015/07/interact-with-ble-devices-on-the-web)
    - Github Repo: [Web Bluetooth](https://github.com/WebBluetoothCG/web-bluetooth)
