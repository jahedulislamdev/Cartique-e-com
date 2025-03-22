import React, { createContext, useEffect, useState } from 'react';
export const contextProvider = createContext();

const DataProvider = ({ children }) => {
   //loading state
   const [loading, setLoading] = useState(false);

   // navdata
   const navData = [
      { id: 1, title: "Home", direct_path: "/" },
      {
         id: 2, title: "Attar",
         submenu: [
            { name: "Combo & Gifts", path: "/attar/combo-gifts" },
            { name: "Wholesale Attar", path: "/attar/wholesale" }
         ]
      },
      {
         id: 3, title: "Men’s Clothing",
         submenu: [
            { name: "T-shirt", path: "/mens-clothing/tshirt" },
            { name: "Trousers", path: "/mens-clothing/trousers" },
            { name: "Denim pants", path: "/mens-clothing/denim-pants" },
            { name: "Combo packs", path: "/mens-clothing/combo-packs" }
         ]
      },
      {
         id: 4, title: "Panjabi",
         submenu: [
            { name: "Platinum China Bamsilk", path: "/panjabi/platinum-china-bamsilk" },
            { name: "Premium Chikankar", path: "/panjabi/premium-chikankar" },
            { name: "Cotton Panjabi", path: "/panjabi/cotton" }
         ]
      },
      {
         id: 5, title: "Winter 2024",
         submenu: [
            { name: "Hooded Jacket", path: "/winter-2024/hooded-jacket" },
            { name: "Double Part Jacket", path: "/winter-2024/double-part-jacket" },
            { name: "Shawl", path: "/winter-2024/shawl" },
            { name: "Sneakers", path: "/winter-2024/sneakers" }
         ]
      },
      {
         id: 6, title: "Foods",
         submenu: [
            { name: "Dates", path: "/foods/dates" },
            { name: "Honey", path: "/foods/honey" }
         ]
      },
      {
         id: 7, title: "Others",
         submenu: [
            { name: "Capes and Headwear", path: "/others/capes-headwear" },
            { name: "Dawah Canvas", path: "/others/dawah-canvas" }
         ]
      },
   ];

   //prduct cetegories
   const productCategories = [
      { id: 1, name: "T-shirt", path: "/category/tshirt" },
      { id: 2, name: "Attar", path: "/category/attar" },
      { id: 3, name: "Panjabi", path: "/category/panjabi" },
      { id: 4, name: "Trousers", path: "/category/trousers" },
      { id: 5, name: "Sneakers", path: "/category/sneakers" },
      { id: 6, name: "Get 15% off", path: "/category/offers" }
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

   // Provided data
   const data = { navData, productCategories, products, displayImg, loading };

   return (
      <contextProvider.Provider value={data}>
         {children}
      </contextProvider.Provider>
   );
};

export default DataProvider;
