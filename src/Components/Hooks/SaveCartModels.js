// GET ITEMS FROM LOCAL STORAGE
const getItemFromLocalStorage = () => {
    const saveItems = localStorage.getItem("cartItems");
    if (!saveItems) {
        return [];
    }
    return JSON.parse(saveItems);
};
// ADD OR UPDATE ITEM IN LOCAL STORAGE
const setItemToLocalStorage = (model, quantity = 1) => {
    const savedItems = getItemFromLocalStorage();
    const existingItemIndex = savedItems.findIndex((i) => i.model === model);
    if (existingItemIndex !== -1) {
        savedItems[existingItemIndex].quantity += quantity;
    } else {
        savedItems.push({ model, quantity });
    }
    localStorage.setItem("cartItems", JSON.stringify(savedItems));
};
// REMOVE ITEM FROM LOCAL STORAGE

export { getItemFromLocalStorage, setItemToLocalStorage };

// ✅ Update quantity of a specific model
// const updateModelQuantity = (model, quantity) => {
//     const savedItems = getItemFromLocalStorage();
//     const updatedItems = savedItems.map((item) =>
//         item.model === model ? { ...item, quantity } : item,
//     );
//     localStorage.setItem("cartModels", JSON.stringify(updatedItems));
// };

// export {
//     getItemFromLocalStorage,
//     setModelToLocalStorage,
//     removeModelFromLocalStorage,
//     updateModelQuantity,
// };
