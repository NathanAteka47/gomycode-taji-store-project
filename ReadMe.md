# Taji Three In One Online Store

**An advanced full-stack MERN (MongoDB, Express, React, Node.js + TypeScript) e-commerce + POS web application for Taji Food Store in Kenya.**  
This platform supports online ordering, physical point-of-sale tracking, real-time inventory, M-Pesa payments, worker management, and a full admin dashboard.

---

## 🚀 Features

### 🛒 Online Store
- Product listing with categories (`food`, `water`, `cakes`)
- Add to cart, checkout, and place orders
- Authenticated checkout using JWT
- Order history tracking

### 💼 Admin Dashboard
- Add/update/delete Products & Workers
- View orders and payments
- See payment history and POS sales
- Auto-match M-Pesa receipts to orders
- Role-based access control

### 📟 POS System
- Local store sales tracking by workers
- Manual order creation with category filters
- Daily sale records saved to MongoDB
- Worker ID verification

### 📲 M-Pesa STK Integration
- STK Push simulation via Safaricom Sandbox
- Callback support for receiving payments
- Logs M-Pesa payment status
- Email notification after payment success
- Auto-link M-Pesa receipt to order
- Logs all responses to DB

### 📊 Reports & Analytics
- Admin dashboard shows:
  - Daily/monthly sales
  - M-Pesa payment history
  - Smart inventory alerts
  - AI-powered sales predictions (coming soon)

---

## 🧠 Tech Stack

| Category        | Tools                                       |
|----------------|---------------------------------------------|
| Frontend       | React, Vite, TypeScript, Tailwind CSS, Axios, Redux Toolkit |
| Backend        | Node.js, Express.js, TypeScript, MongoDB + Mongoose |
| Payments       | Safaricom M-Pesa STK Push (Sandbox), Nodemailer |
| Auth           | JWT (Admin/User), Local Storage |
| Deployment     | GitHub Pages (Frontend), CPanel / Node Hosting (Backend) |

---

## 🗂️ Folder Structure

```

├── client/
│   ├── src/
│   │   ├── pages/
│   │   ├── components/
│   │   ├── store/
│   │   ├── hooks/
│   │   ├── App.tsx, main.tsx, index.css
│   │   └── types/
│   └── public/
│
├── server/
│   ├── controllers/
│   ├── models/
│   ├── routes/
│   ├── middleware/
│   ├── utils/
│   ├── config/
│   └── index.ts

````

---

## 🛠️ Setup Instructions

### 1. Clone the Repo

```bash
git clone https://github.com/nathanateka47/taji-three-in-one-store.git
cd taji-three-in-one-store
````

### 2. Install Dependencies

#### Backend

```bash
cd server
npm install
```

#### Frontend

```bash
cd client
npm install
```

### 3. Configure Environment

Create a `.env` file in `server/` with:

```env
PORT=5001
MONGO_URI=your_mongo_connection_string
JWT_SECRET=your_jwt_secret
MPESA_CONSUMER_KEY=your_key
MPESA_CONSUMER_SECRET=your_secret
MPESA_SHORTCODE=174379
MPESA_PASSKEY=your_passkey
BASE_URL=http://localhost:5001
EMAIL_USER=your@email.com
EMAIL_PASS=your_email_password
```

### 4. Run the Project

```bash
# Backend
cd server
npm run dev

# Frontend
cd client
npm run dev
```

---

## 🔐 Roles

* **Admin**: Full access to dashboard, manage products, sales, workers
* **Customer**: View products, place orders, M-Pesa payments
* **Worker**: Access to POS for tracking local sales

---

## 💳 M-Pesa Integration

* STK Push: `/api/mpesa/stkpush`
* Callback URL: `/api/mpesa/callback`
* Payment Logs: Stored in `payments` collection
* Receipt auto-matches to order using `AccountReference` or `CheckoutRequestID`

---

## 📩 Email Notification

* After successful payment/order via M-Pesa, customer gets an email confirmation.
* Configurable via `.env`.

---

## 📈 Roadmap

* ✅ Product & Worker Management
* ✅ POS Sale Tracking
* ✅ M-Pesa Payment Gateway
* ✅ Email Notifications
* 🔜 PDF Receipt Generator
* 🔜 AI Sales Forecast (time-series)
* 🔜 Multi-location inventory support

---

## 🧑‍💻 Author

Built by **Marlin Nathan Ateka** aka *Marlin 4off7*
Founder & CEO, [RhymeStreet Co.](#)

---

## 🛡️ License

This project is open-source and for educational + business use only. For full licensing or commercial requests, contact the author.