# Ayurvedagoteborg Website

## Project Structure

```
├── package.json                # Project metadata and dependencies
├── package-lock.json           # Lockfile for reproducible installs
├── README.md                   # Project information file
├── scripts/                    # Scripts for managing the project
│   └── build.sh                # Build script for compiling assets or templates
├── src/                        # Source files for the project
│   ├── build.js                # Project build script
│   ├── assets/                 # Static files used throughout the site
│   │   ├── img/                # Images for authors, courses, books, and site branding
│   │   ├── js/                 # JavaScript for language toggle, responsiveness, etc.
│   │   └── pdf/                # Downloadable PDF resources
│   ├── components/             # Reusable layout components (partials)
│   │   ├── head.hbs            # Head section for the HTML documents
│   │   ├── header.hbs         # Header section of the pages
│   │   ├── navEN.hbs           # Navigation bar in English
│   │   ├── navSV.hbs           # Navigation bar in Swedish
│   │   └── scripts.hbs         # Partial for including scripts used across pages
│
│   ├── sass/                   # Sass stylesheets (similar to CSS)
│   │   ├── _*.sass             # Partial Sass files (variables, mixins, etc.)
│   │   ├── main.sass           # Main stylesheet
│   │   └── pages/              # Page-specific styles
│
│   └── templates/              # Contains the pages
│       ├── *.hbs               # Top-level pages
│       ├── bocker/             # Book-specific pages
│       ├── en/                 # English versions of pages
│       └── README.md           # Template documentation
```

## Development

### Project Setup

```bash
git clone git@github.com:helagro/ayurvedagoteborg-website.git
cd ayurvedagoteborg-website
npm install
```

### Build

#### Build with:

```
npm run build
```

#### My build & run command:

```bash
cd dist
cd .. && npm run build && cd dist && python3 -m http.server 8000
```

### Conventions

## Naming Conventions

- Handlebars and PDF files: `kebab-case` (e.g., `my-file.hbs`, `course-material.pdf`)
- Image files: Use descriptive names in English or Swedish where relevant.
- Avoid spaces in file names; use `-` instead.

### Deployment

There is a pipeline triggered by commits to main, that will both build and deploy the website. There is a quite significant delay between pipeline finish and the new version being served.

## To Do
- buy buttons for adlibris and bokus are missing icons

### Low Priority
- add short book descriptions to https://www.ayurvedagoteborg.se/books.html
- add flag next to language link