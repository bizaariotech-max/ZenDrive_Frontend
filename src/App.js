import { Route, Routes } from "react-router-dom";
import AdminRoutes from "./routes/AdminRoutes";
import Errorpage from "./pages/admin/ErrorPage";
import UserRoutes from "./routes/UserRoutes";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import WebsiteLayout from "./layouts/WebsiteLayout";
import WebsiteRoutes from "./routes/WebsiteRoutes";
function App() {
  return (
    <>
      <WebsiteLayout>
        <Routes>
          <Route path="/*" element={<WebsiteRoutes />} />
        </Routes>
      </WebsiteLayout>
      <Routes>


        {/* Admin Dashboard */}
        <Route path="/admin/*" element={<AdminRoutes />} />
        <Route path="/dashboard/*" element={<UserRoutes />} />
        {/* <Route path="*" element={<Errorpage />} /> */}

      </Routes>
    </>

  );
}

export default App;
