import "./App.css";
import Random from "./components/Random";
import Tag from "./components/Tag";
function App() {
  return (
    <div className="w-full h-screen flex flex-col background relative overflow-x-hidden items-center pb-10">
      <h1 className="bg-white rounded-lg w-11/12 text-center mt-[30px] px-10 py-1 text-2xl font-bold">Random GIFS</h1>
      <div className="flex flex-col w-full items-center gap-y-10 mt-[20px]">
        <Random />
        <Tag />
      </div>
    </div>
  );
}

export default App;
