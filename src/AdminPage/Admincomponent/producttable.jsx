import React, { useEffect, useState } from "react";
import '../../App.css';
import { Link } from "react-router-dom";
import toast from "react-hot-toast";

function Productstable() {
  const [Productslist, setProductslist] = useState([]);

  const FethProducts = async () => {
    try {
      const productsData = await fetch("https://main-projectnode.vercel.app/product/Get");
      const prductssUrl = await productsData.json();
      setProductslist(prductssUrl.Data || []);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    FethProducts();
  }, []);


  const Deletesproducts = async (id) => {
    try{
       const DeleteItems = await fetch(`https://main-projectnode.vercel.app/product/Delete/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json"
        }
      })
      setProductslist( Productslist.filter((Products)=>Products._id  !== id ) );
       
      if (DeleteItems.ok) {
        toast.success("Products Delete  successfully");
      } else {
        toast.error("Error  up");
      }
      
    } catch (error) {
      toast.error("Please try again");
    }
  }
    
  

  return (
    <>
      <div className="Productstable">
        <button className="Productsbuttone"><Link to={"/ProductsForm"}>Add to new Products</Link></button>
        <div className="Products">
           <h1>Product list</h1>
          <div className="ProductsList">
          <table>
            <thead>
              <tr>
             <th>Sr no.</th>
             <th>Product id</th>
             <th>productname</th>
             <th>Product Image</th>
             <th>Product Price</th>
             <th>Product Category</th>
             <th>Product Quantity</th>
             <th>Edit</th>
             <th>Delete</th>
            </tr>
            </thead>
            <tbody>
              {Productslist.map((Products, index) => {
                return (
                  <tr key={index}>
                    <td>{index + 1}</td>
                   <td>{Products.id}</td>  
                        <td>{Products.ProductName}</td>  
                        <td><img src={Products.ProductImage} alt="" /></td>  
                        <td>${Products.ProductPrice}</td>  
                        <td>{Products.ProductCategory}</td> 
                        <td>{Products.ProductQuantity}</td>   
                    <td>
                      <button onClick={() =>Deletesproducts(Products._id)} className="Deletebuttone" >Delete</button>
                    </td>
                    <td>
                       <button  className="Editbuttone"><Link to={`/ProductEdit/${Products.ProductName}`}>Edit</Link></button>
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

export default  Productstable;
