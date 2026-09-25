import { Link } from "react-router-dom";
import { FaCartPlus } from "react-icons/fa";


function Navbar() {
    let isLoggedIn = false;
    return (
        <header className="bg-white shadow-md sticky top-0 z-10">
            <nav className="container mx-auto px-4 flex items-center justify-between">
                <Link to='/' className="text-2xl font-bold text-orange-600 py-4">Foodie</Link>
                <div className="flex items-center gap-4">
                    <Link to='/home' className='text-gray-700 hover:text-green-600'>Home</Link>
                    <Link to='/cart' className="text-gray-700 hover:text-green-600 flex items-center gap-3">Cart <FaCartPlus />
</Link>
                </div>

                <div>
                   <button className="bg-orange-500 text-white px-5 py-2 rounded hover:bg-orange-600 cursor-pointer">{isLoggedIn ? ('Logout') : ('Login')}</button>
                </div>
            </nav>
        </header>
    )
}
export default Navbar;