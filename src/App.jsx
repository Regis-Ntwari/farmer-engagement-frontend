import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { WelcomePage } from "./pages/Welcome.page";
import { LoginPage } from "./pages/Login.page";
import { SignupPage } from "./pages/Signup.page";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<WelcomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/dashboard" element={<DashboardLayout />}>
          <Route index element={<DashboardPage />} />
          <Route path="users" element={<UsersPage />} />
          <Route path="products" element={<ProductsPage />} />
          <Route path="settings" element={<SettingsPage />} />
        </Route>
        <ToastContainer/>
      </Routes>
    </Router>
  );
}

export default App;
