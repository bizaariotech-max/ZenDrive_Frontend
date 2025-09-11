import { Route, Routes } from "react-router-dom";
import AdminLayout from "../layouts/AdminLayout";
import AdminConfigOutlet from "../pages/admin/configrations/AdminConfigOutlet";
import RoleMaster from "../pages/admin/configrations/RoleMaster";
import Home from "../pages/admin/Home";
import ErrorPage from "../pages/admin/ErrorPage";
import ManufactureMaster from "../pages/admin/configrations/ManufactureMaster";
import VehicalModelMaster from "../pages/admin/configrations/VehicalModelMaster";
import FuelTypeMaster from "../pages/admin/configrations/FuelTypeMaster";

const AdminRoutes = () => (
  <Routes>
    <Route path="/" element={<AdminLayout />}>
      <Route index element={<Home />} />
      <Route path="configuration" element={<AdminConfigOutlet />}>
        <Route path="role-master" element={<RoleMaster />} />
        <Route path="manufacturer-master" element={<ManufactureMaster />} />
        <Route path="vehicle-model-master" element={<VehicalModelMaster />} />
        <Route path="fuel-type-master" element={<FuelTypeMaster />} />
        {/* Catch-all inside configuration */}
        <Route path="*" element={<ErrorPage />} />
      </Route>

      {/* Catch-all inside admin */}
      <Route path="*" element={<ErrorPage />} />
    </Route>
  </Routes>
);

export default AdminRoutes;
