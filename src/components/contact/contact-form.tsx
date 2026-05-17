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

const fieldCls =
  "mt-1.5 w-full border-hairline bg-transparent px-3 py-2.5 text-sm text-foreground outline-none focus:border-accent aria-[invalid=true]:border-accent";
const labelCls =
  "block font-sans text-[11px] font-medium uppercase tracking-[0.08em] text-subtle";

// Fields that carry a specific, actionable error message (vs. one
// generic "review the fields" — REFACTOR audit F1). Each input wires
// aria-invalid + aria-describedby to its message for screen readers.
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
  const [status, setStatus] = useState<
    "idle" | "sending" | "success" | "error"
  >("idle");

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ContactInput>({ resolver: zodResolver(contactSchema) });

  async function onSubmit(data: ContactInput) {
    setStatus("sending");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!res.ok) throw new Error("send failed");
      setStatus("success");
      reset();
    } catch {
      setStatus("error");
    }
  }

  if (status === "success") {
    return (
      <p className="border-hairline px-5 py-6 text-sm text-foreground">
        {t("success")}
      </p>
    );
  }

  const stageLabels: Record<(typeof STAGES)[number], string> = {
    diagnosing: t("stageDiagnosing"),
    implementing: t("stageImplementing"),
    "second-opinion": t("stageSecondOpinion"),
    other: t("stageOther"),
  };

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

  // Shared a11y wiring for an invalid field.
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

      {/* Honeypot — visually hidden, must stay empty */}
      <div className="hidden" aria-hidden>
        <label htmlFor="website">Website</label>
        <input
          id="website"
          tabIndex={-1}
          autoComplete="off"
          {...register("website")}
        />
      </div>

      {status === "error" && (
        <p role="alert" className="text-xs text-accent">
          {t("error")}
        </p>
      )}

      <button
        type="submit"
        disabled={status === "sending"}
        className="bg-foreground px-5 py-3 text-sm font-medium text-background transition-opacity hover:opacity-90 disabled:opacity-50"
      >
        {status === "sending" ? t("sending") : t("submit")}
      </button>
    </form>
  );
}
