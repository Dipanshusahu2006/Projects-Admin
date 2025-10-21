import React, { useEffect, useState } from "react";
import Dashboard from "./Admincomponent/Dashborad";
import "../App.css";
import { useNavigate } from "react-router-dom";
import AdminHeader from "./Admincomponent/Adminheader";
import Admintable from "./Admincomponent/Admintable";
import Userlist from "./Admincomponent/Usertable";
import Productstable from "./Admincomponent/producttable";
import { Helmet } from "react-helmet";
import Enqirylist from "./Admincomponent/Enquirytable";
import Ordertable from "./Admincomponent/Ordertable";

function AdminPannel({ Adminid }) {
  const navigate = useNavigate();

  const [activeMenu, setActiveMenu] = useState("dashboard");

  const AdminLogout = () => {
    localStorage.removeItem("Id1");
    navigate("/AdminLogin");
  };

  // Redirect if admin not logged in
  useEffect(() => {
    if (!Adminid) {
      navigate("/AdminLogin");
    }
  }, [Adminid, navigate]);

  const Imgges = {
    Img: "https://themewagon.github.io/DashboardKit/assets/logo-B3nv2ngr.svg",
  };

  const menuItems = [
    { key: "dashboard", label: "Dashboard", icon: "fa-gauge", component: <Dashboard /> },
    { key: "admin", label: "Admintable", icon: "fa-user-tie", component: <Admintable /> },
    { key: "user", label: "Usertable", icon: "fa-users", component: <Userlist /> },
    { key: "products", label: "ProductTable", icon: "fa-bag-shopping", component: <Productstable /> },
    { key: "enquiry", label: "Enquiries", icon: "fa-comment", component: <Enqirylist /> },
    { key: "order", label: "Order", icon: "fa-box-open", component: <Ordertable /> },
  ];

  return (
    <>
      <Helmet>
        <title>Admin Panel</title>
      </Helmet>
      <div className="AdminProjects">
        <div className="AdminMenu">
          <h1>
            <img src={Imgges.Img} alt="Logo" />
          </h1>
          <ul>
            {menuItems.map((item) => (
              <li
                key={item.key}
                style={{
                  background:
                    activeMenu === item.key
                      ? "rgba(255, 255, 255, 0.2)"
                      : "linear-gradient(to right, #0F2027, #2C5364)",
                }}
                onClick={() => setActiveMenu(item.key)}
              >
                <i className={`fa-solid ${item.icon}`}></i> {item.label}
              </li>
            ))}
            <li onClick={AdminLogout}>
              <i className="fa-solid fa-arrow-right-from-bracket"></i> Logout
            </li>
          </ul>
        </div>

        <div className="admintable">
          <AdminHeader />
          <div className="dash">
            {menuItems.find((item) => item.key === activeMenu)?.component}
          </div>
        </div>
      </div>
    </>
  );
}

export default AdminPannel;
