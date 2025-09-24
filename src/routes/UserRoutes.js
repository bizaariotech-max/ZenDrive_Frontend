import { Route, Routes } from "react-router-dom";
import AdminLayout from "../layouts/AdminLayout";
import Home from "../pages/admin/Home";
import ErrorPage from "../pages/admin/ErrorPage";
import DutyAllocation from "../pages/admin/dutyAllocation/DutyAllocation";
import IncidentMaster from "../pages/admin/incidentMaster/IncidentMaster";
import CommandCenter from "../pages/user/CommandCenter";
import DriverDash from "../pages/user/DriverDash";

const UserRoutes = () => (
  <Routes>
    <Route path="/" element={<AdminLayout />}>
      <Route index element={<Home />} />
      
      <Route path="command-center" element={<CommandCenter />} />
      <Route path="fleet-management/driver" element={<DriverDash />} />
      <Route path="duty-allocation" element={<DutyAllocation />} />
      <Route path="incident-master" element={<IncidentMaster />} />

      {/* Catch-all inside admin */}
      <Route path="*" element={<ErrorPage />} />
    </Route>
  </Routes>
);

export default UserRoutes;
