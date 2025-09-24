import { FileHeart, LayoutDashboard, Settings2, Siren } from "lucide-react";
import SubdirectoryArrowRightIcon from '@mui/icons-material/SubdirectoryArrowRight';
import MedicalInformationTwoToneIcon from '@mui/icons-material/MedicalInformationTwoTone';
import HealthAndSafetyTwoToneIcon from '@mui/icons-material/HealthAndSafetyTwoTone';
import VpnKeyTwoToneIcon from '@mui/icons-material/VpnKeyTwoTone';
import RouteTwoToneIcon from '@mui/icons-material/RouteTwoTone';
import ApartmentIcon from '@mui/icons-material/Apartment';
import PhotoCameraIcon from '@mui/icons-material/PhotoCamera';
import DatasetTwoToneIcon from '@mui/icons-material/DatasetTwoTone';
import DepartureBoardTwoToneIcon from '@mui/icons-material/DepartureBoardTwoTone';
import LocalShippingTwoToneIcon from '@mui/icons-material/LocalShippingTwoTone';
import BoyTwoToneIcon from '@mui/icons-material/BoyTwoTone';
import LocalGasStationTwoToneIcon from '@mui/icons-material/LocalGasStationTwoTone';
import PaletteTwoToneIcon from '@mui/icons-material/PaletteTwoTone';
import VerifiedUserTwoToneIcon from '@mui/icons-material/VerifiedUserTwoTone';
import MapsHomeWorkTwoToneIcon from '@mui/icons-material/MapsHomeWorkTwoTone';
import FactoryTwoToneIcon from '@mui/icons-material/FactoryTwoTone';
import MedicalServicesTwoToneIcon from '@mui/icons-material/MedicalServicesTwoTone';
import EditNoteTwoToneIcon from '@mui/icons-material/EditNoteTwoTone';
import HelpCenterTwoToneIcon from '@mui/icons-material/HelpCenterTwoTone';
import LocationCityTwoToneIcon from '@mui/icons-material/LocationCityTwoTone';
const useAdminSidebarLinks = (role) => {
    // Links for Service Manager
    const serviceManagerLinks = [
        { id: "1", icon: <LayoutDashboard />, label: "Dashboard", link: "/dashboard", dock: true },
        { id: "2", icon: <HealthAndSafetyTwoToneIcon />, label: "Command Center", link: "/dashboard/command-center", dock: true },
        {
            id: "3", icon: <MedicalInformationTwoToneIcon />, label: "Fleet Management", link: "/dashboard/fleet-management", dock: false, subList: [
                { id: "3-1", icon: <MedicalInformationTwoToneIcon />, path: "/dashboard/fleet-management/driver", title: "Driver Dashboard" },
                { id: "3-2", icon: <MedicalServicesTwoToneIcon />, path: "/dashboard/fleet-management/vehicle", title: "Vehicle Dashboard" },
            ]
        },
        { id: "4", icon: <DepartureBoardTwoToneIcon />, label: "Duty Allocation", link: "/dashboard/duty-allocation", dock: true },
        { id: "5", icon: <Siren />, label: "Incident Master", link: "/dashboard/incident-master", dock: true },
    ];

    // Links for Super Admin
    const superAdminLinks = [
        {
            id: "1",
            icon: <Settings2 />,
            label: "Configuration",
            link: "/admin/configuration",
            dock: false,
            subList: [
                { id: "1-1", icon: <VerifiedUserTwoToneIcon />, path: "/admin/configuration/role-master", title: "Role Master" },
                { id: "1-2", icon: <MapsHomeWorkTwoToneIcon />, path: "/admin/configuration/station-master", title: "Station Type Master" },
                { id: "1-3", icon: <SubdirectoryArrowRightIcon />, path: "/admin/configuration/asset-type-master", title: "Asset Type Master" },
                { id: "1-4", icon: <FactoryTwoToneIcon />, path: "/admin/configuration/manufacturer-master", title: "Manufacturer Master" },
                { id: "1-5", icon: <SubdirectoryArrowRightIcon />, path: "/admin/configuration/vehicle-model-master", title: "Vehicle Model Master" },
                { id: "1-6", icon: <LocalGasStationTwoToneIcon />, path: "/admin/configuration/fuel-type-master", title: "Fuel Type Master" },
                { id: "1-7", icon: <SubdirectoryArrowRightIcon />, path: "/admin/configuration/department-master", title: "Department Master" },
                { id: "1-8", icon: <SubdirectoryArrowRightIcon />, path: "/admin/configuration/designation-master", title: "Designation Master" },
                { id: "1-9", icon: <PaletteTwoToneIcon />, path: "/admin/configuration/color-master", title: "Color Master" },
                { id: "1-10", icon: <SubdirectoryArrowRightIcon />, path: "/admin/configuration/incident-type", title: "Incident Type" },
                { id: "1-11", icon: <SubdirectoryArrowRightIcon />, path: "/admin/configuration/violation-type", title: "Violation Type" },
                { id: "1-12", icon: <SubdirectoryArrowRightIcon />, path: "/admin/configuration/cause-of-accident", title: "Cause of Accident" },
                { id: "1-13", icon: <FileHeart />, path: "/admin/configuration/health-profiling-group", title: "Health Profiling Group" },
                { id: "1-14", icon: <MedicalServicesTwoToneIcon />, path: "/admin/configuration/medical-speciality", title: "Medical Speciality" },
                { id: "1-15", icon: <HelpCenterTwoToneIcon />, path: "/admin/configuration/question-type", title: "Question Type" },
                { id: "1-16", icon: <EditNoteTwoToneIcon />, path: "/admin/configuration/input-type", title: "Input Type" },
                { id: "1-17", icon: <SubdirectoryArrowRightIcon />, path: "/admin/configuration/investigation-type", title: "Investigation Type" },
                { id: "1-18", icon: <SubdirectoryArrowRightIcon />, path: "/admin/configuration/investigation-master", title: "Investigation Master" },
                { id: "1-19", icon: <SubdirectoryArrowRightIcon />, path: "/admin/configuration/abnormality-master", title: "Abnormality Master" },
                { id: "1-20", icon: <LocationCityTwoToneIcon />, path: "/admin/configuration/state-master", title: "State Master" },
                { id: "1-21", icon: <LocationCityTwoToneIcon />, path: "/admin/configuration/city-master", title: "City Master" },
            ],
        },
        { id: "2", icon: <ApartmentIcon />, label: "Station Master", link: "/admin/station-master", dock: true },
        {
            id: "3",
            icon: <DatasetTwoToneIcon />,
            label: "Asset Master",
            link: "/admin/asset-master",
            dock: false,
            subList: [
                { id: "3-1", icon: <BoyTwoToneIcon />, path: "/admin/asset-master/individual", title: "Individual" },
                { id: "3-2", icon: <LocalShippingTwoToneIcon />, path: "/admin/asset-master/vehicle", title: "Vehicle" },
            ],
        },
        { id: "4", icon: <RouteTwoToneIcon />, label: "Route Master", link: "/admin/route-master", dock: true },
        { id: "5", icon: <VpnKeyTwoToneIcon />, label: "Login Master", link: "/admin/login-master", dock: true },
        { id: "6", icon: <PhotoCameraIcon />, label: "Dash Cam Allocation", link: "/admin/dash-cam-allocation", dock: true },
        { id: "7", icon: <MedicalInformationTwoToneIcon />, label: "Health Profiling Questions", link: "/admin/health-profiling-questions", dock: true },
        { id: "8", icon: <HealthAndSafetyTwoToneIcon />, label: "Health Profiling User Response", link: "/admin/health-profiling-user-response", dock: true },
    ];

    if (role === "Service Manager") {
        return serviceManagerLinks;
    }
    if (role === "Super Admin") {
        return superAdminLinks;
    }
    return [];

};

export default useAdminSidebarLinks;
