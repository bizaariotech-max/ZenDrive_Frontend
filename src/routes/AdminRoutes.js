import { Route, Routes } from "react-router-dom";
import AdminLayout from "../layouts/AdminLayout";
import AdminConfigOutlet from "../pages/admin/configrations/AdminConfigOutlet";
import RoleMaster from "../pages/admin/configrations/RoleMaster";
import Home from "../pages/admin/Home";
import ErrorPage from "../pages/admin/ErrorPage";
import ManufactureMaster from "../pages/admin/configrations/ManufactureMaster";
import VehicalModelMaster from "../pages/admin/configrations/VehicalModelMaster";
import FuelTypeMaster from "../pages/admin/configrations/FuelTypeMaster";
import DepartmentMaster from "../pages/admin/configrations/DepartmentMaster";
import DesignationMaster from "../pages/admin/configrations/DesignationMaster";
import ColorMaster from "../pages/admin/configrations/ColorMaster";
import IncidentMaster from "../pages/admin/configrations/IncidentMaster";
import ViolationMaster from "../pages/admin/configrations/ViolationMaster";
import CauseAccidentMaster from "../pages/admin/configrations/CauseAccidentMaster";
import HealthProfilingMaster from "../pages/admin/configrations/HealthProfilingMaster";
import MedicalSpecialityMaster from "../pages/admin/configrations/MedicalSpecialityMaster";
import QuestionTypeMaster from "../pages/admin/configrations/QuestionTypeMaster";
import InputTypeMaster from "../pages/admin/configrations/InputTypeMaster";
import InvestigationTypeMaster from "../pages/admin/configrations/InvestigationTypeMaster";
import AbnormalityMaster from "../pages/admin/configrations/AbnormalityMaster";
import StateMaster from "../pages/admin/configrations/StateMaster";
import CityMaster from "../pages/admin/configrations/CityMaster";
import HealthProfileQuestion from "../pages/admin/healthProfile/HealthProfileQuestion";

const AdminRoutes = () => (
  <Routes>
    <Route path="/" element={<AdminLayout />}>
      <Route index element={<Home />} />
      <Route path="configuration" element={<AdminConfigOutlet />}>
        <Route path="role-master" element={<RoleMaster />} />
        <Route path="manufacturer-master" element={<ManufactureMaster />} />
        <Route path="vehicle-model-master" element={<VehicalModelMaster />} />
        <Route path="fuel-type-master" element={<FuelTypeMaster />} />
        <Route path="department-master" element={<DepartmentMaster />} />
        <Route path="designation-master" element={<DesignationMaster />} />
        <Route path="color-master" element={<ColorMaster />} />
        <Route path="incident-type" element={<IncidentMaster />} />
        <Route path="violation-type" element={<ViolationMaster />} />
        <Route path="cause-of-accident" element={<CauseAccidentMaster />} />
        <Route path="health-profiling-group" element={<HealthProfilingMaster />} />
        <Route path="medical-speciality" element={<MedicalSpecialityMaster />} />
        <Route path="question-type" element={<QuestionTypeMaster />} />
        <Route path="input-type" element={<InputTypeMaster />} />
        <Route path="investigation-type" element={<InvestigationTypeMaster />} />
        <Route path="abnormality-master" element={<AbnormalityMaster />} />
        <Route path="state-master" element={<StateMaster />} />
        <Route path="city-master" element={<CityMaster />} />
        {/* Catch-all inside configuration */}
        <Route path="*" element={<ErrorPage />} />
      </Route>
      <Route path="health-profiling-questions" element={<HealthProfileQuestion />} />

      {/* Catch-all inside admin */}
      <Route path="*" element={<ErrorPage />} />
    </Route>
  </Routes>
);

export default AdminRoutes;
