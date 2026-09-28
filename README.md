# موقع Arab Rock (عرب روك)

موقع الشركة مبني بـ **Next.js 16 (App Router) + TypeScript + Tailwind CSS 4**، ودعم لغتين (عربي RTL / إنجليزي LTR) عبر **next-intl**.

## التشغيل محلياً

```bash
npm install
npm run dev
```

افتح http://localhost:3000 — الصفحة الرئيسية بالعربي (بدون بادئة بالرابط)، والإنجليزي على http://localhost:3000/en

## أوامر المشروع

- `npm run dev` — تشغيل بيئة التطوير
- `npm run build` — بناء نسخة الإنتاج (يتحقق من الأخطاء البرمجية)
- `npm run start` — تشغيل نسخة الإنتاج بعد البناء
- `npm run lint` — فحص الكود بـ ESLint

## هيكلة المشروع

```
src/
  app/
    [locale]/          كل الصفحات (عربي/إنجليزي عبر next-intl)
      layout.tsx        التخطيط الرئيسي (خطوط، Header، Footer، اتجاه الصفحة)
      page.tsx           الرئيسية
      about/              من نحن
      services/           الخدمات
      projects/           المشاريع (حالياً حالة "قيد الإعداد")
      partners/            الشركاء (حالياً حالة "قيد الإعداد")
      contact/             تواصل معنا (فورم فعلي)
    api/
      contact/route.ts   API Route لاستقبال نموذج التواصل
    globals.css           ألوان وخطوط الهوية البصرية (Tailwind v4 @theme)
  components/             كل المكونات المشتركة (Header, Footer, بطاقات, أيقونات...)
  config/site.ts          بيانات التواصل والدومين والروابط الثابتة
  i18n/                   إعدادات next-intl (routing, navigation, request)
  middleware.ts           توجيه اللغة تلقائياً
messages/
  ar.json                 كل نصوص الموقع بالعربي
  en.json                 كل نصوص الموقع بالإنجليزي
public/
  logo-black.png          الشعار (نسخة سوداء شفافة)
  logo-white.png          الشعار (نسخة بيضاء شفافة - مستخدمة بالهيدر/الفوتر الداكن)
```

## إضافة أو تعديل محتوى

كل نصوص الموقع موجودة بملفين فقط: `messages/ar.json` و `messages/en.json`. عدّل النص هناك وينعكس في كل مكان يستخدمه — ما تحتاج تلمس كود React إلا إذا أضفت قسم/صفحة جديدة كلياً.

## ربط نموذج التواصل بالإيميل (Resend)

النموذج حالياً يستقبل البيانات عبر `POST /api/contact` ويسجلها فقط (console.log) لحين ربط مزود إيميل فعلي. لتفعيل الإرسال الفعلي:

1. سجّل حساب مجاني على [resend.com](https://resend.com) واحصل على `RESEND_API_KEY`
2. ثبّت الحزمة: `npm install resend`
3. انسخ `.env.example` إلى `.env.local` وحط المفتاح فيه
4. فعّل الكود المعلّق (commented) داخل `src/app/api/contact/route.ts`

## اللغتان والاتجاه (RTL/LTR)

- العربية هي اللغة الافتراضية وتظهر بدون بادئة بالرابط (`/`, `/about`, ...)
- الإنجليزية تظهر ببادئة `/en` (`/en`, `/en/about`, ...)
- الاتجاه (`dir="rtl"` أو `dir="ltr"`) يتغيّر تلقائياً حسب اللغة من `src/app/[locale]/layout.tsx`

## النشر (Deployment)

أسهل طريقة نشر لمشروع Next.js هي [Vercel](https://vercel.com) (نفس الشركة المطوّرة لـ Next.js):

1. ارفع المشروع على GitHub (repo خاص أو عام)
2. سجّل دخول Vercel بحساب GitHub واستورد الـ repo
3. Vercel يكتشف إعدادات Next.js تلقائياً — اضغط Deploy
4. بعدها من Project Settings → Domains أضف `arabrocks.com` واتبع تعليمات DNS

ملاحظة: هذا المشروع يحتوي API Route (`/api/contact`)، فما ينفع ينشر كملفات ثابتة على استضافة عادية أو Netlify Drop — يحتاج منصة تدعم Node.js/Serverless Functions مثل Vercel (الأنسب لـ Next.js) أو Netlify (بإعداد إضافي).

## الخطوات القادمة (تدريجياً)

- [ ] تعبئة قسم المشاريع بمشاريع فعلية
- [ ] تعبئة قسم الشركاء بشعارات/تفاصيل
- [ ] ربط Resend لإرسال إيميلات نموذج التواصل فعلياً
- [ ] إضافة شريط إحصائيات (عدد مشاريع، سنوات خبرة، شهادات...) بالصفحة الرئيسية
- [ ] رفع صور حقيقية للمحاجر/المعدات بدل الرسومات التوضيحية
