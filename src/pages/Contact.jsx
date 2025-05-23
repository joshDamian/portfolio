import Tilt from "react-parallax-tilt";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { brands } from "@fortawesome/fontawesome-svg-core/import.macro";
import { useState } from "react";
import { MY_EMAIL } from "../constants/strings";

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const { name, email, subject, message } = formData;

    // Create the mailto link with the form data
    const mailtoLink = `mailto:${MY_EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(`Name: ${name}\nEmail: ${email}\n\nMessage: ${message}`)}`;

    // Open the mailto link
    window.location.href = mailtoLink;
  };

  return (
    <div
      data-aos="fade-left"
      className="md:px-16 md:min-h-[calc(min(1024px,100vh))] bg-gray-900 sm:px-6 px-5 pt-5 md:pt-20 pb-9 md:pb-20"
    >
      <div className="mx-auto">
        <h3 className="text-white md:text-center font-black uppercase mb-10 md:mb-20 text-3xl md:text-[3.6rem]">
          get in <span className="text-portfolio-skyblue">touch</span>
        </h3>
        <div className="grid grid-cols-1 gap-16 md:grid-cols-2">
          <div>
            <Tilt>
              <p className="bg-slate-700 bg-opacity-50 shadow-md font-normal text-[14px] leading-[29px] clip-message text-slate-300 max-w-sm pb-20 mx-auto shadow-black px-6 pt-6">
                <h4 className="text-white font-semibold text-[15px] md:text-[16px] uppercase">
                  I know you have something to say 😊
                </h4>
                Feel free to get in touch with me. I am always open to
                discussing new projects, creative ideas or opportunities to be
                part of your visions.
              </p>
            </Tilt>
            <div className="flex mt-2 justify-end max-w-sm mx-auto items-center">
              <a
                target="_blank"
                rel="noreferrer"
                href="https://www.linkedin.com/in/dev-josh/"
                className="h-[45px] w-[45px] text-[18px] mr-5 rounded-full text-white bg-slate-700 bg-opacity-50 flex items-center justify-center"
              >
                <FontAwesomeIcon icon={brands("linkedin")} />
              </a>
              <a
                target="_blank"
                rel="noreferrer"
                href="https://www.github.com/joshDamian"
                className="h-[45px] w-[45px] text-[18px] mr-5 rounded-full text-white bg-slate-700 bg-opacity-50 flex items-center justify-center"
              >
                <FontAwesomeIcon icon={brands("github")} />
              </a>
              <a
                target="_blank"
                rel="noreferrer"
                href="https://twitter.com/DevJosh__"
                className="h-[45px] w-[45px] text-[18px] mr-5 rounded-full text-white bg-slate-700 bg-opacity-50 flex items-center justify-center"
              >
                <FontAwesomeIcon icon={brands("twitter")} />
              </a>
            </div>
          </div>
          <form
            name="contact"
            onSubmit={handleSubmit}
            className="max-w-lg self-start grid grid-cols-1 gap-9"
          >
            <input type="hidden" name="form-name" value="contact" />
            <div>
              <input
                name="name"
                className="shadow appearance-none focus:border focus:border-slate-500 rounded-md w-full py-3 px-3 text-gray-300 bg-slate-700 bg-opacity-75 leading-tight focus:outline-none focus:shadow-outline"
                id="name"
                type="text"
                placeholder="YOUR NAME"
                required
                value={formData.name}
                onChange={handleChange}
              />
            </div>
            <div>
              <input
                value={formData.email}
                onChange={handleChange}
                name="email"
                className="shadow appearance-none focus:border focus:border-slate-500 rounded-md w-full py-3 px-3 text-gray-300 bg-slate-700 bg-opacity-75 leading-tight focus:outline-none focus:shadow-outline"
                id="email"
                type="email"
                placeholder="YOUR EMAIL"
                required
              />
            </div>
            <div>
              <input
                value={formData.subject}
                onChange={handleChange}
                name="subject"
                className="shadow appearance-none focus:border focus:border-slate-500 rounded-md w-full py-3 px-3 text-gray-300 bg-slate-700 bg-opacity-75 leading-tight focus:outline-none focus:shadow-outline"
                id="subject"
                type="text"
                placeholder="YOUR SUBJECT"
              />
            </div>
            <div>
              <textarea
                value={formData.message}
                onChange={handleChange}
                required
                rows="4"
                placeholder="YOUR MESSAGE"
                id="message"
                name="message"
                className="shadow appearance-none focus:border focus:border-slate-500 rounded-md w-full py-3 px-3 text-gray-300 bg-slate-700 bg-opacity-75 leading-tight focus:outline-none focus:shadow-outline"
              ></textarea>
            </div>
            <div className="flex justify-end">
              <button
                className="bg-gradient font-semibold uppercase text-[17px] rounded-md text-white py-2 px-3"
                type="submit"
              >
                Send Message
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
