
import React, { useEffect, useState } from "react";
import '../../App.css';
import { Link } from "react-router-dom";
import toast from "react-hot-toast";

function Admintable() {
  const [Adminlist, setAdmintable] = useState([]);

  const Fethadmiun = async () => {
    try {
      const AdminData = await fetch("https://main-projectnode.vercel.app/admin/Get");
      const AdminsUrl = await AdminData.json();
      setAdmintable(AdminsUrl.Data || []);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    Fethadmiun();
  }, []);


  const Deleteusers = async (id) => {
    try{
       const DeleteAdmin = await fetch(`https://main-projectnode.vercel.app/admin/Delete/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json"
        }
      })
       setAdmintable( Admintable.filter((Adminss)=>Adminss.id  !== id ) );
       
      if (DeleteAdmin.ok) {
        toast.success("Admin delete successfully");
      } else {
        toast.error("Error  up");
      }
      
    } catch (error) {
      toast.error("Please try again");
    }
  }
    
  

  return (
    <>
      <div className="admintable">
        <button className="Adminbuttone"><Link to={"/AdminSignup"}>Add to new users</Link></button>
        <div className="Admillist">
          <h1>Admin List</h1>
        <div className="tables">
          <table>
            <thead>
              <tr>
                <th>sr no.</th>
                <th>Username</th>
                <th>Userid</th>
                <th>Useremail</th>
                <th>Usernumber</th>
                <th>Userole</th>
                <th>Delete</th>
                <th>Edit</th>
              </tr>
            </thead>
            <tbody>
              {Adminlist.map((Admins, index) => {
                return (
                  <tr key={index}>
                    <td>{index + 1}</td>
                    <td>{Admins.Username}</td>
                    <td>{Admins.id}</td>
                    <td>{Admins.UserEmail}</td>
                    <td>{Admins.Usernumber}</td>
                    <td>{Admins.role}</td>
                    <td>
                      <button onClick={() => Deleteusers(Admins._id)} className="Deletebuttone" >Delete</button>
                    </td>
                    <td>
                      <button className="Editbuttone"><Link to={`/AdminEdit/${Admins._id}`}>Edit</Link>

</button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
      </div>
    </>
  );
}

export default Admintable;

