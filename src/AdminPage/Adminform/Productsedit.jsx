import React, { useEffect, useState } from "react";
import '../../App.css';
import toast, { Toaster } from "react-hot-toast";
import { useNavigate, useParams } from "react-router-dom";
import { Helmet } from "react-helmet";

function ProductEdIt() {
  
  const navigate = useNavigate()
  const [productName, setProductName] = useState("");
  const {ProductName} = useParams();
  const [productDescription, setProductDescription] = useState("");
  const [productPrice, setProductPrice] = useState("");
  const [productImage, setProductImage] = useState("");
  const [productCategory, setProductCategory] = useState("");
  const [productBrand, setProductBrand] = useState("");

  useEffect(() => {
    const fetchProductsdata = async () => {
      const response = await fetch(`https://main-projectnode.vercel.app/product/Get/${ProductName}`);
      const data = await response.json();
      const ProductData = data?.Data || {};
      setProductName(ProductData.ProductName);
      setProductDescription(ProductData.ProductDescription);
      setProductPrice(ProductData.ProductPrice);
      setProductImage(ProductData.ProductImage);
      setProductCategory(ProductData.ProductCategory);
      setProductBrand(ProductData.ProductBrand);
    };
    fetchProductsdata();
  }, [ProductName]);

  const ShopEDit = (e) => {
    e.preventDefault();
    ProducTsEdits()
  };


     async function ProducTsEdits() {
    const prducts = {
      ProductName: productName.trim() || productName,
      ProductDescription: productDescription.trim() || productDescription,
      ProductPrice: productPrice,
      ProductImage: productImage.trim() || productImage,
      ProductCategory: productCategory.trim() || productCategory,
      ProductBrand: productBrand.trim() || productBrand
    }
    try {
      const ProdusEdit = await fetch(`https://main-projectnode.vercel.app/product/Edit/${ProductName}`, {
        method: "PUt",
        body: JSON.stringify(prducts),
        headers: {
          "Content-Type": "application/json"
        }
      });
      if (ProdusEdit.ok) {
        toast.success("Products EDit succesfully");
        setTimeout(() => {
          navigate("/");
        }, 2000);
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
        <title>Produts-Edit Page</title>
    </Helmet>
    <Toaster/>
    <div className="form">
      <label htmlFor="product-name">Product Name:</label>
      <input
        type="text"
        name="product-name"
        value={productName}
        onChange={(e) => {
          setProductName(e.target.value);
        }}
        required
      />
    
      <label htmlFor="product-description">Product Description:</label>
      <textarea
        id="product-description"
        name="product-description"
        value={productDescription}
        onChange={(e) => {
          setProductDescription(e.target.value);
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
      <label htmlFor="product-brand">Product Quantity :</label>
      <input
        type="text"
        id="product-brand"
        name="product-brand"
        value={productBrand}
        onChange={(e) => {
          setProductBrand(e.target.value);
        }}
        required
      />
      <button
        id="btn1"
        type="submit"
        onClick={ShopEDit}
      >
        Submit
      </button>
    </div>
    </>
  );
}

export default ProductEdIt