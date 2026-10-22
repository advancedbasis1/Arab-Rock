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

  const field = (label: string, value: string, ltr = false) => `
    <tr>
      <td style="padding:0 0 18px;">
        <p style="margin:0 0 6px;font-family:Arial,Helvetica,sans-serif;font-size:11.5px;color:#aaa49a;letter-spacing:.2px;">${label}</p>
        <p style="margin:0 0 10px;font-family:Arial,Helvetica,sans-serif;font-size:15.5px;color:#121110;font-weight:bold;" ${ltr ? 'dir="ltr" align="right"' : ""}>${value}</p>
        <div style="border-bottom:2px solid #f0e2bd;line-height:0;font-size:0;">&nbsp;</div>
      </td>
    </tr>`;

  const html = `
  <div style="background-color:#f3f1ee;padding:32px 16px;font-family:Arial,Helvetica,sans-serif;" dir="rtl">
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="max-width:580px;margin:0 auto;background-color:#ffffff;border-radius:14px;overflow:hidden;border:1px solid #e9e5de;">
      <tr>
        <td style="background-color:#121110;padding:30px 32px;text-align:center;">
          <img src="https://www.arabrocks.com/logo-white.png" alt="Arab Rock" width="130" style="display:block;margin:0 auto;height:auto;border:0;" />
        </td>
      </tr>
      <tr>
        <td style="background-color:#d99a2b;height:4px;line-height:4px;font-size:0;">&nbsp;</td>
      </tr>
      <tr>
        <td style="padding:28px 32px 4px;" align="right">
          <h1 style="margin:0;font-family:Arial,Helvetica,sans-serif;font-size:19px;color:#121110;">رسالة جديدة من نموذج التواصل</h1>
          <p style="margin:6px 0 0;font-family:Arial,Helvetica,sans-serif;font-size:12.5px;color:#aaa49a;">موقع عرب روك — arabrocks.com</p>
        </td>
      </tr>
      <tr>
        <td style="padding:10px 32px 0;">
          <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
            ${field("الاسم", escapeHtml(name))}
            ${field("البريد الإلكتروني", escapeHtml(email), true)}
            ${field("الجوال", escapeHtml(phone || "-"), true)}
          </table>
        </td>
      </tr>
      <tr>
        <td style="padding:22px 32px 30px;" align="right">
          <p style="margin:0 0 8px;font-family:Arial,Helvetica,sans-serif;font-size:12px;color:#9a948a;">الرسالة</p>
          <div style="background-color:#faf6ec;border:1px solid #f0e2bd;border-radius:10px;padding:16px 18px;font-family:Arial,Helvetica,sans-serif;font-size:14.5px;line-height:1.8;color:#2c2a26;white-space:pre-wrap;">${escapeHtml(message)}</div>
        </td>
      </tr>
      <tr>
        <td style="background-color:#faf9f6;padding:18px 32px;text-align:center;border-top:1px solid #eeebe5;">
          <p style="margin:0;font-family:Arial,Helvetica,sans-serif;font-size:11.5px;color:#b3ada2;">تم الإرسال تلقائيًا من نموذج التواصل في موقع عرب روك — يمكنك الرد مباشرة على هذا الإيميل للتواصل مع المرسل</p>
        </td>
      </tr>
    </table>
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
