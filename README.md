# Restaurants Portal 🍽️

Restaurants Portal is a web application for browsing restaurants, viewing menus, adding dishes to a cart, and placing an order.

This repository is prepared as a **QA portfolio project** with automated end-to-end tests written in **Playwright**.

Production URL:

```bash
https://restaurants-portal.vercel.app
```

---
## Test Coverage

- Homepage testing
- Cart functionality
- Order form validation
- Responsive testing
  
## Features

- Browse available restaurants
- Filter restaurants by cuisine type
- Sort restaurants by price or delivery time
- View restaurant menu pages
- Filter menu items by category
- Add dishes to cart
- Remove items from cart
- Fill in order form
- Submit an order and view confirmation page
- Switch between light and dark mode
- Basic responsive layout checks

---

## Tech Stack

### Application

- HTML5
- CSS3
- JavaScript
- Node.js
- Express.js
- JSON Server

### Testing

- Playwright
- JavaScript
- GitHub Actions

---

## Project Structure

```bash
restaurants-portal-main/
│
├── public/
│   ├── index.html
│   ├── restauracja1.html
│   ├── restauracja2(pl).html
│   ├── restauracja3(az).html
│   ├── restauracja4(ff).html
│   ├── zamowienia.html
│   ├── potwierdzenie.html
│   ├── style.css
│   ├── script.js
│   ├── form.js
│   ├── koszyk.js
│   ├── storage.js
│   └── api.js
│
├── tests/
│   └── e2e/
│       ├── homepage.spec.js
│       ├── menu.spec.js
│       ├── cart.spec.js
│       ├── responsive.spec.js
│       └── test-data.js
│
├── .github/
│   └── workflows/
│       └── playwright.yml
│
├── db.json
├── server.js
├── package.json
├── playwright.config.js
└── README.md
```

---

## Installation

```bash
npm install
```

Install Playwright browsers:

```bash
npx playwright install
```

---

## Run Application Locally

```bash
npm start
```

Local app URL:

```bash
http://localhost:3000
```

---

## Run Automated Tests

Run all Playwright tests against the production Vercel app:

```bash
npm run test:e2e
```

Run tests in headed mode:

```bash
npm run test:e2e:headed
```

Run tests with Playwright UI:

```bash
npm run test:e2e:ui
```

Open HTML test report:

```bash
npm run test:e2e:report
```

---

## Test Coverage

### Homepage Tests

- Verify that homepage loads correctly
- Verify that restaurant cards are displayed
- Filter restaurants by cuisine
- Sort restaurants by delivery time
- Switch dark mode

### Menu Tests

- Open restaurant menu from homepage
- Filter dishes by category
- Add dish to cart
- Verify cart data in localStorage

### Cart and Order Tests

- Display products in cart
- Calculate total price
- Remove product from cart
- Prevent empty form submission
- Submit valid order
- Verify confirmation page

### Responsive Test

- Verify homepage usability on mobile viewport

---

## GitHub Actions

The project includes a GitHub Actions workflow:

```bash
.github/workflows/playwright.yml
```

It runs Playwright E2E tests automatically on push and pull request.

---

## Useful Commands

```bash
npm run test:e2e
npm run test:e2e:headed
npm run test:e2e:ui
npm run test:e2e:report
```

---

## QA Portfolio Value

This project demonstrates:

- Basic E2E test automation
- UI testing
- Form validation testing
- Cart functionality testing
- Production URL testing
- Mocked API response usage
- GitHub Actions CI setup
- Clean test structure for a QA portfolio

---

## Author

Created as a QA automation portfolio project.
