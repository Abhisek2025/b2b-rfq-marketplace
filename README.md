# B2B RFQ Marketplace

A full-stack B2B Request for Quotation (RFQ) Marketplace that connects Buyers with Suppliers.

Buyers can create and manage product/service requirements and receive quotations from Suppliers. Suppliers can browse available RFQs and submit competitive quotations.

## Features

### Buyer

- Register as Buyer
- Secure login
- JWT authentication
- Create RFQ
- Edit RFQ
- Delete RFQ
- View own RFQs
- View RFQ details
- View quotations received from Suppliers
- Responsive dashboard

### Supplier

- Register as Supplier
- Secure login
- JWT authentication
- Browse available RFQs
- View complete RFQ details
- Submit quotation
- Add quotation price
- Add estimated delivery time
- Add message/notes
- View submitted quotations
- Responsive dashboard

### Security

- JWT based authentication
- Role Based Access Control
- Password hashing using bcrypt
- Request validation
- Protected API routes
- CORS configuration
- Helmet security middleware
- Environment variables for sensitive configuration
- Secure error handling

---

# Tech Stack

## Frontend

- React.js
- Vite
- Tailwind CSS
- React Router DOM
- Axios
- React Hot Toast
- Lucide React

## Backend

- Node.js
- Express.js
- Sequelize
- MySQL
- JSON Web Token
- bcryptjs
- express-validator
- Helmet
- CORS
- dotenv

---

# Project Structure

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
