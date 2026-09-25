function ProductDetails(){
    let data = {
    "id": 1,
    "name": "Margherita Pizza",
    "category": "Pizza",
    "price": 400,
    "image": "https://images.unsplash.com/photo-1574071318508-1cdbab80d002",
    "description": "Classic pizza with tomato sauce, mozzarella cheese and fresh basil",
    "ratings": 4.5,
    "reviews": 125,
    "inStock": true
  }
    return(
        <div className="container mx-auto px-4 py-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="col-span-1 bg-gray-100 h-80 flex items-center justify-center">{data.image ? (<img src={data.image} alt={data.name}/>) : ("No Image")}</div>
                <div className="md:col-span-2 mt-4">
                    <h1 className="text-2xl font-bold">{data.name}</h1>
                    <p className="mt-2 text-gray-700">{data.description}</p>
                    <div className="font-semibold text-l mt-4">{data.price.toFixed(2)}</div>
                    <button className=" rounded-md bg-black px-4 mt-6 text-white py-2">Add To Cart</button>
                </div>
            </div>
        </div>
    )
}
export default ProductDetails;