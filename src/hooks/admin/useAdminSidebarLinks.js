import { LayoutDashboard, Settings2 } from "lucide-react";
import SubdirectoryArrowRightIcon from '@mui/icons-material/SubdirectoryArrowRight';
import MedicalInformationTwoToneIcon from '@mui/icons-material/MedicalInformationTwoTone';
import HealthAndSafetyTwoToneIcon from '@mui/icons-material/HealthAndSafetyTwoTone';
import VpnKeyTwoToneIcon from '@mui/icons-material/VpnKeyTwoTone';
import RouteTwoToneIcon from '@mui/icons-material/RouteTwoTone';
const useAdminSidebarLinks = () => {
    const links = [
        { id: 1, icon: <LayoutDashboard />, label: "Dashboard", link: "/admin", dock: true },
        {
            id: 2,
            icon: <Settings2 />,
            label: "Configuration",
            link: "/admin/configuration",
            dock: false,
            subList: [
                { id: "2-1", icon: <SubdirectoryArrowRightIcon />, path: "/admin/configuration/role-master", title: "Role Master" },
                { id: "2-2", icon: <SubdirectoryArrowRightIcon />, path: "/admin/configuration/manufacturer-master", title: "Manufacturer Master" },
                { id: "2-3", icon: <SubdirectoryArrowRightIcon />, path: "/admin/configuration/vehicle-model-master", title: "Vehicle Model Master" },
                { id: "2-4", icon: <SubdirectoryArrowRightIcon />, path: "/admin/configuration/fuel-type-master", title: "Fuel Type Master" },
                { id: "2-5", icon: <SubdirectoryArrowRightIcon />, path: "/admin/configuration/department-master", title: "Department Master" },
                { id: "2-6", icon: <SubdirectoryArrowRightIcon />, path: "/admin/configuration/designation-master", title: "Designation Master" },
                { id: "2-7", icon: <SubdirectoryArrowRightIcon />, path: "/admin/configuration/color-master", title: "Color Master" },
                { id: "2-8", icon: <SubdirectoryArrowRightIcon />, path: "/admin/configuration/incident-type", title: "Incident Type" },
                { id: "2-9", icon: <SubdirectoryArrowRightIcon />, path: "/admin/configuration/violation-type", title: "Violation Type" },
                { id: "2-10", icon: <SubdirectoryArrowRightIcon />, path: "/admin/configuration/cause-of-accident", title: "Cause of Accident" },
                { id: "2-11", icon: <SubdirectoryArrowRightIcon />, path: "/admin/configuration/health-profiling-group", title: "Health Profiling Group" },
                { id: "2-12", icon: <SubdirectoryArrowRightIcon />, path: "/admin/configuration/medical-speciality", title: "Medical Speciality" },
                { id: "2-13", icon: <SubdirectoryArrowRightIcon />, path: "/admin/configuration/question-type", title: "Question Type" },
                { id: "2-14", icon: <SubdirectoryArrowRightIcon />, path: "/admin/configuration/input-type", title: "Input Type" },
                { id: "2-15", icon: <SubdirectoryArrowRightIcon />, path: "/admin/configuration/investigation-type", title: "Investigation Type" },
                { id: "2-16", icon: <SubdirectoryArrowRightIcon />, path: "/admin/configuration/abnormality-master", title: "Abnormality Master" },
                { id: "2-17", icon: <SubdirectoryArrowRightIcon />, path: "/admin/configuration/state-master", title: "State Master" },
                { id: "2-18", icon: <SubdirectoryArrowRightIcon />, path: "/admin/configuration/city-master", title: "City Master" },
            ],
        },
        { id: 3, icon: <LayoutDashboard />, label: "Station Master", link: "/admin/station-master", dock: true },
        { id: 4, icon: <RouteTwoToneIcon />, label: "Route Master", link: "/admin/route-master", dock: true },
        { id: 5, icon: <LayoutDashboard />, label: "Duty Allocation", link: "/admin/duty-allocation", dock: true },
        { id: 6, icon: <LayoutDashboard />, label: "Asset Master", link: "/admin/asset-master", dock: true },
        { id: 7, icon: <VpnKeyTwoToneIcon />, label: "Login Master", link: "/admin/login-master", dock: true },
        { id: 8, icon: <LayoutDashboard />, label: "Dash Cam Allocation", link: "/admin/dash-cam-allocation", dock: true },
        { id: 9, icon: <LayoutDashboard />, label: "Incident Master", link: "/admin/incident-master", dock: true },
        { id: 10, icon: <MedicalInformationTwoToneIcon />, label: "Health Profiling Questions", link: "/admin/health-profiling-questions", dock: true },
        { id: 11, icon: <HealthAndSafetyTwoToneIcon />, label: "Health Profiling User Response", link: "/admin/health-profiling-user-response", dock: true },
    ];

    return links;
};

export default useAdminSidebarLinks;
