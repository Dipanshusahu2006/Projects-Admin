import React, { useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";
import '../../App.css';
import { Helmet } from "react-helmet";


function Adminsignup(){

  const Navigate = useNavigate()
const [username, setUsername] = useState("");
  const [useremail, setUseremail] = useState("");
  const [userpassword, setUserpassword] = useState("");
  const [usernumber, setUsernumber] = useState("");
   const [userRole, setUserrole] = useState("");
  

  const AdminSubmit = async (e) => {
    e.preventDefault();
    const Adminsdata = await fetch("https://main-projectnode.vercel.app/admin/Get");
        const Adminsurl = await Adminsdata.json();
        const Adminsmain = Adminsurl.Data || [];
        const FilterAdmin = Adminsmain.find(
          (Admin) => Admin.Username === username || Admin.UserEmail === useremail || Admin.Usernumber === usernumber
        );
        if (FilterAdmin) {
          toast.error("Already user login in this name or email or phone number");
        } else {
          Adminsignup();
        }
  }

  async function Adminsignup() {
    const AdminData = {
      Username: username,
      UserEmail: useremail,
      Userpassword: userpassword,
      Usernumber: usernumber,
      role: userRole
    };
    

    try {
      const response = await fetch("https://main-projectnode.vercel.app/admin/Post", {
        method: "POST",
        body: JSON.stringify(AdminData),
        headers: {
          "Content-Type": "application/json"
        }
      });

      if (response.ok) {
        toast.success("User signup successfully");
        setTimeout(()=>{
         Navigate("/AdminLogin")
        },3000)
      } else {
        toast.error("Error signing up");
      }
    } catch (error) {
      toast.error("Please try again");
    }
  }

  return (

    <>
     <Helmet>
        <title>Admin-signup Page</title>
    </Helmet>
      <Toaster />
      <div className="signup-wrapper">
        <div className="signup-card">
          <h2>Admin Sign Up</h2>
          <form className="signup-form" onSubmit={AdminSubmit}>
            <input value={username} type="text" placeholder="Full Name" onChange={(e) => setUsername(e.target.value)} required />
            <input value={useremail} type="email" placeholder="Email Address" onChange={(e) => setUseremail(e.target.value)} required />
            <input value={userpassword} type="password" placeholder="Password" onChange={(e) => setUserpassword(e.target.value)} required />
            <input value={usernumber} type="number" placeholder="enter your mobile number" onChange={(e) => setUsernumber(e.target.value)} required />
            <select value={userRole} onChange={(e) => setUserrole(e.target.value)}>
       <option value="" disabled className="optione1">Enter your role</option>
      <option value="Admin">Admin</option>
      <option value="Subadmin">Subadmin</option>
    </select>
            <button type="submit">Create Account</button>
          </form>
          <p className="bottom-text">Already have an account? <Link to="/AdminLogin">Login</Link></p>
        </div>
      </div>
    </>
)

}
export default Adminsignup