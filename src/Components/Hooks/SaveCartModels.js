import { toast } from "react-toastify";

// GET ITEMS FROM LOCAL STORAGE
const getItemFromLocalStorage = () => {
    const saveItems = localStorage.getItem("cartItems");
    if (!saveItems) {
        return [];
    }
    return JSON.parse(saveItems);
};
// ADD OR UPDATE ITEM IN LOCAL STORAGE
const setItemToLocalStorage = (model, quantity, selectedSize) => {
    quantity = parseInt(quantity, 10); // Ensure quantity is an integer
    if (!quantity || quantity <= 0) {
        quantity = 1;
    }
    const savedItems = getItemFromLocalStorage();
    const existingItemIndex = savedItems.findIndex((i) => i.model === model);
    if (existingItemIndex !== -1) {
        savedItems[existingItemIndex].quantity += quantity;
    } else {
        savedItems.push({ model, quantity, selectedSize });
    }
    localStorage.setItem("cartItems", JSON.stringify(savedItems));
};
// ADD TO FAVOURITE
const getFavouriteItmes = () => {
    const saveItems = localStorage.getItem("favouriteItem");
    if (!saveItems) return [];
    return JSON.parse(saveItems);
};

const saveFavouriteItems = (model) => {
    const savedItems = getFavouriteItmes();
    const checker = savedItems.includes(model);
    if (checker) {
        toast.error("Item Already Added", {
            autoClose: 2000,
            position: "bottom-right",
        });
        return;
    } else {
        savedItems.push(model);
        toast("Add to Favourite successfull!", {
            autoClose: 500,
            position: "bottom-right",
            theme: "light",
        });
    }
    localStorage.setItem("favouriteItem", JSON.stringify(savedItems));
};

export {
    getItemFromLocalStorage,
    setItemToLocalStorage,
    getFavouriteItmes,
    saveFavouriteItems,
};
