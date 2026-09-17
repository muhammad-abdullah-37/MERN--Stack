import './App.css'
import Testimonials from './components/Testimonials'
import reviews from './data'

function App() {

  return (
    <div className='flex flex-col w-full h-screen justify-center items-center bg-gray-300'>
      <div className='text-center'>
        <h1 className='text-4xl font-bold mt-6'>Our Testimonials</h1>
        <div className='bg-violet-400 h-\[4px] w-1/5 mt-1 mx-auto'></div>
        <Testimonials reviews={reviews}/>
      </div>
    </div>
  )
}

export default App
