import React, { useState } from 'react';
import {
  X,
  BookOpen,
  Terminal,
  Code2,
  CheckCircle2,
  AlertTriangle,
  Layers,
  Film,
  Globe,
  Copy,
  Check,
  Sparkles,
} from 'lucide-react';

interface DeploymentGuideModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const DeploymentGuideModal: React.FC<DeploymentGuideModalProps> = ({
  isOpen,
  onClose,
}) => {
  const [activeTab, setActiveTab] = useState<'architecture' | 'video-trick' | 'cloudflare' | 'code-snippets'>('architecture');
  const [copiedKey, setCopiedKey] = useState<string | null>(null);

  if (!isOpen) return null;

  const copyToClipboard = (text: string, key: string) => {
    navigator.clipboard.writeText(text);
    setCopiedKey(key);
    setTimeout(() => setCopiedKey(null), 2000);
  };

  const ffmpegCommand = `ffmpeg -i honey_input.mp4 -movflags faststart -pix_fmt yuv420p -vf "scale=1920:-2" -c:v libx264 -profile:v high -level 4.1 -g 1 -keyint_min 1 -b:v 2.5M -an honey_scroll_ready.mp4`;

  const videoReactComponent = `import React, { useEffect, useRef } from 'react';

export const HoneyScrollVideo = () => {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    // اطمینان از بارگذاری کامل متادیتا
    const handleLoaded = () => {
      console.log('Video duration:', video.duration);
    };
    video.addEventListener('loadedmetadata', handleLoaded);

    let animationFrameId: number;

    const handleScroll = () => {
      if (!video || !video.duration) return;
      
      const scrollTop = window.scrollY;
      const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
      const scrollFraction = Math.max(0, Math.min(1, scrollTop / maxScroll));

      // کنترل نرم فریم ویدیو
      cancelAnimationFrame(animationFrameId);
      animationFrameId = requestAnimationFrame(() => {
        video.currentTime = scrollFraction * video.duration;
      });
    };

    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      window.removeEventListener('scroll', handleScroll);
      cancelAnimationFrame(animationFrameId);
      video.removeEventListener('loadedmetadata', handleLoaded);
    };
  }, []);

  return (
    <div className="sticky top-0 h-screen w-full flex items-center justify-center overflow-hidden">
      <video
        ref={videoRef}
        src="/videos/honey_scroll_ready.mp4"
        playsInline
        muted
        preload="auto"
        className="w-full h-full object-contain pointer-events-none"
      />
    </div>
  );
};`;

  const cloudflareConfig = `# تنظیمات بیلد برای Cloudflare Pages:
# Framework Preset: Vite
# Build Command: npm run build
# Build Output Directory: dist
# Root Directory: /

# متغیر محیطی حیاتی در داشبورد کلادفلر (Environment Variables):
NODE_VERSION = 20`;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/75 backdrop-blur-md animate-in fade-in duration-200">
      <div className="relative w-full max-w-4xl max-h-[92vh] bg-[#faf7f2] rounded-3xl border border-[#d8c8b4] shadow-2xl flex flex-col text-[#1e1714] overflow-hidden">
        
        {/* Header */}
        <div className="p-5 md:p-6 border-b border-[#e9ded0] bg-white flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-2xl bg-gradient-to-tr from-amber-600 to-amber-700 text-white shadow-md">
              <BookOpen className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="font-editorial text-xl md:text-2xl font-bold text-[#1e1714]">
                  راهنمای فنی ساخت سایت SWiRL و رفع مشکل کلادفلر
                </h2>
                <span className="hidden sm:inline-block px-2.5 py-0.5 rounded-full bg-amber-100 text-amber-900 text-[10px] font-bold font-mono">
                  SOLVED
                </span>
              </div>
              <p className="text-xs text-neutral-500 font-persian mt-0.5">
                راز ساخت سایت استودیوهای خارجی با ویدیوهای عسل، اسکرول نرم، و دیپلوی ۱۰۰٪ موفق
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-full text-neutral-400 hover:text-neutral-800 hover:bg-neutral-100 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab Navigation */}
        <div className="flex border-b border-[#e9ded0] bg-[#f5ede2] px-4 md:px-6 overflow-x-auto no-scrollbar font-persian text-xs">
          <button
            onClick={() => setActiveTab('architecture')}
            className={`py-3.5 px-4 font-semibold border-b-2 transition-all cursor-pointer whitespace-nowrap flex items-center gap-2 ${
              activeTab === 'architecture'
                ? 'border-amber-800 text-amber-900 bg-white/60'
                : 'border-transparent text-neutral-600 hover:text-neutral-900'
            }`}
          >
            <Layers className="w-4 h-4 text-amber-700" />
            <span>۱. این سایت‌ها چطور ساخته می‌شوند؟</span>
          </button>

          <button
            onClick={() => setActiveTab('video-trick')}
            className={`py-3.5 px-4 font-semibold border-b-2 transition-all cursor-pointer whitespace-nowrap flex items-center gap-2 ${
              activeTab === 'video-trick'
                ? 'border-amber-800 text-amber-900 bg-white/60'
                : 'border-transparent text-neutral-600 hover:text-neutral-900'
            }`}
          >
            <Film className="w-4 h-4 text-amber-700" />
            <span>۲. راز ۳ ویدیوی عسل و اسکرول بدون لگ</span>
          </button>

          <button
            onClick={() => setActiveTab('cloudflare')}
            className={`py-3.5 px-4 font-semibold border-b-2 transition-all cursor-pointer whitespace-nowrap flex items-center gap-2 ${
              activeTab === 'cloudflare'
                ? 'border-amber-800 text-amber-900 bg-white/60'
                : 'border-transparent text-neutral-600 hover:text-neutral-900'
            }`}
          >
            <Globe className="w-4 h-4 text-amber-700" />
            <span>۳. حل خطای Cloudflare و GitHub</span>
          </button>

          <button
            onClick={() => setActiveTab('code-snippets')}
            className={`py-3.5 px-4 font-semibold border-b-2 transition-all cursor-pointer whitespace-nowrap flex items-center gap-2 ${
              activeTab === 'code-snippets'
                ? 'border-amber-800 text-amber-900 bg-white/60'
                : 'border-transparent text-neutral-600 hover:text-neutral-900'
            }`}
          >
            <Code2 className="w-4 h-4 text-amber-700" />
            <span>۴. کدهای آماده برای کپی</span>
          </button>
        </div>

        {/* Tab Body Content */}
        <div className="flex-1 overflow-y-auto p-5 md:p-7 space-y-6 text-sm font-persian leading-relaxed text-[#2d2420]">
          
          {/* TAB 1: Architecture Breakdown */}
          {activeTab === 'architecture' && (
            <div className="space-y-6">
              <div className="p-4 rounded-2xl bg-amber-50 border border-amber-200/80 flex items-start gap-3">
                <Sparkles className="w-5 h-5 text-amber-700 shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-bold text-amber-900 text-sm">
                    پاسخ به سوال شما: «چطور می‌توانم سایتی شبیه ویدیوی enkywebstudio بسازم؟»
                  </h4>
                  <p className="text-xs text-amber-800 mt-1 leading-normal">
                    استودیوهای حرفه‌ای مانند <strong>enkywebstudio</strong> از یکی از ۳ تکنیک زیر استفاده می‌کنند:
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="p-4 rounded-2xl bg-white border border-[#ded4c5] space-y-2">
                  <div className="w-8 h-8 rounded-xl bg-orange-100 text-orange-800 flex items-center justify-center font-bold text-xs">
                    روش ۱
                  </div>
                  <h5 className="font-bold text-neutral-900 text-sm">Video Scrubbing با اسکرول</h5>
                  <p className="text-xs text-neutral-600">
                    رندر ۳ بعدی در بلندر یا سینمافوردی به فرمت ویدیویی MP4 و کنترل <code>currentTime</code> با اسکرول موس کاربر.
                  </p>
                  <span className="inline-block text-[10px] font-mono text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded">
                    کیفیت فوق‌العاده بالا
                  </span>
                </div>

                <div className="p-4 rounded-2xl bg-white border border-[#ded4c5] space-y-2">
                  <div className="w-8 h-8 rounded-xl bg-amber-100 text-amber-800 flex items-center justify-center font-bold text-xs">
                    روش ۲
                  </div>
                  <h5 className="font-bold text-neutral-900 text-sm">رندر زنده WebGL / Three.js</h5>
                  <p className="text-xs text-neutral-600">
                    دقیقاً همان چیزی که در این سایت زنده برایتان کدنویسی کردیم! محاسبات فرمول ریاضی منحنی چرخش عسل، رفلکس شیشه، و چرخش آزاد ۳ بعدی با دست یا ماوس.
                  </p>
                  <span className="inline-block text-[10px] font-mono text-blue-700 bg-blue-50 px-2 py-0.5 rounded">
                    حجم فوق‌العاده سبک
                  </span>
                </div>

                <div className="p-4 rounded-2xl bg-white border border-[#ded4c5] space-y-2">
                  <div className="w-8 h-8 rounded-xl bg-purple-100 text-purple-800 flex items-center justify-center font-bold text-xs">
                    روش ۳
                  </div>
                  <h5 className="font-bold text-neutral-900 text-sm">Canvas Image Sequence</h5>
                  <p className="text-xs text-neutral-600">
                    روشی که اپل در صفحه معرفی محصولاتش استفاده می‌کند: استخراج ۱۲۰ تصویر وب‌په (WebP) و نقاشی روی عنصر Canvas در اسکرول.
                  </p>
                  <span className="inline-block text-[10px] font-mono text-purple-700 bg-purple-50 px-2 py-0.5 rounded">
                    ۱۰۰٪ روان در تمام گوشی‌ها
                  </span>
                </div>
              </div>

              {/* Aesthetic Secrets */}
              <div className="bg-white rounded-2xl p-5 border border-[#ded4c5] space-y-3">
                <h4 className="font-bold text-neutral-900 flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  عناصر زیبایی‌شناسی کلیدی در این طراحی (Editorial Luxury Aesthetic):
                </h4>
                <ul className="list-disc list-inside space-y-1.5 text-xs text-neutral-600 pr-2">
                  <li>
                    <strong>رنگ پس‌زمینه کرم/عاجی:</strong> کد رنگی <code>#f4efe6</code> تا <code>#faf7f2</code> حس گرم عسل و کاغذ روزنامه لوکس را تداعی می‌کند.
                  </li>
                  <li>
                    <strong>تایپوگرافی سریف بولد:</strong> فونت‌هایی مانند Playfair Display و Italiana با نسبت کنتراست خطی بالا برای تیترهای بزرگ (GOOD THINGS COME AROUND AND AROUND).
                  </li>
                  <li>
                    <strong>هات‌اسپات‌های شناور (Pill Badges):</strong> برچسب‌های کپسولی سفید با خط نازک اتصال و نقطه تپنده (Pulsing Pin) که با هاور جزئیات را نمایش می‌دهند.
                  </li>
                </ul>
              </div>
            </div>
          )}

          {/* TAB 2: Video Scrubbing Secret */}
          {activeTab === 'video-trick' && (
            <div className="space-y-6">
              <div className="p-4 rounded-2xl bg-red-50 border border-red-200 text-red-950 space-y-2">
                <div className="flex items-center gap-2 font-bold text-sm">
                  <AlertTriangle className="w-4 h-4 text-red-600" />
                  چرا هر بار ویدیوهای عسل را به اسکرول وصل می‌کنی لگ می‌زند یا فریز می‌شود؟
                </div>
                <p className="text-xs leading-relaxed text-red-900">
                  در ویدیوهای استاندارد MP4، تصویر کامل (Keyframe) فقط هر <strong>۱ الی ۲ ثانیه یک‌بار</strong> ذخیره می‌شود. وقتی کاربر صفحه را اسکرول می‌کند، مرورگر باید فریم‌های میانی را با فشار محاسباتی سنگین رمزگشایی کند، که باعث گیر کردن و لکنت شدید می‌شود!
                </p>
              </div>

              <div className="bg-white rounded-2xl p-5 border border-[#ded4c5] space-y-3">
                <div className="flex items-center justify-between">
                  <h4 className="font-bold text-neutral-900 flex items-center gap-2 text-sm">
                    <Terminal className="w-4 h-4 text-amber-700" />
                    فرمول جادویی تبدیل ویدیو با FFmpeg (کلید حل این معضل):
                  </h4>
                  <button
                    onClick={() => copyToClipboard(ffmpegCommand, 'ffmpeg')}
                    className="flex items-center gap-1 text-xs text-amber-800 bg-amber-50 hover:bg-amber-100 px-2.5 py-1 rounded-lg border border-amber-200 transition-colors"
                  >
                    {copiedKey === 'ffmpeg' ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                    <span>{copiedKey === 'ffmpeg' ? 'کپی شد!' : 'کپی دستور'}</span>
                  </button>
                </div>

                <div className="bg-neutral-900 text-amber-300 p-3.5 rounded-xl font-mono text-xs overflow-x-auto text-left" dir="ltr">
                  {ffmpegCommand}
                </div>

                <div className="text-xs text-neutral-600 space-y-1 pt-1">
                  <p>
                    <strong>توضیح پارامترهای کلیدی:</strong>
                  </p>
                  <ul className="list-disc list-inside pr-2 space-y-1 text-neutral-500 text-[11px]">
                    <li><code>-g 1 -keyint_min 1</code> : هر تک‌فریم ویدیو تبدیل به Keyframe می‌شود (اسکرول با سرعت ۶۰ فریم در ثانیه کاملاً روان و بدون ۱ میلی‌ثانیه تاخیر!).</li>
                    <li><code>-movflags faststart</code> : متادیتا را به ابتدای فایل منتقل می‌کند تا لود آنی شود.</li>
                    <li><code>-b:v 2.5M</code> : حجم ویدیو را به زیر ۱۰ مگابایت می‌رساند تا در گیت‌هاب و هاست بدون مشکل اجرا شود.</li>
                  </ul>
                </div>
              </div>
            </div>
          )}

          {/* TAB 3: Cloudflare & GitHub Fixes */}
          {activeTab === 'cloudflare' && (
            <div className="space-y-6">
              <div className="bg-white rounded-2xl p-5 border border-[#ded4c5] space-y-4">
                <h4 className="font-bold text-neutral-900 text-sm flex items-center gap-2">
                  <Globe className="w-4 h-4 text-blue-600" />
                  چک‌لیست رفع خطای دیپلوی در Cloudflare Pages:
                </h4>

                <div className="space-y-3">
                  <div className="p-3.5 rounded-xl bg-neutral-50 border border-neutral-200 flex items-start gap-3">
                    <span className="w-6 h-6 rounded-full bg-blue-100 text-blue-800 text-xs font-bold flex items-center justify-center shrink-0">
                      ۱
                    </span>
                    <div>
                      <h5 className="font-bold text-xs text-neutral-900">تنظیم دقیق Build Settings</h5>
                      <p className="text-xs text-neutral-600 mt-0.5">
                        در داشبورد Cloudflare Pages بخش <strong>Build configurations</strong>:
                      </p>
                      <ul className="text-xs font-mono text-neutral-700 mt-1 bg-white p-2 rounded border border-neutral-200 space-y-0.5" dir="ltr">
                        <li>Framework preset: Vite</li>
                        <li>Build command: npm run build</li>
                        <li>Build output directory: dist</li>
                      </ul>
                    </div>
                  </div>

                  <div className="p-3.5 rounded-xl bg-neutral-50 border border-neutral-200 flex items-start gap-3">
                    <span className="w-6 h-6 rounded-full bg-amber-100 text-amber-800 text-xs font-bold flex items-center justify-center shrink-0">
                      ۲
                    </span>
                    <div>
                      <h5 className="font-bold text-xs text-neutral-900">تنظیم متغیر محیطی Node.js</h5>
                      <p className="text-xs text-neutral-600 mt-0.5">
                        کلادفلر به طور پیش‌فرض نسخه قدیمی نود (Node 12 یا 16) را استفاده می‌کند که باعث خطای SyntaxError در Vite جدید می‌شود.
                      </p>
                      <p className="text-xs text-neutral-700 mt-1">
                        راه‌حل: در تب <strong>Settings → Environment variables</strong> کلادفلر، یک متغیر با نام <code>NODE_VERSION</code> و مقدار <code>20</code> تعریف کنید.
                      </p>
                    </div>
                  </div>

                  <div className="p-3.5 rounded-xl bg-neutral-50 border border-neutral-200 flex items-start gap-3">
                    <span className="w-6 h-6 rounded-full bg-emerald-100 text-emerald-800 text-xs font-bold flex items-center justify-center shrink-0">
                      ۳
                    </span>
                    <div>
                      <h5 className="font-bold text-xs text-neutral-900">حل مشکل حجم بالای ویدیوها در GitHub</h5>
                      <p className="text-xs text-neutral-600 mt-0.5">
                        گیت‌هاب اجازه پوش کردن فایل‌های بزرگتر از ۱۰۰ مگابایت را نمی‌دهد. ویدیوهای عسل را با دستور تب قبل فشرده کنید، یا آن را مستقیماً در <strong>Cloudflare R2</strong> یا یک CDN رایگان آپلود کنید و آدرس مستقیم لینک ویدیو را در <code>&lt;video src="..."&gt;</code> بگذارید.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 4: Ready Code Snippets */}
          {activeTab === 'code-snippets' && (
            <div className="space-y-6">
              <div className="bg-white rounded-2xl p-5 border border-[#ded4c5] space-y-3">
                <div className="flex items-center justify-between">
                  <h4 className="font-bold text-neutral-900 text-sm">
                    کامپوننت آماده React برای اسکرول ویدیو (HoneyScrollVideo.tsx):
                  </h4>
                  <button
                    onClick={() => copyToClipboard(videoReactComponent, 'react-code')}
                    className="flex items-center gap-1 text-xs text-amber-800 bg-amber-50 hover:bg-amber-100 px-2.5 py-1 rounded-lg border border-amber-200 transition-colors"
                  >
                    {copiedKey === 'react-code' ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                    <span>{copiedKey === 'react-code' ? 'کپی شد!' : 'کپی کامل کد'}</span>
                  </button>
                </div>

                <div className="bg-neutral-900 text-neutral-200 p-4 rounded-xl font-mono text-xs overflow-x-auto max-h-72 text-left" dir="ltr">
                  <pre>{videoReactComponent}</pre>
                </div>
              </div>

              <div className="bg-white rounded-2xl p-5 border border-[#ded4c5] space-y-3">
                <div className="flex items-center justify-between">
                  <h4 className="font-bold text-neutral-900 text-sm">
                    تنظیمات Cloudflare Pages:
                  </h4>
                  <button
                    onClick={() => copyToClipboard(cloudflareConfig, 'cf-code')}
                    className="flex items-center gap-1 text-xs text-amber-800 bg-amber-50 hover:bg-amber-100 px-2.5 py-1 rounded-lg border border-amber-200 transition-colors"
                  >
                    {copiedKey === 'cf-code' ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                    <span>{copiedKey === 'cf-code' ? 'کپی شد!' : 'کپی متن'}</span>
                  </button>
                </div>

                <div className="bg-neutral-900 text-emerald-400 p-3 rounded-xl font-mono text-xs text-left" dir="ltr">
                  <pre>{cloudflareConfig}</pre>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-4 md:p-5 border-t border-[#e9ded0] bg-white flex items-center justify-between">
          <div className="flex items-center gap-2 text-xs text-neutral-500 font-persian">
            <span className="w-2 h-2 rounded-full bg-emerald-500" />
            <span>پروژه آماده بیلد و اجرای روی Cloudflare Pages است.</span>
          </div>

          <button
            onClick={onClose}
            className="px-6 py-2.5 rounded-full bg-[#1e1714] hover:bg-neutral-800 text-white font-medium text-xs tracking-wider uppercase transition-colors shadow-sm cursor-pointer"
          >
            مشاهده سایت زنده (Live Swirl)
          </button>
        </div>
      </div>
    </div>
  );
};
