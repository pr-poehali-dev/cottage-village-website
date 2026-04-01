import { useState, useEffect, useRef } from "react";
import Icon from "@/components/ui/icon";

const ABOUT_PHOTOS = [
  "https://cdn.poehali.dev/projects/81fb4012-bd8d-4cdc-9eb1-7f33f4407205/bucket/190bf264-9021-48e6-a4a4-6db69ee8affc.jpg",
  "https://cdn.poehali.dev/projects/81fb4012-bd8d-4cdc-9eb1-7f33f4407205/bucket/c4bf963b-0530-47b2-80c8-2bb0ca496f10.jpg",
  "https://cdn.poehali.dev/projects/81fb4012-bd8d-4cdc-9eb1-7f33f4407205/bucket/d62354df-eacd-407d-9098-557780ec0448.jpg",
  "https://cdn.poehali.dev/projects/81fb4012-bd8d-4cdc-9eb1-7f33f4407205/bucket/4bbb71aa-a414-4d61-bbd4-bc74b124d7c6.jpg",
  "https://cdn.poehali.dev/projects/81fb4012-bd8d-4cdc-9eb1-7f33f4407205/bucket/753d24be-abac-4d60-a070-1a17d911a27d.jpg",
];

function AboutGallery() {
  const [current, setCurrent] = useState(0);
  const [animating, setAnimating] = useState(false);

  const go = (idx: number) => {
    if (animating || idx === current) return;
    setAnimating(true);
    setTimeout(() => {
      setCurrent(idx);
      setAnimating(false);
    }, 300);
  };

  const prev = () => go((current - 1 + ABOUT_PHOTOS.length) % ABOUT_PHOTOS.length);
  const next = () => go((current + 1) % ABOUT_PHOTOS.length);

  return (
    <div className="relative" style={{ aspectRatio: "4/5", overflow: "hidden" }}>
      {/* Image */}
      <div
        className="absolute inset-0 bg-cover bg-center transition-opacity duration-300"
        style={{
          backgroundImage: `url(${ABOUT_PHOTOS[current]})`,
          opacity: animating ? 0 : 1,
        }}
      />

      {/* Arrows */}
      <button
        onClick={prev}
        className="absolute left-3 top-1/2 -translate-y-1/2 z-10 w-10 h-10 flex items-center justify-center transition-all duration-200"
        style={{ backgroundColor: "rgba(0,0,0,0.45)", color: "white" }}
        onMouseOver={(e) => (e.currentTarget.style.backgroundColor = "rgba(0,0,0,0.7)")}
        onMouseOut={(e) => (e.currentTarget.style.backgroundColor = "rgba(0,0,0,0.45)")}
      >
        <Icon name="ChevronLeft" size={20} />
      </button>
      <button
        onClick={next}
        className="absolute right-3 top-1/2 -translate-y-1/2 z-10 w-10 h-10 flex items-center justify-center transition-all duration-200"
        style={{ backgroundColor: "rgba(0,0,0,0.45)", color: "white" }}
        onMouseOver={(e) => (e.currentTarget.style.backgroundColor = "rgba(0,0,0,0.7)")}
        onMouseOut={(e) => (e.currentTarget.style.backgroundColor = "rgba(0,0,0,0.45)")}
      >
        <Icon name="ChevronRight" size={20} />
      </button>

      {/* Dots */}
      <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-2 z-10">
        {ABOUT_PHOTOS.map((_, i) => (
          <button
            key={i}
            onClick={() => go(i)}
            className="transition-all duration-300"
            style={{
              width: i === current ? "24px" : "8px",
              height: "8px",
              borderRadius: "4px",
              backgroundColor: i === current ? "white" : "rgba(255,255,255,0.5)",
            }}
          />
        ))}
      </div>

      {/* Counter */}
      <div
        className="absolute top-3 right-3 z-10 font-body text-xs px-2.5 py-1"
        style={{ backgroundColor: "rgba(0,0,0,0.45)", color: "white", borderRadius: "2px" }}
      >
        {current + 1} / {ABOUT_PHOTOS.length}
      </div>
    </div>
  );
}

const HERO_IMAGE = "https://cdn.poehali.dev/projects/81fb4012-bd8d-4cdc-9eb1-7f33f4407205/bucket/190bf264-9021-48e6-a4a4-6db69ee8affc.jpg";
const SOSNOVIY_COLLAGE = "https://cdn.poehali.dev/projects/81fb4012-bd8d-4cdc-9eb1-7f33f4407205/bucket/4ccc5192-2acf-437d-87bb-fe3a2bd0580d.jpg";

// Отдельные зоны коллажа коттеджа «Сосновый» (через backgroundPosition)
// Коллаж: 2 колонки (лев 42%, прав 58%), 3 ряда справа
const SOSNOVIY_GALLERY = [
  { label: "Экстерьер",        pos: "2% 5%",    scale: "240% 270%" },
  { label: "Спальня",          pos: "60% 4%",   scale: "240% 270%" },
  { label: "Гардероб",         pos: "100% 4%",  scale: "240% 270%" },
  { label: "Детская",          pos: "60% 52%",  scale: "240% 270%" },
  { label: "Ванная",           pos: "100% 52%", scale: "240% 270%" },
  { label: "Гостиная",         pos: "60% 100%", scale: "240% 270%" },
  { label: "Кухня-столовая",   pos: "100% 100%", scale: "240% 270%" },
  { label: "Планировка",       pos: "2% 100%",  scale: "240% 270%" },
];

const cottages = [
  {
    id: 1,
    name: "«Сосновый»",
    area: "98 м²",
    rooms: "3 комнаты",
    price: "от 8 500 000 ₽",
    tag: "Популярный",
    img: SOSNOVIY_COLLAGE,
    features: ["Терраса", "Сауна", "Камин"],
  },
  {
    id: 2,
    name: "«Берёзовый»",
    area: "180 м²",
    rooms: "4 комнаты",
    price: "от 13 200 000 ₽",
    tag: "Премиум",
    img: HERO_IMAGE,
    features: ["Панорамные окна", "Гараж", "Джакузи"],
  },
  {
    id: 3,
    name: "«Усадьба»",
    area: "250 м²",
    rooms: "5 комнат",
    price: "от 19 800 000 ₽",
    tag: "Эксклюзив",
    img: HERO_IMAGE,
    features: ["Бассейн", "Баня", "2 гаража"],
  },
];

const infra = [
  { icon: "Trees", label: "Лесной массив", desc: "200 га сосновых лесов вокруг посёлка" },
  { icon: "Shield", label: "Охрана 24/7", desc: "КПП, видеонаблюдение, патрулирование" },
  { icon: "Zap", label: "Инженерия", desc: "Газ, электричество, водопровод, канализация" },
  { icon: "GraduationCap", label: "Школа", desc: "Начальная школа в 2 км от посёлка" },
  { icon: "ShoppingCart", label: "Магазины", desc: "Торговый центр в 5 минутах езды" },
];

const mapObjects = [
  { id: 1, label: "Въезд / КПП", x: 14, y: 70, color: "#6B7F6E", icon: "Shield" },
  { id: 4, label: "Лесная зона", x: 50, y: 8, color: "#4A7C59", icon: "Trees" },
  { id: 5, label: "Коттеджи тип А", x: 55, y: 38, color: "#8B5E3C", icon: "Home" },
  { id: 6, label: "Коттеджи тип Б", x: 55, y: 72, color: "#8B5E3C", icon: "Home" },
  { id: 8, label: "Детская площадка", x: 88, y: 18, color: "#E8734A", icon: "Star" },
  { id: 9, label: "Спортзона", x: 10, y: 58, color: "#5B8A6F", icon: "Bike" },
];

const stats = [
  { value: "180", label: "участков" },
  { value: "32", label: "га территории" },
  { value: "20 мин", label: "до центра Смоленска" },
  { value: "2025", label: "начало строительства" },
];

const faq = [
  { q: "Можно ли взять ипотеку?", a: "Да, мы работаем с ведущими банками: Сбербанк, ВТБ, Альфа-Банк. Ставки от 5,9% для семей с детьми." },
  { q: "Когда начнётся строительство?", a: "Строительство уже ведётся. Первая очередь — 12 коттеджей — будет сдана в III квартале 2025 года." },
  { q: "Можно ли выбрать планировку?", a: "Да, каждый проект адаптируется под ваши пожелания. Мы предлагаем 8 базовых планировок с возможностью изменений." },
  { q: "Есть ли управляющая компания?", a: "Да, собственная УК обеспечивает обслуживание посёлка, уборку территории, охрану и техническое обслуживание." },
];

export default function Index() {
  const [activeMapObj, setActiveMapObj] = useState<number | null>(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [formData, setFormData] = useState({ name: "", phone: "", message: "" });
  const [lightboxImg, setLightboxImg] = useState<{ pos: string; scale: string; label: string } | null>(null);
  const heroRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (!lightboxImg) return;
      if (e.key === "Escape") setLightboxImg(null);
      if (e.key === "ArrowLeft") {
        const idx = SOSNOVIY_GALLERY.findIndex(g => g.pos === lightboxImg.pos);
        setLightboxImg(SOSNOVIY_GALLERY[(idx - 1 + SOSNOVIY_GALLERY.length) % SOSNOVIY_GALLERY.length]);
      }
      if (e.key === "ArrowRight") {
        const idx = SOSNOVIY_GALLERY.findIndex(g => g.pos === lightboxImg.pos);
        setLightboxImg(SOSNOVIY_GALLERY[(idx + 1) % SOSNOVIY_GALLERY.length]);
      }
    };
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = lightboxImg ? "hidden" : "";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [lightboxImg]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            (entry.target as HTMLElement).style.animation = "fade-up 0.8s ease-out forwards";
          }
        });
      },
      { threshold: 0.1 }
    );
    document.querySelectorAll(".reveal").forEach((el) => {
      (el as HTMLElement).style.opacity = "0";
      observer.observe(el);
    });
    return () => observer.disconnect();
  }, []);

  const scrollTo = (id: string) => {
    setMenuOpen(false);
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="min-h-screen font-body" style={{ backgroundColor: "hsl(40,20%,97%)" }}>
      {/* NAVIGATION */}
      <nav
        className="fixed top-0 left-0 right-0 z-50 transition-all duration-500"
        style={{
          backgroundColor: scrolled ? "rgba(255,255,255,0.95)" : "transparent",
          backdropFilter: scrolled ? "blur(8px)" : "none",
          boxShadow: scrolled ? "0 1px 20px rgba(0,0,0,0.08)" : "none",
        }}
      >
        <div className="max-w-7xl mx-auto px-6 md:px-12 flex items-center justify-between h-20">
          <div
            className="font-display text-2xl font-semibold cursor-pointer"
            style={{ color: scrolled ? "hsl(150,25%,22%)" : "white" }}
            onClick={() => scrollTo("hero")}
          >
            СтанВил
          </div>

          <div className="hidden md:flex items-center gap-8">
            {[
              ["about", "О посёлке"],
              ["cottages", "Коттеджи"],
              ["infra", "Инфраструктура"],
              ["map", "Карта"],
              ["contact", "Контакты"],
            ].map(([id, label]) => (
              <button
                key={id}
                onClick={() => scrollTo(id)}
                className="font-body text-sm tracking-wide transition-colors duration-200 hover:opacity-60"
                style={{ color: scrolled ? "hsl(30,15%,12%)" : "rgba(255,255,255,0.9)" }}
              >
                {label}
              </button>
            ))}
            <button
              onClick={() => scrollTo("contact")}
              className="px-6 py-2.5 text-sm font-body tracking-wide text-white transition-colors duration-200"
              style={{ backgroundColor: "hsl(38,55%,52%)" }}
              onMouseOver={(e) => (e.currentTarget.style.backgroundColor = "hsl(38,55%,45%)")}
              onMouseOut={(e) => (e.currentTarget.style.backgroundColor = "hsl(38,55%,52%)")}
            >
              Получить консультацию
            </button>
          </div>

          <button
            className="md:hidden"
            onClick={() => setMenuOpen(!menuOpen)}
            style={{ color: scrolled ? "hsl(150,25%,22%)" : "white" }}
          >
            <Icon name={menuOpen ? "X" : "Menu"} size={24} />
          </button>
        </div>

        {menuOpen && (
          <div className="md:hidden bg-white shadow-lg px-6 pb-6 pt-2 flex flex-col gap-4">
            {[["about", "О посёлке"], ["cottages", "Коттеджи"], ["infra", "Инфраструктура"], ["map", "Карта"], ["contact", "Контакты"]].map(([id, label]) => (
              <button
                key={id}
                onClick={() => scrollTo(id)}
                className="text-left font-body text-base py-2 border-b"
                style={{ color: "hsl(30,15%,12%)", borderColor: "hsl(40,15%,90%)" }}
              >
                {label}
              </button>
            ))}
          </div>
        )}
      </nav>

      {/* HERO */}
      <section id="hero" ref={heroRef} className="relative flex items-end overflow-hidden" style={{ height: "100vh", minHeight: "700px" }}>
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: `url(${HERO_IMAGE})`,
            animation: "subtle-zoom 20s ease-in-out infinite alternate",
          }}
        />
        <div className="absolute inset-0" style={{ background: "linear-gradient(to top, rgba(0,0,0,0.72) 0%, rgba(0,0,0,0.3) 50%, rgba(0,0,0,0.12) 100%)" }} />
        <div className="absolute inset-0" style={{ background: "linear-gradient(to right, rgba(0,0,0,0.3) 0%, transparent 60%)" }} />

        <div className="relative z-10 w-full max-w-7xl mx-auto px-6 md:px-12 pb-20 md:pb-28">
          <div className="max-w-3xl">
            <p className="font-body text-sm tracking-[0.3em] uppercase mb-6" style={{ color: "hsl(38,55%,65%)", animation: "fade-up 0.8s ease-out 0.3s both" }}>
              Коттеджный посёлок · Смоленская область
            </p>
            <h1 className="font-display text-white font-light leading-none mb-6" style={{ fontSize: "clamp(56px, 10vw, 100px)", animation: "fade-up 0.8s ease-out 0.5s both" }}>
              Стан
              <em>Вил</em>
            </h1>
            <p className="font-body font-light leading-relaxed max-w-lg mb-10" style={{ color: "rgba(255,255,255,0.8)", fontSize: "1.125rem", animation: "fade-up 0.8s ease-out 0.7s both" }}>
              Жизнь в гармонии с природой. 180 участков среди смоленских лесов, в деревне Станички.
            </p>
            <div className="flex flex-col sm:flex-row gap-4" style={{ animation: "fade-up 0.8s ease-out 0.9s both" }}>
              <button
                onClick={() => scrollTo("cottages")}
                className="px-10 py-4 font-body text-sm tracking-wide text-white transition-all duration-300"
                style={{ backgroundColor: "hsl(38,55%,52%)" }}
                onMouseOver={(e) => (e.currentTarget.style.backgroundColor = "hsl(38,55%,44%)")}
                onMouseOut={(e) => (e.currentTarget.style.backgroundColor = "hsl(38,55%,52%)")}
              >
                Выбрать коттедж
              </button>
              <button
                onClick={() => scrollTo("map")}
                className="px-10 py-4 font-body text-sm tracking-wide text-white transition-all duration-300"
                style={{ border: "1px solid rgba(255,255,255,0.5)" }}
                onMouseOver={(e) => (e.currentTarget.style.backgroundColor = "rgba(255,255,255,0.12)")}
                onMouseOut={(e) => (e.currentTarget.style.backgroundColor = "transparent")}
              >
                Смотреть карту
              </button>
            </div>
          </div>
        </div>

        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2" style={{ animation: "fade-in 1s ease-out 1.5s both" }}>
          <span className="font-body text-xs tracking-widest" style={{ color: "rgba(255,255,255,0.45)" }}>ЛИСТАТЬ</span>
          <div className="w-px h-10 animate-pulse" style={{ background: "linear-gradient(to bottom, rgba(255,255,255,0.5), transparent)" }} />
        </div>
      </section>

      {/* STATS BAR */}
      <section style={{ backgroundColor: "hsl(150,25%,22%)" }} className="py-10">
        <div className="max-w-7xl mx-auto px-6 md:px-12 grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((s, i) => (
            <div key={i} className="text-center reveal">
              <div className="font-display font-light" style={{ fontSize: "clamp(36px,5vw,52px)", color: "hsl(38,55%,65%)" }}>{s.value}</div>
              <div className="font-body text-sm mt-1 tracking-wide" style={{ color: "rgba(255,255,255,0.55)" }}>{s.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* ABOUT */}
      <section id="about" className="py-24 px-6 md:px-12 lg:px-20 max-w-7xl mx-auto">
        <div className="grid md:grid-cols-2 gap-16 items-center">
          <div className="reveal">
            <p className="font-body text-xs tracking-[0.3em] uppercase mb-4" style={{ color: "hsl(38,55%,52%)" }}>О посёлке</p>
            <h2 className="font-display font-light leading-tight mb-8" style={{ fontSize: "clamp(40px,6vw,64px)", color: "hsl(30,15%,12%)" }}>
              Место,<br />где хочется<br /><em>жить</em>
            </h2>
            <p className="font-body text-lg leading-relaxed mb-6" style={{ color: "hsl(30,10%,40%)" }}>
              СтанВил — это закрытый коттеджный посёлок нового поколения. Мы создали пространство, где городской
              комфорт сочетается с первозданной природой Смоленского края. В первой очереди — 26 домов.
            </p>
            <p className="font-body text-lg leading-relaxed mb-10" style={{ color: "hsl(30,10%,40%)" }}>
              Каждый коттедж проектировался с вниманием к деталям: панорамные окна с видом на лес, тёплые материалы,
              продуманные планировки. Здесь нет случайных решений.
            </p>
            <div className="flex gap-6">
              <div className="pl-4" style={{ borderLeft: "2px solid hsl(38,55%,52%)" }}>
                <div className="font-display text-3xl" style={{ color: "hsl(150,25%,22%)" }}>20 лет</div>
                <div className="font-body text-sm" style={{ color: "hsl(30,10%,45%)" }}>опыта застройщика</div>
              </div>
            </div>
          </div>

          <div className="reveal relative">
            <AboutGallery />
            <div className="absolute -bottom-6 -left-6 p-6 text-white z-10" style={{ backgroundColor: "hsl(38,55%,52%)", maxWidth: "220px" }}>
              <div className="font-display text-4xl font-light">20</div>
              <div className="font-body text-sm mt-1 leading-tight">минут до центра Смоленска</div>
            </div>
          </div>
        </div>
      </section>

      {/* COTTAGES */}
      <section id="cottages" className="py-24 px-6 md:px-12 lg:px-20" style={{ backgroundColor: "hsl(40,15%,93%)" }}>
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16 reveal">
            <p className="font-body text-xs tracking-[0.3em] uppercase mb-4" style={{ color: "hsl(38,55%,52%)" }}>Недвижимость</p>
            <h2 className="font-display font-light" style={{ fontSize: "clamp(40px,6vw,64px)", color: "hsl(30,15%,12%)" }}>Коттеджи</h2>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {cottages.map((c, i) => (
              <div key={c.id} className="bg-white group reveal overflow-hidden" style={{ animationDelay: `${i * 0.15}s` }}>
                {/* Главное фото */}
                <div className="relative overflow-hidden cursor-pointer" style={{ aspectRatio: "4/3" }}
                  onClick={() => c.id === 1 && setLightboxImg(SOSNOVIY_GALLERY[0])}
                >
                  <div
                    className="absolute inset-0 transition-transform duration-700 group-hover:scale-105"
                    style={{
                      backgroundImage: `url(${c.img})`,
                      backgroundSize: c.id === 1 ? SOSNOVIY_GALLERY[0].scale : "cover",
                      backgroundPosition: c.id === 1 ? SOSNOVIY_GALLERY[0].pos : "center",
                    }}
                  />
                  <div className="absolute top-4 left-4 text-white font-body text-xs px-3 py-1.5 tracking-wide" style={{ backgroundColor: "hsl(150,25%,22%)" }}>
                    {c.tag}
                  </div>
                  {c.id === 1 && (
                    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                      style={{ backgroundColor: "rgba(0,0,0,0.3)" }}>
                      <div className="flex items-center gap-2 text-white font-body text-sm px-4 py-2"
                        style={{ backgroundColor: "rgba(0,0,0,0.5)", borderRadius: "2px" }}>
                        <Icon name="ZoomIn" size={16} />
                        Смотреть
                      </div>
                    </div>
                  )}
                </div>

                {/* Миниатюрная галерея для «Сосновый» */}
                {c.id === 1 && (
                  <div className="grid grid-cols-4 gap-0.5 mt-0.5">
                    {SOSNOVIY_GALLERY.slice(1, 5).map((g, gi) => (
                      <div
                        key={gi}
                        className="relative overflow-hidden cursor-pointer"
                        style={{ aspectRatio: "1/1" }}
                        onClick={() => setLightboxImg(g)}
                        title={g.label}
                      >
                        <div
                          className="w-full h-full transition-transform duration-300 hover:scale-110"
                          style={{
                            backgroundImage: `url(${SOSNOVIY_COLLAGE})`,
                            backgroundSize: g.scale,
                            backgroundPosition: g.pos,
                            backgroundRepeat: "no-repeat",
                          }}
                        />
                        <div className="absolute inset-0 opacity-0 hover:opacity-100 transition-opacity duration-200 flex items-end"
                          style={{ background: "linear-gradient(to top, rgba(0,0,0,0.55) 0%, transparent 60%)" }}>
                          <span className="font-body text-white px-1.5 pb-1" style={{ fontSize: "9px" }}>{g.label}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                <div className="p-6">
                  <h3 className="font-display text-2xl font-light mb-1" style={{ color: "hsl(30,15%,12%)" }}>{c.name}</h3>
                  <div className="flex gap-4 mb-4">
                    <span className="font-body text-sm" style={{ color: "hsl(30,10%,45%)" }}>{c.area}</span>
                    <span className="font-body text-sm" style={{ color: "hsl(30,10%,45%)" }}>·</span>
                    <span className="font-body text-sm" style={{ color: "hsl(30,10%,45%)" }}>{c.rooms}</span>
                  </div>
                  <div className="flex gap-2 flex-wrap mb-5">
                    {c.features.map((f) => (
                      <span key={f} className="font-body text-xs px-2.5 py-1" style={{ border: "1px solid hsl(40,15%,82%)", color: "hsl(30,10%,45%)" }}>
                        {f}
                      </span>
                    ))}
                  </div>
                  <div className="flex items-center justify-between pt-4" style={{ borderTop: "1px solid hsl(40,15%,90%)" }}>
                    <span className="font-display text-xl" style={{ color: "hsl(150,25%,22%)" }}>{c.price}</span>
                    <button
                      onClick={() => scrollTo("contact")}
                      className="font-body text-sm tracking-wide hover:underline flex items-center gap-1"
                      style={{ color: "hsl(38,55%,52%)" }}
                    >
                      Подробнее <Icon name="ArrowRight" size={14} />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* INFRASTRUCTURE */}
      <section id="infra" className="py-24 px-6 md:px-12 lg:px-20 max-w-7xl mx-auto">
        <div className="text-center mb-16 reveal">
          <p className="font-body text-xs tracking-[0.3em] uppercase mb-4" style={{ color: "hsl(38,55%,52%)" }}>Удобства</p>
          <h2 className="font-display font-light mb-4" style={{ fontSize: "clamp(40px,6vw,64px)", color: "hsl(30,15%,12%)" }}>Инфраструктура</h2>
          <p className="font-body text-lg max-w-xl mx-auto" style={{ color: "hsl(30,10%,45%)" }}>
            Всё необходимое для комфортной жизни — в шаговой доступности
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {infra.map((item, i) => (
            <div
              key={i}
              className="p-8 group reveal transition-all duration-300"
              style={{
                border: "1px solid hsl(40,15%,88%)",
                animationDelay: `${i * 0.1}s`,
              }}
              onMouseOver={(e) => {
                (e.currentTarget as HTMLElement).style.borderColor = "hsl(38,55%,52%)";
              }}
              onMouseOut={(e) => {
                (e.currentTarget as HTMLElement).style.borderColor = "hsl(40,15%,88%)";
              }}
            >
              <div
                className="w-12 h-12 flex items-center justify-center mb-5 transition-colors duration-300"
                style={{ backgroundColor: "hsl(150,25%,22%)" }}
              >
                <Icon name={item.icon} size={20} className="text-white" fallback="Star" />
              </div>
              <h3 className="font-display text-xl mb-2" style={{ color: "hsl(30,15%,12%)" }}>{item.label}</h3>
              <p className="font-body text-sm leading-relaxed" style={{ color: "hsl(30,10%,45%)" }}>{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* MAP */}
      <section id="map" className="py-24 px-6 md:px-12 lg:px-20" style={{ backgroundColor: "hsl(150,25%,22%)" }}>
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12 reveal">
            <p className="font-body text-xs tracking-[0.3em] uppercase mb-4" style={{ color: "hsl(38,55%,65%)" }}>Навигация</p>
            <h2 className="font-display font-light text-white mb-4" style={{ fontSize: "clamp(40px,6vw,64px)" }}>Карта посёлка</h2>
            <p className="font-body text-lg" style={{ color: "rgba(255,255,255,0.6)" }}>Нажмите на объект, чтобы узнать подробнее</p>
          </div>

          <div className="grid lg:grid-cols-3 gap-8 items-start">
            <div className="lg:col-span-2 reveal">
              <div className="relative w-full" style={{ paddingBottom: "78%" }}>
                <div
                  className="absolute inset-0 bg-cover bg-center"
                  style={{ backgroundImage: "url(https://cdn.poehali.dev/projects/81fb4012-bd8d-4cdc-9eb1-7f33f4407205/bucket/b7555b37-fe5c-4b9b-a698-3e8854f53207.jpg)" }}
                >

                  {/* Map objects */}
                  {mapObjects.map((obj) => (
                    <button
                      key={obj.id}
                      className="absolute transform -translate-x-1/2 -translate-y-1/2 transition-all duration-300"
                      style={{ left: `${obj.x}%`, top: `${obj.y}%` }}
                      onClick={() => setActiveMapObj(activeMapObj === obj.id ? null : obj.id)}
                    >
                      <div
                        className="w-8 h-8 rounded-full flex items-center justify-center transition-all duration-300 shadow-lg"
                        style={{
                          backgroundColor: obj.color,
                          border: "2px solid rgba(255,255,255,0.8)",
                          transform: activeMapObj === obj.id ? "scale(1.6)" : "scale(1)",
                        }}
                        onMouseOver={(e) => {
                          if (activeMapObj !== obj.id) (e.currentTarget as HTMLElement).style.transform = "scale(1.3)";
                        }}
                        onMouseOut={(e) => {
                          if (activeMapObj !== obj.id) (e.currentTarget as HTMLElement).style.transform = "scale(1)";
                        }}
                      >
                        <Icon name={obj.icon} size={12} className="text-white" fallback="MapPin" />
                      </div>
                      {activeMapObj === obj.id && (
                        <div
                          className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 font-body text-xs px-3 py-1.5 whitespace-nowrap shadow-lg"
                          style={{ backgroundColor: "white", color: "hsl(30,15%,12%)" }}
                        >
                          {obj.label}
                          <div className="absolute top-full left-1/2 -translate-x-1/2 w-0 h-0" style={{ borderLeft: "5px solid transparent", borderRight: "5px solid transparent", borderTop: "5px solid white" }} />
                        </div>
                      )}
                    </button>
                  ))}

                  {/* Compass */}
                  <div className="absolute top-4 right-4 w-10 h-10 flex items-center justify-center" style={{ border: "1px solid rgba(255,255,255,0.2)", borderRadius: "50%" }}>
                    <span className="font-display" style={{ color: "rgba(255,255,255,0.5)", fontSize: "14px" }}>С</span>
                  </div>

                  {/* Scale */}
                  <div className="absolute bottom-4 right-4 flex items-center gap-2">
                    <div className="w-12 h-px" style={{ backgroundColor: "rgba(255,255,255,0.35)" }} />
                    <span className="font-body text-xs" style={{ color: "rgba(255,255,255,0.35)" }}>500м</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Legend */}
            <div className="reveal">
              <h3 className="font-display text-2xl text-white font-light mb-6">Объекты посёлка</h3>
              <div className="flex flex-col gap-1">
                {mapObjects.map((obj) => (
                  <button
                    key={obj.id}
                    onClick={() => setActiveMapObj(activeMapObj === obj.id ? null : obj.id)}
                    className="flex items-center gap-3 p-3 text-left transition-all duration-200"
                    style={{
                      backgroundColor: activeMapObj === obj.id ? "rgba(255,255,255,0.15)" : "transparent",
                      borderRadius: "4px",
                    }}
                    onMouseOver={(e) => {
                      if (activeMapObj !== obj.id) (e.currentTarget as HTMLElement).style.backgroundColor = "rgba(255,255,255,0.08)";
                    }}
                    onMouseOut={(e) => {
                      if (activeMapObj !== obj.id) (e.currentTarget as HTMLElement).style.backgroundColor = "transparent";
                    }}
                  >
                    <div
                      className="w-7 h-7 rounded-full flex items-center justify-center flex-shrink-0"
                      style={{ backgroundColor: obj.color }}
                    >
                      <Icon name={obj.icon} size={11} className="text-white" fallback="MapPin" />
                    </div>
                    <span className="font-body text-sm" style={{ color: activeMapObj === obj.id ? "white" : "rgba(255,255,255,0.65)" }}>
                      {obj.label}
                    </span>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-24 px-6 md:px-12 lg:px-20 max-w-7xl mx-auto">
        <div className="grid md:grid-cols-2 gap-16 items-start">
          <div className="reveal">
            <p className="font-body text-xs tracking-[0.3em] uppercase mb-4" style={{ color: "hsl(38,55%,52%)" }}>Вопросы</p>
            <h2 className="font-display font-light mb-8" style={{ fontSize: "clamp(40px,6vw,64px)", color: "hsl(30,15%,12%)" }}>
              Часто<br />задают
            </h2>
            <p className="font-body text-lg leading-relaxed mb-8" style={{ color: "hsl(30,10%,45%)" }}>
              Не нашли ответ? Свяжитесь с нашим менеджером — ответим в течение 15 минут.
            </p>
            <button
              onClick={() => scrollTo("contact")}
              className="inline-flex items-center gap-2 font-body text-sm tracking-wide transition-all duration-200 hover:gap-3"
              style={{ color: "hsl(38,55%,52%)" }}
            >
              Задать вопрос <Icon name="ArrowRight" size={16} />
            </button>
          </div>

          <div className="flex flex-col gap-0 reveal">
            {faq.map((item, i) => (
              <div key={i} style={{ borderBottom: "1px solid hsl(40,15%,88%)" }}>
                <button
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  className="w-full flex items-center justify-between py-6 text-left"
                >
                  <span className="font-body text-base pr-4" style={{ color: "hsl(30,15%,12%)" }}>{item.q}</span>
                  <Icon
                    name={openFaq === i ? "Minus" : "Plus"}
                    size={18}
                    style={{ color: "hsl(38,55%,52%)", flexShrink: 0 } as React.CSSProperties}
                  />
                </button>
                {openFaq === i && (
                  <div className="pb-6 font-body text-sm leading-relaxed" style={{ color: "hsl(30,10%,45%)" }}>
                    {item.a}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CONTACT */}
      <section id="contact" className="py-24 px-6 md:px-12 lg:px-20" style={{ backgroundColor: "hsl(40,15%,93%)" }}>
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <div className="reveal">
              <p className="font-body text-xs tracking-[0.3em] uppercase mb-4" style={{ color: "hsl(38,55%,52%)" }}>Связаться</p>
              <h2 className="font-display font-light mb-8" style={{ fontSize: "clamp(40px,6vw,64px)", color: "hsl(30,15%,12%)" }}>
                Получите<br />консультацию
              </h2>
              <p className="font-body text-lg leading-relaxed mb-10" style={{ color: "hsl(30,10%,45%)" }}>
                Оставьте заявку, и наш специалист свяжется с вами в течение 30 минут. Бесплатная экскурсия по посёлку каждую субботу.
              </p>
              <div className="flex flex-col gap-5">
                {[
                  { icon: "Phone", label: "ТЕЛЕФОН", value: "+7 (495) 000-00-00" },
                  { icon: "MapPin", label: "АДРЕС", value: "Смоленская обл., Смоленский р-н, д. Станички" },
                  { icon: "Clock", label: "ЧАСЫ РАБОТЫ", value: "Пн–Пт 9:00–20:00, Сб–Вс 10:00–18:00" },
                ].map((item) => (
                  <div key={item.icon} className="flex items-center gap-3">
                    <div className="w-10 h-10 flex items-center justify-center" style={{ backgroundColor: "hsl(150,25%,22%)" }}>
                      <Icon name={item.icon} size={16} className="text-white" />
                    </div>
                    <div>
                      <div className="font-body text-xs tracking-wide" style={{ color: "hsl(30,10%,45%)" }}>{item.label}</div>
                      <div className="font-body" style={{ color: "hsl(30,15%,12%)" }}>{item.value}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-white p-8 md:p-10 reveal">
              <h3 className="font-display text-2xl font-light mb-6" style={{ color: "hsl(30,15%,12%)" }}>Оставить заявку</h3>
              <div className="flex flex-col gap-4">
                {[
                  { key: "name", label: "ИМЯ", type: "text", placeholder: "Ваше имя" },
                  { key: "phone", label: "ТЕЛЕФОН", type: "tel", placeholder: "+7 (___) ___-__-__" },
                ].map((field) => (
                  <div key={field.key}>
                    <label className="font-body text-xs tracking-wide block mb-2" style={{ color: "hsl(30,10%,45%)" }}>{field.label}</label>
                    <input
                      type={field.type}
                      value={formData[field.key as keyof typeof formData]}
                      onChange={(e) => setFormData({ ...formData, [field.key]: e.target.value })}
                      placeholder={field.placeholder}
                      className="w-full px-4 py-3 font-body text-sm outline-none transition-colors"
                      style={{ border: "1px solid hsl(40,15%,85%)", color: "hsl(30,15%,12%)" }}
                      onFocus={(e) => (e.currentTarget.style.borderColor = "hsl(150,25%,22%)")}
                      onBlur={(e) => (e.currentTarget.style.borderColor = "hsl(40,15%,85%)")}
                    />
                  </div>
                ))}
                <div>
                  <label className="font-body text-xs tracking-wide block mb-2" style={{ color: "hsl(30,10%,45%)" }}>КОММЕНТАРИЙ</label>
                  <textarea
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    rows={3}
                    placeholder="Какой коттедж вас интересует?"
                    className="w-full px-4 py-3 font-body text-sm outline-none transition-colors resize-none"
                    style={{ border: "1px solid hsl(40,15%,85%)", color: "hsl(30,15%,12%)" }}
                    onFocus={(e) => (e.currentTarget.style.borderColor = "hsl(150,25%,22%)")}
                    onBlur={(e) => (e.currentTarget.style.borderColor = "hsl(40,15%,85%)")}
                  />
                </div>
                <button
                  onClick={() => alert("Заявка отправлена! Мы свяжемся с вами в течение 30 минут.")}
                  className="w-full py-4 font-body text-sm tracking-wide text-white mt-2 transition-colors duration-200"
                  style={{ backgroundColor: "hsl(150,25%,22%)" }}
                  onMouseOver={(e) => (e.currentTarget.style.backgroundColor = "hsl(150,25%,18%)")}
                  onMouseOut={(e) => (e.currentTarget.style.backgroundColor = "hsl(150,25%,22%)")}
                >
                  Отправить заявку
                </button>
                <p className="font-body text-xs text-center leading-relaxed" style={{ color: "hsl(30,10%,55%)" }}>
                  Нажимая кнопку, вы соглашаетесь с политикой обработки персональных данных
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="py-12 px-6 md:px-12" style={{ backgroundColor: "hsl(30,10%,12%)" }}>
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-3 gap-10 mb-10 pb-10" style={{ borderBottom: "1px solid rgba(255,255,255,0.08)" }}>
            <div>
              <div className="font-display text-2xl text-white font-light mb-3">СтанВил</div>
              <p className="font-body text-sm leading-relaxed" style={{ color: "rgba(255,255,255,0.35)" }}>
                Коттеджный посёлок премиум-класса в Смоленской области
              </p>
            </div>
            <div>
              <div className="font-body text-xs tracking-widest mb-4" style={{ color: "rgba(255,255,255,0.35)" }}>НАВИГАЦИЯ</div>
              <div className="flex flex-col gap-2">
                {[["about", "О посёлке"], ["cottages", "Коттеджи"], ["infra", "Инфраструктура"], ["map", "Карта"], ["contact", "Контакты"]].map(([id, label]) => (
                  <button key={id} onClick={() => scrollTo(id)} className="text-left font-body text-sm transition-colors hover:text-white" style={{ color: "rgba(255,255,255,0.55)" }}>
                    {label}
                  </button>
                ))}
              </div>
            </div>
            <div>
              <div className="font-body text-xs tracking-widest mb-4" style={{ color: "rgba(255,255,255,0.35)" }}>КОНТАКТЫ</div>
              <div className="flex flex-col gap-2">
                <span className="font-body text-sm" style={{ color: "rgba(255,255,255,0.55)" }}>+7 (495) 000-00-00</span>
                <span className="font-body text-sm" style={{ color: "rgba(255,255,255,0.55)" }}>info@stanvil.ru</span>
                <span className="font-body text-sm" style={{ color: "rgba(255,255,255,0.55)" }}>Смоленская обл., д. Станички</span>
              </div>
            </div>
          </div>
          <div className="flex flex-col md:flex-row justify-between gap-4">
            <span className="font-body text-xs" style={{ color: "rgba(255,255,255,0.25)" }}>© 2026 СтанВил. Все права защищены.</span>
            <span className="font-body text-xs" style={{ color: "rgba(255,255,255,0.25)" }}>Политика конфиденциальности</span>
          </div>
        </div>
      </footer>

      {/* LIGHTBOX */}
      {lightboxImg && (
        <div
          className="fixed inset-0 z-[9999] flex items-center justify-center"
          style={{ backgroundColor: "rgba(0,0,0,0.92)", animation: "fade-in 0.25s ease-out" }}
          onClick={() => setLightboxImg(null)}
        >
          <div
            className="relative flex flex-col items-center"
            style={{ maxWidth: "92vw", maxHeight: "92vh" }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Кнопка закрытия */}
            <button
              onClick={() => setLightboxImg(null)}
              className="absolute top-3 right-3 z-10 w-10 h-10 flex items-center justify-center transition-colors duration-200"
              style={{ backgroundColor: "rgba(255,255,255,0.15)", color: "white", borderRadius: "50%" }}
              onMouseOver={(e) => (e.currentTarget.style.backgroundColor = "rgba(255,255,255,0.3)")}
              onMouseOut={(e) => (e.currentTarget.style.backgroundColor = "rgba(255,255,255,0.15)")}
            >
              <Icon name="X" size={20} />
            </button>

            {/* Навигация по галерее */}
            <button
              onClick={() => {
                const idx = SOSNOVIY_GALLERY.findIndex(g => g.pos === lightboxImg.pos);
                setLightboxImg(SOSNOVIY_GALLERY[(idx - 1 + SOSNOVIY_GALLERY.length) % SOSNOVIY_GALLERY.length]);
              }}
              className="absolute left-3 top-1/2 -translate-y-1/2 z-10 w-10 h-10 flex items-center justify-center transition-colors duration-200"
              style={{ backgroundColor: "rgba(255,255,255,0.15)", color: "white", borderRadius: "50%" }}
              onMouseOver={(e) => (e.currentTarget.style.backgroundColor = "rgba(255,255,255,0.3)")}
              onMouseOut={(e) => (e.currentTarget.style.backgroundColor = "rgba(255,255,255,0.15)")}
            >
              <Icon name="ChevronLeft" size={20} />
            </button>
            <button
              onClick={() => {
                const idx = SOSNOVIY_GALLERY.findIndex(g => g.pos === lightboxImg.pos);
                setLightboxImg(SOSNOVIY_GALLERY[(idx + 1) % SOSNOVIY_GALLERY.length]);
              }}
              className="absolute right-3 top-1/2 -translate-y-1/2 z-10 w-10 h-10 flex items-center justify-center transition-colors duration-200"
              style={{ backgroundColor: "rgba(255,255,255,0.15)", color: "white", borderRadius: "50%" }}
              onMouseOver={(e) => (e.currentTarget.style.backgroundColor = "rgba(255,255,255,0.3)")}
              onMouseOut={(e) => (e.currentTarget.style.backgroundColor = "rgba(255,255,255,0.15)")}
            >
              <Icon name="ChevronRight" size={20} />
            </button>

            {/* Изображение — зум нужного фрагмента коллажа */}
            <div
              style={{
                width: "min(700px, 88vw)",
                height: "min(480px, 75vh)",
                backgroundImage: `url(${SOSNOVIY_COLLAGE})`,
                backgroundSize: lightboxImg.scale,
                backgroundPosition: lightboxImg.pos,
                backgroundRepeat: "no-repeat",
                animation: "fade-in 0.2s ease-out",
                boxShadow: "0 25px 60px rgba(0,0,0,0.6)",
              }}
            />

            {/* Подпись и счётчик */}
            <div className="mt-4 flex items-center gap-6">
              <span className="font-body text-sm" style={{ color: "rgba(255,255,255,0.7)" }}>
                {lightboxImg.label}
              </span>
              <span className="font-body text-xs" style={{ color: "rgba(255,255,255,0.4)" }}>
                {SOSNOVIY_GALLERY.findIndex(g => g.pos === lightboxImg.pos) + 1} / {SOSNOVIY_GALLERY.length}
              </span>
            </div>

            {/* Точки-навигация */}
            <div className="flex gap-2 mt-3">
              {SOSNOVIY_GALLERY.map((g, i) => (
                <button
                  key={i}
                  onClick={() => setLightboxImg(g)}
                  style={{
                    width: g.pos === lightboxImg.pos ? "20px" : "8px",
                    height: "8px",
                    borderRadius: "4px",
                    backgroundColor: g.pos === lightboxImg.pos ? "white" : "rgba(255,255,255,0.35)",
                    transition: "all 0.3s",
                    border: "none",
                    cursor: "pointer",
                  }}
                  title={g.label}
                />
              ))}
            </div>
          </div>
        </div>
      )}

      <style>{`
        @keyframes subtle-zoom {
          from { transform: scale(1); }
          to { transform: scale(1.07); }
        }
        @keyframes fade-up {
          from { opacity: 0; transform: translateY(24px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes fade-in {
          from { opacity: 0; }
          to { opacity: 1; }
        }
      `}</style>
    </div>
  );
}