import React from 'react';
import './App.css';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import AdminPannel from './AdminPage/Adminpannel';
import SubadminPannel from './AdminPage/Subadminpannel';
import Adminsignup from './AdminPage/Adminform/Adminadd';
import Adminlogin from './AdminPage/Adminlogin';
import AdminEdit from './AdminPage/Adminform/AdminEdit';
import UsersEdit from './AdminPage/Adminform/UsersEdit';
import ProductEdIt from './AdminPage/Adminform/Productsedit';
import ProductForm from './AdminPage/Adminform/Productsadd';
import BarChart from './AdminPage/Chart/Barchart';
import PieChartCard from './AdminPage/Chart/Piechart';
import Adminreply from './AdminPage/Adminform/Enquaryreply';

function App() {
  const id1 = localStorage.getItem("Id1");
   const id2 = localStorage.getItem("Id2");

  return (
   <BrowserRouter>
   <Routes>
    <Route path="/" element={<AdminPannel Adminid={id1} />} />
     <Route path="/Subadmin" element={<SubadminPannel Subadminid={id2} />} />
     <Route path="/AdminSignup" element={<Adminsignup />} />
     <Route path="/AdminLogin" element={<Adminlogin Adminid={id1} />} />
      <Route path="/AdminEdit/:id" element={<AdminEdit />} />
       <Route path="/UsersEdit/:id" element={<UsersEdit />} />
       <Route path="/ProductEdit/:ProductName" element={<ProductEdIt />} />
      <Route path="/ProductsForm" element={<ProductForm />} />
         <Route path="/Barchart" element={<BarChart />} />
          <Route path="/PieChart" element={< PieChartCard/>} />
           <Route path="/Enquiry-reply/:id" element={<Adminreply />} />

   </Routes>
   </BrowserRouter>
  );
}

export default App;
