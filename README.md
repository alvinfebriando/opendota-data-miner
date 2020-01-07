# opendota-data-miner

A project to get DOTA2 public matches data from opendota api

## How to use

### Install dependencies

```bash
$ npm install
// or
$ yarn
```

### Fetch data through OpenDota API

```bash
$ node fetch
```

### Get only specified attribute (in filter.js)

```bash
$ node filter
```

### Merge filtered JSON

```bash
$ node merge
```

### Convert to more readable form (replacing constant with text)

```bash
$ node convert
```

### Split data to matches.json and players.json

```bash
$ node split
```
