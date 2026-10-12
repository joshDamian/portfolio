import Tilt from "react-parallax-tilt";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { brands } from "@fortawesome/fontawesome-svg-core/import.macro";
import { useState } from "react";
import { MY_EMAIL } from "../constants/strings";
import { CONTACT_STATUS_NOTE, mailtoHref, submitContact } from "../utils/contact";

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
    'bot-field': '',
  });
  const [status, setStatus] = useState('idle');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Primary path: POST to Netlify Forms. The "email me directly" link beside
  // the button is the fallback if that POST fails. See src/utils/contact.js.
  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('sending');
    try {
      await submitContact(formData);
      setStatus('sent');
      setFormData({ name: '', email: '', subject: '', message: '', 'bot-field': '' });
    } catch {
      setStatus('error');
    }
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
            {/* Honeypot named by netlify-honeypot in public/index.html.
                Off-screen rather than hidden so a DOM-scraping bot still fills
                it in; submitContact() sends its value, which should be empty. */}
            <p
              aria-hidden="true"
              style={{ position: 'absolute', left: '-9999px', width: '1px', height: '1px', overflow: 'hidden' }}
            >
              <label htmlFor="bot-field">Leave this field empty</label>
              <input
                id="bot-field"
                name="bot-field"
                tabIndex={-1}
                autoComplete="off"
                value={formData['bot-field']}
                onChange={handleChange}
              />
            </p>
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
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
              <p className="text-slate-400 text-sm" role="status">
                {CONTACT_STATUS_NOTE[status]}
              </p>
              <div className="flex items-center gap-4 justify-end">
                <a
                  href={mailtoHref(MY_EMAIL, formData)}
                  className="text-portfolio-skyblue text-sm underline"
                >
                  or email me directly
                </a>
                <button
                  className="bg-gradient font-semibold uppercase text-[17px] rounded-md text-white py-2 px-3 disabled:opacity-60"
                  type="submit"
                  disabled={status === 'sending'}
                >
                  {status === 'sending' ? 'Sending…' : 'Send Message'}
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
