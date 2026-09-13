import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Login.jsx";
import Register from "./pages/Register.jsx";
import BuyerDashboard from "./pages/BuyerDashboard.jsx";
import CreateRFQ from "./pages/CreateRFQ.jsx";
import SupplierDashboard from "./pages/SupplierDashboard.jsx";
import SupplierRFQDetails from "./pages/SupplierRFQDetails.jsx";
import ProtectedRoute from "./components/ProtectedRoute.jsx";
import BuyerRFQDetails from "./pages/BuyerRFQDetails.jsx";
import MyQuotations from "./pages/MyQuotations.jsx";
import EditRFQ from "./pages/EditRFQ.jsx";
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />

        <Route path="/login" element={<Login />} />

        <Route path="/register" element={<Register />} />

        <Route
          path="/buyer"
          element={
            <ProtectedRoute role="BUYER">
              <BuyerDashboard />
            </ProtectedRoute>
          }
        />

        <Route
          path="/buyer/rfqs/create"
          element={
            <ProtectedRoute role="BUYER">
              <CreateRFQ />
            </ProtectedRoute>
          }
        />

        <Route
          path="/supplier"
          element={
            <ProtectedRoute role="SUPPLIER">
              <SupplierDashboard />
            </ProtectedRoute>
          }
        />

        <Route
          path="/supplier/rfqs/:id"
          element={
            <ProtectedRoute role="SUPPLIER">
              <SupplierRFQDetails />
            </ProtectedRoute>
          }
        />

        <Route
          path="/buyer/rfqs/:id/edit"
          element={
            <ProtectedRoute role="BUYER">
              <EditRFQ />
            </ProtectedRoute>
          }
        />

        <Route
          path="/buyer/rfqs/:id"
          element={
            <ProtectedRoute role="BUYER">
              <BuyerRFQDetails />
            </ProtectedRoute>
          }
        />
        <Route
          path="/supplier/quotations"
          element={
            <ProtectedRoute role="SUPPLIER">
              <MyQuotations />
            </ProtectedRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
