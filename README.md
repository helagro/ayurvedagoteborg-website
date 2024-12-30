## Info

There is a pipeline triggered by commits to main, that will both build and deploy the website. There is a quite significant delay between pipeline finish and the new version being served.

## Build

### Build with:

```
npm run build
```

### My build command:

```bash
cd .. && npm run build && cd dist && python3 -m http.server 8000
```

## To Do
- indicate current page in navbar 