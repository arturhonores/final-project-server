# CASH MINDER

Es una aplicación web para controlar tus gastos personales.

---

## Instalación

Sólo es necesario contar con un servidor web con Node.js

---

## API Endpoints

### 1 Expense Routes

Base URL `/api/expenses`

| HTTP Method | URL Path      | Description               |
| ----------- | ------------- | ------------------------- |
| GET         | `/total`      | All Expense List          |
| GET         | `/:id`        | Expense details           |
| POST        | `/create`     | Create Expense            |
| GET         | `/edit/:id`   | Expense edit form         |
| PUT         | `/edit/:id`   | Expense edit form handler |
| DELETE      | `/delete/:id` | Expense delete            |
| GET         | `/month`      | Monthly Expense List      |
| GET         | `/week`       | Weekly Expense List       |
| GET         | `/day`        | Daily Expense List        |
| GET         | `/year`       | Yearly Expense List       |
| GET         | `/period`     | Periodic Expense List     |

### 2 Income Routes

Base URL `/api/incomes`

| HTTP Method | URL Path      | Description              |
| ----------- | ------------- | ------------------------ |
| GET         | `/total`      | All income List          |
| GET         | `/:id`        | Income details           |
| POST        | `/create`     | Create income            |
| GET         | `/edit/:id`   | Income edit form         |
| PUT         | `/edit/:id`   | Income edit form handler |
| DELETE      | `/delete/:id` | Income delete            |
| GET         | `/month`      | Monthly income List      |
| GET         | `/week`       | Weekly income List       |
| GET         | `/day`        | Daily income List        |
| GET         | `/year`       | Yearly income List       |
| GET         | `/period`     | Periodic income List     |

### 3 Authenticated Routs

| HTTP Method | URL Path   | Description          |
| ----------- | ---------- | -------------------- |
| POST        | `/signup`  | Sign Up form handler |
| POST        | `/login`   | Login form handler   |
| GET         | `/verify/` | Verify Auth Token    |

---

## Technologies

| Dependencies  | version |
| ------------- | ------- |
| cookie-parser | 1.4.6   |
| dotenv        | 16.0.3  |
| express       | 4.18.2  |
| mongoose      | 7.1.1   |
| morgan        | 1.10.0  |
| serve-favicon | 2.5.0   |
| nodemon       | 2.0.22  |
| axios         | 1.4.0   |

---

"bcryptjs": "^2.4.3",
"cloudinary": "^1.37.0",
"cookie-parser": "^1.4.6",
"cors": "^2.8.5",
"dotenv": "^16.0.3",
"express": "^4.18.2",
"express-jwt": "^8.4.1",
"jsonwebtoken": "^9.0.0",
"mongoose": "^7.2.1",
"morgan": "^1.10.0",
"multer": "^1.4.5-lts.1",
"multer-storage-cloudinary": "^4.0.0"

## License

The source code for the site is licensed under the MIT license
