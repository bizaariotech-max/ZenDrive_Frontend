import {  Route, Routes } from "react-router-dom";
import AdminRoutes from "./routes/AdminRoutes";
import Errorpage from "./pages/admin/ErrorPage";
import UserRoutes from "./routes/UserRoutes";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
function App() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      
      {/* Admin Dashboard */}
      <Route path="/admin/*" element={<AdminRoutes />} />
      <Route path="/dashboard/*" element={<UserRoutes />} />
      <Route path="*" element={<Errorpage />} />

    </Routes>
  );
}

export default App;
