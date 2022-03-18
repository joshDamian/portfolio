import "./App.css";
import joshdamian from "./images/joshdamian.png";
import AOS from "aos";
import "aos/dist/aos.css";
AOS.init();

function App() {
  return (
    <div className="text-white bg-gradient">
      <aside
        className="md:fixed rounded-bl-[110px] md:rounded-bl-none md:inset-0 md:w-36 bg-[#000000]"
        data-aos="fade-right"
      >
        <div className="py-8 px-5">
          <img
            src={joshdamian}
            alt="josh"
            className="rounded-full w-[160px] md:w-full mx-auto"
          />
          <h3 className="text-white text-[25px] font-semibold text-center mt-2">
            Josh
          </h3>
          <h3 className="text-portfolio-gray mt-2 text-[14px] text-center">
            Web Developer
          </h3>
        </div>
        <div className="flex fixed bottom-0 h-[50px] border-t border-slate-400 md:border-t-0 md:h-auto right-0 left-0 md:relative flex-row items-center md:items-start md:flex-col overflow-x-auto md:divide-y justify-around md:justify-start divide-x md:divide-x-0 md:pt-6 divide-slate-400">
          <button className="text-slate-300 md:w-full flex flex-shrink-0 items-center md:border-t px-3 border-slate-300 py-3 md:py-4 justify-center">
            Meet Josh
          </button>
          <button className="text-slate-300 md:w-full flex items-center justify-center flex-shrink-0 py-2 md:py-4 px-3">
            My Skills
          </button>
          <button className="text-slate-300 md:w-full flex items-center justify-center flex-shrink-0 py-2 md:py-4 px-3">
            Work
          </button>
          <button className="text-slate-300 md:w-full flex items-center justify-center py-2 md:py-4 flex-shrink-0 px-3">
            Contact
          </button>
          <button className="hidden md:block w-full"></button>
        </div>
      </aside>
      <main className="md:ml-36 text-[#515152] min-h-screen pb-[75px] md:pb-0 bg-[#000000]">
        <header
          data-aos="fade-down"
          className="rounded-bl-[110px] lg:rounded-bl-[100px]  bg-gradient sm:px-6 md:px-16 px-5 pt-9 md:pt-24 pb-9 md:pb-24 mx-auto"
        >
          <div className="max-w-7xl">
            <h1 className="hero text-[2.5rem] text-center lg:text-[5.6rem] font-semibold lg:leading-[6.5rem]">
              Hi, <br /> I'm{" "}
              <span className="text-portfolio-skyblue">Josh,</span> <br /> A Web
              Developer.
            </h1>
            <p className="text-slate-300 text-center mt-5 lg:mt-7 text-[22px] lg:text-[25px]">
              Fullstack Web Developer
            </p>
            <div className="mt-8 md:mt-7 flex justify-center ">
              <button className="h-[50px] text-portfolio-skyblue border-portfolio-skyblue px-3 flex justify-center items-center text-[22px] border">
                Contact me!
              </button>
            </div>
          </div>
        </header>
        <div className=""></div>
      </main>
    </div>
  );
}

export default App;
