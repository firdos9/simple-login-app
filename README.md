# Simple Login App

A lightweight web application demonstrating secure authentication, backend validation, and automated testing practices.  
Developed as part of the Software Quality Assurance and Testing (SQAT) course.

---

## Features
- Login form with HTML, CSS, and JavaScript
- Backend API with Express.js
- Passwords hashed using bcryptjs
- Client-side and server-side validation
- Automated testing with Jest + Supertest and Cypress
- Continuous Integration with GitHub Actions

---

## Architecture
- **Frontend**
  - `index.html` – Login form
  - `public/app.js` – Client-side logic and fetch calls
  - `public/styles.css` – Styling and feedback messages
- **Backend**
  - `server.js` – Express API with `/api/login`
- **Testing**
  - `test/auth.test.js` – Jest + Supertest API tests
  - `cypress/e2e/login_spec.js` – Cypress E2E tests
  - `cypress.config.js` – Cypress configuration
- **CI/CD**
  - `.github/workflows/` – GitHub Actions pipeline

---

## Getting Started

### Prerequisites
- Node.js >= 16  
- npm >= 8  

### Installation
```bash
git clone https://github.com/firdos9/simple-login-app.git
cd simple-login-app
npm install
````

### Running the App

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## Testing

### Unit & Integration (Jest + Supertest)

```bash
npm test
```

### End-to-End (Cypress)

Make sure the server is running, then run:

```bash
npm run cypress:open
```

or

```bash
npm run cypress:run
```

---

## Team Contributions

* **Backend** – `server.js`
* **Frontend** – `index.html`, `public/app.js`, `public/styles.css`
* **Tests** – `test/auth.test.js`, `cypress/e2e/login_spec.js`
* **Config & CI** – `cypress.config.js`, GitHub Actions
* **Docs** – `README.md`


