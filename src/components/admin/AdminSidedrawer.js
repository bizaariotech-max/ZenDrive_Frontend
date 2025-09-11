import * as React from "react";
import {
    Box,
    Drawer,
    List,
    Divider,
    ListItem,
    ListItemButton,
    ListItemText,
    Collapse,
    Button,
} from "@mui/material";
import { ExpandLess, ExpandMore } from "@mui/icons-material";
import { NavLink, useLocation } from "react-router-dom";
import useAdminSidebarLinks from "../../hooks/admin/useAdminSidebarLinks";

const AdminSidedrawer = ({ show, toggleShow }) => {
    const link = useAdminSidebarLinks();
    const [openMenu, setOpenMenu] = React.useState(null);
    const { pathname } = useLocation();

    const handleClick = (id) => {
        setOpenMenu(openMenu === id ? null : id);
    };

    const DrawerList = (
        <Box
            className="bg-background pt-8 text-white h-full overflow-auto"
            sx={{ width: 250 }}
            role="presentation"
        >
            <List>
                {link.map((item) => (
                    <React.Fragment key={item?.id}>
                        {/* Top level item */}
                        <ListItem disablePadding>
                            <NavLink
                                to={item.link}
                                onClick={() =>
                                    item?.subList ? handleClick(item.id) : toggleShow(false)
                                }
                                className={`w-full flex items-center transition-all duration-300 ease-in rounded 
                  hover:bg-primary hover:text-white
                  ${pathname === item.link ? "bg-primary text-white" : "text-primary"}`}
                            >
                                <ListItemButton>
                                    <span className="me-2">{item?.icon} </span>
                                    <ListItemText primary={item?.label} />
                                    {item?.subList &&
                                        (openMenu === item.id ? (
                                            <ExpandLess />
                                        ) : (
                                            <ExpandMore />
                                        ))}
                                </ListItemButton>
                            </NavLink>
                        </ListItem>

                        {/* Submenu */}
                        {item?.subList && (
                            <Collapse in={openMenu === item.id} timeout="auto" unmountOnExit>
                                <List component="div" disablePadding>
                                    {item.subList.map((child) => (
                                        <ListItem key={child.id} disablePadding className="pl-8">
                                            <NavLink
                                                to={child.path}
                                                onClick={() => toggleShow(false)}
                                                className={`w-full flex items-center transition-all duration-300 ease-in rounded 
                          hover:bg-secondary
                          ${pathname === child.path ? "bg-primary text-white" : "text-primary"}`}
                                            >
                                                <ListItemButton>
                                                    <span className="me-2">{child.icon}</span>
                                                    <ListItemText primary={child.title} />
                                                </ListItemButton>
                                            </NavLink>
                                        </ListItem>
                                    ))}
                                </List>
                            </Collapse>
                        )}
                    </React.Fragment>
                ))}
            </List>
            <Divider />
            <div className="p-4 mt-4 text-center">
                <Button
                    variant="contained"
                    sx={{
                        backgroundColor: "var(--primary)",
                        color: "white",
                        "&:hover": {
                            backgroundColor: "transparent",
                            color: "var(--primary)",
                            border: "1px solid var(--primary)"
                        },
                    }}
                    className="w-full transition-all duration-300  ease-in"
                >
                    Logout
                </Button>

            </div>
        </Box>
    );

    return (
        <Drawer open={show} onClose={() => toggleShow(false)} >
            {DrawerList}
        </Drawer>
    );
};

export default AdminSidedrawer;
