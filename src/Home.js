import { Link } from "react-router-dom";

function Home() {
  return (
    <header
      data-aos="fade-down"
      className="rounded-bl-[110px] lg:rounded-bl-[100px]  bg-gradient sm:px-6 md:px-16 px-5 pt-9 md:pt-24 pb-9 md:pb-24"
    >
      <div className="max-w-7xl">
        <h1 className="hero max-w-5xl mx-auto text-[2rem] text-center lg:text-[5.3rem] font-semibold lg:leading-[6.5rem]">
          Hi, <br /> I'm <span className="text-portfolio-skyblue">Josh,</span>{" "}
          <br /> A Software Developer.
        </h1>
        <p className="text-slate-300 text-center mt-5 lg:mt-7 text-[14px] lg:text-[19px]">
          I'm a Nigeria-based Software Developer passionate about building great
          experiences using software.
        </p>
        <div className="mt-8 md:mt-7 flex justify-center ">
          <Link
            to="/about"
            className="h-[50px] text-portfolio-skyblue uppercase border-portfolio-skyblue px-3 flex justify-center items-center text-[22px] border"
          >
            More About Me
          </Link>
        </div>
      </div>
    </header>
  );
}

export default Home;
