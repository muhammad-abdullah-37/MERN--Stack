import { IoIosStar } from "react-icons/io";
import { useNavigate } from "react-router-dom";
function ProductCard({product}){
        const navigate = useNavigate()

    const HandleViewDetails = () => {
        navigate(`/product/${product.id}`)
    }
    const AddToCartHandler= () => {
        console.log(product);
    }
    return(
        <div className="bg-white shadow rounded-lg overflow-hidden flex flex-col">
            {/* Image  */}
            <div className="h-44 w-full overflow-hidden">
                <img  className="h-full w-full object-cover transition-transform"
                src={product.image} alt={product.name} srcSet=""  />
            </div>

            <div className="p-3 flex flex-col">
                {/* Name and category */}
                <h2 className="font-semibold text-sm md:text-base mb-1">{product.name}</h2>
                <p className="text-xs text-gray-500 mb-1">{product.category}</p>
                {/* Price and ratings */}
                <div className="flex items-center justify-between mb-2 text-orange-500">
                    <span className="font-bold">{product.price.toFixed(2)}</span>
                    <span className="flex justify-between items-center text-sm"><IoIosStar /> {product.ratings}</span>
                </div>
                {/* Description */}
                    <p className="text-sm text-gray-600 mb-3">{product.description}</p>
                     {/* Buttons */}
                   <div className="flex gap-4 mt-auto">

                     <button className="flex-1 border border-orange-500 text-xs py-1.5 rounded-md hover:bg-orange-300"
                     onClick={HandleViewDetails}>view</button>
                    <button className="flex-1 bg-orange-500 text-white text-xs py-1.5 rounded-md hover:bg-orange-300 "
                    onClick={AddToCartHandler}>Add to Cart</button>
                   </div>
            </div>
           

        </div>
    )
}
export default ProductCard