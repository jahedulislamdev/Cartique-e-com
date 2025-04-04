import { useEffect } from "react";
import { useLocation } from "react-router-dom";

const UseScrollToTop = () => {
    const { pathname } = useLocation();
    useEffect(() => {
        scrollTo({
            top: 0,
            behavior: "smooth",
        });
    }, [pathname]);
    return null;
};
export default UseScrollToTop;
