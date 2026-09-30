import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";

type ContactPayload = {
  name?: string;
  email?: string;
  phone?: string;
  message?: string;
};

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function escapeHtml(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

export async function POST(req: NextRequest) {
  let body: ContactPayload;

  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "invalid-json" }, { status: 400 });
  }

  const name = (body.name || "").trim();
  const email = (body.email || "").trim();
  const phone = (body.phone || "").trim();
  const message = (body.message || "").trim();

  if (!name || !email || !message) {
    return NextResponse.json({ error: "missing-fields" }, { status: 400 });
  }

  if (!EMAIL_RE.test(email)) {
    return NextResponse.json({ error: "invalid-email" }, { status: 400 });
  }

  const html = `
    <div style="font-family: Arial, sans-serif; direction: rtl; text-align: right; color: #1a1a1a;">
      <h2 style="margin: 0 0 16px;">رسالة جديدة من نموذج التواصل</h2>
      <p style="margin: 0 0 8px;"><strong>الاسم:</strong> ${escapeHtml(name)}</p>
      <p style="margin: 0 0 8px;"><strong>البريد الإلكتروني:</strong> ${escapeHtml(email)}</p>
      <p style="margin: 0 0 8px;"><strong>الجوال:</strong> ${escapeHtml(phone || "-")}</p>
      <p style="margin: 16px 0 4px;"><strong>الرسالة:</strong></p>
      <p style="margin: 0; white-space: pre-wrap;">${escapeHtml(message)}</p>
    </div>
  `;

  const apiKey = process.env.RESEND_API_KEY;

  if (!apiKey) {
    console.error("[contact] RESEND_API_KEY is not set");
    // fallback: نسجل الطلب في اللوق حتى ما تضيع الرسالة إذا كانت خدمة الإيميل غير مفعّلة
    console.log("[contact] new submission (fallback log)", { name, email, phone, message });
    return NextResponse.json(
      {
        error: "email-not-configured",
        message: "خدمة إرسال الإيميل غير مفعّلة حالياً، تواصل معنا مباشرة على واتساب.",
      },
      { status: 500 }
    );
  }

  try {
    const resend = new Resend(apiKey);
    const { error } = await resend.emails.send({
      from: "موقع عرب روك <notifications@arabrocks.com>",
      to: "sales@arabrocks.com",
      replyTo: email,
      subject: `رسالة جديدة من موقع عرب روك — ${name}`,
      html,
    });

    if (error) {
      console.error("[contact] resend send failed", error);
      console.log("[contact] new submission (fallback log)", { name, email, phone, message });
      return NextResponse.json(
        { error: "email-send-failed", message: error.message },
        { status: 502 }
      );
    }
  } catch (err) {
    console.error("[contact] resend threw", err);
    console.log("[contact] new submission (fallback log)", { name, email, phone, message });
    return NextResponse.json(
      { error: "email-send-failed", message: "تعذر إرسال الرسالة، حاول مرة أخرى لاحقاً." },
      { status: 502 }
    );
  }

  return NextResponse.json({ ok: true }, { status: 200 });
}
