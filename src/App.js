import { Link, Route, Routes } from "react-router-dom";
import AdminRoutes from "./routes/AdminRoutes";
import Errorpage from "./pages/admin/ErrorPage";
function App() {
  return (
    <Routes>
      <Route path="/" element={<Link to="/admin">Go to Admin</Link>} />

      {/* Admin Dashboard */}
      <Route path="/admin/*" element={<AdminRoutes />} />
      <Route path="*" element={<Errorpage />} />

    </Routes>
  );
}

export default App;
