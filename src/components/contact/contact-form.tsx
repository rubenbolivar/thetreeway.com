"use client";

import { useState } from "react";
import { useForm, type FieldErrors } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useTranslations } from "next-intl";
import {
  contactSchema,
  STAGES,
  type ContactInput,
} from "../../lib/contact-schema";
import { social } from "../../content/config/social";

const fieldCls =
  "mt-1.5 w-full border-hairline bg-transparent px-3 py-2.5 text-sm text-foreground outline-none focus:border-accent aria-[invalid=true]:border-accent";
const labelCls =
  "block font-sans text-[11px] font-medium uppercase tracking-[0.08em] text-subtle";

// Firm WhatsApp number, digits only, from the single source of truth.
const WA_NUMBER = social.whatsapp.replace(/\D/g, "");

const FIELD_KEYS = [
  "name",
  "email",
  "org",
  "role",
  "stage",
  "message",
] as const;
type FieldKey = (typeof FIELD_KEYS)[number];

export function ContactForm() {
  const t = useTranslations("contact");
  const [waUrl, setWaUrl] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ContactInput>({ resolver: zodResolver(contactSchema) });

  const stageLabels: Record<(typeof STAGES)[number], string> = {
    diagnosing: t("stageDiagnosing"),
    implementing: t("stageImplementing"),
    "second-opinion": t("stageSecondOpinion"),
    other: t("stageOther"),
  };

  // Route the inquiry to WhatsApp instead of email: build a prefilled
  // wa.me deep link with the structured message and open it. Works with
  // no server/provider dependency.
  function onSubmit(data: ContactInput) {
    const text = [
      t("waIntro"),
      "",
      `${t("fName")}: ${data.name}`,
      `${t("fEmail")}: ${data.email}`,
      `${t("fOrg")}: ${data.org}`,
      `${t("fRole")}: ${data.role}`,
      `${t("fStage")}: ${stageLabels[data.stage]}`,
      "",
      `${t("fMessage")}:`,
      data.message,
    ].join("\n");
    const url = `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(text)}`;
    setWaUrl(url);
    window.open(url, "_blank", "noopener,noreferrer");
  }

  if (waUrl) {
    return (
      <div className="border-hairline px-5 py-6">
        <p className="text-sm text-foreground">{t("waSent")}</p>
        <a
          href={waUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-4 inline-block bg-foreground px-5 py-3 text-sm font-medium text-background transition-opacity hover:opacity-90"
        >
          {t("openWhatsapp")}
        </a>
      </div>
    );
  }

  const errKey: Record<FieldKey, string> = {
    name: "errName",
    email: "errEmail",
    org: "errOrg",
    role: "errRole",
    stage: "errStage",
    message: "errMessage",
  };

  const has = (k: FieldKey) =>
    Boolean((errors as FieldErrors<ContactInput>)[k]);

  const aria = (k: FieldKey) =>
    has(k)
      ? ({ "aria-invalid": true, "aria-describedby": `${k}-error` } as const)
      : {};

  const ErrorText = ({ k }: { k: FieldKey }) =>
    has(k) ? (
      <p
        id={`${k}-error`}
        role="alert"
        className="mt-1 text-xs text-accent"
      >
        {t(errKey[k])}
      </p>
    ) : null;

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate className="space-y-5">
      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label className={labelCls} htmlFor="name">
            {t("fName")}
          </label>
          <input
            id="name"
            className={fieldCls}
            {...aria("name")}
            {...register("name")}
          />
          <ErrorText k="name" />
        </div>
        <div>
          <label className={labelCls} htmlFor="email">
            {t("fEmail")}
          </label>
          <input
            id="email"
            type="email"
            className={fieldCls}
            {...aria("email")}
            {...register("email")}
          />
          <ErrorText k="email" />
        </div>
        <div>
          <label className={labelCls} htmlFor="org">
            {t("fOrg")}
          </label>
          <input
            id="org"
            className={fieldCls}
            {...aria("org")}
            {...register("org")}
          />
          <ErrorText k="org" />
        </div>
        <div>
          <label className={labelCls} htmlFor="role">
            {t("fRole")}
          </label>
          <input
            id="role"
            className={fieldCls}
            {...aria("role")}
            {...register("role")}
          />
          <ErrorText k="role" />
        </div>
      </div>

      <div>
        <label className={labelCls} htmlFor="stage">
          {t("fStage")}
        </label>
        <select
          id="stage"
          className={fieldCls}
          defaultValue=""
          {...aria("stage")}
          {...register("stage")}
        >
          <option value="" disabled>
            —
          </option>
          {STAGES.map((s) => (
            <option key={s} value={s}>
              {stageLabels[s]}
            </option>
          ))}
        </select>
        <ErrorText k="stage" />
      </div>

      <div>
        <label className={labelCls} htmlFor="message">
          {t("fMessage")}
        </label>
        <textarea
          id="message"
          rows={5}
          className={fieldCls}
          {...aria("message")}
          {...register("message")}
        />
        <ErrorText k="message" />
      </div>

      <button
        type="submit"
        className="bg-foreground px-5 py-3 text-sm font-medium text-background transition-opacity hover:opacity-90"
      >
        {t("submit")}
      </button>
    </form>
  );
}
