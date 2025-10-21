import React, { useState, useEffect } from "react";
import '../../App.css';
import { Link } from "react-router-dom";

function SubAdminhaeder() {
  const Id2 = localStorage.getItem("Id2");
  const [buttne1, setbuttne1] = useState({ display: "block" });
  const [buttne2, setbuttne2] = useState({ display: "none" });
  const [profiles, setprofile] = useState({ display: "none" });
  const [slicenurl, setslicenurl] = useState({});

   const [buttne3, setbuttne3] = useState({ display: "block" });
  const [buttne4, setbuttne4] = useState({ display: "none" });
  const [B0x, setB0x,] = useState({ display: "none" });  


  async function Subadminrofiles() {
    const Subadminame = await fetch(`https://main-projectnode.vercel.app/admin/Get/${Id2}`);
    const Subadminurl = await Subadminame .json();
    setslicenurl(Subadminurl?.Data || {});
  }

  useEffect(() => {
    Subadminrofiles();
  }, []);

  const Slicename = slicenurl.Username ? slicenurl.Username.slice(0, 1) : "";

  const Slice1 = () => {
    setbuttne1({ display: "none" });
    setbuttne2({ display: "block" });
    setprofile({ display: "block" });
  };

  const Slice2 = () => {
    setbuttne1({ display: "block" });
    setbuttne2({ display: "none" });
    setprofile({ display: "none" });
  };

     
      const Box1 = () => {
   setbuttne3({ display: "none" });
    setbuttne4({ display: "block" });
    setB0x({ display: "block" });
  };

  const Box2 = () => {
    setbuttne3({ display: "block" });
    setbuttne4({ display: "none" });
    setB0x({ display: "none" });
  };


  return (
    <>
      <div className="Subadminheader">
        <div className="level">
          <button className="buttone1"style={buttne3} onClick={Box1}>
            <i className="fa-solid fa-bars"></i>
          </button>
          <button className="buttone2" style={buttne4} onClick={Box2}>
            <i className="fa-solid fa-xmark"></i>
          </button>
        </div>
        <div className="Subadmins">
          <h1>SubAdminPannel</h1>
          </div>
          <div className="profile">
            <button className="buttone5" onClick={Slice1} style={buttne1}>
              {Slicename}
            </button>
            <button className="buttone6" onClick={Slice2} style={buttne2}>
              {Slicename}
            </button>
          </div>
        </div>
        <div className="box" style={B0x} >
        <ul>
           <li><Link to={"/"}>Home</Link></li>
           <li><Link to={"/"}>Admin</Link></li>
        </ul>
       </div>
        <div className="PROFILES" style={profiles}>
            <h2>{slicenurl.Username}</h2>
            <h3>{slicenurl.UserEmail}</h3>
            <h3>{slicenurl.Userpassword}</h3>
            <h3>{slicenurl.Usernumber}</h3>
            <h3>{slicenurl.role}</h3>
          </div>
        
    </>
  );
}

export default SubAdminhaeder;