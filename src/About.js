export default function About() {
  const experience = [
    {
      role: "Fullstack Developer",
      company: "Blocverse",
      period: "Jul 2021 - PRESENT",
      description: (
        <div>
          Building Web3 powered applications with the Dev team at{" "}
          <a className="text-blue-500" href="https://blocverse.com">
            Blocverse Labs
          </a>
          .
        </div>
      ),
    },
    {
      role: "Bachelor of Engineering Degree (Electronics Engineering)",
      company: "Alex Ekwueme Federal University",
      period: "Oct 2018 - PRESENT",
      description: (
        <div>
          Studying for an undergraduate degree at{" "}
          <a className="text-blue-500" href="https://funai.edu.ng/">
            Alex Ekwueme Federal University
          </a>
        </div>
      ),
      icon: "graduation-cap",
    },
    {
      role: "Backend Developer",
      company: "Learn Share Earn",
      period: "Jun 2021 - Jul 2021",
      description: (
        <div>
          Built the backend affiliate system for{" "}
          <a className="text-blue-500" href="https://lsearn.com">
            Learn Share Earn
          </a>
        </div>
      ),
    },
  ];
  return (
    <div
      data-aos="fade-right"
      className="sm:px-6 md:px-16 bg-gray-900 px-5 pt-9 md:pt-20 pb-9 md:pb-20"
    >
      <div className="max-w-7xl mx-auto">
        <h3 className="text-white text-center font-bold uppercase mb-8 md:mb-20 text-4xl md:text-[4rem]">
          About <span className="text-portfolio-skyblue">Me</span>
        </h3>
        <hr className="border-slate-600 max-w-[70%] mx-auto" />
        <h4 className="uppercase mt-8 md:mt-12 text-center text-white text-2xl md:text-[2rem] font-semibold">
          Developer Experience & education
        </h4>
        <div className="grid grid-cols-1 mt-16 gap-16 md:grid-cols-2">
          {experience.map((item) => {
            return (
              <div>
                <div className="text-white">
                  <h3 className="bg-gray-800 inline rounded-full px-3 py-2 text-slate-200 font-medium">
                    {item.period}
                  </h3>
                  <h3 className="uppercase tracking-wide mt-6 font-semibold">
                    {item.role}{" "}
                    <span className="text-slate-300"> - {item.company}</span>
                  </h3>
                  <p className="mt-6 text-sm">{item.description}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
