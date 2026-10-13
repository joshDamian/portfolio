/* ---------------------------------------------------------------------------
   Contact form — shared by v1 and v2.

   Two mechanisms, wired deliberately (see src/v2/README.md):

     1. The primary path POSTs to Netlify Forms. public/index.html carries a
        hidden copy of the form so Netlify's build bot registers "contact" at
        deploy time; submitContact() sends the matching URL-encoded body.
     2. The fallback is a plain mailto: link beside the form, for a browser with
        no mail handler or whenever the POST fails (offline, local dev, or any
        host that is not Netlify).
--------------------------------------------------------------------------- */

export const CONTACT_FORM_NAME = "contact";

const FIELDS = ["name", "email", "subject", "message"];

/* Composing the mailto URL is a pure function so the encoding can be checked
   without a browser. An empty form collapses to just a subject, so the
   fallback link never carries a "Name: \nEmail: \n\n" husk. */
export function mailtoHref(to, { name = "", email = "", subject = "", message = "" } = {}) {
  const query = new URLSearchParams();
  query.set("subject", subject || "Hello");
  if (name || email || message) {
    query.set("body", `Name: ${name}\nEmail: ${email}\n\n${message}`);
  }
  return `mailto:${to}?${query.toString()}`;
}

/* POSTs to Netlify. Resolves on success and throws on anything else, so the
   caller can surface the mailto fallback. `bot-field` is the honeypot named by
   netlify-honeypot in public/index.html: a real visitor leaves it empty, a bot
   that fills every input gives itself away. */
export async function submitContact(fields) {
  const body = new URLSearchParams();
  body.set("form-name", CONTACT_FORM_NAME);
  body.set("bot-field", fields["bot-field"] || "");
  FIELDS.forEach((field) => body.set(field, fields[field] || ""));

  const response = await fetch("/", {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: body.toString(),
  });

  if (!response.ok) {
    throw new Error(`Contact form submission failed (${response.status})`);
  }
  return response;
}

export const CONTACT_STATUS_NOTE = {
  idle: "This goes straight to my inbox.",
  sending: "Sending…",
  sent: "Thanks, your message has been sent.",
  error: "Couldn't send just now. Use the email link instead.",
};
