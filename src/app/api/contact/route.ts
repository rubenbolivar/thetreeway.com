import { NextResponse } from "next/server";
import { Resend } from "resend";
import { contactSchema } from "../../../lib/contact-schema";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const STAGE_LABEL: Record<string, string> = {
  diagnosing: "Diagnosticando",
  implementing: "En implementación",
  "second-opinion": "Buscando segunda opinión",
  other: "Otro",
};

export async function POST(req: Request) {
  let json: unknown;
  try {
    json = await req.json();
  } catch {
    return NextResponse.json({ error: "bad json" }, { status: 400 });
  }

  const parsed = contactSchema.safeParse(json);
  if (!parsed.success) {
    return NextResponse.json({ error: "invalid" }, { status: 400 });
  }
  const d = parsed.data;

  // Honeypot filled → pretend success, do not send (don't tip off bots).
  if (d.website && d.website.length > 0) {
    return NextResponse.json({ ok: true });
  }

  const apiKey = process.env.RESEND_API_KEY;
  const from = process.env.RESEND_FROM;
  const to = process.env.RESEND_TO;
  if (!apiKey || !from || !to) {
    return NextResponse.json({ error: "not configured" }, { status: 500 });
  }

  const resend = new Resend(apiKey);
  const text = [
    `Nombre: ${d.name}`,
    `Email: ${d.email}`,
    `Organización: ${d.org}`,
    `Rol: ${d.role}`,
    `Etapa: ${STAGE_LABEL[d.stage] ?? d.stage}`,
    "",
    "Mensaje:",
    d.message,
  ].join("\n");

  try {
    const { error } = await resend.emails.send({
      from,
      to,
      replyTo: d.email,
      subject: `Nueva consulta — ${d.org} (${d.name})`,
      text,
    });
    if (error) {
      return NextResponse.json({ error: "send failed" }, { status: 502 });
    }
    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ error: "send failed" }, { status: 502 });
  }
}
