import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { WelcomePage } from "./pages/Welcome.page";
import { LoginPage } from "./pages/Login.page";
import { SignupPage } from "./pages/Signup.page";
import { ViewContentPage } from "./pages/secure/ViewContent.page";
import { SummaryPage } from "./pages/secure/SummaryPage";
import { ProfilePage } from "./pages/secure/ProfilePage";
import { Conversations } from "./pages/secure/Conversations";
import { BestpracticePage } from "./pages/secure/Bestpractice.page";
import DashboardLayout from "./components/Dashboardlayout";
import { UsersPage } from "./pages/secure/users.page";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<WelcomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/dashboard" element={<DashboardLayout />}>
          <Route index element={<SummaryPage />} />
          <Route
            path="/dashboard/conversation"
            element={<ViewContentPage />}
          ></Route>
          <Route
            path="/dashboard/conversation/:id"
            element={<Conversations />}
          />
          <Route path="/dashboard/profile" element={<ProfilePage />} />
          <Route
            path="/dashboard/best-practices"
            element={<BestpracticePage />}
          />
          <Route path="/dashboard/users" element={<UsersPage />} />
        </Route>
      </Routes>
      <ToastContainer />
    </Router>
  );
}

export default App;
