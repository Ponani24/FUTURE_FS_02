# 📊 Mini CRM System

A simple full-stack CRM system built for managing potential customers/leads.  
This project demonstrates CRUD operations, status tracking, and a notes system using a React frontend and Node.js + MongoDB backend.

---

## 🔐 Admin Login

To access the dashboard:

- 📧 Email: `admin@gmail.com`
- 🔑 Password: `123456`

---

## 🧠 Features

### 📋 Customer Management
- View all potential customers
- Automatically generate mock customers
- Delete customers

### 🔄 Lead Status Tracking
Each customer can be updated through 3 stages:
- New
- Contacted
- Converted

### 📝 Notes System
- Add notes to each customer
- View all previous notes in a popup modal
- Notes are stored in MongoDB inside each customer document

### 🎲 Mock Data Generator
- Generates sample customers using backend API
- Inserts random data into MongoDB

---


---

## 🚀 How to Run the Project

⚠️ You must run backend and frontend in TWO terminals.

---

### 1️⃣ Start Backend

```bash
cd src/backend
npm install
npm start
```bash
### 1️⃣ Start Frontent
npm install
npm run dev


