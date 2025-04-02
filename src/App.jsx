import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { WelcomePage } from "./pages/Welcome.page";
import { LoginPage } from "./pages/Login.page";
import { SignupPage } from "./pages/Signup.page";
import DashboardLayout from "./components/Dashboardlayout";
import { ViewContentPage } from "./pages/secure/ViewContent.page";
import { SummaryPage } from "./pages/secure/SummaryPage";
import { ProfilePage } from "./pages/secure/ProfilePage";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<WelcomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/dashboard" element={<DashboardLayout />}>
          <Route index element={<SummaryPage />} />
          <Route path="/dashboard/conversation" element={<ViewContentPage />} />
          <Route path="/dashboard/profile" element={<ProfilePage />} />
        </Route>
      </Routes>
      <ToastContainer />
    </Router>
  );
}

export default App;
