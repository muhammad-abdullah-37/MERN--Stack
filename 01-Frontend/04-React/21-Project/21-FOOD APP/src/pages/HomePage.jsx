import { useEffect, useState } from "react";
import FilterBar from "../components/layout/FilterBar";
import Loader from "../components/layout/Loader";
import ProductCard from "../components/layout/ProductCard";

function HomePage () {
    const [loading,setLoading] = useState(false);
    const [products,setProducts] = useState([])

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            try {
            const response = await   fetch('http://localhost:3000/products');
            const data = await response.json();
            setProducts(data)
            } catch (error) {
                console.error(`Error in data fetching : ${error}`)   
            } finally{
                setLoading(false)
            }
        }
        fetchData()
    },[])
    return (
        <div className="px-8 mb-4">
            <h1 className="text-2xl font-semibold mb-4">Food Items</h1>
            <FilterBar/>
                    <div className="mt-6 grid gap-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                        {
                            loading ? (<Loader/>) : 
                            products.map((product) =>{
                                return <ProductCard product={product}/>
                            })
                        }
                    </div>
        </div>
    )
}
export default HomePage;