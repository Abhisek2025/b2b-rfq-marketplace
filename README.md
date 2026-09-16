# 🚀 B2B RFQ Marketplace

> **A full-stack B2B Request for Quotation (RFQ) Marketplace that connects Buyers with Suppliers.**

Buyers can create and manage product/service requirements and receive quotations from Suppliers. Suppliers can browse available RFQs and submit competitive quotations.

---

## 🌐 Live Demo

<div align="center">

### 🚀 Try the Application

<a href="https://b2b-rfq-marketplace-xi.vercel.app/login">
  <img src="https://img.shields.io/badge/🚀%20LIVE%20DEMO-OPEN%20APPLICATION-4F46E5?style=for-the-badge" alt="Live Demo">
</a>

<br><br>

🔗 **https://b2b-rfq-marketplace-xi.vercel.app/login**

</div>

---

## ✨ Features

### 👤 Buyer

* ✅ Register as Buyer
* ✅ Secure login
* ✅ JWT authentication
* ✅ Create RFQ
* ✅ Edit RFQ
* ✅ Delete RFQ
* ✅ View own RFQs
* ✅ View RFQ details
* ✅ View quotations received from Suppliers
* ✅ Responsive dashboard

### 🏢 Supplier

* ✅ Register as Supplier
* ✅ Secure login
* ✅ JWT authentication
* ✅ Browse available RFQs
* ✅ View complete RFQ details
* ✅ Submit quotation
* ✅ Add quotation price
* ✅ Add estimated delivery time
* ✅ Add message/notes
* ✅ View submitted quotations
* ✅ Responsive dashboard

### 🔐 Security

* 🔒 JWT-based authentication
* 🛡️ Role-Based Access Control
* 🔑 Password hashing using bcrypt
* ✅ Request validation
* 🔐 Protected API routes
* 🌐 CORS configuration
* 🛡️ Helmet security middleware
* 🔧 Environment variables for sensitive configuration
* ⚠️ Secure error handling

---

# 🛠️ Tech Stack

### 🎨 Frontend

| Technology          | Purpose             |
| ------------------- | ------------------- |
| ⚛️ React.js         | Frontend framework  |
| ⚡ Vite              | Build tool          |
| 🎨 Tailwind CSS     | UI styling          |
| 🧭 React Router DOM | Application routing |
| 📡 Axios            | API requests        |
| 🔔 React Hot Toast  | Notifications       |
| 🎯 Lucide React     | Icons               |

### ⚙️ Backend

| Technology          | Purpose                   |
| ------------------- | ------------------------- |
| 🟢 Node.js          | Runtime                   |
| 🚂 Express.js       | Backend framework         |
| 🗃️ Sequelize       | ORM                       |
| 🐬 MySQL            | Database                  |
| 🔐 JSON Web Token   | Authentication            |
| 🔑 bcryptjs         | Password hashing          |
| ✅ express-validator | Request validation        |
| 🛡️ Helmet          | Security                  |
| 🌐 CORS             | Cross-origin requests     |
| ⚙️ dotenv           | Environment configuration |

---

# 📁 Project Structure

```text
b2b-rfq-marketplace/
│
├── client/
│   ├── src/
│   │   ├── components/
│   │   │   └── ProtectedRoute.jsx
│   │   │
│   │   ├── context/
│   │   │   └── AuthContext.jsx
│   │   │
│   │   ├── pages/
│   │   │   ├── Login.jsx
│   │   │   ├── Register.jsx
│   │   │   ├── BuyerDashboard.jsx
│   │   │   ├── CreateRFQ.jsx
│   │   │   ├── EditRFQ.jsx
│   │   │   ├── BuyerRFQDetails.jsx
│   │   │   ├── SupplierDashboard.jsx
│   │   │   ├── SupplierRFQDetails.jsx
│   │   │   └── MyQuotations.jsx
│   │   │
│   │   ├── services/
│   │   │   └── api.js
│   │   │
│   │   ├── App.jsx
│   │   ├── main.jsx
│   │   └── index.css
│   │
│   ├── package.json
│   └── vite.config.js
│
├── server/
│   ├── src/
│   │   ├── config/
│   │   │   └── database.js
│   │   │
│   │   ├── controllers/
│   │   │   ├── authController.js
│   │   │   ├── rfqController.js
│   │   │   └── quotationController.js
│   │   │
│   │   ├── middleware/
│   │   │   ├── authMiddleware.js
│   │   │   ├── roleMiddleware.js
│   │   │   └── validationMiddleware.js
│   │   │
│   │   ├── models/
│   │   │   ├── User.js
│   │   │   ├── RFQ.js
│   │   │   └── Quotation.js
│   │   │
│   │   ├── routes/
│   │   │   ├── authRoutes.js
│   │   │   ├── rfqRoutes.js
│   │   │   └── quotationRoutes.js
│   │   │
│   │   ├── utils/
│   │   │   └── generateToken.js
│   │   │
│   │   └── validators/
│   │       ├── registerValidator.js
│   │       ├── loginValidator.js
│   │       ├── rfqValidator.js
│   │       └── quotationValidator.js
│   │
│   ├── .env
│   ├── package.json
│   └── server.js
│
├── .env.example
├── .gitignore
└── README.md
```

---

# 🚀 Getting Started

## 1️⃣ Clone the Repository

```bash
git clone <your-repository-url>
cd b2b-rfq-marketplace
```

## 2️⃣ Install Frontend Dependencies

```bash
cd client
npm install
```

## 3️⃣ Install Backend Dependencies

```bash
cd ../server
npm install
```

## 4️⃣ Configure Environment Variables

Create the required `.env` files and configure your database, JWT secret, and frontend URL.

Example:

```env
DATABASE_URL=your_database_url
JWT_SECRET=your_jwt_secret
CLIENT_URL=your_frontend_url
```

> ⚠️ Never commit real secrets, passwords, or production credentials to GitHub.

---

# ▶️ Run the Application

### Start Backend

```bash
cd server
npm run dev
```

### Start Frontend

```bash
cd client
npm run dev
```

The frontend will run locally using the Vite development server.

---

# 🌍 Deployment

The application can be deployed using:

* ☁️ **Frontend:** Vercel
* ⚙️ **Backend:** Render
* 🗄️ **Database:** MySQL

### 🔗 Production Application

<div align="center">

<a href="https://b2b-rfq-marketplace-xi.vercel.app/login">
  <img src="https://img.shields.io/badge/🚀%20OPEN%20B2B%20RFQ%20MARKETPLACE-4F46E5?style=for-the-badge" alt="Open Application">
</a>

</div>

---

# 🔄 Application Flow

```text
                    ┌─────────────────────┐
                    │   B2B RFQ Marketplace │
                    └──────────┬──────────┘
                               │
                 ┌─────────────┴─────────────┐
                 │                           │
          ┌──────▼──────┐             ┌──────▼──────┐
          │    Buyer    │             │  Supplier   │
          └──────┬──────┘             └──────┬──────┘
                 │                           │
          Create RFQ                   Browse RFQs
                 │                           │
                 ▼                           ▼
          Manage RFQ                    View RFQ
                 │                           │
                 │                           ▼
                 │                    Submit Quotation
                 │                           │
                 └─────────────┬─────────────┘
                               │
                               ▼
                     Buyer Receives
                      Quotations
```

---

# 🔐 Authentication & Authorization

The application uses **JWT-based authentication** with role-based access control.

### Buyer Permissions

```text
Create RFQ
Edit RFQ
Delete RFQ
View Own RFQs
View Received Quotations
```

### Supplier Permissions

```text
Browse RFQs
View RFQ Details
Submit Quotations
View Submitted Quotations
```

Protected routes ensure users can only access resources allowed for their role.

---

# 📊 Core Modules

```text
Authentication
     │
     ├── Register
     ├── Login
     └── JWT Authentication
     
RFQ Management
     │
     ├── Create RFQ
     ├── Edit RFQ
     ├── Delete RFQ
     └── View RFQ
     
Quotation Management
     │
     ├── Submit Quotation
     ├── Price
     ├── Delivery Time
     └── Message / Notes
     
Role Management
     │
     ├── Buyer
     └── Supplier
```

---

# 📌 API Architecture

The backend is organized into:

```text
Routes
  ↓
Middleware
  ↓
Controllers
  ↓
Models
  ↓
MySQL Database
```

This structure keeps authentication, validation, business logic, and database operations separated and maintainable.

---

# 🔒 Security Practices

This project implements several security practices:

* JWT authentication
* Password hashing with bcrypt
* Role-based authorization
* Protected routes
* Request validation
* CORS configuration
* Helmet middleware
* Environment variables
* Secure error handling

---

# 📱 Responsive Design

The frontend is designed to work across:

* 💻 Desktop
* 📱 Mobile
* 📟 Tablet

---

# 📄 License

This project is created for educational and development purposes.

---

<div align="center">

## 🚀 B2B RFQ Marketplace

**Connecting Buyers with Suppliers through a modern RFQ platform.**

<br>

⭐ **If you like this project, consider giving the repository a star!**

<br>

<a href="https://b2b-rfq-marketplace-xi.vercel.app/login">
  <img src="https://img.shields.io/badge/🚀%20LIVE%20APPLICATION-OPEN%20NOW-4F46E5?style=for-the-badge" alt="Live Application">
</a>

</div>
