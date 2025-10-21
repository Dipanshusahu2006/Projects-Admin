import React, { useEffect, useState } from "react";
import '../../App.css';
import { Link } from "react-router-dom";
import toast from "react-hot-toast";

function Userlist() {
  const [Usertable, setUsertable] = useState([]);

  const Fethuser = async () => {
    try {
      const UserData = await fetch("https://main-projectnode.vercel.app/user/Get");
      const UserssUrl = await  UserData .json();
      setUsertable(UserssUrl.Data || []);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
     Fethuser()
  }, []);

  const Deleteusers = async (id) => {
    try{
       const DeletUsers = await fetch(`https://main-projectnode.vercel.app/user/Delete/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json"
        }
      })
       setUsertable( Usertable.filter((Users)=>Users._id  !== id ) );
       
      if (DeletUsers.ok) {
        toast.success("User Delete successfully");
      } else {
        toast.error("Error  up");
      }
      
    } catch (error) {
      toast.error("Please try again");
    }
  }
    
  

  return (
    <>
    <div className="usertable">
      <h1>Users List</h1>
      <div className="Userlist">
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
              {Usertable.map((Users, index) => {
                return (
                  <tr key={index}>
                    <td>{index + 1}</td>
                    <td>{Users.username}</td>
                    <td>{Users.id}</td>
                    <td>{Users.email}</td>
                    <td>{Users.phone}</td>
                    <td>{Users.role}</td>
                    <td>
                      <button onClick={() => Deleteusers(Users._id)} className="Deletebuttone"  >Delete</button>
                    </td>
                    <td>
                      <button  className="Editbuttone"><Link to={`/UsersEdit/${Users._id}`}>Edit</Link></button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
        </div>
    </>
  );
}

export default Userlist;
