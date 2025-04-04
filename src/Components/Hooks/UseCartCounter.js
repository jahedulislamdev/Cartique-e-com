import { useEffect, useState } from "react";

const useCartCounter = () => {
    const [cartCounter, setCartCounter] = useState(0);

    const updateCounter = (newCount) => {
        setCartCounter(newCount);
        localStorage.setItem("cartCounter", JSON.stringify(newCount));
    };
    useEffect(() => {
        const savedItem = localStorage.getItem("cartCounter");
        if (savedItem) {
            setCartCounter(JSON.parse(savedItem));
        }
    }, []);
    return [cartCounter, updateCounter];
};

export default useCartCounter;
