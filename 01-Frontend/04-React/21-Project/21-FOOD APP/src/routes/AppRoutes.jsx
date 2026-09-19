import Navbar from "../components/layout/Navbar";
import CartPage from "../pages/CartPage";
import HomePage from "../pages/HomePage";
import {Routes,Route} from 'react-router-dom'
function AppRoutes() {
    return (
        <div className="min-h-screen flex flex-col bg-gray-50">
            <Navbar/>

            <main>
                <Routes>
                    <Route path='/' element={<HomePage/>} />
                    <Route path='/cart' element={<CartPage/>} />
                </Routes>
            </main>

        </div>
    )
}
export default AppRoutes;