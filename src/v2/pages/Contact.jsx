import { useState } from "react";
import { MY_EMAIL } from "../../constants/strings";
import { mailtoHref } from "../lib/format";

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

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [sent, setSent] = useState(false);

  const handleChange = (event) => {
    setFormData({ ...formData, [event.target.name]: event.target.value });
  };

  /* v1 does the same thing — and it is worth knowing why: the Netlify form in
     public/index.html never receives anything, because this handler cancels the
     submit before it can POST. The mailto handoff is what actually works. Kept
     for parity; flagged in src/v2/README.md as a decision to revisit. */
  const handleSubmit = (event) => {
    event.preventDefault();
    window.location.href = mailtoHref(MY_EMAIL, formData);
    setSent(true);
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
            <p className="form__note" role="status">
              {sent ? "Opening your email client…" : "This opens your email client with the message ready to send."}
            </p>
            <button className="btn btn--accent" type="submit">
              Send message
            </button>
          </div>
        </form>
      </div>
    </section>
  );
}
