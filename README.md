![GodMode Logo](https://godmode-public-assets.s3.amazonaws.com/godmode_logo.jpg)

# @xgm/error-codes

Custom errors used across XGM repos

## Usage

```sh
npm install @xgm/error-codes
```

```js
import { HTTPError } from '@xgm/error-codes'
throw CAIPNetworkError({
    message: `Unsupported network ${network}`,
})
```

## Testing

Tests are written in [mocha](https://mochajs.org/).

```
npm run test
```

## Contributing

Fork this repo and create a descriptive PR.

## Releases

This package is in **alpha** so releases may be frequent.
Core devs should create releases after merging in new features by running

`npm run dist && npm run release`

This will ask you for the release version, then automatically create a release and publish it to npm.
