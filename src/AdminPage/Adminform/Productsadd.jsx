
import React, { useEffect, useState } from "react";
import '../../App.css';
import toast, { Toaster } from "react-hot-toast";

function ProductForm() {
  const [productName, setProductName] = useState("");
  const [productPrice, setProductPrice] = useState("");
  const [productImage, setProductImage] = useState("");
  const [productCategory, setProductCategory] = useState("");
  const [categories, setCategories] = useState([]);
  const [showCategoryInput, setShowCategoryInput] = useState(false);
  const [productQuantity, setProductQuantity] = useState("");
   const [productDescriptione, setproductDescriptione] = useState("");
    const [productbrand, setproductbrand] = useState("");

       const productAddscategriros = () => {
  setShowCategoryInput(true);
};

const productclosecategriros = () => {
  setShowCategoryInput(false);
};

     useEffect(() => {
   const fetchCategories = async () => {
    try {
      const response = await fetch(
        "https://main-projectnode.vercel.app/product/Get"
      );

      const data = await response.json();
      setCategories(data.Data || []);
    } catch (error) {
      console.log(error);
    }
  };

  fetchCategories();
  }, []);

  const uniqueCategories = [
  ...new Set(categories.map((item) => item.ProductCategory))
       ];

  const Productshop = async (e) => {
    e.preventDefault();

    const Filterproducts = categories.find(
  (products) =>
    products.ProductName.toLowerCase() ===
    productName.toLowerCase()
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
      "ProductQuantity": productQuantity,
      "ProductDescription" : productDescriptione,
      "ProductBrand" : productbrand
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

      setProductName("");
     setProductPrice("");
     setProductImage("");
    setProductCategory("");
    setProductQuantity("");
    setproductDescriptione("");
      setproductbrand("");
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

      <select className="product-select"
     value={productCategory}
      onChange={(e) => setProductCategory(e.target.value)}
       >
  <option value="">Select Category</option>

  {uniqueCategories.map((productoption, index) => (
    <option key={index} value={productoption.ProductCategory} >
      {productoption}
    </option>
  ))}
  
</select>

        <label htmlFor="product-category">Product Descriptione:</label>
      <input
        type="text"
        id="product-category"
        name="product-category"
        value={productDescriptione}
        onChange={(e) => {
          setproductDescriptione(e.target.value);
        }}
        required
      />

      <label htmlFor="product-category">Product Brand:</label>
      <input
        type="text"
        id="product-category"
        name="product-category"
        value={productbrand}
        onChange={(e) => {
          setproductbrand(e.target.value);
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
       {!showCategoryInput ? (
  <button
    type="button"
    className="add-category-btn"
    onClick={productAddscategriros}
  >
    Add New Category
  </button>
) : (
  <button
    type="button"
    className="add-category-btn"
    onClick={productclosecategriros}
  >
    Close Category
  </button>
)}
      {showCategoryInput && (
        
   <input
    type="text"
    className="product-select"
    placeholder="Enter New Category"
    value={productCategory}
    onChange={(e) =>
      setProductCategory(e.target.value)
    }
  />
)}
      <button id="btn1" type="submit" onClick={Productshop}>
        Submit
      </button>
    </div>
    </>
  );
}

export default ProductForm;