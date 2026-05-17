"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useTranslations } from "next-intl";
import {
  contactSchema,
  STAGES,
  type ContactInput,
} from "../../lib/contact-schema";

const fieldCls =
  "mt-1.5 w-full border-hairline bg-transparent px-3 py-2.5 text-sm text-foreground outline-none focus:border-accent";
const labelCls =
  "block font-sans text-[11px] font-medium uppercase tracking-[0.08em] text-subtle";

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

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate className="space-y-5">
      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label className={labelCls} htmlFor="name">
            {t("fName")}
          </label>
          <input id="name" className={fieldCls} {...register("name")} />
          {errors.name && (
            <p className="mt-1 text-xs text-accent">{t("invalid")}</p>
          )}
        </div>
        <div>
          <label className={labelCls} htmlFor="email">
            {t("fEmail")}
          </label>
          <input
            id="email"
            type="email"
            className={fieldCls}
            {...register("email")}
          />
          {errors.email && (
            <p className="mt-1 text-xs text-accent">{t("invalid")}</p>
          )}
        </div>
        <div>
          <label className={labelCls} htmlFor="org">
            {t("fOrg")}
          </label>
          <input id="org" className={fieldCls} {...register("org")} />
          {errors.org && (
            <p className="mt-1 text-xs text-accent">{t("invalid")}</p>
          )}
        </div>
        <div>
          <label className={labelCls} htmlFor="role">
            {t("fRole")}
          </label>
          <input id="role" className={fieldCls} {...register("role")} />
          {errors.role && (
            <p className="mt-1 text-xs text-accent">{t("invalid")}</p>
          )}
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
        {errors.stage && (
          <p className="mt-1 text-xs text-accent">{t("invalid")}</p>
        )}
      </div>

      <div>
        <label className={labelCls} htmlFor="message">
          {t("fMessage")}
        </label>
        <textarea
          id="message"
          rows={5}
          className={fieldCls}
          {...register("message")}
        />
        {errors.message && (
          <p className="mt-1 text-xs text-accent">{t("invalid")}</p>
        )}
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
        <p className="text-xs text-accent">{t("error")}</p>
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
