"use client";

import { useState, FormEvent } from "react";
import { useTranslations } from "next-intl";

type Status = "idle" | "submitting" | "success" | "error" | "validation-error";

export default function ContactForm() {
  const t = useTranslations("contact");
  const [status, setStatus] = useState<Status>("idle");

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);

    const payload = {
      name: String(data.get("name") || "").trim(),
      email: String(data.get("email") || "").trim(),
      phone: String(data.get("phone") || "").trim(),
      message: String(data.get("message") || "").trim(),
    };

    if (!payload.name || !payload.email || !payload.message) {
      setStatus("validation-error");
      return;
    }

    setStatus("submitting");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!res.ok) throw new Error("request-failed");

      setStatus("success");
      form.reset();
    } catch {
      setStatus("error");
    }
  }

  const fieldClass =
    "w-full rounded-xl border border-line-strong bg-ink px-4 py-3 text-[15px] text-paper placeholder:text-stone-dim outline-none transition focus:border-gold";

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div className="flex flex-col gap-1.5">
          <label htmlFor="contact-name" className="text-[13.5px] font-bold text-paper-dim">
            {t("formName")}
          </label>
          <input
            id="contact-name"
            name="name"
            type="text"
            required
            placeholder={t("formNamePlaceholder")}
            className={fieldClass}
          />
        </div>
        <div className="flex flex-col gap-1.5">
          <label htmlFor="contact-email" className="text-[13.5px] font-bold text-paper-dim">
            {t("formEmail")}
          </label>
          <input
            id="contact-email"
            name="email"
            type="email"
            required
            placeholder={t("formEmailPlaceholder")}
            className={fieldClass}
          />
        </div>
      </div>

      <div className="flex flex-col gap-1.5">
        <label htmlFor="contact-phone" className="text-[13.5px] font-bold text-paper-dim">
          {t("formPhone")}
        </label>
        <input
          id="contact-phone"
          name="phone"
          type="tel"
          placeholder={t("formPhonePlaceholder")}
          className={fieldClass}
        />
      </div>

      <div className="flex flex-col gap-1.5">
        <label htmlFor="contact-message" className="text-[13.5px] font-bold text-paper-dim">
          {t("formMessage")}
        </label>
        <textarea
          id="contact-message"
          name="message"
          required
          rows={5}
          placeholder={t("formMessagePlaceholder")}
          className={`${fieldClass} resize-none`}
        />
      </div>

      <button
        type="submit"
        disabled={status === "submitting"}
        className="mt-1 rounded-full bg-gold px-6 py-3 text-[15px] font-extrabold text-gold-ink transition hover:bg-gold-bright disabled:opacity-60"
      >
        {status === "submitting" ? t("formSubmitting") : t("formSubmit")}
      </button>

      {status === "success" && (
        <p className="text-[13.5px] font-bold text-gold">{t("formSuccess")}</p>
      )}
      {status === "error" && (
        <p className="text-[13.5px] font-bold text-[#e07a5f]">{t("formError")}</p>
      )}
      {status === "validation-error" && (
        <p className="text-[13.5px] font-bold text-[#e07a5f]">
          {t("formErrorRequired")}
        </p>
      )}
    </form>
  );
}
