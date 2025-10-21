import React, { useState, useEffect } from "react";
import '../../App.css';
import toast, { Toaster } from "react-hot-toast";
import { useNavigate, useParams } from "react-router-dom";
import { Helmet } from "react-helmet";

function AdminEdit() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [username, setUsername] = useState("");
  const [useremail, setUseremail] = useState("");
  const [userpassword, setUserpassword] = useState("");
  const [usernumber, setUsernumber] = useState("");
  const [userRole, setUserrole] = useState("");

  useEffect(() => {
    const fetchAdminData = async () => {
      const response = await fetch(`https://main-projectnode.vercel.app/admin/Get/${id}`);
      const data = await response.json();
      const AdminData = data?.Data || {};
      setUsername(AdminData.Username);
      setUseremail(AdminData.UserEmail);
      setUserpassword(AdminData.Userpassword);
      setUsernumber(AdminData.Usernumber);
      setUserrole(AdminData.role);
    };
    fetchAdminData();
  }, [id]);

  const EditADmin = (e) => {
    e.preventDefault();
    AdminEdit();
  };

  async function AdminEdit() {
    const Editadmins = {
      Username: username.trim() || username,
      UserEmail: useremail.trim() || useremail,
      Userpassword: userpassword.trim() || userpassword,
      Usernumber: usernumber,
      role: userRole,
    };

    try {
      const response = await fetch(`https://main-projectnode.vercel.app/admin/Edit/${id}`, {
        method: "PUT",
        body: JSON.stringify( Editadmins),
        headers: {
          "Content-Type": "application/json"
        }
      });


      if (response.ok) {
        toast.success("Admin Edit successfully");
        setTimeout(() => {
           navigate("/");
         }, 2000);
      } else {
        toast.error("Error  up");
      }
    } catch (error) {
      toast.error("Please try again");
    }
  }

  return (

    <> 
     <Helmet>
        <title>Admin-Edit Page</title>
    </Helmet>
      <Toaster />
      <div className="signup-wrapper">
        <div className="signup-card">
          <h2>Admin Edit Form</h2>
          <form className="signup-form">
            <input value={username} type="text" placeholder="Full Name" onChange={(e) => setUsername(e.target.value)} required />
            <input value={useremail} type="email" placeholder="Email Address" onChange={(e) => setUseremail(e.target.value)} required />
            <input value={userpassword} type="password" placeholder="Password" onChange={(e) => setUserpassword(e.target.value)} required />
            <input value={usernumber} type="number" placeholder="enter your mobile number" onChange={(e) => setUsernumber(e.target.value)} required />
            <select value={userRole} onChange={(e) => setUserrole(e.target.value)}>
       <option value="" disabled className="optione1">Enter your role</option>
      <option value="Admin">Admin</option>
      <option value="Subadmin">Subadmin</option>
    </select>
            <button type="submit" onClick={EditADmin}>Create Account</button>
          </form>
          <p className="bottom-text">Already have an account?</p>
        </div>
      </div>
    </>
)

}
  export  default  AdminEdit
  