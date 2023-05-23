import "../layout.css";
import { Link, useLocation, useNavigate } from "react-router-dom";
import React, { useState } from "react";
import { useSelector } from "react-redux";

function Layout({ children }) {
  const [collapsed, setCollapsed] = useState(false);
  const { user } = useSelector((state) => state.user);
  const location = useLocation();
  const navigate = useNavigate();
  const userMenu = [
    {
      name: "Home",
      path: "/",
      icon: "ri-home-heart-line",
    },

    {
      name: "Appointments",
      path: "/appointments",
      icon: "ri-file-list-line",
    },

    {
      name: "Apply Doctor",
      path: "/apply-doctor",
      icon: "ri-hospital-line",
    },

    {
      name: "Profile",
      path: "/profile",
      icon: "ri-user-3-line",
    },
  ];

  const adminMenu = [
    {
      name: "Home",
      path: "/",
      icon: "ri-home-heart-line",
    },

    {
      name: "Users",
      path: "/users",
      icon: "ri-user-line",
    },

    {
      name: "Doctors",
      path: "/doctors",
      icon: "ri-user-heart-line",
    },

    {
      name: "Profile",
      path: "/profile",
      icon: "ri-user-3-line",
    },
  ];

  const menuToBeRendered = user?.isAdmin ? adminMenu : userMenu;

  return (
    <div className="main">
      <div className="d-flex layout">
        <div className="sidebar">
          <div className="sidebar-header">
            <h1 className="logo">SH</h1>
          </div>
          <div className="menu">
            {menuToBeRendered.map((menu) => {
              const isActive = location.pathname === menu.path;
              return (
                <div
                  className={`d-flex menu-item ${
                    isActive && "active-menu-item"
                  }`}
                >
                  <i className={menu.icon}></i>
                  {!collapsed && <Link to={menu.path}>{menu.name}</Link>}
                </div>
              );
            })}

            <div
              className={`d-flex menu-item`} onClick={()=>{
                localStorage.clear()
                navigate('/login')
              }}
            >
              <i className='ri-logout-circle-line'></i>
              {!collapsed && <Link to='/login'>Logout</Link>}
            </div>
          </div>
        </div>

        <div className="content">
          <div className="header align-items-center">
            {collapsed ? (
              <i
                className="ri-menu-line header-action-icon"
                onClick={() => setCollapsed(false)}
              ></i>
            ) : (
              <i
                className="ri-close-fill header-action-icon"
                onClick={() => setCollapsed(true)}
              ></i>
            )}

            <div className="d-flex align-items-center px-4">
              <i class="ri-notification-2-fill header-action-icon px-2"></i>
              <Link className="anchor" to="/profile">
                {user?.name}
              </Link>
            </div>
          </div>

          <div className="body">
            <h2>homepage</h2>
            {children}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Layout;
