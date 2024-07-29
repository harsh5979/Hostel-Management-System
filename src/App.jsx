import { useState, lazy, Suspense, useEffect } from "react";
import "./App.css";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";

import Home from "./pages/Home";
import AdminDashboard from "./pages/AdminDashboad";
import AdminHome from "./pages/AdminHome";
import Loader from "./Components/Loader";
import MainLoader from "./Components/MainLoader";
import Sidebar from "./Components/Sidebar";
import AddStudent from "./pages/AddStudent";
import LoginPage from "./pages/AdminLoginPage";
import LogoutPage from "./pages/Logout";
import Footer from "./Components/Footer";
import AddMonthlyFees from "./pages/AddMonthlyFees";
import ErrorPage from "./pages/Error";
import Navbar from "./Components/Navbar";
import Protected from "./pages/Protected";
import StudentLogin from "./pages/StudentLoginPage";
import StudentHome from "./pages/StudentHome";
import { useAuth } from "./context/contextapi";
import StudentDashboard from "./pages/StudentDashboard";

const ViewStudent = lazy(() => import("./Components/ViewStudent"));

function App() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 800);

    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return <MainLoader />;
  }

  return (
    <BrowserRouter>
      <MainContent />
    </BrowserRouter>
  );
}

function MainContent() {
  const location = useLocation();
  const { user } = useAuth();

  const showSidebar = location.pathname.startsWith("/admin/") && user?.isadmin;

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <div className="flex flex-1">
        {showSidebar && <Sidebar />}
        <Suspense fallback={<Loader />}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/admin/home" element={<AdminHome />} />
            <Route path="/adminlogin" element={<LoginPage />} />
            <Route path="/studentlogin" element={<StudentLogin />} />
            <Route path="/student/home" element={<Protected element={<StudentHome />} />} />
            <Route path="/student/dashboard" element={<Protected element={<StudentDashboard />} />} />
            <Route path="/logout" element={<LogoutPage />} />
            <Route path="/admin/dashboard" element={<Protected element={<AdminDashboard />} adminOnly={true} />} />
            <Route path="/admin/addstudent" element={<Protected element={<AddStudent />} adminOnly={true} />} />
            <Route path="/admin/add-monthly-fees" element={<Protected element={<AddMonthlyFees />} adminOnly={true} />} />
            <Route path="/admin/view-student/:id" element={<Protected element={<ViewStudent />} adminOnly={true} />} />
            <Route path="*" element={<ErrorPage />} />
          </Routes>
        </Suspense>
      </div>
      <Footer />
    </div>
  );
}

export default App;
