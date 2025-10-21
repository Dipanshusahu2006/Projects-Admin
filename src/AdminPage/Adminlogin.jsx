import React, { useEffect, useState } from "react";
import '../App.css';
import { FaUser, FaLock, FaFacebookF, FaTwitter, FaGoogle } from "react-icons/fa";
import toast, { Toaster } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet";

function Adminlogin(){
   
       const navigate =useNavigate()
       
     const [username, setUsername] = useState("");
     const [password, setPassword] = useState("");
     const [loginurl, setLoginurl] = useState([]);
   
        
     
     async function AdminLogins() {
       const AdminLogin = await fetch("https://main-projectnode.vercel.app/admin/Get")
       const Adminssmain =await AdminLogin.json()
       setLoginurl(Adminssmain.Data || [])
       
     }
     useEffect(()=>{
      AdminLogins()
     },[])
   
     const AdminsLogin = (event) => {
       event.preventDefault();
        AdminLogins()
       const Adminuser = loginurl.find(
         (User) => User.Username === username && User.Userpassword === password
       );
       if (Adminuser) {
        if(Adminuser.role === "Admin"){
          toast.success("Admin login successfully");
         localStorage.setItem("Id1", Adminuser._id);
         setTimeout(() => {
           navigate("/");
         }, 2000);
        }
         if(Adminuser.role === "Subadmin"){
          toast.success("Subadmin login successfully");
         localStorage.setItem("Id2", Adminuser._id);
         setTimeout(() => {
           navigate("/Subadmin");
         }, 2000);
         }
       } else {
         alert("Invalid username or password");
       }
     };
   
return(

  
    <>
     <Helmet>
        <title>Admin-login Page</title>
    </Helmet>
    <Toaster/>
     <div className="login-page">
      <div className="login-box">
        <h2>Subadmin/Admin Login</h2>
         <form onSubmit={AdminsLogin}>
        <div className="input-box">
          <FaUser className="icon" />
          <input type="text" placeholder="Type your username"  value={username}
            onChange={(e) => setUsername(e.target.value)}
            required />
        </div>

        <div className="input-box">
          <FaLock className="icon" />
          <input type="password" placeholder="Type your password" value={password}
            onChange={(e) => setPassword(e.target.value)}
            required />
        </div>

        <div className="forgot">Forgot password?</div>

        <button className="login-btn" type="submit">LOGIN</button>
        </form>
        <p className="or">Or Sign Up Using</p>

        <div className="social-icons">
          <FaFacebookF className="facebook" />
          <FaTwitter className="twitter" />
          <FaGoogle className="google" />
        </div>

        <p className="signup-text">Have not account yet?</p>
        <button className="signup-link">Contact Admin</button>

      </div>
    </div>
    </>
)
}
export default Adminlogin
