## Info

- There is a pipeline triggered by commits to main, that will both build and deploy the website. There is a quite significant delay between pipeline finish and the new version being served.

- Preffered file naming convension for hbs and pdf files is kebab-case.

## Build

### Build with:

```
npm run build
```

### My build & run command:

```bash
cd dist
cd .. && npm run build && cd dist && python3 -m http.server 8000
```

## To Do
- buy buttons for adlibris and bokus missing icons

### Low Priority
- add short book descriptions to https://www.ayurvedagoteborg.se/books.html
- add flag next to language link