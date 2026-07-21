# 💰 SmartCash AI

> An AI-powered accounting platform that automates bank statement analysis, transaction categorization, and financial report generation.

![License](https://img.shields.io/badge/license-MIT-blue.svg)
![React](https://img.shields.io/badge/React-19-blue)
![TypeScript](https://img.shields.io/badge/TypeScript-5-blue)
![Node.js](https://img.shields.io/badge/Node.js-Express-green)
![Supabase](https://img.shields.io/badge/Database-Supabase-3ECF8E)
![OpenAI](https://img.shields.io/badge/AI-OpenAI-412991)

---

## 📖 Overview

SmartCash AI is a modern full-stack web application built to help accountants automate the tedious process of analyzing bank statements.

Instead of manually separating transactions into categories such as:

- Bank Charges
- Transfers
- Refunds
- Salaries
- Purchases
- Utilities
- Transportation
- Office Expenses

SmartCash AI uses a combination of **rule-based classification** and **AI-powered categorization** to automatically organize transactions into the correct categories.

Users can review AI suggestions, make corrections when necessary, and export organized reports in Excel or PDF format.

---

## ✨ Features

### Authentication

- Secure Login
- JWT Authentication
- Protected Routes

### Dashboard

- Total Statements Uploaded
- Total Transactions Processed
- AI Accuracy
- Pending Reviews
- Recent Uploads

### Bank Statement Processing

- Upload Excel Files
- Upload PDF Statements
- Parse Transactions
- Automatic Categorization

### AI Categorization

- Bank Charges
- Transfers
- Refunds
- Salaries
- Purchases
- Office Expenses
- Utilities
- Transportation
- Custom Categories

### Review System

- Review AI Predictions
- Edit Transaction Categories
- Save Corrections
- Confidence Scores

### Export

- Excel Export
- PDF Export
- Printable Reports

---

# 🧠 AI Workflow

```text
Upload Statement
        │
        ▼
Read Excel/PDF
        │
        ▼
Rule Engine
(Bank Charges, VAT, Stamp Duty...)
        │
        ▼
AI Categorization
(OpenAI)
        │
        ▼
Confidence Scoring
        │
        ▼
Manual Review
        │
        ▼
Export Excel / PDF
```

---

# 🏗️ Tech Stack

## Frontend

- React
- TypeScript
- Vite
- Tailwind CSS
- React Router
- TanStack React Query
- Axios
- Lucide React

## Backend

- Node.js
- Express
- TypeScript
- Multer
- ExcelJS
- PDF Parser

## Database

- Supabase (PostgreSQL)

## AI

- OpenAI API

---

# 📂 Project Structure

```text
smartcash-ai/

├── client/
│   ├── src/
│   ├── public/
│   ├── .env
│   └── package.json
│
├── server/
│   ├── src/
│   ├── .env
│   └── package.json
│
├── .gitignore
└── README.md
```

---

# 🚀 Getting Started

## Clone the repository

```bash
git clone https://github.com/YOUR_USERNAME/smartcash-ai.git
```

```bash
cd smartcash-ai
```

---

## Frontend

```bash
cd client

npm install

npm run dev
```

Runs on:

```
http://localhost:5173
```

---

## Backend

```bash
cd server

npm install

npm run dev
```

Runs on:

```
http://localhost:5000
```

---

# ⚙️ Environment Variables

## Frontend (`client/.env`)

```env
VITE_API_BASE_URL=http://localhost:5000/api
```

---

## Backend (`server/.env`)

```env
PORT=5000

NODE_ENV=development

FRONTEND_URL=http://localhost:5173

SUPABASE_URL=

SUPABASE_ANON_KEY=

SUPABASE_SERVICE_ROLE_KEY=

OPENAI_API_KEY=

JWT_SECRET=
```

---

# 📸 Screenshots

Coming Soon...

- Login Page
- Dashboard
- Upload Statement
- Review Transactions
- AI Categorization
- Reports

---

# 🛣️ Roadmap

- [x] React Project Setup
- [x] Tailwind CSS
- [x] Dashboard Layout
- [x] Routing
- [ ] Authentication
- [ ] Backend API
- [ ] File Upload
- [ ] Excel Parsing
- [ ] PDF Parsing
- [ ] AI Categorization
- [ ] Transaction Review
- [ ] Export to Excel
- [ ] Export to PDF
- [ ] User Management
- [ ] Dark Mode
- [ ] Deployment

---

# 🔒 Security

- JWT Authentication
- Environment Variables
- Secure API Requests
- Protected Routes
- Input Validation
- File Validation

---

# 🤝 Contributing

Contributions, issues, and feature requests are welcome.

If you'd like to contribute:

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to your branch
5. Open a Pull Request

---

# 📄 License

This project is licensed under the MIT License.

---

# 👨‍💻 Author

**Tominiyi Ayomide**

Full Stack Developer

GitHub: https://github.com/aycodes25

Portfolio: https://tominiyiayomide.netlify.app/
