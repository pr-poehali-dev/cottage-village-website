import { useState, useEffect, useRef } from "react";
import Icon from "@/components/ui/icon";

const HERO_IMAGE = "https://cdn.poehali.dev/projects/81fb4012-bd8d-4cdc-9eb1-7f33f4407205/bucket/190bf264-9021-48e6-a4a4-6db69ee8affc.jpg";

const cottages = [
  {
    id: 1,
    name: "«Сосновый»",
    area: "120 м²",
    rooms: "3 комнаты",
    price: "от 8 500 000 ₽",
    tag: "Популярный",
    img: HERO_IMAGE,
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
  { icon: "Waves", label: "Озеро", desc: "Чистое озеро с пляжем в 300 м" },
  { icon: "Shield", label: "Охрана 24/7", desc: "КПП, видеонаблюдение, патрулирование" },
  { icon: "Zap", label: "Инженерия", desc: "Газ, электричество, водопровод, канализация" },
  { icon: "GraduationCap", label: "Школа", desc: "Начальная школа в 2 км от посёлка" },
  { icon: "ShoppingCart", label: "Магазины", desc: "Торговый центр в 5 минутах езды" },
];

const mapObjects = [
  { id: 1, label: "Въезд / КПП", x: 12, y: 75, color: "#6B7F6E", icon: "Shield" },
  { id: 2, label: "Озеро", x: 30, y: 25, color: "#4A90D9", icon: "Waves" },
  { id: 3, label: "Пляж", x: 38, y: 35, color: "#D4A843", icon: "Sun" },
  { id: 4, label: "Лесная зона", x: 65, y: 15, color: "#4A7C59", icon: "Trees" },
  { id: 5, label: "Коттеджи тип А", x: 45, y: 55, color: "#8B5E3C", icon: "Home" },
  { id: 6, label: "Коттеджи тип Б", x: 60, y: 65, color: "#8B5E3C", icon: "Home" },
  { id: 7, label: "Клубный дом", x: 35, y: 60, color: "#C4702B", icon: "Coffee" },
  { id: 8, label: "Детская площадка", x: 50, y: 45, color: "#E8734A", icon: "Star" },
  { id: 9, label: "Спортзона", x: 72, y: 48, color: "#5B8A6F", icon: "Bike" },
  { id: 10, label: "Выход в лес", x: 80, y: 30, color: "#4A7C59", icon: "Footprints" },
];

const stats = [
  { value: "47", label: "коттеджей" },
  { value: "120", label: "га территории" },
  { value: "40 мин", label: "до Москвы" },
  { value: "2026", label: "сдача посёлка" },
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
  const heroRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

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
              Коттеджный посёлок · Подмосковье
            </p>
            <h1 className="font-display text-white font-light leading-none mb-6" style={{ fontSize: "clamp(56px, 10vw, 100px)", animation: "fade-up 0.8s ease-out 0.5s both" }}>
              Стан
              <em>Вил</em>
            </h1>
            <p className="font-body font-light leading-relaxed max-w-lg mb-10" style={{ color: "rgba(255,255,255,0.8)", fontSize: "1.125rem", animation: "fade-up 0.8s ease-out 0.7s both" }}>
              Жизнь в гармонии с природой. 47 коттеджей среди сосновых лесов, в 40 минутах от Москвы.
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
              комфорт сочетается с первозданной природой Подмосковья.
            </p>
            <p className="font-body text-lg leading-relaxed mb-10" style={{ color: "hsl(30,10%,40%)" }}>
              Каждый коттедж проектировался с вниманием к деталям: панорамные окна с видом на лес, тёплые материалы,
              продуманные планировки. Здесь нет случайных решений.
            </p>
            <div className="flex gap-6">
              <div className="pl-4" style={{ borderLeft: "2px solid hsl(38,55%,52%)" }}>
                <div className="font-display text-3xl" style={{ color: "hsl(150,25%,22%)" }}>15 лет</div>
                <div className="font-body text-sm" style={{ color: "hsl(30,10%,45%)" }}>опыта застройщика</div>
              </div>
              <div className="pl-4" style={{ borderLeft: "2px solid hsl(38,55%,52%)" }}>
                <div className="font-display text-3xl" style={{ color: "hsl(150,25%,22%)" }}>240+</div>
                <div className="font-body text-sm" style={{ color: "hsl(30,10%,45%)" }}>семей уже живут</div>
              </div>
            </div>
          </div>

          <div className="reveal relative">
            <div className="aspect-[4/5] bg-cover bg-center" style={{ backgroundImage: `url(${HERO_IMAGE})` }} />
            <div className="absolute -bottom-6 -left-6 p-6 text-white" style={{ backgroundColor: "hsl(38,55%,52%)", maxWidth: "220px" }}>
              <div className="font-display text-4xl font-light">40</div>
              <div className="font-body text-sm mt-1 leading-tight">минут до центра Москвы по трассе М-7</div>
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
              <div key={c.id} className="bg-white group cursor-pointer reveal overflow-hidden" style={{ animationDelay: `${i * 0.15}s` }}>
                <div className="relative overflow-hidden" style={{ aspectRatio: "4/3" }}>
                  <div
                    className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-105"
                    style={{ backgroundImage: `url(${c.img})` }}
                  />
                  <div className="absolute top-4 left-4 text-white font-body text-xs px-3 py-1.5 tracking-wide" style={{ backgroundColor: "hsl(150,25%,22%)" }}>
                    {c.tag}
                  </div>
                </div>
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
              <div className="relative w-full" style={{ paddingBottom: "65%" }}>
                <div
                  className="absolute inset-0"
                  style={{ background: "linear-gradient(135deg, #2d4a35 0%, #3a6147 40%, #2a5a3d 70%, #1e3d29 100%)" }}
                >
                  {/* Forest zones */}
                  <div className="absolute top-0 right-0 rounded-bl-[80px]" style={{ width: "40%", height: "60%", background: "rgba(20,45,25,0.55)" }} />
                  <div className="absolute bottom-0 left-0 rounded-tr-[60px]" style={{ width: "25%", height: "30%", background: "rgba(15,38,20,0.45)" }} />

                  {/* Lake */}
                  <div className="absolute" style={{ left: "22%", top: "12%", width: "22%", height: "28%", background: "rgba(74,144,217,0.65)", borderRadius: "50% 60% 40% 55%", boxShadow: "0 0 40px rgba(74,144,217,0.3)" }} />

                  {/* Roads */}
                  <svg className="absolute inset-0 w-full h-full" viewBox="0 0 100 65" preserveAspectRatio="none">
                    <path d="M 5 80 L 12 72 L 25 62 L 40 55 L 55 52 L 70 54 L 85 50" stroke="rgba(255,255,255,0.18)" strokeWidth="0.8" fill="none" strokeDasharray="2 1" />
                    <path d="M 40 55 L 42 38 L 40 20" stroke="rgba(255,255,255,0.12)" strokeWidth="0.6" fill="none" />
                    <path d="M 55 52 L 57 38 L 60 22" stroke="rgba(255,255,255,0.12)" strokeWidth="0.6" fill="none" />
                  </svg>

                  {/* Cottage zones */}
                  <div className="absolute" style={{ left: "38%", top: "44%", width: "18%", height: "18%", border: "1px dashed rgba(212,168,67,0.45)", borderRadius: "4px" }} />
                  <div className="absolute" style={{ left: "54%", top: "54%", width: "16%", height: "15%", border: "1px dashed rgba(212,168,67,0.45)", borderRadius: "4px" }} />

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
                  { icon: "MapPin", label: "АДРЕС", value: "Московская обл., Ногинский р-н" },
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
                Коттеджный посёлок премиум-класса в Подмосковье
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
                <span className="font-body text-sm" style={{ color: "rgba(255,255,255,0.55)" }}>Московская обл.</span>
              </div>
            </div>
          </div>
          <div className="flex flex-col md:flex-row justify-between gap-4">
            <span className="font-body text-xs" style={{ color: "rgba(255,255,255,0.25)" }}>© 2026 СтанВил. Все права защищены.</span>
            <span className="font-body text-xs" style={{ color: "rgba(255,255,255,0.25)" }}>Политика конфиденциальности</span>
          </div>
        </div>
      </footer>

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