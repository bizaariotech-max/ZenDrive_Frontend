import React, { useState } from "react";
import { Box, IconButton, Typography, Divider, Button } from "@mui/material";
import { Link, NavLink, useLocation } from "react-router-dom";
import { ChevronDown, ChevronUp, } from "lucide-react";
import MenuIcon from "@mui/icons-material/Menu";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import useAdminSidebarLinks from "../../hooks/admin/useAdminSidebarLinks";
import LogoutIcon from '@mui/icons-material/Logout';
const AdminSidebar = ({ show, toggleDrawer }) => {
  const links = useAdminSidebarLinks();
  const { pathname } = useLocation();
  const [openSubListId, setOpenSubListId] = useState(null);

  return (
    <aside>
      {/* Logo */}
      <div className="flex items-center justify-center py-14">
        <Typography variant="h5" className="font-bold my-4">
          {show ? "Zendrive Admin" : "ZA"}
        </Typography>
      </div>
      <IconButton
        className="relative top-2 left-2 text-primary hidden md:block"
        id="toggle-icon-style"
        color="inherit"
        aria-label="toggle sidebar"
        onClick={toggleDrawer}
        edge="start"
        sx={{ mr: 2, position: 'absolute', top: 8, left: show ? 200 : 30, transition: 'left 0.3s' }}
      >
        {show ? <ChevronLeftIcon className="text-primary" /> : <MenuIcon className="text-primary" />}
      </IconButton>

      {/* Sidebar links */}
      <nav className="flex-1 space-y-2 ">
        <Box className="">
          {links?.map((item) => (
            <React.Fragment key={item.id}>
              {item.dock ? (

                <Link
                  to={item.link}
                  onClick={() => setOpenSubListId(null)}
                  className={`flex items-center rounded-md text-primary px-2 py-2  mx-3 gap-3 mb-3 no-underline transition-all delay-100 duration-300 ease-in  hover:bg-primary hover:text-white ${!show ? "collapsed" : ""
                    } ${pathname === item.link ? "bg-primary text-white" : ""}`}
                >
                  <Box className={`flex items-center text-primary  hover:text-white gap-3 ${pathname === item.link ? "bg-primary text-white" : ""} `}>
                    <span className="text-lg">
                      {item.icon}
                    </span>
                    {show && (
                      <Typography variant="body1">
                        <span className={`transition-all duration-300`}>{item.label}</span>
                      </Typography>
                    )}
                  </Box>
                </Link>
              ) : (
                <>
                  <button
                    onClick={() =>
                      setOpenSubListId(
                        openSubListId === item.id ? null : item.id
                      )
                    }
                    className={`ms-3 text-primary no-underline py-2 px-2 mx-3 mb-2 gap-3 hover:bg-primary hover:text-white rounded-md transition-all delay-100 duration-300 ease-in-out  flex ${!show ? "collapsed" : ""
                      } ${pathname.startsWith(item.link) ? "bg-primary text-white" : ""}`}
                  >
                    <Box className={`flex items-center text-primary ${pathname.startsWith(item.link) ? "text-white" : ""} hover:text-white gap-3`}>
                      <span className="text-lg">
                        {item.icon}
                      </span>
                      {show && (
                        <Typography variant="body1" className="flex-1">
                          <span className={`text-primary ${pathname.startsWith(item.link) ? "text-white" : ""} hover:text-white transition-all duration-300 ${pathname === item.link ? "bg-primary text-white" : ""}`}>{item.label}</span>
                        </Typography>
                      )}
                      {show && (
                        <span className="ml-2">
                          {openSubListId === item.id ? (
                            <ChevronUp size={18} />
                          ) : (
                            <ChevronDown size={18} />
                          )}
                        </span>
                      )}
                    </Box>
                  </button>

                  {/* Sub menu */}
                  {show && openSubListId === item.id && (
                    <div className="h-64 max-h-64 py-4 overflow-y-auto hide-scrollbar bg-card rounded-md mx-3">
                      {item?.subList?.map((subItem) => (
                        <NavLink
                          key={subItem?.id}
                          to={subItem?.path}
                          onClick={() => setOpenSubListId(null)}
                          className={`mx-4 flex items-center rounded-md text-primary px-2 gap-3 mb-3 no-underline transition-all duration-300 ease-in hover:bg-primary hover:text-white ${pathname === subItem.path ? "bg-primary text-white" : ""
                            }`}
                        >
                          <Box className="sidebar-icon">
                            <span className="text-md">{subItem?.icon}</span>
                          </Box>
                          {show && (
                            <Typography variant="body2">
                              <span className="transition-all duration-300">{subItem?.title}</span>
                            </Typography>
                          )}
                        </NavLink>

                      ))}
                    </div>
                  )}

                </>
              )}
            </React.Fragment>
          ))}
        </Box>
      </nav>

      <Divider />
      <div className="p-4 text-center">
        {show ? <Button
          variant="contained"
          sx={{
            backgroundColor: "var(--primary)",
            color: "white",
            "&:hover": {
              backgroundColor: "transparent",
              color: "var(--primary)",
              border: "1px solid var(--primary)",
            },
          }}
          className="w-full transition-all duration-300  ease-in"
        >
          Logout
        </Button> : <IconButton
          className="text-primary transition-all duration-300 ease-in"
          aria-label="toggle sidebar"
          variant="contained"

          sx={{
            borderRadius: "4px",
            backgroundColor: "var(--primary)",
            color: "white",
            "&:hover": {
              backgroundColor: "transparent",
              color: "var(--primary)",
              border: "1px solid var(--primary)",
            },
          }}
        >
          <LogoutIcon sx />
        </IconButton>}

      </div>
    </aside>
  )
}

export default AdminSidebar
