# band-pot

## Introduce

A auto reply bot for [band.us](https://band.us).

Band posts with no replies are not displayed when sorted by most recent replies, so I wrote this bot which detects and automatically replies to posts with no replies.

## Usage

```bash
git clone https://github.com/lixiang810/band-pot
cd band-pot
yarn
```

Copy `config/config.example.json` to `config/config.json`, and modify it.

```js
{
  "clientId": "",        // Not necessary.
  "clientSecret": "",    // Not necessary.
  "serveUrl": "",        // No use.
  "token": "",           // User token, you can get it by creating a app in Band's developer center.
  "bandKey": []          // The IDs of the bands you want the bot to listen.
}
```

Then, use `yarn start` to start the bot. It will delect each band every 5 minutes.
