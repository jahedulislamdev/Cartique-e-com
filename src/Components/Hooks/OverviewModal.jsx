import { useContext, useState } from "react";
import { CiHeart } from "react-icons/ci";
import { IoShareSocial } from "react-icons/io5";
import { contextProvider } from "../Provider/DataProvider";
import { saveFavouriteItems } from "./SaveCartModels";
import { toast } from "react-toastify";

const OverviewModal = ({ overviewProduct }) => {
    const [size, setSize] = useState(null);
    const { addToCart } = useContext(contextProvider);
    const handleSelectedSize = (e) => {
        const selectedSize = e.target.ariaLabel;
        setSize(selectedSize); // Update the state with the selected size
    }
    const handleAddToCart = () => {
        if (!size) {
            toast.error("Please select a size before adding!", { position: "top-right" });
            return;
        }
        addToCart(overviewProduct?.model, overviewProduct?.quantity, size);
        setSize(null);
    };


    return (
        <div className="indicator w-full flex justify-center m-5">
            <form method="dialog">
                <button className="cursor-pointer w-8 h-8 rounded-full indicator-item indicator-center badge bg-red-900 border-0 text-white">✕</button>
            </form>
            <div className="modal-box bg-white p-0 font-display sm:max-w-3xl sm:w-full scrollbar-none">
                <div className='sm:grid grid-cols-2 gap-x-3 '>
                    <div>
                        <img className='sm:w-full' src={overviewProduct?.product_img} alt="" />
                    </div>
                    <div className='sm:space-y-6 space-y-4 px-5 py-3'>
                        <div className='flex justify-between pe-3'>
                            <div>
                                <p className='font-semibold uppercase'>{overviewProduct?.title}</p>
                                <p className='text-sm'>{overviewProduct?.sku}</p>
                            </div>
                            <div>
                                <IoShareSocial className='size-5' />
                            </div>
                        </div>
                        <p className='text-xl font-medium'>৳ {overviewProduct?.price}</p>
                        <p>Color: <span className='bg-gray-200 px-2 py-1 rounded-3xl text-xs text-base-300'>{overviewProduct?.color}</span></p>
                        <div className='mt-3'>
                            Size :
                            <div className="join space-x-2.5 ms-1">
                                {overviewProduct?.size.map(size => (
                                    <input onChange={handleSelectedSize} key={size} className="join-item btn w-8 h-8 rounded-4xl border-0 checked:bg-red-700 checked:text-white"
                                        type="radio" name="size" aria-label={size} />
                                ))}
                            </div>
                        </div>
                        {/* Add to Cart & Wishlist */}
                        <div className='flex justify-start items-center space-x-3 my-4'>
                            <button onClick={handleAddToCart} className='uppercase font-display hover:bg-red-900 bg-red-800 text-white transition-colors w-full p-2 cursor-pointer'>
                                Add to Bag
                            </button>
                            <button onClick={() => saveFavouriteItems(overviewProduct?.model)} className='hover:bg-white p-2 hover:text-red-600 rounded-full cursor-pointer transition-colors'>
                                <CiHeart className='size-6 ' />
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div >
    );
};

export default OverviewModal;
