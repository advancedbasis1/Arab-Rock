import { NextRequest, NextResponse } from "next/server";

type ContactPayload = {
  name?: string;
  email?: string;
  phone?: string;
  message?: string;
};

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

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

  // TODO: ربط Resend لاحقاً لإرسال إيميل فعلي لصندوق وارد الشركة.
  // نموذج جاهز (يحتاج تركيب الحزمة: npm install resend):
  //
  // import { Resend } from "resend";
  // const resend = new Resend(process.env.RESEND_API_KEY);
  //
  // await resend.emails.send({
  //   from: "Arab Rock Website <onboarding@resend.dev>",
  //   to: "info@advancedarabia.com",
  //   replyTo: email,
  //   subject: `رسالة جديدة من موقع عرب روك — ${name}`,
  //   text: `الاسم: ${name}\nالبريد: ${email}\nالجوال: ${phone || "-"}\n\n${message}`,
  // });

  // مؤقتاً: نسجل الطلب في اللوق حتى يتم ربط مزود الإيميل.
  console.log("[contact] new submission", { name, email, phone, message });

  return NextResponse.json({ ok: true }, { status: 200 });
}
