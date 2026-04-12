# Little Lemon — Front-End Capstone

Live: https://meta-front-end-developer-capstone-three.vercel.app/

A full-stack restaurant web app built with React, connected to a live Django REST API backend. Users can browse the menu, make table reservations, and create accounts — all powered by real API calls.

## Tech Stack

- React 18
- React Router v6
- CSS3 (no UI framework — fully custom)
- Deployed on Vercel

## Features

- **Live Menu** — fetched from Django REST API, grouped by category (Starters, Mains, Desserts, Drinks)
- **This Week's Specials** — dynamic featured items on the home page and menu page, managed via the backend
- **Table Reservations** — form submits to the API, requires authentication
- **User Auth** — register, login, logout with token-based authentication
- **Protected Routes** — Reserve page redirects to login if unauthenticated

## Backend

This app is powered by a separate Django REST API:
https://github.com/logangarbacki/littlelemon-web-app-django

The API base URL is configured via the `REACT_APP_API_URL` environment variable.

## Local Development

```bash
npm install
REACT_APP_API_URL=http://localhost:8000 npm start
```

Requires the Django backend running locally on port 8000.

## Tests

```bash
npm test
```

Unit tests cover form validation, booking submission logic, and component rendering.

## Project Background

Originally built as the capstone for the Meta Front-End Developer Professional Certificate on Coursera — but taken significantly further than the course requirements.

The base requirement was a static React app with a hardcoded menu and a non-functional booking form. This version goes beyond that by integrating a real Django REST API backend (built separately for the Meta Back-End Developer capstone), adding token-based authentication, live data throughout, and deploying both as a connected full-stack application.

Both capstones were completed independently, then merged into a single working product:
- Meta Front-End Developer: https://www.coursera.org/professional-certificates/meta-front-end-developer
- Meta Back-End Developer: https://www.coursera.org/professional-certificates/meta-back-end-developer
