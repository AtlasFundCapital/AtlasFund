"use client";

import { useState } from "react";
import { CheckIcon } from "@/components/icons";
import { BRAND } from "@/config/brand";

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

/* Forms on this site validate in the browser and stop there: nothing is sent
   anywhere until a delivery channel is chosen. They say so plainly. */

export function NewsletterForm() {
  const [email, setEmail] = useState("");
  const [state, setState] = useState<"idle" | "bad" | "ok">("idle");
  return (
    <form
      noValidate
      onSubmit={(e) => {
        e.preventDefault();
        setState(EMAIL.test(email.trim()) ? "ok" : "bad");
      }}
      className="w-full"
    >
      <label htmlFor="newsletter" className="text-[14px] font-medium text-ink">
        Get Atlas Fund notes by email
      </label>
      <input
        id="newsletter"
        type="email"
        value={email}
        onChange={(e) => {
          setEmail(e.target.value);
          setState("idle");
        }}
        placeholder="name@email.com"
        className="mt-3 h-10 w-full rounded-lg border border-ink/10 bg-card-2 px-3 text-[13px] text-ink outline-none placeholder:text-mute focus:border-ink/40"
      />
      <button type="submit" className="btn mt-2 w-full">
        Subscribe
      </button>
      <p className={`mt-2 text-[12px] ${state === "bad" ? "text-rose" : "text-mute"}`} aria-live="polite">
        {state === "bad" && "That email address does not look right."}
        {state === "ok" && "Address looks good. The mailing list opens at launch; nothing was sent yet."}
        {state === "idle" && "Launch news only. No spam."}
      </p>
    </form>
  );
}

const TOPICS = ["Vaults", "Funds", "Treasury mandate", "Integration", "Jobs", "Press", "Something else"];

type Errors = Partial<Record<"name" | "email" | "topic" | "message", string>>;

export function ContactForm({ initialTopic = "" }: { initialTopic?: string }) {
  const [values, setValues] = useState({ name: "", email: "", org: "", topic: TOPICS.includes(initialTopic) ? initialTopic : "", message: "" });
  const [errors, setErrors] = useState<Errors>({});
  const [done, setDone] = useState(false);

  const set = (key: keyof typeof values) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setValues((v) => ({ ...v, [key]: e.target.value }));
    setErrors((x) => ({ ...x, [key]: undefined }));
    setDone(false);
  };

  const validate = () => {
    const next: Errors = {};
    if (values.name.trim().length < 2) next.name = "Tell us your name.";
    if (!EMAIL.test(values.email.trim())) next.email = "Enter a valid email address.";
    if (!values.topic) next.topic = "Pick a topic.";
    if (values.message.trim().length < 20) next.message = "A few more words, please (20 characters or more).";
    return next;
  };

  const field = "mt-1.5 w-full rounded-lg border bg-card-2 px-3 text-[14px] text-ink outline-none placeholder:text-mute focus:border-ink/40";
  const border = (k: keyof Errors) => (errors[k] ? "border-rose" : "border-ink/10");

  if (done) {
    return (
      <div className="flex h-full flex-col items-start justify-center gap-3">
        <span className="grid size-10 place-items-center rounded-full bg-sage-3 text-sage">
          <CheckIcon className="size-5" />
        </span>
        <p className="text-[20px] font-medium text-ink">Everything checks out.</p>
        <p className="text-[14px] leading-relaxed text-body">
          The form is not connected to an inbox yet, so nothing was sent. Until it is, reach us on X at{" "}
          <a className="underline" href={BRAND.x} target="_blank" rel="noreferrer">
            {BRAND.xHandle}
          </a>
          .
        </p>
        <button type="button" onClick={() => setDone(false)} className="btn btn-light btn-sm mt-2">
          Edit message
        </button>
      </div>
    );
  }

  return (
    <form
      noValidate
      onSubmit={(e) => {
        e.preventDefault();
        const next = validate();
        setErrors(next);
        if (Object.keys(next).length === 0) setDone(true);
      }}
      className="grid grid-cols-1 gap-4 sm:grid-cols-2"
    >
      <label className="text-[13px] text-ink">
        Name
        <input value={values.name} onChange={set("name")} className={`${field} ${border("name")} h-11`} autoComplete="name" />
        {errors.name && <span className="mt-1 block text-[12px] text-rose">{errors.name}</span>}
      </label>
      <label className="text-[13px] text-ink">
        Email
        <input type="email" value={values.email} onChange={set("email")} className={`${field} ${border("email")} h-11`} autoComplete="email" />
        {errors.email && <span className="mt-1 block text-[12px] text-rose">{errors.email}</span>}
      </label>
      <label className="text-[13px] text-ink">
        Organisation <span className="text-mute">(optional)</span>
        <input value={values.org} onChange={set("org")} className={`${field} border-ink/10 h-11`} autoComplete="organization" />
      </label>
      <label className="text-[13px] text-ink">
        Topic
        <select value={values.topic} onChange={set("topic")} className={`${field} ${border("topic")} h-11`}>
          <option value="">Choose one</option>
          {TOPICS.map((t) => (
            <option key={t}>{t}</option>
          ))}
        </select>
        {errors.topic && <span className="mt-1 block text-[12px] text-rose">{errors.topic}</span>}
      </label>
      <label className="text-[13px] text-ink sm:col-span-2">
        Message
        <textarea value={values.message} onChange={set("message")} rows={5} className={`${field} ${border("message")} py-2.5`} />
        {errors.message && <span className="mt-1 block text-[12px] text-rose">{errors.message}</span>}
      </label>
      <div className="flex flex-wrap items-center gap-3 sm:col-span-2">
        <button type="submit" className="btn">
          Check and send
        </button>
        <span className="text-[12px] text-mute">Validated in your browser only. Nothing is transmitted yet.</span>
      </div>
    </form>
  );
}
