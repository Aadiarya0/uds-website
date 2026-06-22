import { useState, useEffect, useRef } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";

// ============================================================
// CONSTANTS
// ============================================================
const ACCENT = "#E04F2A";
const DARK = "#1A1A1A";
const CREAM = "#F4F0EA";
const CREAM_DARK = "#E8E3DA";

// UDS Logo — hosted at /uds-logo.png (place the file in your public/ folder)
const LOGO_URL = "/uds-logo.png";
const FAVICON_URL = "/uds favicon.png";

const SERVICES = [
  {
    id: "01",
    title: "Full Truckload (FTL)",
    sub: "Bulk Cargo Transport",
    desc: "Maximum efficiency for large-volume shipments. We dedicate an entire truck to your cargo, ensuring faster transit, reduced handling, and complete control over delivery schedules across Nepal.",
    img: "https://images.unsplash.com/photo-1601584115197-04ecc0da31d7?w=900&q=80",
  },
  {
    id: "02",
    title: "Less-than-Truckload (LTL)",
    sub: "Shared Shipment Solutions",
    desc: "Smart logistics for smaller loads. Share truck space with other shippers and pay only for what you use — perfect for mid-sized businesses managing cost-efficient supply chains.",
    img: "https://images.unsplash.com/photo-1566576912321-d58ddd7a6088?w=900&q=80",
  },
  {
    id: "03",
    title: "Express Cargo Delivery",
    sub: "Priority Transit for Urgent Goods",
    desc: "When timing is everything. Our express fleet operates on dedicated lanes with real-time tracking, ensuring your critical shipments arrive on schedule — every time, without compromise.",
    img: "https://images.unsplash.com/photo-1519003722824-194d4455a60c?w=900&q=80",
  },
  {
    id: "04",
    title: "Industrial & Factory Goods",
    sub: "Heavy-Duty Specialised Transport",
    desc: "Built for the extraordinary. Our heavy-lift fleet and experienced operators handle oversized machinery, factory equipment, and industrial components with precision and safety.",
    img: "https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=900&q=80",
  },
];

// 6 curated major hubs shown on the landing page
const MAJOR_HUBS = [
  { city: "Kathmandu", note: "Capital HQ & Central Distribution" },
  { city: "Pokhara", note: "Western Region Gateway" },
  { city: "Janakpur", note: "Central Terai Network" },
  { city: "Biratnagar", note: "Eastern Industrial Corridor" },
  { city: "Nijgadh", note: "North–South Highway Junction" },
  { city: "Gaighat", note: "Eastern Hills Connector" },
];

// Full network — only shown inside the "View All Branches" panel
const ALL_OFFICES = [
  "Nijgadh","Chapur","Garuda","Gaur","Hariwon","Lalbandi","Gausala","Bardibas","Sindhuli",
  "Dhalkebar","Mahendranagar","Janakpur","Mirchiya","Katari","Golbazaar","Lahan","Gaighat",
  "Kathmandu","Pokhara","Biratnagar","Birgunj","Butwal","Bhairahawa","Itahari","Hetauda"
];

const REVIEWS = [
  { text: "Reliable, punctual, and professional — every single time.", author: "Ramesh K.", city: "Kathmandu" },
  { text: "Our factory supplies arrive safely, always on schedule.", author: "Sita D.", city: "Birgunj" },
  { text: "Best logistics partner for our export business.", author: "Bikram S.", city: "Biratnagar" },
  { text: "Trustworthy team, secure transit. Highly recommend.", author: "Manisha T.", city: "Pokhara" },
  { text: "25+ offices means they truly understand Nepal's terrain.", author: "Arjun P.", city: "Butwal" },
  { text: "Express delivery saved our product launch timeline.", author: "Priya M.", city: "Janakpur" },
  { text: "Excellent coordination from booking to delivery.", author: "Nabin R.", city: "Hetauda" },
  { text: "Industrial cargo handled with utmost care and expertise.", author: "Sunita G.", city: "Itahari" },
];

const REVIEWS_ROW2 = [
  { text: "Moved our entire factory machinery without a single scratch. Incredible precision.", author: "Deepak M.", city: "Hetauda" },
  { text: "Tracking system is top-notch — always knew exactly where our cargo was.", author: "Kavita S.", city: "Bhairahawa" },
  { text: "Covered our most remote district delivery without hesitation. Outstanding service.", author: "Rajesh T.", city: "Sindhuli" },
  { text: "From Nijgadh to Kathmandu overnight — flawless every single run.", author: "Suresh B.", city: "Nijgadh" },
  { text: "Competitive rates, no hidden charges. Completely transparent from day one.", author: "Laxmi P.", city: "Biratnagar" },
  { text: "Their team secured our fragile glass panels with expert care. Zero breakage.", author: "Binod R.", city: "Birgunj" },
  { text: "Three years of partnership. Never once missed a scheduled delivery.", author: "Pratima K.", city: "Butwal" },
  { text: "The only logistics company that actually picks up the phone at 11 PM.", author: "Mohan D.", city: "Gaighat" },
];

const FAQS = [
  { q: "How do I get a freight quote?", a: "Fill out our contact form with your cargo details, origin, and destination. Our team will respond within 2 business hours with a tailored quote." },
  { q: "What areas of Nepal do you cover?", a: "We operate from 25 offices across Nepal — covering all major highways, Terai districts, hill regions, and Kathmandu Valley with regular scheduled routes." },
  { q: "Do you offer real-time shipment tracking?", a: "Yes. All shipments receive a unique tracking ID. You can monitor your cargo status in real-time via phone or our customer support team." },
  { q: "Can you handle heavy industrial equipment?", a: "Absolutely. Our fleet includes heavy-duty flatbeds, cranes, and specialized loaders for machinery, construction equipment, and factory goods." },
  { q: "What is your claim process for damages?", a: "We take cargo safety seriously. In the unlikely event of damage, our dedicated claims team processes reports within 72 hours with full documentation support." },
];

const NAV_LINKS = [
  { label: "About", id: "about" },
  { label: "Services", id: "services" },
  { label: "Gallery", id: "gallery" },
  { label: "Network", id: "network" },
  { label: "Reviews", id: "reviews" },
  { label: "Contact", id: "contact" },
];

// ============================================================
// GALLERY DATA
// ============================================================
const GALLERY_CATS = [
  { key: "all", label: "All Photos" },
  { key: "fleet", label: "Our Fleet" },
  { key: "road", label: "On the Road" },
  { key: "ops", label: "Operations" },
];

const GALLERY_PHOTOS = [
  { id: 1, src: "https://images.unsplash.com/photo-1601584115197-04ecc0da31d7?w=1200&q=80", alt: "FTL Fleet — Terai Highway Transit", cat: "fleet" },
  { id: 2, src: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=900&q=80", alt: "Heavy Trucks Ready for Dispatch", cat: "fleet" },
  { id: 3, src: "https://images.unsplash.com/photo-1519003722824-194d4455a60c?w=900&q=80", alt: "Night Transit — Expressway Run", cat: "road" },
  { id: 4, src: "https://images.unsplash.com/photo-1566576912321-d58ddd7a6088?w=900&q=80", alt: "LTL Loading Dock — Birgunj Terminal", cat: "fleet" },
  { id: 5, src: "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=900&q=80", alt: "Central Warehouse — Kathmandu Hub", cat: "ops" },
  { id: 6, src: "https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=900&q=80", alt: "Industrial Equipment — Oversized Transport", cat: "fleet" },
  { id: 7, src: "https://images.unsplash.com/photo-1577017040065-650ee4d43339?w=900&q=80", alt: "Operations Team — Birgunj Office", cat: "ops" },
  { id: 8, src: "https://images.unsplash.com/photo-1553413077-190dd305871c?w=900&q=80", alt: "Logistics Hub — Hetauda Relay Station", cat: "ops" },
  { id: 9, src: "https://images.unsplash.com/photo-1494412785283-10e63d38eba3?w=900&q=80", alt: "Container Cargo Management — Birgunj", cat: "ops" },
];

const GALLERY_VIDEOS = [
  {
    id: 1,
    title: "Our Fleet in Action",
    desc: "150+ vehicles covering Nepal's major freight corridors — Terai highways, mountain passes, and urban lanes.",
    thumb: "https://images.unsplash.com/photo-1601584115197-04ecc0da31d7?w=800&q=80",
    ytQ: "Nepal+freight+truck+fleet+logistics",
    dur: "3:42",
  },
  {
    id: 2,
    title: "Warehouse & Distribution",
    desc: "Inside our Kathmandu distribution centre — cargo sorting, dispatch coordination, and real-time tracking in action.",
    thumb: "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=800&q=80",
    ytQ: "Nepal+logistics+warehouse+distribution+freight",
    dur: "5:18",
  },
  {
    id: 3,
    title: "Express Delivery Run",
    desc: "Follow an express shipment live from Birgunj to Kathmandu — door-to-door in under 6 hours.",
    thumb: "https://images.unsplash.com/photo-1519003722824-194d4455a60c?w=800&q=80",
    ytQ: "Nepal+express+cargo+truck+delivery+timelapse",
    dur: "4:05",
  },
];

// ============================================================
// ANIMATION VARIANTS
// ============================================================
const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] } },
};
const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12 } },
};

// ============================================================
// PRELOADER
// ============================================================
function Preloader({ onComplete }) {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const startTime = Date.now();
    const duration = 1700;
    let raf;
    const tick = () => {
      const elapsed = Date.now() - startTime;
      const pct = Math.min(100, Math.round((elapsed / duration) * 100));
      setProgress(pct);
      if (pct < 100) {
        raf = requestAnimationFrame(tick);
      } else {
        setTimeout(onComplete, 350);
      }
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [onComplete]);

  return (
    <motion.div
      exit={{ opacity: 0 }}
      transition={{ duration: 0.55, ease: "easeInOut" }}
      style={{
        position: "fixed", inset: 0, zIndex: 999,
        background: DARK, display: "flex", flexDirection: "column",
        alignItems: "center", justifyContent: "center", gap: 28,
      }}
    >
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        style={{
          width: 64, height: 64, borderRadius: 12,
          display: "flex", alignItems: "center", justifyContent: "center",
          background: "#fff", padding: 8,
        }}
      >
        <img src={LOGO_URL} alt="Udaypur Dhuwani Sewaa" style={{ width: "100%", height: "100%", objectFit: "contain" }} />
      </motion.div>
      <div style={{
        fontSize: 12, letterSpacing: "0.3em", color: "rgba(255,255,255,0.4)",
        textTransform: "uppercase", fontWeight: 600,
      }}>
        Udaypur Dhuwani Sewaa
      </div>
      <div style={{
        fontSize: "clamp(44px, 7vw, 80px)", fontWeight: 900, color: "#fff",
        display: "flex", alignItems: "baseline", gap: 2, fontVariantNumeric: "tabular-nums",
      }}>
        <span>{progress}</span><span style={{ color: ACCENT, fontSize: "0.42em" }}>%</span>
      </div>
      <div style={{ width: 200, height: 2, background: "rgba(255,255,255,0.12)", borderRadius: 2, overflow: "hidden" }}>
        <div style={{ height: "100%", width: `${progress}%`, background: ACCENT, transition: "width 0.1s linear" }} />
      </div>
    </motion.div>
  );
}

// ============================================================
// ANIMATED COUNTER
// ============================================================
function Counter({ to, suffix = "", duration = 2 }) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  useEffect(() => {
    if (!inView) return;
    let start = 0;
    const end = parseInt(to.toString().replace(/\D/g, ""));
    const step = Math.ceil(end / (duration * 60));
    const timer = setInterval(() => {
      start += step;
      if (start >= end) { setCount(end); clearInterval(timer); }
      else setCount(start);
    }, 1000 / 60);
    return () => clearInterval(timer);
  }, [inView, to, duration]);

  return (
    <span ref={ref}>
      {count.toLocaleString()}{suffix}
    </span>
  );
}

// ============================================================
// ACCORDION ITEM
// ============================================================
function AccordionItem({ title, children, defaultOpen = false }) {
  const [open, setOpen] = useState(defaultOpen);
  return (
    <div style={{ borderBottom: `1px solid rgba(26,26,26,0.15)` }}>
      <button
        onClick={() => setOpen(!open)}
        style={{
          width: "100%", display: "flex", justifyContent: "space-between",
          alignItems: "center", padding: "20px 0", background: "none",
          border: "none", cursor: "pointer", textAlign: "left",
        }}
      >
        <span style={{ fontSize: 16, fontWeight: 600, color: DARK, fontFamily: "'Inter', sans-serif" }}>{title}</span>
        <motion.span
          animate={{ rotate: open ? 45 : 0 }}
          transition={{ duration: 0.3 }}
          style={{ fontSize: 24, color: ACCENT, lineHeight: 1, userSelect: "none", flexShrink: 0 }}
        >+</motion.span>
      </button>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.35, ease: "easeInOut" }}
            style={{ overflow: "hidden" }}
          >
            <div style={{ paddingBottom: 20, color: "#555", fontSize: 15, lineHeight: 1.7 }}>
              {children}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

// ============================================================
// MARQUEE REVIEWS
// ============================================================
function MarqueeRow({ items, reverse = false }) {
  const doubled = [...items, ...items];
  return (
    <div style={{ overflow: "hidden", width: "100%" }}>
      <motion.div
        animate={{ x: reverse ? ["0%", "50%"] : ["0%", "-50%"] }}
        transition={{ duration: 28, ease: "linear", repeat: Infinity }}
        style={{ display: "flex", gap: 20, width: "max-content" }}
      >
        {doubled.map((r, i) => (
          <div
            key={i}
            style={{
              minWidth: 320, padding: "28px 32px",
              background: i % 2 === 0 ? DARK : CREAM_DARK,
              borderRadius: 12, flexShrink: 0,
            }}
          >
            <p style={{ fontSize: 15, lineHeight: 1.7, marginBottom: 16, color: i % 2 === 0 ? "#e0ddd8" : "#444" }}>
              "{r.text}"
            </p>
            <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
              <div style={{
                width: 36, height: 36, borderRadius: "50%",
                background: ACCENT, display: "flex", alignItems: "center",
                justifyContent: "center", color: "#fff", fontSize: 13, fontWeight: 700
              }}>
                {r.author[0]}
              </div>
              <div>
                <p style={{ fontWeight: 700, fontSize: 13, margin: 0, color: i % 2 === 0 ? "#fff" : DARK }}>{r.author}</p>
                <p style={{ fontSize: 12, margin: 0, color: i % 2 === 0 ? "#aaa" : "#777" }}>{r.city}, Nepal</p>
              </div>
            </div>
          </div>
        ))}
      </motion.div>
    </div>
  );
}

// ============================================================
// SERVICES SECTION — click-driven (no scroll-jacking), compact height
// ============================================================
function ServicesSection() {
  const [active, setActive] = useState(0);
  const [autoplay, setAutoplay] = useState(true);

  useEffect(() => {
    if (!autoplay) return;
    const timer = setInterval(() => {
      setActive((a) => (a + 1) % SERVICES.length);
    }, 4500);
    return () => clearInterval(timer);
  }, [autoplay]);

  const handleSelect = (i) => {
    setActive(i);
    setAutoplay(false);
  };

  return (
    <section style={{ background: DARK, paddingBottom: 90 }}>
      <div className="services-sticky" style={{ display: "flex", alignItems: "stretch" }}>
        {/* Left: clickable service list */}
        <div className="services-left" style={{
          width: "50%", padding: "64px 60px 64px 80px",
          display: "flex", flexDirection: "column", justifyContent: "center",
        }}>
          <div style={{ display: "flex", flexDirection: "column" }}>
            {SERVICES.map((s, i) => (
              <div
                key={i}
                onClick={() => handleSelect(i)}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => { if (e.key === "Enter") handleSelect(i); }}
                style={{
                  padding: "20px 0",
                  borderBottom: `1px solid rgba(255,255,255,${active === i ? 0.25 : 0.08})`,
                  cursor: "pointer",
                }}
              >
                <div style={{ display: "flex", alignItems: "flex-start", gap: 22 }}>
                  <span style={{
                    fontSize: active === i ? 56 : 26,
                    fontWeight: 900,
                    color: active === i ? ACCENT : "rgba(255,255,255,0.18)",
                    lineHeight: 1,
                    transition: "all 0.4s ease",
                    minWidth: 70,
                  }}>
                    {s.id}
                  </span>
                  <div style={{ flex: 1 }}>
                    <p style={{
                      fontSize: active === i ? 20 : 15,
                      fontWeight: 700,
                      color: active === i ? "#fff" : "rgba(255,255,255,0.45)",
                      margin: 0,
                      transition: "all 0.4s ease",
                      lineHeight: 1.2,
                    }}>{s.title}</p>
                    <p style={{
                      fontSize: 12.5,
                      color: active === i ? "rgba(255,255,255,0.7)" : "rgba(255,255,255,0.25)",
                      margin: "5px 0 0",
                      transition: "all 0.4s ease",
                    }}>{s.sub}</p>
                    <AnimatePresence>
                      {active === i && (
                        <motion.p
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: "auto" }}
                          exit={{ opacity: 0, height: 0 }}
                          transition={{ duration: 0.35 }}
                          style={{ fontSize: 13.5, color: "rgba(255,255,255,0.6)", marginTop: 9, lineHeight: 1.65, overflow: "hidden" }}
                        >
                          {s.desc}
                        </motion.p>
                      )}
                    </AnimatePresence>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right: image with clickable progress dots */}
        <div className="services-right" style={{ width: "50%", position: "relative", overflow: "hidden", minHeight: 420 }}>
          <AnimatePresence mode="wait">
            <motion.div
              key={active}
              initial={{ opacity: 0, scale: 1.06 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.97 }}
              transition={{ duration: 0.6, ease: "easeInOut" }}
              style={{
                position: "absolute", inset: 0,
                backgroundImage: `url(${SERVICES[active].img})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
              }}
            />
          </AnimatePresence>
          <div style={{
            position: "absolute", inset: 0,
            background: "linear-gradient(to right, rgba(26,26,26,0.55) 0%, rgba(26,26,26,0.05) 100%)"
          }} />
          <div style={{ position: "absolute", bottom: 28, left: 28, display: "flex", gap: 8 }}>
            {SERVICES.map((_, i) => (
              <button
                key={i}
                onClick={() => handleSelect(i)}
                aria-label={`Show ${SERVICES[i].title}`}
                style={{
                  width: active === i ? 28 : 8, height: 8, borderRadius: 4,
                  border: "none", cursor: "pointer", padding: 0,
                  background: active === i ? ACCENT : "rgba(255,255,255,0.35)",
                  transition: "all 0.35s ease",
                }}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

// ============================================================
// LOCATIONS MODAL — full 25-office network, opened on demand
// ============================================================
function LocationsModal({ open, onClose }) {
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
          onClick={onClose}
          style={{
            position: "fixed", inset: 0, zIndex: 300,
            background: "rgba(20,18,16,0.72)", backdropFilter: "blur(4px)",
            display: "flex", alignItems: "center", justifyContent: "center",
            padding: 20,
          }}
        >
          <motion.div
            initial={{ opacity: 0, y: 24, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 16, scale: 0.97 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            onClick={(e) => e.stopPropagation()}
            style={{
              background: CREAM, borderRadius: 20, maxWidth: 920, width: "100%",
              maxHeight: "82vh", overflowY: "auto", padding: "44px 44px 36px",
            }}
          >
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 30, gap: 20 }}>
              <div>
                <p style={{ color: ACCENT, fontSize: 11, letterSpacing: "0.2em", fontWeight: 700, textTransform: "uppercase", marginBottom: 10 }}>
                  Full Network
                </p>
                <h3 style={{ fontSize: "clamp(22px, 3vw, 34px)", fontWeight: 900, textTransform: "uppercase", lineHeight: 1.1 }}>
                  ALL 25 BRANCHES
                </h3>
              </div>
              <button
                onClick={onClose}
                aria-label="Close"
                style={{
                  background: DARK, border: "none", color: "#fff",
                  width: 38, height: 38, borderRadius: "50%", cursor: "pointer",
                  fontSize: 18, flexShrink: 0, lineHeight: 1,
                }}
              >×</button>
            </div>
            <div className="offices-grid" style={{ display: "grid", gridTemplateColumns: "repeat(5, 1fr)", gap: 10 }}>
              {ALL_OFFICES.map((city, i) => (
                <div
                  key={i}
                  style={{
                    background: "#fff", border: `1.5px solid ${CREAM_DARK}`,
                    borderRadius: 12, padding: "16px 14px",
                    display: "flex", flexDirection: "column", gap: 6,
                  }}
                >
                  <div style={{
                    width: 22, height: 22, background: ACCENT, borderRadius: 6,
                    display: "flex", alignItems: "center", justifyContent: "center",
                  }}>
                    <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="3">
                      <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/>
                    </svg>
                  </div>
                  <span style={{ fontSize: 12.5, fontWeight: 700, color: DARK }}>{city}</span>
                </div>
              ))}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

// ============================================================
// GALLERY LIGHTBOX
// ============================================================
function GalleryLightbox({ photos, activeIdx, setActiveIdx, onClose }) {
  const photo = photos[activeIdx];
  const total = photos.length;
  const goPrev = () => setActiveIdx((i) => (i - 1 + total) % total);
  const goNext = () => setActiveIdx((i) => (i + 1) % total);

  useEffect(() => {
    const onKey = (e) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowLeft") goPrev();
      if (e.key === "ArrowRight") goNext();
    };
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeIdx]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.22 }}
      onClick={onClose}
      style={{
        position: "fixed", inset: 0, zIndex: 500,
        background: "rgba(6,6,6,0.97)", backdropFilter: "blur(10px)",
        display: "flex", alignItems: "center", justifyContent: "center",
        padding: "0 80px",
      }}
    >
      {/* Top bar */}
      <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 60, display: "flex", alignItems: "center", justifyContent: "space-between", padding: "0 24px", zIndex: 2 }}>
        <span style={{ color: "rgba(255,255,255,0.35)", fontSize: 12, letterSpacing: "0.12em", fontWeight: 600 }}>
          {activeIdx + 1} / {total}
        </span>
        <button onClick={onClose} style={{ background: "rgba(255,255,255,0.08)", border: "none", color: "#fff", width: 36, height: 36, borderRadius: "50%", cursor: "pointer", fontSize: 16, display: "flex", alignItems: "center", justifyContent: "center" }}>✕</button>
      </div>

      {/* Prev */}
      <button onClick={(e) => { e.stopPropagation(); goPrev(); }} style={{ position: "absolute", left: 20, background: "rgba(255,255,255,0.07)", border: "none", color: "#fff", width: 52, height: 52, borderRadius: "50%", cursor: "pointer", fontSize: 26, display: "flex", alignItems: "center", justifyContent: "center", zIndex: 2, flexShrink: 0 }}>‹</button>

      {/* Image */}
      <AnimatePresence mode="wait">
        <motion.div
          key={photo.id}
          initial={{ opacity: 0, scale: 0.97 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          onClick={(e) => e.stopPropagation()}
          style={{ maxWidth: 1040, width: "100%", borderRadius: 16, overflow: "hidden", position: "relative" }}
        >
          <img
            src={photo.src}
            alt={photo.alt}
            style={{ width: "100%", maxHeight: "78vh", objectFit: "contain", display: "block", background: "#111" }}
          />
          <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, padding: "36px 24px 20px", background: "linear-gradient(to top, rgba(0,0,0,0.78), transparent)" }}>
            <p style={{ color: "#fff", fontWeight: 700, fontSize: 14, margin: 0 }}>{photo.alt}</p>
            <p style={{ color: ACCENT, fontSize: 11, margin: "5px 0 0", textTransform: "uppercase", letterSpacing: "0.13em" }}>
              {GALLERY_CATS.find(c => c.key === photo.cat)?.label || photo.cat}
            </p>
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Next */}
      <button onClick={(e) => { e.stopPropagation(); goNext(); }} style={{ position: "absolute", right: 20, background: "rgba(255,255,255,0.07)", border: "none", color: "#fff", width: 52, height: 52, borderRadius: "50%", cursor: "pointer", fontSize: 26, display: "flex", alignItems: "center", justifyContent: "center", zIndex: 2, flexShrink: 0 }}>›</button>

      {/* Dot nav */}
      <div style={{ position: "absolute", bottom: 20, left: "50%", transform: "translateX(-50%)", display: "flex", gap: 8, zIndex: 2 }}>
        {photos.map((p, i) => (
          <button
            key={p.id}
            onClick={(e) => { e.stopPropagation(); setActiveIdx(i); }}
            style={{ width: i === activeIdx ? 26 : 8, height: 8, borderRadius: 4, border: "none", background: i === activeIdx ? ACCENT : "rgba(255,255,255,0.28)", cursor: "pointer", padding: 0, transition: "all 0.28s ease" }}
          />
        ))}
      </div>
    </motion.div>
  );
}

// ============================================================
// GALLERY SECTION
// ============================================================
function GallerySection() {
  const [tab, setTab] = useState("photos");
  const [cat, setCat] = useState("all");
  const [lightboxIdx, setLightboxIdx] = useState(null);
  const [hoverId, setHoverId] = useState(null);

  const filtered = cat === "all" ? GALLERY_PHOTOS : GALLERY_PHOTOS.filter(p => p.cat === cat);

  const handleCatChange = (newCat) => {
    setCat(newCat);
    setLightboxIdx(null);
  };

  return (
    <section id="gallery" style={{ padding: "120px 80px", background: "#111" }}>
      <div style={{ maxWidth: 1400, margin: "0 auto" }}>

        {/* ── Section Header ── */}
        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger} style={{ marginBottom: 52 }}>
          <motion.p variants={fadeUp} style={{ color: ACCENT, fontSize: 11, letterSpacing: "0.2em", fontWeight: 700, textTransform: "uppercase", marginBottom: 16 }}>
            Fleet & Operations
          </motion.p>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", flexWrap: "wrap", gap: 20 }}>
            <motion.h2 variants={fadeUp} style={{ fontSize: "clamp(32px, 4vw, 56px)", fontWeight: 900, textTransform: "uppercase", lineHeight: 1.1, color: "#fff" }}>
              OUR<br /><span style={{ color: ACCENT }}>GALLERY</span>
            </motion.h2>
            {/* Tab switcher */}
            <div style={{ display: "flex", gap: 6, background: "rgba(255,255,255,0.06)", padding: 5, borderRadius: 12, border: "1px solid rgba(255,255,255,0.08)" }}>
              {[{ k: "photos", label: "📷  Photos" }, { k: "videos", label: "▶  Videos" }].map(t => (
                <button
                  key={t.k}
                  onClick={() => setTab(t.k)}
                  style={{
                    background: tab === t.k ? ACCENT : "transparent",
                    border: "none", color: tab === t.k ? "#fff" : "rgba(255,255,255,0.5)",
                    padding: "10px 24px", borderRadius: 9, fontWeight: 700, fontSize: 12,
                    letterSpacing: "0.05em", textTransform: "uppercase", cursor: "pointer",
                    transition: "all 0.25s ease",
                  }}
                >{t.label}</button>
              ))}
            </div>
          </div>
        </motion.div>

        {/* ── PHOTOS TAB ── */}
        {tab === "photos" && (
          <>
            {/* Category filter pills */}
            <div style={{ display: "flex", gap: 10, marginBottom: 30, flexWrap: "wrap" }}>
              {GALLERY_CATS.map(c => (
                <button
                  key={c.key}
                  onClick={() => handleCatChange(c.key)}
                  style={{
                    background: cat === c.key ? "#fff" : "rgba(255,255,255,0.06)",
                    border: cat === c.key ? "none" : "1px solid rgba(255,255,255,0.1)",
                    color: cat === c.key ? DARK : "rgba(255,255,255,0.6)",
                    padding: "9px 22px", borderRadius: 50, fontWeight: 700, fontSize: 12,
                    letterSpacing: "0.05em", textTransform: "uppercase", cursor: "pointer",
                    transition: "all 0.25s ease",
                  }}
                >{c.label}</button>
              ))}
              <span style={{ marginLeft: "auto", color: "rgba(255,255,255,0.3)", fontSize: 12, display: "flex", alignItems: "center" }}>
                {filtered.length} photos · Click to expand
              </span>
            </div>

            {/* Photo grid */}
            <motion.div
              layout
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(3, 1fr)",
                gap: 12,
                gridAutoRows: "270px",
              }}
            >
              <AnimatePresence>
                {filtered.map((photo, i) => {
                  const isFeatured = cat === "all" && i === 0;
                  const isHovered = hoverId === photo.id;
                  return (
                    <motion.div
                      key={photo.id}
                      layout
                      initial={{ opacity: 0, scale: 0.94 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.94 }}
                      transition={{ duration: 0.35, delay: i * 0.04 }}
                      onClick={() => setLightboxIdx(i)}
                      onMouseEnter={() => setHoverId(photo.id)}
                      onMouseLeave={() => setHoverId(null)}
                      style={{
                        position: "relative", borderRadius: 14, overflow: "hidden",
                        cursor: "pointer",
                        gridColumn: isFeatured ? "span 2" : "span 1",
                        gridRow: isFeatured ? "span 2" : "span 1",
                      }}
                    >
                      <img
                        src={photo.src}
                        alt={photo.alt}
                        loading="lazy"
                        style={{
                          width: "100%", height: "100%", objectFit: "cover", display: "block",
                          transition: "transform 0.55s ease",
                          transform: isHovered ? "scale(1.07)" : "scale(1)",
                        }}
                      />
                      {/* Hover overlay */}
                      <div style={{
                        position: "absolute", inset: 0,
                        background: isHovered ? "rgba(20,20,20,0.55)" : "rgba(20,20,20,0)",
                        transition: "background 0.35s ease",
                        display: "flex", flexDirection: "column", justifyContent: "flex-end", padding: "20px",
                      }}>
                        <div style={{ opacity: isHovered ? 1 : 0, transform: isHovered ? "translateY(0)" : "translateY(8px)", transition: "opacity 0.3s ease, transform 0.3s ease" }}>
                          <p style={{ color: "#fff", fontWeight: 700, fontSize: 13, margin: 0, lineHeight: 1.3 }}>{photo.alt}</p>
                        </div>
                      </div>
                      {/* Expand icon */}
                      <div style={{
                        position: "absolute", top: 14, right: 14,
                        background: "rgba(0,0,0,0.45)", backdropFilter: "blur(6px)",
                        borderRadius: 8, width: 32, height: 32,
                        display: "flex", alignItems: "center", justifyContent: "center",
                        opacity: isHovered ? 1 : 0, transition: "opacity 0.3s ease",
                        color: "#fff", fontSize: 14,
                      }}>⤢</div>
                      {/* Category tag */}
                      {isFeatured && (
                        <div style={{
                          position: "absolute", top: 14, left: 14,
                          background: ACCENT, borderRadius: 6, padding: "4px 10px",
                          color: "#fff", fontSize: 10.5, fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase",
                        }}>Featured</div>
                      )}
                    </motion.div>
                  );
                })}
              </AnimatePresence>
            </motion.div>
          </>
        )}

        {/* ── VIDEOS TAB ── */}
        {tab === "videos" && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
          >
            <p style={{ color: "rgba(255,255,255,0.4)", fontSize: 14, marginBottom: 32, lineHeight: 1.6 }}>
              Watch our fleet, warehouse operations, and delivery runs in action. Click any video to view on YouTube.
            </p>
            <div className="videos-grid" style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 20 }}>
              {GALLERY_VIDEOS.map((v, vi) => {
                const isVHovered = hoverId === `v${v.id}`;
                return (
                  <div
                    key={v.id}
                    onMouseEnter={() => setHoverId(`v${v.id}`)}
                    onMouseLeave={() => setHoverId(null)}
                    style={{ borderRadius: 16, overflow: "hidden", background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)", transition: "border-color 0.3s", borderColor: isVHovered ? "rgba(224,79,42,0.4)" : "rgba(255,255,255,0.08)" }}
                  >
                    {/* Thumbnail */}
                    <div style={{ position: "relative", overflow: "hidden", height: 210 }}>
                      <img
                        src={v.thumb}
                        alt={v.title}
                        style={{ width: "100%", height: "100%", objectFit: "cover", transition: "transform 0.5s ease", transform: isVHovered ? "scale(1.06)" : "scale(1)" }}
                      />
                      <div style={{ position: "absolute", inset: 0, background: "rgba(0,0,0,0.42)" }} />
                      {/* Duration */}
                      <div style={{ position: "absolute", bottom: 12, right: 12, background: "rgba(0,0,0,0.75)", color: "#fff", padding: "3px 9px", borderRadius: 5, fontSize: 11, fontWeight: 700, letterSpacing: "0.04em" }}>{v.dur}</div>
                      {/* Play button */}
                      <button
                        onClick={() => window.open(`https://www.youtube.com/results?search_query=${v.ytQ}`, "_blank")}
                        style={{
                          position: "absolute", top: "50%", left: "50%", transform: `translate(-50%, -50%) scale(${isVHovered ? 1.12 : 1})`,
                          background: ACCENT, border: "none", color: "#fff", width: 58, height: 58, borderRadius: "50%",
                          cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center",
                          boxShadow: "0 8px 28px rgba(224,79,42,0.55)", transition: "transform 0.25s ease",
                          fontSize: 20, paddingLeft: 4,
                        }}
                      >▶</button>
                    </div>
                    {/* Info */}
                    <div style={{ padding: "22px 24px 26px" }}>
                      <p style={{ color: "#fff", fontWeight: 800, fontSize: 15.5, marginBottom: 8, lineHeight: 1.3 }}>{v.title}</p>
                      <p style={{ color: "rgba(255,255,255,0.48)", fontSize: 13, lineHeight: 1.65, marginBottom: 18 }}>{v.desc}</p>
                      <button
                        onClick={() => window.open(`https://www.youtube.com/results?search_query=${v.ytQ}`, "_blank")}
                        style={{
                          background: "transparent", border: `1.5px solid rgba(224,79,42,0.5)`, color: ACCENT,
                          padding: "9px 20px", borderRadius: 8, fontWeight: 700, fontSize: 11.5,
                          letterSpacing: "0.06em", textTransform: "uppercase", cursor: "pointer",
                          transition: "all 0.2s ease",
                        }}
                        onMouseEnter={e => { e.target.style.background = ACCENT; e.target.style.color = "#fff"; }}
                        onMouseLeave={e => { e.target.style.background = "transparent"; e.target.style.color = ACCENT; }}
                      >Watch on YouTube →</button>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* YouTube note */}
            <p style={{ color: "rgba(255,255,255,0.22)", fontSize: 12, marginTop: 24, lineHeight: 1.6, textAlign: "center" }}>
              Videos open YouTube search results. Replace the <code style={{ color: "rgba(255,255,255,0.35)", background: "rgba(255,255,255,0.06)", padding: "2px 6px", borderRadius: 4 }}>ytQ</code> field in <code style={{ color: "rgba(255,255,255,0.35)", background: "rgba(255,255,255,0.06)", padding: "2px 6px", borderRadius: 4 }}>GALLERY_VIDEOS</code> with your actual YouTube video IDs to embed direct links.
            </p>
          </motion.div>
        )}
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {lightboxIdx !== null && (
          <GalleryLightbox
            photos={filtered}
            activeIdx={lightboxIdx}
            setActiveIdx={setLightboxIdx}
            onClose={() => setLightboxIdx(null)}
          />
        )}
      </AnimatePresence>
    </section>
  );
}

// ============================================================
// MAIN APP
// ============================================================
export default function App() {
  const [loading, setLoading] = useState(true);
  const [heroReady, setHeroReady] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [activeSection, setActiveSection] = useState("about");
  const [locationsOpen, setLocationsOpen] = useState(false);
  const [formData, setFormData] = useState({ name: "", email: "", from: "", to: "", message: "" });
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    document.body.style.overflow = loading ? "hidden" : "";
  }, [loading]);

  // ── SEO: meta, Open Graph, Twitter Card, JSON-LD ──────────
  useEffect(() => {
    document.title = "Udaypur Dhuwani Sewaa | Nepal's Premier Freight & Logistics Company";

    const setMeta = (key, val, isProp = false) => {
      const attr = isProp ? "property" : "name";
      let el = document.querySelector(`meta[${attr}="${key}"]`);
      if (!el) { el = document.createElement("meta"); el.setAttribute(attr, key); document.head.appendChild(el); }
      el.setAttribute("content", val);
    };

    // Favicon — UDS logo (replaces default React/Vite icon in browser tab & search results)
    const setIcon = (rel, href, type) => {
      let link = document.querySelector(`link[rel='${rel}']`);
      if (!link) { link = document.createElement("link"); link.rel = rel; document.head.appendChild(link); }
      link.href = href;
      if (type) link.type = type;
    };
    setIcon("icon", FAVICON_URL, "uds favicon.png");
    setIcon("shortcut icon", FAVICON_URL, "uds favicon.png");
    setIcon("apple-touch-icon", FAVICON_URL);

    // Standard
    setMeta("description", "Udaypur Dhuwani Sewaa — Nepal's trusted freight & logistics company. FTL, LTL, express cargo and industrial transport across 25+ offices in all 77 districts. Get a quote in 2 hours.");
    setMeta("keywords", "Nepal freight company, logistics Nepal, truck transport Nepal, cargo delivery Nepal, FTL Nepal, LTL Nepal, express cargo Nepal, Udaypur Dhuwani Sewaa, freight Birgunj, logistics Kathmandu, truck hire Nepal");
    setMeta("robots", "index, follow");
    setMeta("author", "Udaypur Dhuwani Sewaa");
    setMeta("viewport", "width=device-width, initial-scale=1");
    setMeta("theme-color", "#E04F2A");
    setMeta("geo.region", "NP");
    setMeta("geo.placename", "Udaypur, Nepal");

    // Open Graph
    setMeta("og:type", "website", true);
    setMeta("og:title", "Udaypur Dhuwani Sewaa | Nepal Freight & Logistics", true);
    setMeta("og:description", "Reliable FTL, LTL & express cargo across Nepal's 77 districts. 25+ offices, 150+ fleet, 15,000+ shipments delivered. Get a quote in 2 hours.", true);
    setMeta("og:url", "https://udaypurdhuwanisewaa.com.np", true);
    setMeta("og:image", "https://udaypurdhuwanisewaa.com.np/uds-logo.png", true);
    setMeta("og:image:width", "1200", true);
    setMeta("og:image:height", "630", true);
    setMeta("og:image:alt", "Udaypur Dhuwani Sewaa logo", true);
    setMeta("og:site_name", "Udaypur Dhuwani Sewaa", true);
    setMeta("og:locale", "ne_NP", true);

    // Twitter Card
    setMeta("twitter:card", "summary_large_image");
    setMeta("twitter:title", "Udaypur Dhuwani Sewaa | Nepal Freight & Logistics");
    setMeta("twitter:description", "Nepal's trusted freight partner — FTL, LTL, express cargo & industrial transport across 25+ offices nationwide.");
    setMeta("twitter:image", "https://udaypurdhuwanisewaa.com.np/uds-logo.png");
    setMeta("twitter:image:alt", "UDS logo");

    // Canonical
    let can = document.querySelector("link[rel='canonical']");
    if (!can) { can = document.createElement("link"); can.setAttribute("rel", "canonical"); document.head.appendChild(can); }
    can.setAttribute("href", "https://udaypurdhuwanisewaa.com.np");

    // JSON-LD — LocalBusiness + WebPage + Organization
    const ldId = "ld-uds";
    const existing = document.getElementById(ldId);
    if (existing) existing.remove();
    const s = document.createElement("script");
    s.id = ldId;
    s.type = "application/ld+json";
    s.textContent = JSON.stringify([
      {
        "@context": "https://schema.org",
        "@type": ["LocalBusiness", "MovingCompany"],
        "@id": "https://udaypurdhuwanisewaa.com.np/#business",
        "name": "Udaypur Dhuwani Sewaa",
        "alternateName": ["UDS Freight", "UDS Logistics", "Udaypur Dhuwani"],
        "description": "Nepal's trusted full-service freight and logistics company — FTL, LTL, express cargo, and industrial transport across 25+ offices in all 77 districts.",
        "url": "https://udaypurdhuwanisewaa.com.np",
        "logo": "https://udaypurdhuwanisewaa.com.np/uds-logo.png",
        "image": "https://udaypurdhuwanisewaa.com.np/uds-logo.png",
        "telephone": "+977-1-XXXXXXX",
        "email": "info@udaypurdhuwanisewaa.com.np",
        "foundingDate": "2010",
        "address": {
          "@type": "PostalAddress",
          "streetAddress": "Udaypur District",
          "addressLocality": "Gaighat",
          "addressRegion": "Bagmati Province",
          "postalCode": "56300",
          "addressCountry": "NP"
        },
        "geo": { "@type": "GeoCoordinates", "latitude": "26.9350", "longitude": "86.5106" },
        "areaServed": { "@type": "Country", "name": "Nepal", "sameAs": "https://en.wikipedia.org/wiki/Nepal" },
        "openingHoursSpecification": {
          "@type": "OpeningHoursSpecification",
          "dayOfWeek": ["Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"],
          "opens": "07:00",
          "closes": "20:00"
        },
        "priceRange": "NPR",
        "currenciesAccepted": "NPR",
        "numberOfEmployees": { "@type": "QuantitativeValue", "value": 500 },
        "hasOfferCatalog": {
          "@type": "OfferCatalog",
          "name": "Freight & Logistics Services",
          "itemListElement": [
            { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Full Truckload (FTL)", "description": "Dedicated truck freight for bulk cargo across Nepal — faster transit, reduced handling, complete schedule control." } },
            { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Less-than-Truckload (LTL)", "description": "Cost-efficient shared cargo transport — pay only for the space you use." } },
            { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Express Cargo Delivery", "description": "Priority freight with real-time tracking on dedicated lanes across Nepal." } },
            { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Industrial & Factory Goods Transport", "description": "Heavy machinery and oversized load specialists — flatbeds, cranes, and precision handling." } }
          ]
        },
        "aggregateRating": {
          "@type": "AggregateRating",
          "ratingValue": "4.9",
          "reviewCount": "847",
          "bestRating": "5",
          "worstRating": "1"
        },
        "review": [
          { "@type": "Review", "author": { "@type": "Person", "name": "Ramesh K." }, "reviewBody": "Reliable, punctual, and professional — every single time.", "reviewRating": { "@type": "Rating", "ratingValue": "5" } },
          { "@type": "Review", "author": { "@type": "Person", "name": "Bikram S." }, "reviewBody": "Best logistics partner for our export business.", "reviewRating": { "@type": "Rating", "ratingValue": "5" } },
          { "@type": "Review", "author": { "@type": "Person", "name": "Pratima K." }, "reviewBody": "Three years of partnership. Never once missed a scheduled delivery.", "reviewRating": { "@type": "Rating", "ratingValue": "5" } }
        ],
        "sameAs": [
          "https://www.facebook.com/udaypurdhuwanisewaa",
          "https://www.linkedin.com/company/udaypurdhuwanisewaa"
        ]
      },
      {
        "@context": "https://schema.org",
        "@type": "WebSite",
        "@id": "https://udaypurdhuwanisewaa.com.np/#website",
        "url": "https://udaypurdhuwanisewaa.com.np",
        "name": "Udaypur Dhuwani Sewaa",
        "description": "Nepal's premier freight and logistics company",
        "publisher": { "@id": "https://udaypurdhuwanisewaa.com.np/#business" },
        "inLanguage": ["ne", "en"],
        "potentialAction": {
          "@type": "SearchAction",
          "target": "https://udaypurdhuwanisewaa.com.np/?s={search_term_string}",
          "query-input": "required name=search_term_string"
        }
      },
      {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        "itemListElement": [
          { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://udaypurdhuwanisewaa.com.np" },
          { "@type": "ListItem", "position": 2, "name": "Services", "item": "https://udaypurdhuwanisewaa.com.np/#services" },
          { "@type": "ListItem", "position": 3, "name": "Network", "item": "https://udaypurdhuwanisewaa.com.np/#network" },
          { "@type": "ListItem", "position": 4, "name": "Contact", "item": "https://udaypurdhuwanisewaa.com.np/#contact" }
        ]
      }
    ]);
    document.head.appendChild(s);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 60);

      const doc = document.documentElement;
      const total = doc.scrollHeight - window.innerHeight;
      setScrollProgress(total > 0 ? Math.min(100, (window.scrollY / total) * 100) : 0);

      let current = NAV_LINKS[0].id;
      for (const l of NAV_LINKS) {
        const el = document.getElementById(l.id);
        if (el && el.getBoundingClientRect().top <= 140) current = l.id;
      }
      setActiveSection(current);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 3000);
    setFormData({ name: "", email: "", from: "", to: "", message: "" });
  };

  const scrollTo = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    setMenuOpen(false);
  };

  return (
    <div style={{ fontFamily: "'Inter', 'Helvetica Neue', sans-serif", background: CREAM, color: DARK, overflowX: "hidden" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&display=swap');
        * { box-sizing: border-box; margin: 0; padding: 0; }
        html { scroll-behavior: smooth; }
        body { background: ${CREAM}; }
        input, textarea, select { font-family: inherit; }
        input::placeholder, textarea::placeholder { color: #aaa; }
        ::-webkit-scrollbar { width: 6px; }
        ::-webkit-scrollbar-track { background: ${CREAM}; }
        ::-webkit-scrollbar-thumb { background: ${ACCENT}; border-radius: 3px; }
        @media (max-width: 768px) {
          .hero-title { font-size: 36px !important; }
          .desktop-nav { display: none !important; }
          .mobile-menu-btn { display: flex !important; }
          .services-sticky { flex-direction: column !important; }
          .services-right { display: none !important; }
          .services-left { width: 100% !important; padding: 40px 24px !important; }
          .stats-grid { grid-template-columns: 1fr 1fr !important; }
          .hubs-grid { grid-template-columns: repeat(2, 1fr) !important; }
          .offices-grid { grid-template-columns: repeat(3, 1fr) !important; }
          .contact-grid { grid-template-columns: 1fr !important; }
          .footer-grid { grid-template-columns: 1fr !important; gap: 40px !important; }
          .about-grid { grid-template-columns: 1fr !important; }
          .hero-badges { flex-direction: column !important; gap: 10px !important; }
          .videos-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>

      {/* ─────────────────────────────────────────
          PRELOADER
      ───────────────────────────────────────── */}
      <AnimatePresence>
        {loading && (
          <Preloader onComplete={() => { setLoading(false); setHeroReady(true); }} />
        )}
      </AnimatePresence>

      {/* ─────────────────────────────────────────
          SCROLL PROGRESS BAR
      ───────────────────────────────────────── */}
      <div style={{ position: "fixed", top: 0, left: 0, right: 0, height: 2, zIndex: 101 }}>
        <div style={{ height: "100%", width: `${scrollProgress}%`, background: ACCENT, transition: "width 0.1s linear" }} />
      </div>

      {/* ─────────────────────────────────────────
          NAV
      ───────────────────────────────────────── */}
      <motion.nav
        initial={{ y: -60, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        style={{
          position: "fixed", top: 0, left: 0, right: 0, zIndex: 100,
          padding: "0 40px",
          height: 68,
          display: "flex", alignItems: "center", justifyContent: "space-between",
          background: scrolled ? "rgba(26,26,26,0.95)" : "transparent",
          backdropFilter: scrolled ? "blur(12px)" : "none",
          borderBottom: scrolled ? "1px solid rgba(255,255,255,0.08)" : "none",
          transition: "all 0.4s ease",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <div style={{
            width: 40, height: 40, borderRadius: 8,
            display: "flex", alignItems: "center", justifyContent: "center",
            background: "#fff", padding: 4,
          }}>
            <img src={LOGO_URL} alt="Udaypur Dhuwani Sewaa logo" style={{ width: "100%", height: "100%", objectFit: "contain" }} />
          </div>
          <span style={{ color: "#fff", fontWeight: 800, fontSize: 15, letterSpacing: "0.01em" }}>
            UDAYPUR DHUWANI
          </span>
        </div>

        <div className="desktop-nav" style={{ display: "flex", alignItems: "center", gap: 36 }}>
          {NAV_LINKS.map((l) => (
            <button
              key={l.id}
              onClick={() => scrollTo(l.id)}
              style={{
                position: "relative", background: "none", border: "none",
                color: activeSection === l.id ? "#fff" : "rgba(255,255,255,0.7)",
                fontSize: 13, fontWeight: 600, cursor: "pointer", letterSpacing: "0.04em",
                padding: "8px 0", transition: "color 0.2s",
              }}
              onMouseEnter={e => { if (activeSection !== l.id) e.target.style.color = "#fff"; }}
              onMouseLeave={e => { if (activeSection !== l.id) e.target.style.color = "rgba(255,255,255,0.7)"; }}
            >
              {l.label}
              {activeSection === l.id && (
                <motion.span
                  layoutId="navIndicator"
                  transition={{ type: "spring", stiffness: 380, damping: 30 }}
                  style={{ position: "absolute", bottom: 0, left: 0, right: 0, height: 2, background: ACCENT, borderRadius: 2 }}
                />
              )}
            </button>
          ))}
          <motion.button
            onClick={() => scrollTo("contact")}
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.97 }}
            style={{
              background: ACCENT, border: "none", color: "#fff",
              padding: "10px 22px", borderRadius: 8, fontSize: 12,
              fontWeight: 700, cursor: "pointer", letterSpacing: "0.08em",
              textTransform: "uppercase",
            }}
          >Get a Quote</motion.button>
        </div>

        <button
          className="mobile-menu-btn"
          onClick={() => setMenuOpen(!menuOpen)}
          style={{
            display: "none", background: "none", border: "none",
            color: "#fff", cursor: "pointer", padding: 8, flexDirection: "column", gap: 5,
          }}
        >
          <span style={{ width: 22, height: 2, background: "#fff", display: "block", transition: "all 0.3s", transform: menuOpen ? "rotate(45deg) translateY(7px)" : "none" }} />
          <span style={{ width: 22, height: 2, background: "#fff", display: "block", opacity: menuOpen ? 0 : 1 }} />
          <span style={{ width: 22, height: 2, background: "#fff", display: "block", transition: "all 0.3s", transform: menuOpen ? "rotate(-45deg) translateY(-7px)" : "none" }} />
        </button>
      </motion.nav>

      {/* Mobile menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            style={{
              position: "fixed", top: 68, left: 0, right: 0, zIndex: 99,
              background: "rgba(26,26,26,0.98)", padding: "20px 40px 30px",
              display: "flex", flexDirection: "column", gap: 8,
            }}
          >
            {NAV_LINKS.map((l, i) => (
              <motion.button
                key={l.id}
                initial={{ opacity: 0, x: -16 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.05 }}
                onClick={() => scrollTo(l.id)}
                style={{
                  background: "none", border: "none",
                  color: activeSection === l.id ? ACCENT : "rgba(255,255,255,0.85)",
                  fontSize: 16, fontWeight: 600, cursor: "pointer", padding: "10px 0",
                  textAlign: "left", borderBottom: "1px solid rgba(255,255,255,0.08)",
                }}
              >{l.label}</motion.button>
            ))}
            <motion.button
              initial={{ opacity: 0, x: -16 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: NAV_LINKS.length * 0.05 }}
              onClick={() => scrollTo("contact")}
              style={{
                background: ACCENT, border: "none", color: "#fff",
                padding: "14px 22px", borderRadius: 8, fontSize: 13,
                fontWeight: 700, cursor: "pointer", letterSpacing: "0.08em",
                textTransform: "uppercase", marginTop: 12,
              }}
            >Get a Quote</motion.button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ─────────────────────────────────────────
          HERO SECTION
      ───────────────────────────────────────── */}
      <section id="hero" style={{ position: "relative", height: "100vh", minHeight: 640, overflow: "hidden" }}>
        {/* Background with truck */}
        <div style={{ position: "absolute", inset: 0, zIndex: 0 }}>
          <img
            src="https://images.unsplash.com/photo-1601584115197-04ecc0da31d7?w=1600&q=80"
            alt="Freight truck on Nepal highway"
            style={{ width: "100%", height: "100%", objectFit: "cover" }}
          />
          <div style={{
            position: "absolute", inset: 0,
            background: "linear-gradient(120deg, rgba(26,26,26,0.88) 0%, rgba(26,26,26,0.55) 70%, rgba(26,26,26,0.3) 100%)",
          }} />
          <motion.div
            animate={{ backgroundPosition: ["0% 0%", "100% 100%"] }}
            transition={{ duration: 30, ease: "linear", repeat: Infinity, repeatType: "reverse" }}
            style={{
              position: "absolute", inset: 0,
              backgroundImage: "radial-gradient(circle at 20% 80%, rgba(224,79,42,0.08) 0%, transparent 60%), radial-gradient(circle at 80% 20%, rgba(224,79,42,0.05) 0%, transparent 50%)",
            }}
          />
        </div>

        {/* Content */}
        <div style={{
          position: "relative", zIndex: 2, height: "100%",
          display: "flex", flexDirection: "column", justifyContent: "flex-end",
          padding: "0 80px 80px",
          maxWidth: 1400, margin: "0 auto", paddingRight: 80,
        }}>
          <motion.div
            animate={heroReady ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ delay: 0.4, duration: 0.6 }}
            className="hero-badges"
            style={{ display: "flex", gap: 14, marginBottom: 32, flexWrap: "wrap" }}
          >
            {["Reliable Transport", "Operating with 25+ Offices in Nepal"].map((badge, i) => (
              <span key={i} style={{
                background: i === 0 ? ACCENT : "rgba(255,255,255,0.1)",
                backdropFilter: "blur(8px)",
                border: i === 0 ? "none" : "1px solid rgba(255,255,255,0.2)",
                color: "#fff", padding: "8px 18px", borderRadius: 40,
                fontSize: 12, fontWeight: 700, letterSpacing: "0.08em", textTransform: "uppercase",
              }}>
                {badge}
              </span>
            ))}
          </motion.div>

          {/* Main title */}
          <div style={{ overflow: "hidden", marginBottom: 8 }}>
            <motion.h1
              animate={heroReady ? { y: 0, opacity: 1 } : { y: 110, opacity: 0 }}
              transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
              className="hero-title"
              style={{
                fontSize: "clamp(40px, 6.5vw, 90px)", fontWeight: 900,
                color: "#fff", lineHeight: 1.05, textTransform: "uppercase",
                letterSpacing: "-0.01em",
              }}
            >
              UDAYPUR
            </motion.h1>
          </div>
          <div style={{ overflow: "hidden", marginBottom: 8 }}>
            <motion.h1
              animate={heroReady ? { y: 0, opacity: 1 } : { y: 110, opacity: 0 }}
              transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
              className="hero-title"
              style={{
                fontSize: "clamp(40px, 6.5vw, 90px)", fontWeight: 900,
                color: ACCENT, lineHeight: 1.05, textTransform: "uppercase",
                letterSpacing: "-0.01em",
              }}
            >
              DHUWANI
            </motion.h1>
          </div>
          <div style={{ overflow: "hidden", marginBottom: 40 }}>
            <motion.h1
              animate={heroReady ? { y: 0, opacity: 1 } : { y: 110, opacity: 0 }}
              transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1], delay: 0.3 }}
              className="hero-title"
              style={{
                fontSize: "clamp(40px, 6.5vw, 90px)", fontWeight: 900,
                color: "#fff", lineHeight: 1.05, textTransform: "uppercase",
                letterSpacing: "-0.01em",
              }}
            >
              SEWAA
            </motion.h1>
          </div>

          {/* Sub and CTA */}
          <motion.div
            animate={heroReady ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ delay: 0.55, duration: 0.7 }}
            style={{ display: "flex", alignItems: "center", gap: 32, flexWrap: "wrap" }}
          >
            <p style={{ color: "rgba(255,255,255,0.65)", fontSize: 16, maxWidth: 420, lineHeight: 1.6 }}>
              Nepal's trusted freight & logistics partner — moving cargo across all 77 districts with precision and care.
            </p>
            <motion.button
              onClick={() => scrollTo("contact")}
              whileHover={{ scale: 1.05, boxShadow: `0 0 32px rgba(224,79,42,0.5)` }}
              whileTap={{ scale: 0.97 }}
              style={{
                background: ACCENT, color: "#fff", border: "none",
                padding: "16px 36px", borderRadius: 10, fontSize: 13,
                fontWeight: 800, cursor: "pointer", letterSpacing: "0.1em",
                textTransform: "uppercase", flexShrink: 0,
              }}
            >GET A FREIGHT QUOTE →</motion.button>
          </motion.div>
        </div>

        {/* Scroll indicator */}
        <motion.div
          animate={heroReady ? { opacity: 1 } : { opacity: 0 }}
          transition={{ delay: 1.0 }}
          style={{
            position: "absolute", bottom: 32, right: 80, zIndex: 2,
            display: "flex", flexDirection: "column", alignItems: "center", gap: 8,
          }}
        >
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 1.8, repeat: Infinity }}
            style={{ color: "rgba(255,255,255,0.4)", fontSize: 11, letterSpacing: "0.15em", textTransform: "uppercase" }}
          >Scroll</motion.div>
          <div style={{ width: 1, height: 48, background: "rgba(255,255,255,0.2)" }}>
            <motion.div
              animate={{ height: ["0%", "100%", "0%"], y: ["0%", "0%", "100%"] }}
              transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
              style={{ width: "100%", background: ACCENT }}
            />
          </div>
        </motion.div>
      </section>

      {/* ─────────────────────────────────────────
          ABOUT & FREIGHT EXCELLENCE
      ───────────────────────────────────────── */}
      <section id="about" style={{ padding: "120px 80px", background: CREAM, maxWidth: 1400, margin: "0 auto" }}>
        <div className="about-grid" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 80, alignItems: "center" }}>
          <motion.div variants={stagger} initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-80px" }}>
            <motion.p variants={fadeUp} style={{ color: ACCENT, fontSize: 11, letterSpacing: "0.2em", fontWeight: 700, textTransform: "uppercase", marginBottom: 24 }}>
              About Us
            </motion.p>
            <motion.h2
              variants={fadeUp}
              style={{ fontSize: "clamp(36px, 4.5vw, 64px)", fontWeight: 900, lineHeight: 1.05, textTransform: "uppercase", marginBottom: 40 }}
            >
              FREIGHT<br />
              <span style={{ color: ACCENT }}>EXCELLENCE</span><br />
              IN NEPAL
            </motion.h2>

            <motion.div variants={fadeUp} style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
              <div style={{ borderRadius: 12, overflow: "hidden", height: 220 }}>
                <img src="https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=500&q=80" alt="Warehouse operations" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
              </div>
              <div style={{ borderRadius: 12, overflow: "hidden", height: 220, marginTop: 32 }}>
                <img src="https://images.unsplash.com/photo-1577017040065-650ee4d43339?w=500&q=80" alt="Logistics team" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
              </div>
            </motion.div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.7, ease: "easeOut" }}
          >
            <p style={{ color: "#777", fontSize: 15, lineHeight: 1.8, marginBottom: 40 }}>
              Udaypur Dhuwani Sewaa has been moving Nepal forward since our founding — connecting businesses, factories, and communities through reliable, professional freight services across all provinces.
            </p>

            <AccordionItem title="Logistics Company Overview" defaultOpen>
              We are a full-service freight and logistics company headquartered in Udaypur, Nepal. With over a decade of operational experience, we specialize in FTL, LTL, and express cargo services — serving businesses of all sizes from individual traders to industrial corporations. Our fleet of 150+ vehicles covers Nepal's highways, mountain routes, and Terai plains with unwavering reliability.
            </AccordionItem>
            <AccordionItem title="Our Operational Expertise">
              Our team of 500+ trained logistics professionals handles every aspect of your supply chain — from pickup and warehousing to last-mile delivery. We operate specialized fleets including flatbeds for heavy machinery, refrigerated units for perishables, and tankers for liquid cargo. Our operations center ensures real-time coordination across all 25 branches.
            </AccordionItem>
            <AccordionItem title="Extensive Nepal Network">
              With 25 strategically located offices spanning from Mahendranagar in the Far West to Biratnagar in the East, we have Nepal's most comprehensive freight network. Our hubs in Kathmandu, Birgunj, Bhairahawa, and Pokhara serve as regional distribution centers, enabling rapid transit to any destination within Nepal.
            </AccordionItem>
          </motion.div>
        </div>
      </section>

      {/* ─────────────────────────────────────────
          SERVICES
      ───────────────────────────────────────── */}
      <div id="services">
        <div style={{ background: DARK, padding: "90px 80px 50px", textAlign: "center" }}>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            style={{ color: ACCENT, fontSize: 11, letterSpacing: "0.2em", fontWeight: 700, textTransform: "uppercase", marginBottom: 16 }}
          >What We Move</motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            style={{ fontSize: "clamp(32px, 4vw, 56px)", fontWeight: 900, color: "#fff", textTransform: "uppercase", lineHeight: 1.1 }}
          >
            OUR FREIGHT<br /><span style={{ color: ACCENT }}>SERVICES</span>
          </motion.h2>
          <p style={{ color: "rgba(255,255,255,0.4)", fontSize: 13, marginTop: 16 }}>
            Tap a service to preview it →
          </p>
        </div>
        <ServicesSection />
      </div>

      {/* ─────────────────────────────────────────
          STATS SECTION
      ───────────────────────────────────────── */}
      <section style={{ background: DARK }}>
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          variants={stagger}
          className="stats-grid"
          style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr 1fr" }}
        >
          {[
            { val: "98", suffix: "%", label: "Customer Satisfaction Rate", bg: CREAM, text: DARK },
            { val: "25", suffix: "+", label: "Branches Across Nepal", bg: ACCENT, text: "#fff" },
            { val: "15000", suffix: "+", label: "Completed Shipments", bg: CREAM, text: DARK },
            { val: "150", suffix: "+", label: "Fleet & Truck Network", bg: ACCENT, text: "#fff" },
          ].map((s, i) => (
            <motion.div
              key={i}
              variants={fadeUp}
              style={{
                background: s.bg, padding: "72px 48px",
                display: "flex", flexDirection: "column",
                justifyContent: "center",
              }}
            >
              <span style={{ fontSize: "clamp(48px, 5vw, 80px)", fontWeight: 900, color: s.text, lineHeight: 1 }}>
                <Counter to={parseInt(s.val)} suffix={s.suffix} />
              </span>
              <span style={{
                fontSize: 13, color: s.text === "#fff" ? "rgba(255,255,255,0.75)" : "#666",
                marginTop: 12, fontWeight: 500, maxWidth: 160, lineHeight: 1.5,
              }}>{s.label}</span>
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* ─────────────────────────────────────────
          GALLERY — PHOTOS & VIDEOS
      ───────────────────────────────────────── */}
      <GallerySection />

      {/* ─────────────────────────────────────────
          NETWORK — 6 major hubs + "view all" panel
      ───────────────────────────────────────── */}
      <section id="network" style={{ padding: "120px 80px", background: CREAM }}>
        <div style={{ maxWidth: 1400, margin: "0 auto" }}>
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={stagger}
          >
            <motion.p variants={fadeUp} style={{ color: ACCENT, fontSize: 11, letterSpacing: "0.2em", fontWeight: 700, textTransform: "uppercase", marginBottom: 16 }}>Our Reach</motion.p>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginBottom: 56, flexWrap: "wrap", gap: 20 }}>
              <motion.h2 variants={fadeUp} style={{ fontSize: "clamp(32px, 4vw, 56px)", fontWeight: 900, textTransform: "uppercase", lineHeight: 1.1 }}>
                MAJOR HUBS<br /><span style={{ color: ACCENT }}>ACROSS NEPAL</span>
              </motion.h2>
              <motion.p variants={fadeUp} style={{ color: "#777", fontSize: 15, maxWidth: 360, lineHeight: 1.7 }}>
                Six key distribution hubs anchor a network of 25 offices spanning the Far West to the Eastern Hills.
              </motion.p>
            </div>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-60px" }}
            variants={stagger}
            className="hubs-grid"
            style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 18 }}
          >
            {MAJOR_HUBS.map((hub, i) => (
              <motion.div
                key={i}
                variants={fadeUp}
                whileHover={{ y: -4, boxShadow: `0 12px 32px rgba(224,79,42,0.15)` }}
                style={{
                  background: "#fff", border: `1.5px solid ${CREAM_DARK}`,
                  borderRadius: 14, padding: "26px 24px",
                  display: "flex", flexDirection: "column", gap: 10,
                  transition: "box-shadow 0.3s ease",
                }}
              >
                <div style={{
                  width: 32, height: 32, background: ACCENT, borderRadius: 8,
                  display: "flex", alignItems: "center", justifyContent: "center",
                }}>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2.5">
                    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/>
                  </svg>
                </div>
                <span style={{ fontSize: 18, fontWeight: 800, color: DARK }}>{hub.city}</span>
                <span style={{ fontSize: 13, color: "#888", lineHeight: 1.5 }}>{hub.note}</span>
              </motion.div>
            ))}
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            style={{ textAlign: "center", marginTop: 44 }}
          >
            <motion.button
              onClick={() => setLocationsOpen(true)}
              whileHover={{ scale: 1.03, background: DARK, color: "#fff" }}
              whileTap={{ scale: 0.97 }}
              style={{
                background: "transparent", border: `1.5px solid ${DARK}`, color: DARK,
                padding: "16px 36px", borderRadius: 10, fontWeight: 800, fontSize: 13,
                letterSpacing: "0.08em", textTransform: "uppercase", cursor: "pointer",
                transition: "background 0.3s, color 0.3s",
              }}
            >View All 25 Branches →</motion.button>
          </motion.div>
        </div>
      </section>

      <LocationsModal open={locationsOpen} onClose={() => setLocationsOpen(false)} />

      {/* ─────────────────────────────────────────
          CUSTOMER REVIEWS
      ───────────────────────────────────────── */}
      <section id="reviews" style={{ padding: "120px 0", background: DARK, overflow: "hidden" }}>
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={stagger}
          style={{ paddingLeft: 80, marginBottom: 64 }}
        >
          <motion.p variants={fadeUp} style={{ color: ACCENT, fontSize: 11, letterSpacing: "0.2em", fontWeight: 700, textTransform: "uppercase", marginBottom: 16 }}>
            Testimonials
          </motion.p>
          <motion.h2 variants={fadeUp} style={{
            fontSize: "clamp(32px, 4.5vw, 64px)", fontWeight: 900,
            textTransform: "uppercase", color: "#fff", lineHeight: 1.1, maxWidth: 700,
          }}>
            OUR CUSTOMER<br /><span style={{ color: ACCENT }}>REVIEW STORIES</span>
          </motion.h2>
        </motion.div>

        <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
          <MarqueeRow items={REVIEWS} />
          <MarqueeRow items={REVIEWS_ROW2} reverse />
        </div>
      </section>

      {/* ─────────────────────────────────────────
          CONTACT + FAQ
      ───────────────────────────────────────── */}
      <section id="contact" style={{ padding: "120px 80px", background: CREAM, maxWidth: 1400, margin: "0 auto" }}>
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={stagger}
          style={{ marginBottom: 64 }}
        >
          <motion.p variants={fadeUp} style={{ color: ACCENT, fontSize: 11, letterSpacing: "0.2em", fontWeight: 700, textTransform: "uppercase", marginBottom: 16 }}>
            Get In Touch
          </motion.p>
          <motion.h2 variants={fadeUp} style={{ fontSize: "clamp(32px, 4vw, 56px)", fontWeight: 900, textTransform: "uppercase", lineHeight: 1.1 }}>
            REQUEST A<br /><span style={{ color: ACCENT }}>FREIGHT QUOTE</span>
          </motion.h2>
        </motion.div>

        <div className="contact-grid" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 80 }}>
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <form onSubmit={handleSubmit}>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, marginBottom: 16 }}>
                {[
                  { label: "Full Name", key: "name", type: "text", placeholder: "Ramesh Sharma" },
                  { label: "Email Address", key: "email", type: "email", placeholder: "you@email.com" },
                  { label: "Moving From", key: "from", type: "text", placeholder: "Birgunj" },
                  { label: "Moving To", key: "to", type: "text", placeholder: "Kathmandu" },
                ].map((f) => (
                  <div key={f.key}>
                    <label style={{ fontSize: 11, fontWeight: 700, color: "#777", letterSpacing: "0.1em", textTransform: "uppercase", display: "block", marginBottom: 8 }}>{f.label}</label>
                    <input
                      type={f.type}
                      value={formData[f.key]}
                      onChange={(e) => setFormData({ ...formData, [f.key]: e.target.value })}
                      placeholder={f.placeholder}
                      required
                      style={{
                        width: "100%", padding: "14px 16px", borderRadius: 10,
                        border: `1.5px solid ${CREAM_DARK}`, background: "#fff",
                        fontSize: 14, color: DARK, outline: "none",
                        transition: "border-color 0.2s",
                        fontFamily: "inherit",
                      }}
                      onFocus={e => e.target.style.borderColor = ACCENT}
                      onBlur={e => e.target.style.borderColor = CREAM_DARK}
                    />
                  </div>
                ))}
              </div>
              <div style={{ marginBottom: 24 }}>
                <label style={{ fontSize: 11, fontWeight: 700, color: "#777", letterSpacing: "0.1em", textTransform: "uppercase", display: "block", marginBottom: 8 }}>Message / Cargo Details</label>
                <textarea
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  placeholder="Describe your cargo, weight, dimensions, and any special requirements..."
                  required
                  rows={5}
                  style={{
                    width: "100%", padding: "14px 16px", borderRadius: 10,
                    border: `1.5px solid ${CREAM_DARK}`, background: "#fff",
                    fontSize: 14, color: DARK, outline: "none", resize: "vertical",
                    transition: "border-color 0.2s", fontFamily: "inherit",
                  }}
                  onFocus={e => e.target.style.borderColor = ACCENT}
                  onBlur={e => e.target.style.borderColor = CREAM_DARK}
                />
              </div>
              <AnimatePresence mode="wait">
                {submitted ? (
                  <motion.div
                    key="success"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    style={{
                      background: "#e8f5e9", border: "1.5px solid #4caf50",
                      color: "#2e7d32", padding: "16px 24px",
                      borderRadius: 10, fontSize: 14, fontWeight: 600,
                    }}
                  >✓ Quote request submitted! We'll respond within 2 hours.</motion.div>
                ) : (
                  <motion.button
                    key="btn"
                    type="submit"
                    whileHover={{ scale: 1.03, boxShadow: `0 8px 32px rgba(224,79,42,0.35)` }}
                    whileTap={{ scale: 0.97 }}
                    style={{
                      background: DARK, color: "#fff", border: "none",
                      padding: "18px 40px", borderRadius: 10, fontSize: 13,
                      fontWeight: 800, cursor: "pointer", letterSpacing: "0.1em",
                      textTransform: "uppercase", width: "100%",
                    }}
                  >SUBMIT NOW →</motion.button>
                )}
              </AnimatePresence>
            </form>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <p style={{ fontSize: 15, color: "#666", lineHeight: 1.7, marginBottom: 40 }}>
              Have questions about our freight services? We've compiled answers to the most common queries below — or reach out and our team will assist you directly.
            </p>
            {FAQS.map((f, i) => (
              <AccordionItem key={i} title={f.q}>{f.a}</AccordionItem>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ─────────────────────────────────────────
          QUOTE BANNER
      ───────────────────────────────────────── */}
      <section style={{ background: ACCENT, padding: "60px 80px" }}>
        <div style={{ maxWidth: 1400, margin: "0 auto", display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 24 }}>
          <div>
            <h2 style={{ fontSize: "clamp(24px, 3vw, 40px)", fontWeight: 900, color: "#fff", textTransform: "uppercase", lineHeight: 1.1 }}>
              READY TO SHIP ACROSS NEPAL?
            </h2>
            <p style={{ color: "rgba(255,255,255,0.8)", marginTop: 8, fontSize: 15 }}>
              Get a competitive freight quote in under 2 hours.
            </p>
          </div>
          <motion.button
            onClick={() => scrollTo("contact")}
            whileHover={{ scale: 1.05 }}
            style={{
              background: DARK, color: "#fff", border: "none",
              padding: "18px 40px", borderRadius: 10, fontSize: 13,
              fontWeight: 800, cursor: "pointer", letterSpacing: "0.1em",
              textTransform: "uppercase", transition: "background 0.3s, color 0.3s",
            }}
            onMouseEnter={e => { e.target.style.background = "#fff"; e.target.style.color = ACCENT; }}
            onMouseLeave={e => { e.target.style.background = DARK; e.target.style.color = "#fff"; }}
          >GET A QUOTE →</motion.button>
        </div>
      </section>

      {/* ─────────────────────────────────────────
          FOOTER  
      ───────────────────────────────────────── */}
      <footer style={{ background: DARK, padding: "80px 80px 48px" }}>
        <div style={{ maxWidth: 1400, margin: "0 auto" }}>
          <div className="footer-grid" style={{ display: "grid", gridTemplateColumns: "2fr 1.5fr 1.5fr", gap: 80, marginBottom: 64 }}>
            <div>
              <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 24 }}>
                <div style={{
                  width: 44, height: 44, borderRadius: 10,
                  display: "flex", alignItems: "center", justifyContent: "center",
                  background: "#fff", padding: 5,
                }}>
                  <img src={LOGO_URL} alt="Udaypur Dhuwani Sewaa logo" style={{ width: "100%", height: "100%", objectFit: "contain" }} />
                </div>
                <div>
                  <p style={{ color: "#fff", fontWeight: 800, fontSize: 15 }}>UDAYPUR DHUWANI SEWAA</p>
                  <p style={{ color: "rgba(255,255,255,0.4)", fontSize: 11 }}>Freight & Logistics, Nepal</p>
                </div>
              </div>
              <p style={{ color: "rgba(255,255,255,0.5)", fontSize: 14, lineHeight: 1.8, maxWidth: 320 }}>
                Moving Nepal's commerce forward — one shipment at a time. Trusted by thousands of businesses across all provinces since our founding.
              </p>
              <div style={{ display: "flex", gap: 10, marginTop: 28 }}>
                {["fb", "tw", "in"].map((s, i) => (
                  <div key={i} style={{
                    width: 36, height: 36, borderRadius: 8,
                    border: "1px solid rgba(255,255,255,0.15)",
                    display: "flex", alignItems: "center", justifyContent: "center",
                    cursor: "pointer",
                  }}>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="rgba(255,255,255,0.5)" strokeWidth="0">
                        {s === "fb" && <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/>}
                        {s === "tw" && <path d="M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z"/>}
                        {s === "in" && (
                          <g>
                            <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6zM2 9h4v12H2z"/>
                            <circle cx="4" cy="4" r="2"/>
                          </g>
                        )}
                      </svg>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h3 style={{ color: "#fff", fontWeight: 800, fontSize: 14, letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: 28 }}>Major Office Hubs</h3>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "10px 20px" }}>
                {MAJOR_HUBS.map((hub) => (
                  <div key={hub.city} style={{ display: "flex", alignItems: "center", gap: 8 }}>
                    <div style={{ width: 4, height: 4, borderRadius: "50%", background: ACCENT, flexShrink: 0 }} />
                    <span style={{ color: "rgba(255,255,255,0.55)", fontSize: 13 }}>{hub.city}</span>
                  </div>
                ))}
              </div>
              <button
                onClick={() => setLocationsOpen(true)}
                style={{
                  background: "none", border: "none", color: ACCENT,
                  fontSize: 12.5, fontWeight: 700, cursor: "pointer", padding: 0,
                  marginTop: 18, letterSpacing: "0.02em",
                }}
              >View all 25 branches →</button>
            </div>

            <div>
              <h3 style={{ color: "#fff", fontWeight: 800, fontSize: 14, letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: 28 }}>Quick Links</h3>
              <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                {["About Us", "Our Services", "Office Network", "Get a Quote", "Customer Reviews", "FAQs"].map((l) => (
                  <button
                    key={l}
                    onClick={() => scrollTo(l === "About Us" ? "about" : l === "Our Services" ? "services" : l === "Office Network" ? "network" : "contact")}
                    style={{
                      background: "none", border: "none", color: "rgba(255,255,255,0.55)",
                      fontSize: 13, cursor: "pointer", textAlign: "left",
                      padding: 0, transition: "color 0.2s",
                    }}
                    onMouseEnter={e => e.target.style.color = ACCENT}
                    onMouseLeave={e => e.target.style.color = "rgba(255,255,255,0.55)"}
                  >{l}</button>
                ))}
              </div>
              <div style={{ marginTop: 36, padding: "20px 24px", background: "rgba(255,255,255,0.05)", borderRadius: 12, border: "1px solid rgba(255,255,255,0.08)" }}>
                <p style={{ color: "rgba(255,255,255,0.5)", fontSize: 11, textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: 6 }}>Head Office</p>
                <p style={{ color: "#fff", fontSize: 13, fontWeight: 600 }}>Udaypur, Bagmati Province</p>
                <p style={{ color: "rgba(255,255,255,0.5)", fontSize: 12, marginTop: 4 }}>Nepal, 45600</p>
                <p style={{ color: ACCENT, fontSize: 13, marginTop: 10, fontWeight: 600 }}>+977-1-XXXXXXX</p>
              </div>
            </div>
          </div>

          <div style={{ borderTop: "1px solid rgba(255,255,255,0.08)", paddingTop: 32, display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 16 }}>
            <p style={{ color: "rgba(255,255,255,0.3)", fontSize: 12 }}>
              © 2025 Udaypur Dhuwani Sewaa. All rights reserved.
            </p>
            <div style={{ display: "flex", gap: 24 }}>
              {["Privacy Policy", "Terms of Service", "Cookie Policy"].map((l) => (
                <span key={l} style={{ color: "rgba(255,255,255,0.3)", fontSize: 12, cursor: "pointer" }}>{l}</span>
              ))}
            </div>
          </div>
        </div>
      </footer>

      {/* ─────────────────────────────────────────
          FLOATING STICKY QUOTE BUTTON
      ───────────────────────────────────────── */}
      <AnimatePresence>
        {scrolled && !menuOpen && (
          <motion.button
            initial={{ opacity: 0, y: 20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.9 }}
            onClick={() => scrollTo("contact")}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.96 }}
            style={{
              position: "fixed", bottom: 28, right: 28, zIndex: 90,
              background: ACCENT, color: "#fff", border: "none",
              padding: "14px 24px", borderRadius: 50, fontWeight: 800,
              fontSize: 12, letterSpacing: "0.06em", textTransform: "uppercase",
              cursor: "pointer", boxShadow: "0 8px 24px rgba(224,79,42,0.4)",
              display: "flex", alignItems: "center", gap: 8,
            }}
          >
            Get Quote →
          </motion.button>
        )}
      </AnimatePresence>
    </div>
  );
}
