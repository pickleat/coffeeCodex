# coffeeTimer

## Goals

1. Create a better coffee timer, initially for personal use.
2. Use the brews to create a database of coffees tied back to their data with more data (like most popular brews or multiple roasters for a specific coffee).
3. Stretch-Goal: be able to pull data from bluetooth coffee scales (like Acaia) to actually agregate the brewing data.
4. Super-Stretch-Goal: create a web app that allows users to connect with their favorite baristas and make coffee the way the pros do, by mimicking their brew-guides.

## Brew Timer

- [x] Start, Stop
    - [x] Add styling so it actually looks like a minute timer "0:00" // Consider using a library, (like moment.js).
        - Opted not to use a library for the time being
- [x] Events
    - [x] Be able to name events (e.g. Bloom, Pour, Pulse, Stir, Drip, etc...)
    - [x] Algorithmically guess events (start, bloom, etc...)
    - [x] Until Bluetooth functionality, be able to input volume and create a graph
- [x] Brewer Type (e.g. V60, Kalita, Chemex, etc...)
- [x] Input coffee (for now just a text input)
    - [x] Add Optional information: roaster, producer, MASL
    - [x] Abstract away the process of adding the input sections. Like an array: ```[coffeeName, producer, masl, brewer, dose, ratio]```
    - [ ] Consider refactoring to use the information from the ```thisBrew``` Object, might be a better way.
- [ ] Export brew (make it pretty for people to export ☺️)

## Coffee Database

- [x] Create user sign-in (offload/outsource/library?)
- [ ] User Settings/Save
- [ ] Save Brews
- [x] Save Coffees
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
    - [ ] Learn how to export items, and to also send data.
- [ ] Do some design research to make sure it doesn't look bad
- [x] Decide on a CSS structure (Sass, other framework, vanilla?)
- [ ] Decide on a color pallete
- [ ] Decide on fonts
- [ ] Don't over do it.

## Progressive Web Application

- [x] Is this app a good use-case for a PWA? (I believe it is)
- [ ] Gather Resources for How to Publish as PWA
1. [Google PWAs](https://developers.google.com/web/progressive-web-apps/)
2. [Google PWA Checklist](https://developers.google.com/web/progressive-web-apps/checklist)
3. [Mozilla PWAs](https://developer.mozilla.org/en-US/docs/Web/Progressive_web_apps)
4. [Max Firtman iOS Web Apps](https://medium.com/@firt/progressive-web-apps-on-ios-are-here-d00430dee3a7)
5. [Microsoft PWAs](https://developer.microsoft.com/en-us/windows/pwa)
6. [CodeNewbie Podcast](https://www.codenewbie.org/podcast/what-are-progressive-web-apps)
- [ ] Publish PWA

## Bluetooth

- Research
    - Google Devs: [Web Bluetooth](https://developers.google.com/web/updates/2015/07/interact-with-ble-devices-on-the-web)
    - Github Repo: [Web Bluetooth](https://github.com/WebBluetoothCG/web-bluetooth)

## Web APIs

- [Cache API](https://developers.google.com/web/fundamentals/instant-and-offline/web-storage/cache-api)