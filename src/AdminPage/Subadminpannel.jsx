import React, { useEffect, useState } from "react";
import "../App.css";
import SubAdminhaeder from "./Admincomponent/Subadminheader";
import { useNavigate } from "react-router-dom";
import Productstable from "./Admincomponent/producttable";
import Dashboard from "./Admincomponent/Dashborad";
import { Helmet } from "react-helmet";
import Enqirylist from "./Admincomponent/Enquirytable";
import Ordertable from "./Admincomponent/Ordertable";

function SubadminPannel({ Subadminid }) {
  const navigate = useNavigate();
  const [activeMenu, setActiveMenu] = useState("dashboard");

  // Logout
  const SubadminLogout = () => {
    localStorage.removeItem("Id2");
    navigate("/AdminLogin");
  };

  // Redirect if not logged in
  useEffect(() => {
    if (!Subadminid) {
      navigate("/AdminLogin");
    }
  }, [Subadminid, navigate]);

  const Imgges = {
    Img: "https://themewagon.github.io/DashboardKit/assets/logo-B3nv2ngr.svg",
  };

  const menuItems = [
    { key: "dashboard", label: "Dashboard", icon: "fa-gauge", component: <Dashboard /> },
    { key: "products", label: "ProductTable", icon: "fa-bag-shopping", component: <Productstable /> },
    { key: "enquiry", label: "Enquiries", icon: "fa-comment", component: <Enqirylist /> },
    { key: "order", label: "Order", icon: "fa-box-open", component: <Ordertable /> },
  ];

  return (
    <>
      <Helmet>
        <title>Subadmin Panel</title>
      </Helmet>
      <div className="AdminProjects">
        {/* Sidebar */}
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
            <li onClick={SubadminLogout}>
              <i className="fa-solid fa-arrow-right-from-bracket"></i> Logout
            </li>
          </ul>
        </div>

        {/* Main Content */}
        <div className="admintable">
          <SubAdminhaeder />
          <div className="dash">
            {menuItems.find((item) => item.key === activeMenu)?.component}
          </div>
        </div>
      </div>
    </>
  );
}

export default SubadminPannel;
