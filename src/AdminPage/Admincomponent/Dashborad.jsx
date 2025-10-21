import React, { useEffect, useState } from "react";
import '../../App.css';
import BarChart from "../Chart/Barchart";
import PieChartCard from "../Chart/Piechart";


function Dashboard() {

   const [Usernumber, setUsernumber] = useState({});
    const [Adminsnumber, setAdminsnumber] = useState({});
    const [products, setproduct] = useState({});
    const [orders, setorders] = useState({});

   async function USersnumber() {
  const profilenumber = await fetch("https://main-projectnode.vercel.app/user/Get");
  const profilelist = await profilenumber.json();
  setUsernumber(profilelist.Data || []);
}

      async function Productss () {
        const  Productsnumber = await fetch("https://main-projectnode.vercel.app/product/Get")
        const Producttmes = await Productsnumber .json();
        setproduct(Producttmes.Data || [])
      }
       async function Admin () {
        const Adminnumber = await fetch("https://main-projectnode.vercel.app/admin/Get")
        const Adminitmes = await Adminnumber.json();
        setAdminsnumber(Adminitmes.Data || [])
      }
       async function Orderss () {
        const Ordernumber = await fetch("https://main-projectnode.vercel.app/order/Get")
        const Orderitmes = await Ordernumber .json();
        setorders(Orderitmes.Data || [])
      }

      useEffect(()=>{
        USersnumber()
        Productss()
        Admin()
        Orderss()
      },[])


  return (
    <div className="dashboard">
      <div className="top-cards">
        <div className="card">
          <p className="subtitle">{Usernumber.length} </p>
          <p className="title"> Total Users</p>
        </div>
        <div className="card highlight">
          <p className="subtitle">{Adminsnumber.length}</p>
          <p className="title green">Toal Admin</p>
        </div>
        <div className="card">
          <p className="subtitle">{products.length}</p>
          <p className="title">Total products</p>
        </div>
        <div className="card">
          <p className="subtitle">{orders.length}</p>
          <p className="title red"> Total order</p>
        </div>
      </div>

      <div className="middle-section">
        <div className="bar-chart card"><PieChartCard/></div>
        <div className="line-chart card"><BarChart/></div>
      </div>

      <div className="bottom-section">
        <div className="doughnut-card">
          <p className="percentage">42%</p>
          <button>Class Aptent</button>
        </div>

        <div className="list-card">
          <ul>
            <li>Men's wear <span>872</span></li>
            <li>Display Electronics <span>650</span></li>
            <li>Electronic products <span>400</span></li>
            <li>Cameras <span>323</span></li>
            <li>Shoes <span>332</span></li>
          </ul>
        </div>

        <div className="progress-section card">
          <div className="bar-group">
            <p>Men's wear</p>
            <div className="bar green" style={{ width: "90%" }}></div>
          </div>
          <div className="bar-group">
            <p>Display Electronics</p>
            <div className="bar red" style={{ width: "60%" }}></div>
          </div>
          <div className="bar-group">
            <p>Electronic products</p>
            <div className="bar yellow" style={{ width: "70%" }}></div>
          </div>
        </div>

        <div className="text-content card">
          <p className="subtitle">Nunc Leo Tortor</p>
          <p>
            Donec orci nulla, lobortis non nisi quis, convallis venenatis sapien.
            Pellentesque habitant morbi tristique senectus et netus et malesuada fames.
          </p>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
