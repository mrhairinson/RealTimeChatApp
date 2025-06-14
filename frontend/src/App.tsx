import { Routes, Route, Navigate } from "react-router-dom";
import { Navbar } from "./components/Navbar";
import { HomePage } from "./pages/HomePage";
import { SignUpPage } from "./pages/SignUpPage";
import { SignInPage } from "./pages/SignInPage";
import { SettingPage } from "./pages/SettingPage";
import { ProfilePage } from "./pages/ProfilePage";
import { useAuth } from "./store/useAuth";
import { useEffect } from "react";
import { Loader } from "lucide-react";
import { Toaster } from "react-hot-toast";
import { useTheme } from "./store/useTheme";

const App = () => {
  const { authUser, checkAuth, isCheckingAuth } = useAuth();
  const { theme } = useTheme();
  useEffect(() => {
    checkAuth();
  }, [checkAuth]);
  if (isCheckingAuth && !authUser) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Loader className="size-10 animate-spin" />
      </div>
    );
  }
  return (
    <div data-theme={theme}>
      <Navbar />
      <Routes>
        <Route
          path="/"
          element={authUser ? <HomePage /> : <Navigate to="/signin" />}
        />
        <Route
          path="/signup"
          element={!authUser ? <SignUpPage /> : <Navigate to="/" />}
        />
        {/* SignUpPage is for new users to register */}
        <Route
          path="/signin"
          element={!authUser ? <SignInPage /> : <Navigate to="/" />}
        />
        {/* SignInPage is for existing users to login */}
        <Route path="/settings" element={<SettingPage />} />
        <Route
          path="/profile"
          element={authUser ? <ProfilePage /> : <Navigate to="/signin" />}
        />
      </Routes>
      <Toaster />
    </div>
  );
};

export default App;
