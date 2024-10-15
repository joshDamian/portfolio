import { Link } from "react-router-dom";

function Home() {
  return (
    <header
      data-aos="fade-in"
      className="mt-12 md:mt-0 relative md:flex md:items-center md:justify-center md:min-h-[calc(min(1024px,100vh))] md:rounded-t-none bg-gradient"
    >
      <div className="pt-2.5 z-[40] md:z-auto">
        <div className={"absolute opacity-[0.15] grid-bg inset-0 z-0"} />
        <div
          className={"sm:px-6 md:px-16 relative px-5 md:z-50 py-16 md:py-24"}
        >
          <h1 className="hero max-w-5xl mx-auto text-[1.8rem] text-center md:text-[3rem] md:leading-[4.3rem] lg:text-[4rem] lg:leading-[5.8rem] xl:text-[4.8rem] font-semibold xl:leading-[6.3rem]">
            Hi, <br /> I'm <span className="text-portfolio-skyblue">Josh,</span>{" "}
            <br /> A Software Developer.
          </h1>
          <p className="text-slate-300 text-center mt-9 md:mt-9 text-[13px] lg:text-[18px]">
            I'm a Software Developer passionate about building great experiences
            using software.
          </p>
          <div className="mt-9 md:mt-9 flex justify-center">
            <Link
              to="/about"
              className="h-[50px] text-portfolio-skyblue uppercase border-portfolio-skyblue px-3 flex justify-center items-center text-[22px] border"
            >
              More About Me
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}

export default Home;
