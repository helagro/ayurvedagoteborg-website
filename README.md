## Info

There is a pipeline triggered by commits to main, that will both§ build and deploy the website

## Build with:

```
npm run build
```

## My build command:

```bash
cd .. && npm run build && cd dist && python3 -m http.server 8000
```
