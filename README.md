# DBO Test

DBO Test is repository for the solutions of assignment to Depoguna Bangunan Online hiring process.

## Prerequisite

- Node.js
- React
- Vite

## Setup Instructions

1. Clone this repository

```bash
git clone git@github.com:zakkymf/dbo-test.git
```

2. Install Dependencies

```bash
cd dbo-test
npm install #or
yarn install
```

3. Running on local machine

```bash
yarn dev
```

Once the server is running, open your browser and navigate to `http://localhost:5173/`. The application will automatically reload whenever you modify any of the source files.

## Architecture

```
── App.css
├── App.tsx
├── assets
|  └── react.svg
├── main.tsx
├── pages
|  ├── home
|  |  ├── controllers
|  |  ├── models
|  |  └── views
|  ├── login
|  |  ├── controllers
|  |  ├── models
|  |  └── views
|  ├── order
|  |  ├── controllers
|  |  ├── models
|  |  ├── services
|  |  └── views
|  └── user
|     ├── controllers
|     ├── models
|     ├── services
|     └── views
├── shared
|  ├── components
|  ├── constant
|  ├── interface
|  ├── libraries
|  └── utils
└── vite-env.d.ts
```

This project is using MVC (Model-View-Controller) architecture, here is the detail about structure of this project:

### Root Files

- `App.tsx` – Main app component; typically contains global layout, routing, and providers.

- `App.css` – Global styles.

- `main.tsx` – Entry point for rendering the React app into the DOM.

- `vite-env.d.ts` – Environment-specific TypeScript declarations for Vite.

### Pages Files

Each folder in pages/ represents a feature/module and follows the MVC structure:

- `controllers/` – Contains logic that connects views with models/services.

- `models/` – Defines state stores or data schemas.

- `services/` – API service layer using Axios or similar.

- `views/` – Components rendering UI for this feature.

### Shared

Contains reusable code and global configurations:

- `components/` – Shared UI components (e.g., Button, Modal, Input).

- `constant/` – Constant values (e.g., API endpoints, roles).

- `interface/` – Global TypeScript interfaces and types.

- `libraries/` – Custom libraries or wrapper instances (e.g., Axios, Firebase).

- `utils/` – General utility functions (e.g., formatters, validators).

## Demo

![Login View](/demo/login.png?raw=true "Login View")
![Home View](/demo/home.png?raw=true "Home View")
![Order View](/demo/order.png?raw=true "Order View")
![OrderDetail View](/demo/detail-order.png?raw=true "OrderDetail View")
![User View](/demo/user.png?raw=true "User View")
![UserDetail View](/demo/detail-user.png?raw=true "UserDetail View")
