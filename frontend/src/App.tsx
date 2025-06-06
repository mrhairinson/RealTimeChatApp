import { Routes, Route } from "react-router-dom";
import { Navbar } from "./components/Navbar";
import { HomePage } from "./pages/HomePage";
import { SignUpPage } from "./pages/SignUpPage";
import { SignInPage } from "./pages/SignInPage";
import { SettingPage } from "./pages/SettingPage";
import { ProfilePage } from "./pages/ProfilePage";
import { useAuth } from "./store/useAuth";
import { useEffect } from "react";

const App = () => {
  const {authUser, checkAuth} = useAuth();
  useEffect(() => {
    checkAuth()
  }, [checkAuth]);
  console.log(authUser)
  return (
    <div>
      <Navbar/>
      <Routes>
        <Route path="/" element={<HomePage/>}/>
        <Route path="/signup" element={<SignUpPage/>}/>
        <Route path="/signin" element={<SignInPage/>}/>
        <Route path="/settings" element={<SettingPage/>}/>
        <Route path="/profile" element={<ProfilePage/>}/>
      </Routes>
    </div>
  );
};

export default App;
