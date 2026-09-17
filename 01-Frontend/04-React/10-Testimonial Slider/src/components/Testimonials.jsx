import { FaQuoteLeft,FaQuoteRight } from "react-icons/fa6";
import { FaChevronLeft,FaChevronRight } from "react-icons/fa6";
import { useState } from "react";
import Card from "./Card"
function Testimonials(props){
    let reviews = props.reviews
    const [index , setIndex] = useState(0)

    function leftShiftHandler() {
        if (index - 1 < 0) {
            setIndex(reviews.length -1)
        } else {
            setIndex(index - 1)
        }
    }

    function rightShiftHandler () {
        if (index + 1 >= reviews.length) {
            setIndex(0)
        } else{
            setIndex(index + 1)
        }
    } 
    function surpriseHandler() {
      let randomIndex = Math.floor(Math.random() * reviews.length)
      setIndex(randomIndex)
    }

    return (
        <div className="w-[50vw] md:w-\[560px] h-[50vh] md:h-\[300px] bg-white flex flex-col justify-center items-center mt-10 p-10 transition-all duration-700 hover:shadow-xl rounded-md border">
            <Card review={reviews[index]}/>
            <div className="flex text-1xl mt-4 gap-3 text-violet-400 font-bold justify-center">
                <button onClick={leftShiftHandler}
                className="cursor-pointer hover:text-violet-600"><FaChevronLeft /></button>
                <button onClick={rightShiftHandler}
                className="cursor-pointer hover:text-violet-600"><FaChevronRight /></button>
            </div>

            <div>
                <button onClick={surpriseHandler}
                className="bg-violet-400 hover:bg-violet-600 transition-all duration-200 cursor-pointer rounded-md px-5 py-1 font-semibold text-white text-lg mt-3">Surprise Me</button>
            </div>
        </div>
    )
}
export default Testimonials