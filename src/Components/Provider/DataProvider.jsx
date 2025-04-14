import React, { createContext, useEffect, useRef, useState } from 'react';
export const contextProvider = createContext();
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, onAuthStateChanged, signInWithPopup, GoogleAuthProvider, updateProfile, updateEmail, updatePhoneNumber, sendEmailVerification, sendPasswordResetEmail } from "firebase/auth";
import { toast } from 'react-toastify';
import { getItemFromLocalStorage, setItemToLocalStorage } from './../Hooks/SaveCartModels';
import app from './../../Firebase/Firebase.config';
const DataProvider = ({ children }) => {
   //loading state
   const [loading, setLoading] = useState(true);
   const [user, setUser] = useState();
   // navdata
   const navData = [
      { id: 1, title: "Home" },
      {
         id: 2, title: "Attar",
         submenu: [
            { name: "combo & gifts" },
            { name: "wholesale attar" }
         ]
      },
      {
         id: 3, title: "Men’s Clothing",
         submenu: [
            { name: "t-shirt" },
            { name: "trousers" },
            { name: "sweatshirt" },
            { name: "joggers" },
            { name: "panjabi" },
            { name: "combo packs" }
         ]
      },
      {
         id: 4, title: "Panjabi",
         submenu: [
            { name: "platinum china bamsilk" },
            { name: "premium chikankar" },
            { name: "cotton panjabi" }
         ]
      },
      {
         id: 5, title: "Winter 2024",
         submenu: [
            { name: "hoodie" },
            { name: "shawl" },
            { name: "sneakers" }
         ]
      },
      {
         id: 6, title: "Women's Clothing",
         submenu: [
            { name: "kurti" },
            { name: "mexi" },
            { name: "lehenga" }
         ]
      },
      {
         id: 7, title: "Others",
         submenu: [
            { name: "capes and headwear" },
            { name: "dawah canvas" }
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

   // registration with email and password
   const auth = getAuth(app);

   const registerUser = async (email, password) => {
      setLoading(true);
      return createUserWithEmailAndPassword(auth, email, password).finally(() => setLoading(false));
   }

   // login with email and password
   const loginUser = async (email, password) => {
      setLoading(true);
      return signInWithEmailAndPassword(auth, email, password).finally(() => setLoading(false));
   }

   // logout user
   const logOutUser = async () => {
      setLoading(true);
      return signOut(auth)
         .then(() => {
            toast.success("Logout Successfull!", { autoClose: 1000 })
            setUser(null);
         })
         .catch(() => toast.error("Logout Faild!", { autoClose: 1000 }))
         .finally(() => setLoading(false));
   }

   //login with google 
   const gProvider = new GoogleAuthProvider();
   const loginWithGoogle = async (navigate) => {
      if (user) {
         return toast.warning("You are already Logged In", { autoClose: 1000 })
      }
      setLoading(true);
      signInWithPopup(auth, gProvider)
         .then((u) => {
            setUser(u.user)
            toast.success("Login Successfull!", { autoClose: 1000 });
         })
         .catch((err) => {
            toast.error("Login Faild!");
            console.error(err);
         })
         .finally(() => {
            setLoading(false)
            navigate('/')
         });
   }

   // update user profile
   const profileUpdate = async (userName, userEmail, number) => {
      try {
         await updateProfile(auth.currentUser, {
            displayName: userName,
         })
         await updateEmail(auth.currentUser, userEmail);
         await updatePhoneNumber(auth.currentUser, number);

         setUser((prev) => ({
            ...prev,
            displayName: userName,
            email: userEmail,
            phonNumber: number
         }))
         console.log("Profile updated successfully!");
      }
      catch (err) {
         console.error("Can't update profile", err)
      }
   }

   //send email verificaion (have to fix this )
   const sendVerificationEmail = () => {
      sendEmailVerification(auth.currentUser)
   }

   // send reset password email
   const handleResetPassword = async (email) => {
      return await sendPasswordResetEmail(auth, email);
   }

   // auth observer 
   useEffect(() => {
      const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
         setUser(currentUser);
         setLoading(false);
      })
      return () => unsubscribe();
   }, [auth]);

   // add to cart function
   const [cartItems, setCartItems] = useState([]);
   // load initially 
   useEffect(() => {
      const savedItems = getItemFromLocalStorage();
      setCartItems(savedItems);
   }, []);
   // overview product 
   const [overviewProduct, setOverviewProduct] = useState(null);

   const addToCart = (model, qty, selectedSize) => {
      if (!selectedSize) {
         toast.error("Please select size", { autoClose: 3000 });
         return;
      }
      setItemToLocalStorage(model, qty, selectedSize); // set model to local storage
      toast.success("Item added to cart", { autoClose: 1000 });
      const savedItems = getItemFromLocalStorage();
      setCartItems(savedItems);
      console.log(model, qty, selectedSize);
   }

   // Provided data
   const data = {
      overviewProduct,
      setOverviewProduct,
      logOutUser,
      sendVerificationEmail,
      handleResetPassword,
      profileUpdate,
      loginWithGoogle,
      setLoading,
      handleSubmenuClick,
      handleMenuClick,
      registerUser,
      loginUser,
      setUser,
      addToCart,
      setCartItems,
      cartItems,
      user,
      dialogColsingRef,
      navData,
      productCategories,
      products,
      displayImg,
      loading,
   };

   return (
      <contextProvider.Provider value={data}>
         {children}
      </contextProvider.Provider>
   );
};

export default DataProvider;
