
import React, { useState } from "react";
import '../../App.css';
import toast, { Toaster } from "react-hot-toast";

function ProductForm() {
  const [productName, setProductName] = useState("");
  const [productPrice, setProductPrice] = useState("");
  const [productImage, setProductImage] = useState("");
  const [productCategory, setProductCategory] = useState("");
  const [productQuantity, setProductQuantity] = useState("");

  const Productshop = async (e) => {
    e.preventDefault();

    const Productsdata = await fetch("https://main-projectnode.vercel.app/product/Get");
        const Productsurl = await Productsdata.json();
        const Productadd = Productsurl.Data || [];
        const Filterproducts = Productadd.find(
          (products) => products.ProductName ===productName || products.ProductCategory === productCategory 
        );
        if (Filterproducts) {
          toast.error("Already Products add this is name and category ");
        } else {
          Productforms();
        }
  };

  async function Productforms() {
    const products = {
      "ProductName": productName,
      "ProductPrice": productPrice,
      "ProductImage": productImage,
      "ProductCategory": productCategory,
      "ProductQuantity": 1,
    };
    try {
      const productAdds = await fetch("https://main-projectnode.vercel.app/product/Post", {
        method: "POST",
        body: JSON.stringify(products),
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (productAdds.ok) {
        toast.success("Product added successfully");
      } else {
        toast.error("Error adding product");
      }
    } catch (error) {
      toast.error("Please try again");
    }
  }

  return (
    <>
    <Toaster/>
    <div className="Productform">
      <label htmlFor="product-name">Product Name:</label>
      <input
        type="text"
        id="product-name"
        name="product-name"
        value={productName}
        onChange={(e) => {
          setProductName(e.target.value);
        }}
        required
      />
      <label htmlFor="product-price">Product Price:</label>
      <input
        type="number"
        id="product-price"
        name="product-price"
        value={productPrice}
        onChange={(e) => {
          setProductPrice(e.target.value);
        }}
        required
      />
      <label htmlFor="product-image">Product Image:</label>
      <input
        type="text"
        id="product-image"
        name="product-image"
        value={productImage}
        onChange={(e) => {
          setProductImage(e.target.value);
        }}
        required
      />
      <label htmlFor="product-category">Product Category:</label>
      <input
        type="text"
        id="product-category"
        name="product-category"
        value={productCategory}
        onChange={(e) => {
          setProductCategory(e.target.value);
        }}
        required
      />
      <label htmlFor="product-quantity">Product Quantity:</label>
      <input
        type="text"
        id="product-quantity"
        name="product-quantity"
        value={productQuantity}
        onChange={(e) => {
          setProductQuantity(e.target.value);
        }}
        required
      />
      <button id="btn1" type="submit" onClick={Productshop}>
        Submit
      </button>
    </div>
    </>
  );
}

export default ProductForm;