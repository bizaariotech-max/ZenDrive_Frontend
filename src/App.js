import { Link, Route, Routes } from "react-router-dom";
import AdminRoutes from "./routes/AdminRoutes";
import Errorpage from "./pages/admin/ErrorPage";
import LoginSignup from "./pages/admin/LoginSignup";
function App() {
  return (
    <Routes>
      <Route path="/" element={<LoginSignup />} />

      {/* Admin Dashboard */}
      <Route path="/admin/*" element={<AdminRoutes />} />
      <Route path="*" element={<Errorpage />} />

    </Routes>
  );
}

export default App;
