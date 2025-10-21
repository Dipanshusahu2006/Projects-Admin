import React, { useEffect, useState } from "react";
import '../../App.css';
import toast, { Toaster } from "react-hot-toast";
import { useNavigate, useParams } from "react-router-dom";
import { Helmet } from "react-helmet";

function UsersEdit() {
  const navigate =useNavigate()
  const {id} =useParams();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [number, setNumber] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("");

  useEffect(() => {
      const fetchUserData = async () => {
        const response = await fetch(`https://main-projectnode.vercel.app/user/Get/${id}`);
        const data = await response.json();
        const Usersdata = data?.Data || {};
        setName(Usersdata.username);
        setEmail(Usersdata.email);
        setPassword(Usersdata.password);
        setNumber(Usersdata.phone);
        setRole(Usersdata.role);
      };
      fetchUserData();
    }, [id]);
  

  async function Updateforms() {
    const EditUsers = {
      username: name.trim() || name,
      email: email.trim() || email,
      password: password.trim() || password,
      phone: number.trim() ||  number,
      role: role,
    };

    try {
      const Useredit = await fetch(`https://main-projectnode.vercel.app/user/Edit/${id}`, {
        method: "PUT",
        body: JSON.stringify(EditUsers),
        headers: {
          "Content-Type": "application/json"
        }
      });

      if (Useredit.ok) {
        toast.success("User updated successfully");
        setTimeout(() => {
           navigate("/");
         }, 2000);
      } else {
        toast.error("Error updating user");
      }
    } catch (error) {
      toast.error("Please try again");
    }
  }

  return (
    <>   <Helmet>
        <title>Users-EDit Page</title>
    </Helmet>
      <Toaster />
      <div className="Useredit">
        <h1>Users update forms</h1>
        <div className="update">
          <label>Name</label>
          <input
            placeholder="Enter your name"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <br /><br />

          <label>Email</label>
          <input
            placeholder="Enter your email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <br /><br />

          <label>Number</label>
          <input
            placeholder="Enter your number"
            type="number"
            value={number}
            onChange={(e) => setNumber(e.target.value)}
          />
          <br /><br />

          <label>Password</label>
          <input
            placeholder="Enter your password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <br /><br />

          <label>Role</label>
          <select
            value={role}
            onChange={(e) => setRole(e.target.value)}
          >
            <option disabled value="">Select your Role</option>
            <option>Users</option>
            <option>SubAdmin</option>
          </select>

          <br /><br />
          <button onClick={Updateforms}>Update</button>
        </div>
      </div>
    </>
  );
}

export default UsersEdit;
