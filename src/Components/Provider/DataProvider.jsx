import React, { createContext, useEffect, useRef, useState } from 'react';
export const contextProvider = createContext();

const DataProvider = ({ children }) => {
   //loading state
   const [loading, setLoading] = useState(true);

   // navdata
   const navData = [
      { id: 1, title: "Home" },
      {
         id: 2, title: "Attar",
         submenu: [
            { name: "Combo & Gifts" },
            { name: "Wholesale Attar" }
         ]
      },
      {
         id: 3, title: "Men’s Clothing",
         submenu: [
            { name: "T-shirt" },
            { name: "Trousers" },
            { name: "Denim pants" },
            { name: "Combo packs" }
         ]
      },
      {
         id: 4, title: "Panjabi",
         submenu: [
            { name: "Platinum China Bamsilk" },
            { name: "Premium Chikankar" },
            { name: "Cotton Panjabi" }
         ]
      },
      {
         id: 5, title: "Winter 2024",
         submenu: [
            { name: "Hooded Jacket" },
            { name: "Double Part Jacket" },
            { name: "Shawl" },
            { name: "Sneakers" }
         ]
      },
      {
         id: 6, title: "Foods",
         submenu: [
            { name: "Dates" },
            { name: "Honey" }
         ]
      },
      {
         id: 7, title: "Others",
         submenu: [
            { name: "Capes and Headwear" },
            { name: "Dawah Canvas" }
         ]
      }
   ];

   //prduct cetegories
   const productCategories = [
      { id: "M1", category: "Men", sub_category: ["panjabi", "shirt", "t-shirt", "pajamas", "trousers", "jeans pant", " joggers", "keds", "formal shoes"] },
      { id: "W1", category: "Women", sub_category: ["three-piece", "one-piece", "lehenga", "shorts", "mexi", "jeans", "t-shirt"] },
      { id: "K1", category: "Kids", sub_category: ["t-shirts", "shirt", "sweaters", "hoodies", "Keds"] },
      { id: "F1", category: "Foods", sub_category: ["sub-category-1", "sub-category-2", "sub-category-3", "sub-category-4", "sub-category-5"] },
      { id: "M25", category: "Men's 25", sub_category: ["sub-category-1", "sub-category-2", "sub-category-3", "sub-category-4", "sub-category-5"] },
      { id: "W25", category: "Wemen's 25", sub_category: ["sub-category-1", "sub-category-2", "sub-category-3", "sub-category-4", "sub-category-5"] }
   ];
   // product display img
   const displayImg = [
      "https://i.postimg.cc/D08m8kCv/b-1.jpg",
      "https://i.postimg.cc/c4PT1dDJ/b-2.jpg",
      "https://i.postimg.cc/HLg25B1D/b-3.jpg",
      "https://i.postimg.cc/MpR5vg4m/b-4.jpg",
   ]
   //load products data 
   const [products, setProducts] = useState([]);
   useEffect(() => {
      const fetchProducts = async () => {
         try {
            setLoading(true);
            const response = await fetch("/product.json");
            const data = await response.json();
            setProducts(data)
         } catch (err) {
            console.log(err)
         } finally {
            setLoading(false)
         }
      }
      fetchProducts();
   }, [])

   // modal smooth closing functions
   const dialogColsingRef = useRef(null);
   const closeModal = () => {
      if (dialogColsingRef.current) {
         dialogColsingRef.current.close();
      }
   }

   const handleSubmenuClick = () => {
      setTimeout(() => {
         closeModal();
      }, 300);
   };

   const handleMenuClick = (hasSubmenu) => {
      if (!hasSubmenu) {
         setTimeout(() => {
            closeModal();
         }, 500);
      }
   };

   // Provided data
   const data = {
      navData,
      productCategories,
      products,
      displayImg,
      loading,
      setLoading,
      handleSubmenuClick,
      handleMenuClick,
      dialogColsingRef
   };

   return (
      <contextProvider.Provider value={data}>
         {children}
      </contextProvider.Provider>
   );
};

export default DataProvider;
