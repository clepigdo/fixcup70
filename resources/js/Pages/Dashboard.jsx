import {
    motion,
    useScroll,
    useTransform,
    AnimatePresence,
} from "framer-motion";
import { useState, useEffect, useRef, useMemo } from "react";
import { FaInstagram, FaWhatsapp, FaBolt } from "react-icons/fa";
import "../../css/app.css";

/* ================= PARTICLE EFFECT (LIGHTWEIGHT) ================= */
const ParticleEffect = () => {
    const particles = Array.from({ length: 20 });

    return (
        <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
            {particles.map((_, i) => (
                <motion.span
                    key={i}
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ y: ["0vh", "100vh"], opacity: [0, 0.6, 0] }}
                    transition={{
                        duration: 8 + i * 0.3,
                        repeat: Infinity,
                        ease: "linear",
                    }}
                    className="absolute w-[2px] h-[2px] bg-[#fadb04] rounded-full"
                    style={{ left: `${Math.random() * 100}%` }}
                />
            ))}
        </div>
    );
};

const dust = Array.from({ length: 12 }).map((_, i) => ({
    id: i,
    left: Math.random() * 100,
    top: Math.random() * 100,
    size: 2 + Math.random() * 3,
    duration: 20 + Math.random() * 20,
    delay: Math.random() * 10,
}));
/* ================= INTERACTIVE MASCOT ================= */
const Mascot = ({ mood, onClick }) => {
    return (
        <motion.div
            onClick={onClick}
            className="relative cursor-pointer"
            animate={{
                scale: mood ? 1.12 : 1,
                rotate: mood ? [0, 8, -8, 0] : 0,
            }}
            transition={{ duration: 0.5 }}
        >
            {/* glow */}
            <motion.div
                animate={{
                    scale: [1, 1.15, 1],
                    opacity: [0.3, 0.6, 0.3],
                }}
                transition={{ duration: 3, repeat: Infinity }}
                className="absolute inset-0 rounded-full bg-[#fadb04]/30 blur-3xl"
            />

            <motion.img
                src="/images/maskot.png"
                className="w-120 md:w-[420px] relative z-10"
                animate={{ y: [0, -20, 0] }}
                transition={{ duration: 4, repeat: Infinity }}
            />

            <AnimatePresence>
                {mood && (
                    <motion.div
                        initial={{ y: -40, opacity: 0, scale: 0.5 }}
                        animate={{ y: -80, opacity: 1, scale: 1 }}
                        exit={{ opacity: 0 }}
                        className="absolute left-1/2 -translate-x-1/2 top-0 bg-[#fadb04] text-[#002456] px-6 py-2 rounded-full font-black"
                    >
                        ⚽ GOOOAL!!
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.div>
    );
};

export default function Dashboard() {
    const { scrollY } = useScroll();

    const parallaxY = useTransform(scrollY, [0, 800], [0, 120]);
    const stadiumLight = useTransform(scrollY, [0, 800], [0, -200]);

    const [goal, setGoal] = useState(false);
    const [mascotMood, setMascotMood] = useState("idle");

    /* NAVBAR SCROLL */
    const [navSolid, setNavSolid] = useState(false);
    useEffect(() => {
        const onScroll = () => setNavSolid(window.scrollY > 60);
        window.addEventListener("scroll", onScroll);
        return () => window.removeEventListener("scroll", onScroll);
    }, []);

    /* COUNTDOWN */
    const eventDate = new Date("May 17, 2026").getTime();
    const [time, setTime] = useState({ d: 0, h: 0, m: 0, s: 0 });

    useEffect(() => {
        const timer = setInterval(() => {
            const gap = eventDate - new Date().getTime();
            setTime({
                d: Math.floor(gap / (1000 * 60 * 60 * 24)),
                h: Math.floor((gap / (1000 * 60 * 60)) % 24),
                m: Math.floor((gap / 1000 / 60) % 60),
                s: Math.floor((gap / 1000) % 60),
            });
        }, 1000);
        return () => clearInterval(timer);
    }, []);

    const triggerGoal = () => {
        setGoal(true);
        setTimeout(() => setGoal(false), 2000);
    };

    const [posterOpen, setPosterOpen] = useState(false);
    const [mascotHype, setMascotHype] = useState(false);

    return (
        <div className="relative bg-[#041f14] text-white overflow-x-hidden font-sans">
            
            {/* Stadium Light (NO SCALE, ONLY FADE) */}
            <motion.div
                animate={{ opacity: [0.15, 0.25, 0.15] }}
                transition={{ duration: 6, repeat: Infinity }}
                className="fixed -top-40 left-1/2 -translate-x-1/2 
        w-[700px] h-[400px] 
        bg-[#fadb04] opacity-20 blur-[120px] 
        rounded-full pointer-events-none will-change-transform"
            />

            {/* Field Glow (NO SCALE) */}
            <motion.div
                animate={{ opacity: [0.1, 0.18, 0.1] }}
                transition={{ duration: 8, repeat: Infinity }}
                className="fixed bottom-[-200px] left-1/2 -translate-x-1/2 
        w-[700px] h-[350px] 
        bg-[#00d46a] blur-[140px] 
        rounded-full pointer-events-none will-change-transform"
            />

            {/* pitch grid */}
            <div
                className="fixed inset-0 opacity-[0.04] pointer-events-none"
                style={{
                    backgroundImage:
                        "linear-gradient(to right, rgba(255,255,255,0.2) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.2) 1px, transparent 1px)",
                    backgroundSize: "80px 80px",
                }}
            />

            {/* ================= NAVBAR ================= */}

            <nav
                className={`fixed w-full z-50 transition-all duration-500 ${
                    navSolid
                        ? "bg-[#063d26]/90 backdrop-blur-xl shadow-lg border-b border-[#fadb04]/30"
                        : "bg-transparent"
                }`}
            >
                <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
                    {/* LOGO */}
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.6 }}
                        className="flex items-center gap-4 cursor-pointer group"
                    >
                        <div className="relative flex items-center justify-center">
                            <div
                                className="absolute inset-0 bg-[#fadb04] blur-2xl opacity-30 
                    rounded-full group-hover:opacity-70 transition duration-500"
                            />

                            <motion.img
                                src="/images/logofc.png"
                                alt="FIX CUP Logo"
                                className="relative w-12 md:w-14 object-contain drop-shadow-2xl"
                                whileHover={{ scale: 1.1, rotate: 3 }}
                            />
                        </div>

                        <div>
                            <div className="font-black tracking-wide text-lg">
                                FIX CUP
                            </div>
                            <div className="text-xs text-[#fadb04] font-bold tracking-widest">
                                FUTSAL CHAMPIONSHIP
                            </div>
                        </div>
                    </motion.div>

                    {/* MENU */}
                    <motion.ul
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        className="hidden md:flex items-center gap-8 text-sm font-semibold"
                    >
                        {[
                            ["Tentang", "#about"],
                            ["Info", "#info"],
                            ["Daftar", "#daftar"],
                            ["Guide", "#guide"],
                        ].map(([label, link], i) => (
                            <li key={i} className="group relative">
                                <a
                                    href={link}
                                    className="text-white/80 hover:text-[#fadb04] transition"
                                >
                                    {label}
                                </a>

                                <span
                                    className="absolute left-0 -bottom-2 w-0 h-[2px] 
                        bg-gradient-to-r from-[#fadb04] to-[#00d46a] 
                        transition-all duration-300 group-hover:w-full"
                                />
                            </li>
                        ))}
                    </motion.ul>

                    {/* CTA */}
                    <motion.a
                        href="#daftar"
                        whileHover={{ scale: 1.07 }}
                        whileTap={{ scale: 0.95 }}
                        className="hidden md:flex items-center gap-2 
                bg-gradient-to-r from-[#fadb04] to-[#ffe95c] 
                text-[#063d26] font-bold px-6 py-2.5 rounded-full 
                shadow-lg hover:shadow-[#fadb04]/50 transition"
                    >
                        <FaBolt />
                        Daftar
                    </motion.a>

                    <div className="md:hidden text-2xl text-[#fadb04] cursor-pointer">
                        ☰
                    </div>
                </div>
            </nav>

            {/* ================= HERO ================= */}

            <motion.section
                style={{ y: parallaxY }}
                className="relative min-h-screen flex items-center pt-28 px-6 
        max-w-7xl mx-auto grid md:grid-cols-2 gap-12"
            >
                {/* LEFT */}
                <div className="relative z-10">
                    <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="inline-flex items-center gap-2 
                bg-[#008037]/30 border border-[#fadb04]/60 
                backdrop-blur px-6 py-2 rounded-full 
                text-sm font-bold text-[#fadb04] mb-6"
                    >
                        <FaBolt className="animate-pulse" />
                        FUTSAL CHAMPIONSHIP 2025
                    </motion.div>

                    <motion.h1
                        initial={{ opacity: 0, y: 40 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                        className="text-5xl md:text-7xl lg:text-8xl font-black leading-tight"
                    >
                        FIX CUP{" "}
                        <span
                            className="bg-gradient-to-r 
                from-[#fadb04] via-[#ffe95c] to-[#00d46a] 
                bg-clip-text text-transparent drop-shadow-lg"
                        >
                            6.0
                        </span>
                    </motion.h1>

                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        className="mt-6 text-lg text-white/80 max-w-xl leading-relaxed"
                    >
                        Atmosfer turnamen dengan semangat{" "}
                        <span className="text-[#fadb04] font-semibold">
                            Brazil
                        </span>{" "}
                        — penuh{" "}
                        <span className="text-[#00d46a] font-semibold">
                            skill
                        </span>
                        ,{" "}
                        <span className="text-[#ffe95c] font-semibold">
                            passion
                        </span>
                        , dan{" "}
                        <span className="text-[#fadb04] font-semibold">
                            kejayaan
                        </span>
                        .
                    </motion.p>

                    {/* BUTTON */}
                    <motion.div className="mt-10 flex flex-wrap gap-4">
                        <motion.button
                            whileHover={{
                                scale: 1.08,
                                boxShadow: "0 20px 50px rgba(250,219,4,0.6)",
                            }}
                            whileTap={{ scale: 0.94 }}
                            className="relative overflow-hidden 
                    bg-gradient-to-r from-[#fadb04] to-[#ffe95c] 
                    text-[#063d26] px-12 py-4 rounded-full 
                    font-extrabold shadow-xl"
                        >
                            ⚽ Daftar Sekarang
                        </motion.button>

                        <motion.button
                            whileHover={{ scale: 1.06 }}
                            whileTap={{ scale: 0.95 }}
                            className="border-2 border-[#00d46a] 
                    px-10 py-4 rounded-full font-bold 
                    text-white hover:bg-[#00d46a]/20 transition"
                        >
                            Info Lengkap
                        </motion.button>
                    </motion.div>

                    {/* COUNTDOWN */}
                    <motion.div className="mt-12 grid grid-cols-4 gap-3 max-w-md">
                        {Object.entries(time).map(([k, v]) => (
                            <motion.div
                                key={k}
                                whileHover={{ y: -8, scale: 1.05 }}
                                className="bg-gradient-to-br 
                        from-[#008037] to-[#00a859] 
                        border border-[#fadb04]/40 
                        rounded-xl py-4 text-center shadow-xl"
                            >
                                <div className="text-3xl font-black text-[#fadb04]">
                                    {String(v).padStart(2, "0")}
                                </div>
                                <div className="text-[10px] uppercase text-white/70 tracking-widest">
                                    {k}
                                </div>
                            </motion.div>
                        ))}
                    </motion.div>
                </div>

                {/* RIGHT MASCOT */}
                <div className="relative flex justify-center items-center">
                    <motion.div
                        animate={{
                            scale: [1, 1.1, 1],
                            opacity: [0.2, 0.35, 0.2],
                        }}
                        transition={{ duration: 4, repeat: Infinity }}
                        className="absolute w-[420px] h-[420px] 
                bg-[#fadb04] blur-3xl rounded-full"
                    />

                    <motion.div
                        animate={{ y: [0, -15, 0] }}
                        transition={{ duration: 3, repeat: Infinity }}
                    >
                        <Mascot mood={goal} onClick={triggerGoal} />
                    </motion.div>
                </div>
            </motion.section>

            {/* ABOUT */}
            <section id="about" className="relative py-32 px-6 overflow-hidden">
                <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
                {dust.map((d) => (
                    <span
                        key={d.id}
                        className="stadium-dust"
                        style={{
                            left: `${d.left}%`,
                            top: `${d.top}%`,
                            width: `${d.size}px`,
                            height: `${d.size * 2}px`,
                            animationDuration: `${d.duration}s`,
                            animationDelay: `${d.delay}s`,
                        }}
                    />
                ))}
            </div>
                {/* ===== GLASS CONTAINER ===== */}
                <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    viewport={{ once: true }}
                    className="relative z-10 max-w-6xl mx-auto 
        bg-white/5 backdrop-blur-xl 
        border border-white/10 
        rounded-3xl p-12 md:p-16 
        shadow-2xl"
                >
                    {/* TOP LABEL */}
                    <div className="text-center mb-6">
                        <div className="text-sm tracking-[4px] uppercase text-[#00d46a] font-semibold">
                            Tentang Turnamen
                        </div>
                    </div>

                    {/* TITLE */}
                    <h2 className="text-center text-4xl md:text-5xl font-black text-[#fadb04] mb-6">
                        Apa itu FIX CUP?
                    </h2>

                    {/* DECORATIVE LINE */}
                    <div className="w-24 h-1 bg-gradient-to-r from-[#fadb04] to-[#00d46a] mx-auto mb-10 rounded-full" />

                    {/* DESCRIPTION */}
                    <p className="text-white/80 leading-relaxed text-lg md:text-xl max-w-3xl mx-auto text-center">
                        FIX CUP adalah ajang kompetisi futsal bergengsi yang
                        menjadi wadah bagi mahasiswa dan calon mahasiswa untuk
                        menunjukkan kemampuan terbaik, menjunjung tinggi{" "}
                        <span className="text-[#fadb04] font-semibold">
                            sportivitas
                        </span>
                        , membangun{" "}
                        <span className="text-[#00d46a] font-semibold">
                            solidaritas
                        </span>
                        , serta meraih{" "}
                        <span className="text-[#fadb04] font-semibold">
                            prestasi
                        </span>
                        .
                    </p>

                    {/* FEATURE CARDS */}
                    <div className="mt-16 grid md:grid-cols-3 gap-10">
                        {[
                            {
                                icon: "⚽",
                                title: "Kompetitif",
                                desc: "Sistem pertandingan profesional dengan standar regulasi resmi futsal.",
                            },
                            {
                                icon: "🤝",
                                title: "Sportivitas",
                                desc: "Menumbuhkan kerja sama tim dan semangat fair play di setiap laga.",
                            },
                            {
                                icon: "🏆",
                                title: "Prestasi",
                                desc: "Kesempatan meraih trofi, penghargaan individu, dan pengalaman berharga.",
                            },
                        ].map((item, i) => (
                            <motion.div
                                key={i}
                                whileHover={{ y: -8 }}
                                transition={{ type: "spring", stiffness: 200 }}
                                className="relative group rounded-2xl p-8 
                    bg-white/5 backdrop-blur-lg 
                    border border-white/10 
                    hover:border-[#fadb04]/40 
                    transition duration-300"
                            >
                                {/* glow hover */}
                                <div
                                    className="absolute inset-0 rounded-2xl opacity-0 
                    group-hover:opacity-100 
                    bg-gradient-to-br from-[#fadb04]/10 to-transparent 
                    transition duration-500"
                                />

                                <div className="text-4xl mb-4">{item.icon}</div>

                                <h3 className="font-bold text-xl text-[#fadb04] mb-2">
                                    {item.title}
                                </h3>

                                <p className="text-white/70 text-sm leading-relaxed">
                                    {item.desc}
                                </p>
                            </motion.div>
                        ))}
                    </div>
                </motion.div>
            </section>

            {/* INFO EVENT – CLEAN VERSION */}
            <section id="info" className="relative py-32 px-6">
                {/* Soft top glow only */}
                <div
                    className="absolute top-0 left-1/2 -translate-x-1/2 
    w-[700px] h-[300px] 
    bg-[#fadb04]/10 blur-[120px] 
    rounded-full pointer-events-none"
                />

                <div className="relative z-10 text-center max-w-6xl mx-auto">
                    {/* LABEL */}
                    <div className="text-sm tracking-[4px] uppercase text-[#00d46a] font-semibold mb-4">
                        Detail Kompetisi
                    </div>

                    {/* TITLE */}
                    <h2 className="text-4xl md:text-5xl font-black mb-6 text-[#fadb04]">
                        Informasi Event
                    </h2>

                    <div className="w-24 h-1 bg-gradient-to-r from-[#fadb04] to-[#00d46a] mx-auto mb-16 rounded-full" />

                    {/* CARDS */}
                    <div className="grid md:grid-cols-3 gap-10">
                        {[
                            {
                                icon: "📝",
                                title: "Pendaftaran",
                                desc: "4 April - 2 Mei 2025",
                            },
                            {
                                icon: "⚽",
                                title: "Match Day",
                                desc: "17 - 18 Mei 2025",
                            },
                            {
                                icon: "📍",
                                title: "Lokasi",
                                desc: "GOR UDINUS Satria Sport Center",
                            },
                        ].map((item, i) => (
                            <div
                                key={i}
                                className="group relative p-10 rounded-3xl
          bg-[#0a2f22]/70
          border border-white/10
          hover:border-[#fadb04]/40
          transition duration-300
          backdrop-blur-md"
                            >
                                {/* subtle hover light */}
                                <div
                                    className="absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100 transition duration-500
          bg-gradient-to-br from-[#fadb04]/5 to-transparent"
                                />

                                <div className="text-5xl mb-6">{item.icon}</div>

                                <h3 className="font-black text-2xl mb-3 text-[#fadb04]">
                                    {item.title}
                                </h3>

                                <p className="text-white/80">{item.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
            {/* POSTER & MASCOT SECTION */}
            <section className="relative py-28 overflow-hidden">
                {/* stadium light atmosphere */}
                <div className="absolute inset-0">
                    <div className="absolute top-0 w-full h-60 bg-gradient-to-b from-[#fadb04]/25 to-transparent blur-3xl" />
                    <div className="absolute bottom-0 w-full h-40 bg-gradient-to-t from-[#008037]/35 to-transparent blur-2xl" />
                </div>

                <div className="max-w-5xl mx-auto px-6 relative z-10">
                    {/* TITLE */}
                    <div className="text-center mb-14">
                        <h2 className="text-4xl md:text-5xl font-black text-[#fadb04]">
                            OFFICIAL EVENT POSTER
                        </h2>
                        <p className="text-white/70 mt-2">
                            Semua informasi penting FIX CUP 6.0 dalam satu
                            poster.
                        </p>
                    </div>

                    {/* CONTENT */}
                    <div className="flex flex-col md:flex-row items-center justify-center gap-12">
                        {/* POSTER */}
                        <motion.div
                            whileHover={{ scale: 1.05 }}
                            onClick={() => setPosterOpen(true)}
                            className="relative cursor-pointer"
                        >
                            <div className="absolute inset-0 bg-[#fadb04] opacity-20 blur-3xl rounded-2xl" />

                            <img
                                src="/images/poster.jpg"
                                className="relative w-72 md:w-80 rounded-2xl shadow-[0_30px_70px_rgba(0,0,0,0.6)]"
                            />

                            <motion.p
                                animate={{ opacity: [0.5, 1, 0.5] }}
                                transition={{ duration: 1.5, repeat: Infinity }}
                                className="text-xs text-white/60 mt-2 text-center"
                            >
                                TAP TO VIEW ⚡
                            </motion.p>
                        </motion.div>

                        {/* MASCOT */}
                        <motion.div
                            className="relative"
                            animate={{ y: [0, -10, 0] }}
                            transition={{ duration: 4, repeat: Infinity }}
                            whileHover={{ scale: 1.06 }}
                            onClick={() => setMascotMood("goal")}
                        >
                            {/* glow aura */}
                            <motion.div
                                animate={{ opacity: [0.25, 0.5, 0.25] }}
                                transition={{ duration: 2, repeat: Infinity }}
                                className="absolute inset-0 bg-[#fadb04] blur-3xl rounded-full"
                            />

                            <motion.img
                                src="/images/maskot2.png"
                                className="relative w-72 md:w-80 drop-shadow-2xl"
                                animate={{ rotate: [0, 4, -4, 0] }}
                                transition={{ duration: 5, repeat: Infinity }}
                            />

                            {/* floating ball animation */}
                            <motion.img
                                src="/images/ball.png"
                                className="absolute -bottom-2 right-4 w-14"
                                animate={{
                                    y: [0, -8, 0],
                                    rotate: [0, 15, -15, 0],
                                }}
                                transition={{ duration: 2, repeat: Infinity }}
                            />

                            {/* interaction bubble */}
                            <AnimatePresence>
                                {mascotMood === "goal" && (
                                    <motion.div
                                        initial={{ scale: 0, y: 10 }}
                                        animate={{ scale: 1, y: 0 }}
                                        exit={{ scale: 0, opacity: 0 }}
                                        className="absolute -top-6 right-0 bg-[#fadb04] text-[#002456] font-bold text-xs px-4 py-1 rounded-full shadow-lg"
                                    >
                                        GOOOAL!!! ⚽🔥
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </motion.div>
                    </div>

                    {/* INFO STRIP */}
                    <div className="mt-14 flex flex-wrap justify-center gap-8 text-sm text-white/70">
                        <div className="flex items-center gap-2">
                            ⚽ <span>Kompetisi Futsal Terbesar FIK UDINUS</span>
                        </div>

                        <div className="flex items-center gap-2">
                            🏆 <span>Total Hadiah Puluhan Juta</span>
                        </div>

                        <div className="flex items-center gap-2">
                            🔥 <span>Terbuka untuk SMA & Mahasiswa</span>
                        </div>
                    </div>
                </div>
            </section>

            {/* MODAL */}
            <AnimatePresence>
                {posterOpen && (
                    <motion.div
                        className="fixed inset-0 bg-black/85 backdrop-blur-md flex items-center justify-center z-50"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={() => setPosterOpen(false)}
                    >
                        <motion.img
                            src="/images/poster.jpg"
                            initial={{ scale: 0.7 }}
                            animate={{ scale: 1 }}
                            exit={{ scale: 0.7, opacity: 0 }}
                            transition={{ type: "spring", stiffness: 140 }}
                            className="max-h-[88vh] rounded-xl shadow-2xl"
                        />
                    </motion.div>
                )}
            </AnimatePresence>

            {/* PENDAFTARAN */}
            <section
                id="daftar"
                className="relative py-28 text-center overflow-hidden"
            >
                {/* background glow */}
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-[#fadb04] opacity-10 blur-[180px] rounded-full pointer-events-none" />

                <motion.h2
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.7 }}
                    viewport={{ once: true }}
                    className="text-4xl md:text-5xl font-black mb-6 text-[#fadb04]"
                >
                    Kategori Pendaftaran
                </motion.h2>

                <motion.p
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    transition={{ delay: 0.2 }}
                    className="text-white/70 max-w-xl mx-auto mb-16"
                >
                    Pilih kategori tim Anda untuk mengikuti kompetisi futsal
                    paling bergengsi di FIX CUP 6.0.
                </motion.p>

                <div className="flex justify-center gap-10 flex-wrap">
                    {[
                        {
                            title: "SMA / SMK",
                            desc: "Kompetisi antar sekolah terbaik",
                            icon: "🎓",
                            glow: "from-[#fadb04] to-[#ffed4e]",
                        },
                        {
                            title: "Mahasiswa",
                            desc: "Pertarungan gengsi antar kampus",
                            icon: "🏆",
                            glow: "from-[#00d46a] to-[#008037]",
                        },
                    ].map((cat, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, y: 40 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ delay: i * 0.2 }}
                            viewport={{ once: true }}
                            whileHover={{
                                y: -15,
                                scale: 1.06,
                            }}
                            className="group relative w-80 cursor-pointer"
                        >
                            {/* glow border */}
                            <div
                                className={`absolute inset-0 rounded-3xl blur-xl opacity-0 group-hover:opacity-70 transition duration-500 bg-gradient-to-r ${cat.glow}`}
                            />

                            {/* card */}
                            <div className="relative bg-gradient-to-br from-[#002456] to-[#001a40] border border-white/10 rounded-3xl p-10 shadow-2xl overflow-hidden">
                                {/* floating icon */}
                                <motion.div
                                    animate={{ y: [0, -10, 0] }}
                                    transition={{
                                        duration: 3,
                                        repeat: Infinity,
                                    }}
                                    className="text-5xl mb-6"
                                >
                                    {cat.icon}
                                </motion.div>

                                <h3 className="text-2xl font-black text-[#fadb04] mb-3">
                                    {cat.title}
                                </h3>

                                <p className="text-white/70 text-sm mb-6">
                                    {cat.desc}
                                </p>

                                {/* animated underline */}
                                <div className="h-[2px] w-0 bg-[#fadb04] group-hover:w-full transition-all duration-500 mx-auto" />

                                {/* hover text */}
                                <motion.div
                                    initial={{ opacity: 0, y: 10 }}
                                    whileHover={{ opacity: 1, y: 0 }}
                                    className="mt-6 text-sm text-[#fadb04] font-semibold"
                                >
                                    Klik untuk mendaftar →
                                </motion.div>

                                {/* decorative gradient */}
                                <div className="absolute -top-20 -right-20 w-40 h-40 bg-[#fadb04] opacity-10 rounded-full blur-3xl" />
                            </div>
                        </motion.div>
                    ))}
                </div>
            </section>

            {/* GUIDE BOOK */}
            <section
                id="guide"
                className="relative py-28 text-center overflow-hidden"
            >
                {/* stadium light glow */}
                <div className="absolute inset-0 pointer-events-none">
                    <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[300px] bg-[#fadb04] opacity-10 blur-[160px] rounded-full" />
                </div>

                <motion.h2
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    viewport={{ once: true }}
                    className="text-4xl md:text-5xl font-black mb-6 text-[#fadb04]"
                >
                    Guide Book Resmi
                </motion.h2>

                <motion.p
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    transition={{ delay: 0.2 }}
                    className="text-white/70 max-w-xl mx-auto mb-10"
                >
                    Pelajari aturan pertandingan, sistem kompetisi, dan tata
                    tertib resmi sebelum bertanding.
                </motion.p>

                <motion.button
                    whileHover={{
                        scale: 1.08,
                        boxShadow: "0 20px 60px rgba(250,219,4,0.6)",
                    }}
                    whileTap={{ scale: 0.95 }}
                    className="relative overflow-hidden bg-[#fadb04] text-[#002456] px-12 py-4 rounded-full font-black text-lg shadow-2xl"
                >
                    <motion.span
                        animate={{ x: ["-100%", "100%"] }}
                        transition={{ duration: 2, repeat: Infinity }}
                        className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-30"
                    />
                    📥 Download Guide Book
                </motion.button>
            </section>

            {/* CONTACT */}
            <section className="py-24 text-center relative overflow-hidden">
                <motion.h2
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    className="text-3xl md:text-4xl font-black text-[#fadb04] mb-10"
                >
                    Terhubung Dengan Kami
                </motion.h2>

                <div className="flex justify-center gap-10">
                    {[
                        {
                            icon: <FaInstagram />,
                            color: "from-[#fadb04] to-[#ffed4e]",
                            label: "@fixcup.udinus",
                        },
                        {
                            icon: <FaWhatsapp />,
                            color: "from-[#00d46a] to-[#008037]",
                            label: "Contact Panitia",
                        },
                    ].map((item, i) => (
                        <motion.div
                            key={i}
                            whileHover={{
                                scale: 1.25,
                                rotate: 10,
                            }}
                            className="flex flex-col items-center gap-3 cursor-pointer"
                        >
                            <div
                                className={`w-20 h-20 rounded-full flex items-center justify-center text-3xl text-white shadow-xl bg-gradient-to-br ${item.color}`}
                            >
                                {item.icon}
                            </div>
                            <span className="text-sm text-white/70">
                                {item.label}
                            </span>
                        </motion.div>
                    ))}
                </div>
            </section>

            {/* FOOTER */}
            <footer className="relative border-t border-[#fadb04]/20 pt-12 pb-8 text-center">
                <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    className="max-w-xl mx-auto space-y-4"
                >
                    <h3 className="text-2xl font-black text-[#fadb04]">
                        FIX CUP 6.0
                    </h3>

                    <p className="text-white/60 text-sm">
                        Kompetisi Futsal Terbesar FIK UDINUS
                    </p>

                    <div className="flex justify-center gap-6 text-white/40 text-sm">
                        <span>Sport</span>
                        <span>•</span>
                        <span>Unity</span>
                        <span>•</span>
                        <span>Achievement</span>
                    </div>

                    <div className="pt-4 text-white/40 text-xs">
                        © 2025 BEM FIK UDINUS — All Rights Reserved
                    </div>
                </motion.div>
            </footer>
        </div>
    );
}
