import { useState } from "react";
import { MY_EMAIL } from "../../constants/strings";
import { CONTACT_STATUS_NOTE, mailtoHref, submitContact } from "../../utils/contact";

const SOCIALS = [
  { label: "LinkedIn", href: "https://www.linkedin.com/in/dev-josh/" },
  { label: "GitHub", href: "https://www.github.com/joshDamian" },
  { label: "Twitter", href: "https://twitter.com/DevJosh__" },
];

const FIELDS = [
  { name: "name", label: "Your name", type: "text", required: true },
  { name: "email", label: "Your email", type: "email", required: true },
  { name: "subject", label: "Subject", type: "text", required: false },
];

const EMPTY = { name: "", email: "", subject: "", message: "", "bot-field": "" };

export default function Contact() {
  const [formData, setFormData] = useState(EMPTY);
  const [status, setStatus] = useState("idle");

  const handleChange = (event) => {
    setFormData({ ...formData, [event.target.name]: event.target.value });
  };

  /* Primary path: POST to Netlify Forms. The mailto link below the button is
     the deliberate fallback when that POST fails — see src/utils/contact.js. */
  const handleSubmit = async (event) => {
    event.preventDefault();
    setStatus("sending");
    try {
      await submitContact(formData);
      setStatus("sent");
      setFormData(EMPTY);
    } catch {
      setStatus("error");
    }
  };

  return (
    <section className="section wrap">
      <span className="eyebrow">Contact</span>
      <h1 className="display" style={{ fontSize: "var(--step-4)" }}>
        Get in touch
      </h1>
      <p className="lead" style={{ marginTop: "var(--s4)" }}>
        I know you have something to say. I am always open to discussing new
        projects, creative ideas, or opportunities to be part of your vision.
      </p>

      <div className="contact">
        <aside className="contact__side">
          <p className="contact__email">
            <span className="meta__k">Email</span>
            <a href={`mailto:${MY_EMAIL}`}>{MY_EMAIL}</a>
          </p>
          <ul className="contact__socials">
            {SOCIALS.map((social) => (
              <li key={social.label}>
                <a href={social.href} target="_blank" rel="noopener noreferrer">
                  {social.label} <span aria-hidden="true">↗</span>
                </a>
              </li>
            ))}
          </ul>
        </aside>

        <form className="form" name="contact" onSubmit={handleSubmit}>
          {/* Honeypot: named by netlify-honeypot in public/index.html. Hidden
              from people, irresistible to a bot that fills every input. */}
          <p className="honeypot" aria-hidden="true">
            <label htmlFor="v2-bot-field">Leave this field empty</label>
            <input
              id="v2-bot-field"
              name="bot-field"
              tabIndex={-1}
              autoComplete="off"
              value={formData["bot-field"]}
              onChange={handleChange}
            />
          </p>

          {/* Labels rather than placeholder-only fields: v1 relies on
              placeholders, which vanish as soon as typing starts. */}
          {FIELDS.map((field) => (
            <p className="field" key={field.name}>
              <label htmlFor={`v2-${field.name}`}>{field.label}</label>
              <input
                id={`v2-${field.name}`}
                name={field.name}
                type={field.type}
                required={field.required}
                value={formData[field.name]}
                onChange={handleChange}
                autoComplete={field.name === "name" ? "name" : field.name}
              />
            </p>
          ))}
          <p className="field">
            <label htmlFor="v2-message">Message</label>
            <textarea
              id="v2-message"
              name="message"
              rows="5"
              required
              value={formData.message}
              onChange={handleChange}
            />
          </p>
          <div className="form__foot">
            <p
              className="form__note"
              role="status"
              data-state={status}
            >
              {CONTACT_STATUS_NOTE[status]}
            </p>
            <div className="form__actions">
              {/* The fallback. Carries whatever has been typed, so a failed
                  POST does not cost the visitor their message. */}
              <a className="form__alt" href={mailtoHref(MY_EMAIL, formData)}>
                or email me directly
              </a>
              <button
                className="btn btn--accent"
                type="submit"
                disabled={status === "sending"}
              >
                {status === "sending" ? "Sending…" : "Send message"}
              </button>
            </div>
          </div>
        </form>
      </div>
    </section>
  );
}
