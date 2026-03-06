import {
    motion,
    useScroll,
    useTransform,
    AnimatePresence,
} from "framer-motion";
import { useState, useEffect, useRef, useMemo } from "react";
import { FaInstagram, FaWhatsapp, FaBolt } from "react-icons/fa";
import "../../css/app.css";
import { Link } from "@inertiajs/react";
import Navbar from "../Components/Navbar";

const MotionLink = motion(Link);

/* ================= PARTICLE EFFECT ================= */
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

const StadiumParticles = () => {
    const [particles, setParticles] = useState([]);

    useEffect(() => {
        const particleArray = Array.from({ length: 30 }).map((_, i) => ({
            id: i,
            size: Math.random() * 4 + 1,
            x: Math.random() * 100,
            y: Math.random() * 100,
            duration: Math.random() * 20 + 10,
            delay: Math.random() * 5,
        }));
        setParticles(particleArray);
    }, []);
    return (
        <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
            {particles.map((p) => (
                <motion.div
                    key={p.id}
                    className="absolute bg-white rounded-full opacity-0"
                    style={{
                        width: p.size,
                        height: p.size,
                        left: `${p.x}%`,
                        top: `${p.y}%`,
                        boxShadow: "0 0 10px 2px rgba(255,255,255,0.8)",
                    }}
                    animate={{
                        y: ["0%", "-100%"],
                        x: [`0%`, `${Math.random() * 20 - 10}%`],
                        opacity: [0, 0.8, 0],
                    }}
                    transition={{
                        duration: p.duration,
                        repeat: Infinity,
                        delay: p.delay,
                        ease: "linear",
                    }}
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

    const [hoveredIndex, setHoveredIndex] = useState(null);

    const categories = [
        {
            title: "SMA / SMK",
            desc: "Kompetisi berdarah muda antar sekolah terbaik!",
            color: "#fadb04",
            glow: "rgba(250,219,4,0.4)",
            accent: "from-[#fadb04] to-[#ffe95c]",
            link: "/pendaftaran/sma",
        },
        {
            title: "MAHASISWA",
            desc: "Pertarungan gengsi dan taktik antar kampus!",
            color: "#00d46a",
            glow: "rgba(0,212,106,0.4)",
            accent: "from-[#00d46a] to-[#00ff80]",
            link: "/pendaftaran/mahasiswa",
        },
    ];

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

    // State untuk Modal Poster (opsional, disesuaikan dengan kode asli kamu)
    const [posterOpen, setPosterOpen] = useState(false);

    // State untuk reaksi Mascot
    const [mascotMood, setMascotMood] = useState("idle");

    // Auto-reset mood maskot setelah 2.5 detik agar bisa diklik lagi
    useEffect(() => {
        if (mascotMood === "goal") {
            const timer = setTimeout(() => setMascotMood("idle"), 2500);
            return () => clearTimeout(timer);
        }
    }, [mascotMood]);

    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    // Helper function untuk Smooth Scroll & otomatis tutup menu mobile
    const handleScroll = (e, targetId) => {
        e.preventDefault();
        setIsMobileMenuOpen(false); // Tutup menu mobile jika sedang terbuka

        if (targetId === "top") {
            window.scrollTo({ top: 0, behavior: "smooth" });
            return;
        }

        const target = document.querySelector(targetId);
        if (target) {
            const offsetTop =
                target.getBoundingClientRect().top + window.scrollY - 90;
            window.scrollTo({
                top: offsetTop,
                behavior: "smooth",
            });
        }
    };

    const navLinks = [
        ["Tentang", "#about"],
        ["Info", "#info"],
        ["Guide", "#guide"],
    ];

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
            <Navbar />

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
                            7.0
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
                    {/* BUTTONS */}
                    <motion.div className="mt-10 flex flex-wrap items-center gap-3 md:gap-4">
                        {/* 1. TOMBOL DAFTAR (UTAMA) */}
                        <motion.a
                            href="#daftar"
                            onClick={(e) => {
                                // 1. Mencegah lompatan kasar bawaan HTML
                                e.preventDefault();

                                // 2. Mencari elemen dengan id="daftar"
                                const target =
                                    document.getElementById("daftar");

                                // 3. Melakukan scroll halus ke elemen tersebut
                                if (target) {
                                    target.scrollIntoView({
                                        behavior: "smooth",
                                        block: "start", // Agar posisi elemen pas di bagian atas layar
                                    });
                                }
                            }}
                            whileHover={{
                                scale: 1.05,
                                boxShadow: "0 20px 50px rgba(250,219,4,0.6)",
                            }}
                            whileTap={{ scale: 0.95 }}
                            className="relative inline-flex items-center justify-center overflow-hidden 
    bg-gradient-to-r from-[#fadb04] to-[#ffe95c] 
    text-[#063d26] px-8 md:px-12 py-3.5 md:py-4 rounded-full 
    font-extrabold shadow-xl cursor-pointer w-full sm:w-auto"
                        >
                            ⚽ Amankan Slot Tim!
                        </motion.a>

                        {/* 2. TOMBOL WHATSAPP */}
                        <motion.a
                            href="https://wa.me/62882006325524?text=Halo%20Bemo%20Admin,%20saya%20ingin%20bertanya%20seputar%20pendaftaran%20FIX%20CUP."
                            target="_blank"
                            rel="noopener noreferrer"
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className="border-2 border-[#00d46a] 
        px-6 py-3.5 md:py-4 rounded-full font-bold flex items-center justify-center gap-2
        text-white hover:bg-[#00d46a]/20 transition cursor-pointer flex-1 sm:flex-none"
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="18"
                                height="18"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            >
                                <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
                            </svg>
                            <span className="hidden sm:inline">WhatsApp</span>
                            <span className="sm:hidden">WA</span>
                        </motion.a>

                        {/* 3. TOMBOL INSTAGRAM */}
                        <motion.a
                            href="https://instagram.com/bemfikudinus"
                            target="_blank"
                            rel="noopener noreferrer"
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className="border-2 border-[#fadb04] 
        px-6 py-3.5 md:py-4 rounded-full font-bold flex items-center justify-center gap-2
        text-white hover:bg-[#fadb04]/20 transition cursor-pointer flex-1 sm:flex-none"
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="18"
                                height="18"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            >
                                <rect
                                    x="2"
                                    y="2"
                                    width="20"
                                    height="20"
                                    rx="5"
                                    ry="5"
                                ></rect>
                                <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                                <line
                                    x1="17.5"
                                    y1="6.5"
                                    x2="17.51"
                                    y2="6.5"
                                ></line>
                            </svg>
                            <span className="hidden sm:inline">Instagram</span>
                            <span className="sm:hidden">IG</span>
                        </motion.a>
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
                    <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, ease: "easeOut" }}
                        viewport={{ once: true }}
                        className="inline-block px-4 py-1.5 rounded-full bg-[#00d46a]/10 border border-[#00d46a]/30 text-xs md:text-sm tracking-[4px] uppercase text-[#00d46a] font-bold mb-6 shadow-[0_0_20px_rgba(0,212,106,0.2)]"
                    >
                        Detail Kompetisi
                    </motion.div>

                    {/* TITLE */}
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.1 }}
                        viewport={{ once: true }}
                        className="text-4xl md:text-6xl font-black mb-6 text-transparent bg-clip-text bg-gradient-to-r from-white via-[#fadb04] to-white uppercase tracking-tight"
                    >
                        Informasi Event
                    </motion.h2>

                    {/* ANIMATED LINE */}
                    <motion.div
                        initial={{ width: 0, opacity: 0 }}
                        whileInView={{ width: "6rem", opacity: 1 }}
                        transition={{
                            duration: 0.8,
                            delay: 0.3,
                            type: "spring",
                        }}
                        viewport={{ once: true }}
                        className="h-1.5 bg-gradient-to-r from-[#fadb04] via-[#00d46a] to-[#002776] mx-auto mb-20 rounded-full shadow-[0_0_15px_rgba(250,219,4,0.6)]"
                    />

                    {/* CARDS */}
                    <div className="grid md:grid-cols-3 gap-8 lg:gap-12">
                        {[
                            {
                                icon: "📝",
                                title: "Pendaftaran",
                                desc: "4 April - 2 Mei 2025",
                                color: "from-[#fadb04] to-[#ffea6e]",
                                glow: "group-hover:shadow-[0_20px_40px_rgba(250,219,4,0.2)]",
                                border: "group-hover:border-[#fadb04]/50",
                                textGlow: "group-hover:text-[#fadb04]",
                            },
                            {
                                icon: "⚽",
                                title: "Match Day",
                                desc: "17 - 18 Mei 2025",
                                color: "from-[#009b3a] to-[#00d46a]",
                                glow: "group-hover:shadow-[0_20px_40px_rgba(0,155,58,0.25)]",
                                border: "group-hover:border-[#009b3a]/50",
                                textGlow: "group-hover:text-[#00d46a]",
                            },
                            {
                                icon: "📍",
                                title: "Lokasi",
                                desc: "GOR UDINUS Satria Sport Center",
                                color: "from-[#002776] to-[#0052cc]",
                                glow: "group-hover:shadow-[0_20px_40px_rgba(0,39,118,0.4)]",
                                border: "group-hover:border-[#0052cc]/50",
                                textGlow: "group-hover:text-[#4da6ff]",
                            },
                        ].map((item, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, y: 40 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{
                                    duration: 0.6,
                                    delay: i * 0.2,
                                    type: "spring",
                                    bounce: 0.4,
                                }}
                                viewport={{ once: true }}
                                whileHover={{ y: -10 }}
                                className={`group relative p-10 rounded-[2rem] bg-[#061810]/60 border-[2px] border-white/5 transition-all duration-500 backdrop-blur-xl ${item.border} ${item.glow} flex flex-col items-center cursor-default overflow-hidden`}
                            >
                                {/* Inner Ambient Light */}
                                <div className="absolute inset-0 bg-gradient-to-b from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

                                {/* FLOATING ICON CONTAINER */}
                                <motion.div
                                    className={`w-20 h-20 mb-8 rounded-2xl bg-gradient-to-br ${item.color} flex items-center justify-center text-4xl shadow-lg border border-white/20 relative z-10`}
                                    whileHover={{
                                        rotate: [0, -10, 10, -10, 0],
                                        scale: 1.1,
                                    }}
                                    transition={{ duration: 0.5 }}
                                >
                                    <span className="drop-shadow-md">
                                        {item.icon}
                                    </span>
                                </motion.div>

                                <h3
                                    className={`font-black text-2xl mb-3 text-white transition-colors duration-300 ${item.textGlow} relative z-10`}
                                >
                                    {item.title}
                                </h3>

                                <p className="text-white/70 font-medium tracking-wide relative z-10 text-center">
                                    {item.desc}
                                </p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>
            {/* POSTER & MASCOT SECTION */}
            <section className="relative pt-40 pb-28">
                {/* BACKGROUND ATMOSPHERE */}
                <div className="absolute inset-0">
                    <div className="absolute top-0 w-full h-60 bg-gradient-to-b from-[#fadb04]/20 to-transparent blur-3xl" />
                    <div className="absolute bottom-0 w-full h-40 bg-gradient-to-t from-[#008037]/30 to-transparent blur-2xl" />
                </div>

                {/* FLOATING CONTAINER VIP */}
                <div className="relative z-10 max-w-6xl mx-auto px-6">
                    <motion.div
                        initial={{ opacity: 0, y: 40 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{
                            duration: 0.8,
                            type: "spring",
                            bounce: 0.4,
                        }}
                        viewport={{ once: true }}
                        className="
                            relative
                            bg-gradient-to-br from-[#062a1e]/95 via-[#021810]/95 to-[#002776]/90
                            backdrop-blur-2xl
                            border-[2px] border-white/10
                            rounded-[40px]
                            shadow-[0_40px_120px_rgba(0,0,0,0.8),inset_0_0_80px_rgba(250,219,4,0.05)]
                            px-6 py-16 md:px-16
                            overflow-hidden
                        "
                    >
                        {/* Shimmer line di atas container */}
                        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1/2 h-[2px] bg-gradient-to-r from-transparent via-[#fadb04]/50 to-transparent" />

                        {/* TITLE */}
                        <div className="text-center mb-16 relative z-10">
                            <motion.h2
                                initial={{ scale: 0.9, opacity: 0 }}
                                whileInView={{ scale: 1, opacity: 1 }}
                                transition={{ duration: 0.6, delay: 0.2 }}
                                viewport={{ once: true }}
                                className="text-4xl md:text-6xl font-black text-transparent bg-clip-text bg-gradient-to-r from-[#fadb04] via-[#ffea6e] to-[#fadb04] drop-shadow-[0_5px_15px_rgba(250,219,4,0.4)] uppercase tracking-wide italic"
                            >
                                OFFICIAL EVENT POSTER
                            </motion.h2>
                            <p className="text-white/80 mt-4 text-lg md:text-xl font-medium">
                                Semua informasi penting{" "}
                                <span className="text-[#fadb04] font-bold">
                                    FIX CUP 7.0
                                </span>{" "}
                                dalam satu pandangan.
                            </p>
                        </div>

                        {/* ================= CONTENT (ELEGANT BRAZIL THEME) ================= */}
                        <div className="flex flex-col md:flex-row items-center justify-center gap-16 md:gap-24 relative z-10">
                            {/* AMBIENT STADIUM GLOW (Subtle Deep Blue & Emerald) */}
                            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-[radial-gradient(ellipse_at_center,rgba(0,155,58,0.08)_0%,rgba(0,39,118,0.05)_40%,transparent_70%)] pointer-events-none z-0" />

                            {/* ---------- POSTER 3D CARD (Premium Feel) ---------- */}
                            <motion.div
                                whileHover={{
                                    scale: 1.03, // Skala diperkecil agar terasa lebih berat/premium
                                    rotateY: 8, // Rotasi dikurangi agar tidak terlalu miring
                                    rotateX: 3,
                                    z: 30,
                                }}
                                transition={{
                                    type: "spring",
                                    stiffness: 300,
                                    damping: 30, // Damping dinaikkan agar bantingan lebih smooth
                                }}
                                onClick={() => setPosterOpen(true)}
                                className="relative cursor-pointer perspective-[1200px] group z-20"
                            >
                                {/* Refined Elegant Glow - Muncul perlahan saat di-hover */}
                                <div className="absolute inset-0 bg-gradient-to-tr from-[#009b3a]/30 via-transparent to-[#fadb04]/30 blur-[40px] rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-700" />

                                {/* Poster Wrapper */}
                                <div className="relative rounded-2xl overflow-hidden border border-white/10 group-hover:border-[#fadb04]/50 shadow-[0_20px_50px_rgba(0,0,0,0.8)] group-hover:shadow-[0_20px_50px_rgba(250,219,4,0.15)] transition-all duration-500">
                                    {/* Efek Kilap Kaca (Glass Shimmer) yang sangat halus */}
                                    <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/20 to-transparent opacity-0 group-hover:opacity-100 group-hover:translate-x-full transition-all duration-[1200ms] ease-in-out -skew-x-12 z-10 pointer-events-none" />

                                    <img
                                        src="/images/poster.jpg"
                                        alt="Official Poster"
                                        className="relative w-72 md:w-[320px] object-cover transition-transform duration-700 group-hover:scale-[1.02]"
                                    />

                                    {/* Overlay gelap elegan di bawah */}
                                    <div className="absolute inset-x-0 bottom-0 h-2/5 bg-gradient-to-t from-[#021810] to-transparent opacity-80 z-10 pointer-events-none" />
                                </div>

                                {/* Floating Button "TAP TO ZOOM" (Sleek Minimalist) */}
                                <motion.div
                                    animate={{ y: [0, -6, 0] }}
                                    transition={{
                                        duration: 3,
                                        repeat: Infinity,
                                        ease: "easeInOut",
                                    }}
                                    className="absolute -bottom-5 left-1/2 -translate-x-1/2 bg-black/80 backdrop-blur-md text-[#fadb04] font-semibold text-sm px-6 py-2.5 rounded-full shadow-[0_10px_20px_rgba(0,0,0,0.5)] border border-[#fadb04]/30 flex items-center gap-2 whitespace-nowrap z-20 transition-colors duration-300 group-hover:bg-[#fadb04] group-hover:text-black"
                                >
                                    🔍 TAP TO ZOOM
                                </motion.div>
                            </motion.div>

                            {/* ---------- MASCOT INTERACTIVE (Refined) ---------- */}
                            <motion.div
                                className="relative cursor-pointer z-20 flex justify-center w-full md:w-auto"
                                onClick={() => setMascotMood("goal")}
                            >
                                {/* Wrapper Melayang Halus */}
                                <motion.div
                                    animate={{ y: [0, -15, 0] }}
                                    transition={{
                                        duration: 6, // Diperlambat agar elegan
                                        repeat: Infinity,
                                        ease: "easeInOut",
                                    }}
                                    className="relative"
                                >
                                    {/* Subtle Mascot Backlight */}
                                    <div className="absolute inset-0 bg-[#fadb04]/10 blur-[50px] rounded-full z-0" />

                                    {/* Elegant Light Dust (Partikel debu cahaya pelan, bukan konfeti agresif) */}
                                    {[...Array(4)].map((_, i) => (
                                        <motion.div
                                            key={`dust-${i}`}
                                            animate={{
                                                y: [0, -40, 0],
                                                opacity: [0.1, 0.5, 0.1],
                                            }}
                                            transition={{
                                                duration: 4 + i,
                                                repeat: Infinity,
                                                ease: "easeInOut",
                                                delay: i * 0.8,
                                            }}
                                            className={`absolute ${i % 2 === 0 ? "left-10" : "right-10"} top-[${20 + i * 10}%] w-1.5 h-1.5 rounded-full ${i % 2 === 0 ? "bg-[#fadb04]" : "bg-[#009b3a]"} z-0 shadow-[0_0_8px_currentColor]`}
                                        />
                                    ))}

                                    {/* GAMBAR MASKOT */}
                                    <motion.img
                                        src="/images/maskot2.png"
                                        alt="Mascot FIX CUP"
                                        className="relative w-72 md:w-[360px] drop-shadow-[0_20px_40px_rgba(0,0,0,0.6)] z-10 origin-bottom"
                                        animate={{ rotate: [0, 2, -2, 0] }} // Rotasi sangat minim
                                        transition={{
                                            duration: 8,
                                            repeat: Infinity,
                                            ease: "easeInOut",
                                        }}
                                        whileHover={{
                                            scale: 1.03,
                                            y: -5,
                                            filter: "brightness(1.1) drop-shadow(0 25px 50px rgba(0,155,58,0.2))",
                                        }}
                                        whileTap={{ scale: 0.97 }}
                                    />

                                    {/* EFEK "GOAL" (Elegan, Modern, Shockwave) */}
                                    <AnimatePresence>
                                        {mascotMood === "goal" && (
                                            <>
                                                {/* Shockwave Hit / Ripple Effect */}
                                                <motion.div
                                                    initial={{
                                                        scale: 0.8,
                                                        opacity: 0.8,
                                                    }}
                                                    animate={{
                                                        scale: 1.6,
                                                        opacity: 0,
                                                    }}
                                                    exit={{ opacity: 0 }}
                                                    transition={{
                                                        duration: 0.8,
                                                        ease: "easeOut",
                                                    }}
                                                    className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80%] h-[80%] rounded-full border-[3px] border-[#fadb04] z-0 pointer-events-none"
                                                />

                                                {/* Sleek VIP Goal Badge */}
                                                <motion.div
                                                    initial={{
                                                        opacity: 0,
                                                        y: 20,
                                                        scale: 0.9,
                                                    }}
                                                    animate={{
                                                        opacity: 1,
                                                        y: -20,
                                                        scale: 1,
                                                    }}
                                                    exit={{
                                                        opacity: 0,
                                                        scale: 0.9,
                                                        y: 0,
                                                    }}
                                                    transition={{
                                                        type: "spring",
                                                        stiffness: 400,
                                                        damping: 25,
                                                    }}
                                                    className="absolute -top-4 -right-4 md:-right-10 bg-black/70 backdrop-blur-xl border border-[#009b3a]/50 text-[#fadb04] font-bold text-lg md:text-xl px-6 py-2 rounded-2xl shadow-[0_15px_30px_rgba(0,0,0,0.5)] z-30 flex items-center gap-2"
                                                >
                                                    <span className="w-2 h-2 rounded-full bg-[#009b3a] animate-pulse" />
                                                    Ayoo Daftarr!!! ⚽
                                                </motion.div>
                                            </>
                                        )}
                                    </AnimatePresence>
                                </motion.div>
                            </motion.div>
                        </div>

                        {/* ================= VIP INFO STRIP ================= */}
                        <div className="mt-24 flex flex-wrap justify-center gap-6 md:gap-8 relative z-10">
                            {[
                                {
                                    icon: "⚽",
                                    text: "Kompetisi Futsal Terbesar FIK UDINUS",
                                },
                                {
                                    icon: "🏆",
                                    text: "Total Hadiah Puluhan Juta Rupiah",
                                },
                                {
                                    icon: "🔥",
                                    text: "Terbuka untuk SMA & Mahasiswa",
                                },
                            ].map((item, idx) => (
                                <motion.div
                                    key={idx}
                                    initial={{ opacity: 0, y: 30 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    transition={{
                                        duration: 0.5,
                                        delay: idx * 0.2,
                                        type: "spring",
                                    }}
                                    viewport={{ once: true }}
                                    whileHover={{
                                        scale: 1.05,
                                        y: -8,
                                        backgroundColor:
                                            "rgba(255,255,255,0.15)",
                                    }}
                                    className="flex items-center gap-4 px-6 py-4 rounded-2xl bg-white/5 backdrop-blur-md border border-white/20 shadow-[0_15px_30px_rgba(0,0,0,0.4)] cursor-default transition-colors duration-300"
                                >
                                    <span className="text-2xl drop-shadow-md">
                                        {item.icon}
                                    </span>
                                    <span className="text-white/90 font-bold text-sm md:text-base tracking-wide">
                                        {item.text}
                                    </span>
                                </motion.div>
                            ))}
                        </div>
                    </motion.div>
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
            <section
                id="daftar"
                className="relative py-32 overflow-hidden bg-[#050505]"
            >
                {/* ================= FIELD & STADIUM ENVIRONMENT ================= */}
                <div className="absolute inset-0 pointer-events-none">
                    <div
                        className="absolute inset-0 transition-opacity duration-700"
                        style={{
                            background: `repeating-linear-gradient(90deg, #0c5b2a 0px, #0c5b2a 120px, #0e6a30 120px, #0e6a30 240px)`,
                            opacity: hoveredIndex !== null ? 0.3 : 0.8,
                        }}
                    />
                    <div
                        className="absolute inset-0 opacity-30 mix-blend-overlay"
                        style={{
                            backgroundImage:
                                "url('https://www.transparenttextures.com/patterns/grass.png')",
                        }}
                    />

                    <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 h-[150%] w-[8px] bg-white/70 shadow-[0_0_20px_rgba(255,255,255,0.6)]" />
                    <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] border-[8px] border-white/70 rounded-full shadow-[0_0_20px_rgba(255,255,255,0.4)_inset,0_0_20px_rgba(255,255,255,0.4)]" />
                    <div className="absolute left-1/2 top-1/2 w-6 h-6 bg-white rounded-full -translate-x-1/2 -translate-y-1/2 shadow-[0_0_15px_white]" />

                    {/* Stadium Lighting */}
                    <div
                        className={`absolute top-[-20%] left-1/2 -translate-x-1/2 w-[1200px] h-[800px] blur-[150px] rounded-full transition-all duration-1000 ease-out ${
                            hoveredIndex === 0
                                ? "bg-[#fadb04]/40 scale-125"
                                : hoveredIndex === 1
                                  ? "bg-[#00d46a]/40 scale-125"
                                  : "bg-white/10 scale-100"
                        }`}
                    />

                    <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-transparent to-[#050505]/80" />
                </div>

                <StadiumParticles />

                {/* ================= CONTENT ================= */}
                <div className="relative z-10 max-w-[1400px] mx-auto px-6">
                    <motion.div
                        initial={{ opacity: 0, y: -50 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{
                            duration: 0.8,
                            type: "spring",
                            bounce: 0.4,
                        }}
                        viewport={{ once: true }}
                        className="text-center mb-28 relative"
                    >
                        <h2 className="relative text-6xl md:text-8xl font-black text-transparent bg-clip-text bg-gradient-to-b from-white to-gray-500 drop-shadow-[0_10px_30px_rgba(0,0,0,1)] uppercase tracking-tighter italic">
                            Kategori Arena
                        </h2>
                        <p className="text-white/80 mt-6 text-xl md:text-2xl max-w-2xl mx-auto font-medium tracking-wide">
                            Pilih divisimu dan buktikan siapa penguasa di
                            <span className="text-[#fadb04] font-black drop-shadow-[0_0_15px_rgba(250,219,4,0.8)] ml-2">
                                FIX CUP 7.0
                            </span>
                        </p>
                    </motion.div>

                    <div className="flex flex-col md:flex-row items-center justify-between gap-10 md:gap-0 relative">
                        {/* ================= LEFT MASCOT (SMA/SMK) ================= */}
                        {/* Pembungkus 1: Mengurus animasi melayang (Float) yang konstan & abadi */}
                        <motion.div
                            animate={{ y: [0, -25, 0] }}
                            transition={{
                                duration: 4.5,
                                repeat: Infinity,
                                ease: "easeInOut",
                            }}
                            className="w-full md:w-1/3 flex justify-center md:justify-end md:-mr-12 lg:-mr-20 pointer-events-none z-40"
                        >
                            {/* Pembungkus 2: Mengurus reaksi saat kartu di-hover (Spring Smooth) */}
                            <motion.img
                                src="/images/maskot3.png"
                                alt="Maskot SMA"
                                className="w-[300px] md:w-[400px] lg:w-[500px] object-contain origin-bottom"
                                animate={{
                                    scale: hoveredIndex === 0 ? 1.25 : 1,
                                    rotate: hoveredIndex === 0 ? -6 : 0, // Miring ke luar
                                    x: hoveredIndex === 0 ? -20 : 0, // Menggeser sedikit ke kiri
                                    filter:
                                        hoveredIndex === 0
                                            ? "drop-shadow(0 0 50px rgba(250,219,4,0.6)) brightness(1.2)"
                                            : "drop-shadow(0 15px 25px rgba(0,0,0,0.7)) brightness(0.9)",
                                }}
                                transition={{
                                    type: "spring",
                                    stiffness: 120, // Kekakuan pegas (makin tinggi makin cepat)
                                    damping: 12, // Rem pegas (makin rendah makin memantul)
                                    mass: 1.2,
                                }}
                            />
                        </motion.div>

                        {/* ================= CATEGORY CARDS ================= */}
                        <div className="w-full md:w-1/3 flex flex-col items-center gap-12 z-50 perspective-[1200px]">
                            {categories.map((cat, i) => (
                                <motion.div
                                    key={i}
                                    initial={{
                                        opacity: 0,
                                        scale: 0.8,
                                        rotateX: 20,
                                    }}
                                    whileInView={{
                                        opacity: 1,
                                        scale: 1,
                                        rotateX: 0,
                                    }}
                                    transition={{
                                        delay: i * 0.3,
                                        type: "spring",
                                        stiffness: 100,
                                    }}
                                    viewport={{ once: true }}
                                    onHoverStart={() => setHoveredIndex(i)}
                                    onHoverEnd={() => setHoveredIndex(null)}
                                    whileHover={{
                                        scale: 1.05,
                                        rotateX: 8,
                                        rotateY: i === 0 ? -10 : 10,
                                        y: -10,
                                        z: 50,
                                    }}
                                    className="group relative cursor-pointer w-full max-w-[400px]"
                                >
                                    <div
                                        className={`absolute inset-0 rounded-[2.5rem] blur-xl transition-all duration-500 opacity-0 group-hover:opacity-100`}
                                        style={{ backgroundColor: cat.color }}
                                    />

                                    <div className="relative bg-black/60 backdrop-blur-xl border-[3px] border-white/10 rounded-[2.5rem] p-10 text-center shadow-2xl transition-all duration-500 group-hover:border-transparent overflow-hidden h-full">
                                        <div
                                            className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                                            style={{
                                                boxShadow: `inset 0 0 50px ${cat.glow}`,
                                            }}
                                        />

                                        <div className="relative z-10">
                                            <h3
                                                className="text-5xl font-black mb-4 transition-all duration-500 uppercase italic"
                                                style={{
                                                    color: cat.color,
                                                    textShadow:
                                                        hoveredIndex === i
                                                            ? `0 0 20px ${cat.color}`
                                                            : "none",
                                                }}
                                            >
                                                {cat.title}
                                            </h3>

                                            <p className="text-white/90 mb-10 text-lg font-medium leading-relaxed">
                                                {cat.desc}
                                            </p>

                                            {/* Super CTA Button */}
                                            <MotionLink
                                                href={cat.link}
                                                whileTap={{ scale: 0.9 }}
                                                className={`relative inline-flex items-center justify-center gap-3 w-full py-5 rounded-full font-black text-xl shadow-[0_10px_30px_rgba(0,0,0,0.8)] bg-gradient-to-r ${cat.accent} text-black transition-all group-hover:shadow-[0_0_40px_${cat.color}] overflow-hidden cursor-pointer`}
                                            >
                                                <span className="relative z-10 flex items-center gap-2">
                                                    DAFTAR SEKARANG
                                                    <motion.span
                                                        animate={{
                                                            x:
                                                                hoveredIndex ===
                                                                i
                                                                    ? [0, 8, 0]
                                                                    : 0,
                                                        }}
                                                        transition={{
                                                            repeat: Infinity,
                                                            duration: 0.6,
                                                            ease: "easeInOut",
                                                        }}
                                                    >
                                                        🔥
                                                    </motion.span>
                                                </span>
                                            </MotionLink>
                                        </div>
                                    </div>
                                </motion.div>
                            ))}
                        </div>

                        {/* ================= RIGHT MASCOT (MAHASISWA) ================= */}
                        {/* Pembungkus 1: Melayang (Float) abadi */}
                        <motion.div
                            animate={{ y: [0, -25, 0] }}
                            transition={{
                                duration: 4.5,
                                repeat: Infinity,
                                ease: "easeInOut",
                                delay: 0.5,
                            }} // Delay agar tidak barengan bergeraknya
                            className="w-full md:w-1/3 flex justify-center md:justify-start md:-ml-12 lg:-ml-20 pointer-events-none z-40"
                        >
                            {/* Pembungkus 2: Reaksi Hover (Spring Smooth) */}
                            <motion.img
                                src="/images/maskot4.png"
                                alt="Maskot Mahasiswa"
                                className="w-[300px] md:w-[400px] lg:w-[500px] object-contain origin-bottom"
                                animate={{
                                    scale: hoveredIndex === 1 ? 1.25 : 1,
                                    rotate: hoveredIndex === 1 ? 6 : 0, // Miring ke luar (berlawanan dgn yg SMA)
                                    x: hoveredIndex === 1 ? 20 : 0, // Geser ke kanan
                                    filter:
                                        hoveredIndex === 1
                                            ? "drop-shadow(0 0 50px rgba(0,212,106,0.6)) brightness(1.2)"
                                            : "drop-shadow(0 15px 25px rgba(0,0,0,0.7)) brightness(0.9)",
                                }}
                                transition={{
                                    type: "spring",
                                    stiffness: 120,
                                    damping: 12,
                                    mass: 1.2,
                                }}
                            />
                        </motion.div>
                    </div>
                </div>
            </section>

            <section
                id="guide"
                className="relative py-32 flex justify-center items-center overflow-hidden bg-[#050505]"
            >
                {/* ================= BACKGROUND EFFECTS ================= */}
                {/* Breathing Stadium Light Glow */}
                <motion.div
                    animate={{
                        scale: [1, 1.2, 1],
                        opacity: [0.1, 0.25, 0.1],
                    }}
                    transition={{
                        duration: 5,
                        repeat: Infinity,
                        ease: "easeInOut",
                    }}
                    className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-[#fadb04] blur-[180px] rounded-full pointer-events-none"
                />

                {/* Floating Futsal Cards (Kartu Kuning & Merah Melayang) */}
                <motion.div
                    animate={{ y: [0, -25, 0], rotate: [12, 25, 12] }}
                    transition={{
                        duration: 6,
                        repeat: Infinity,
                        ease: "easeInOut",
                    }}
                    className="absolute left-[10%] md:left-[20%] top-[15%] w-16 h-24 bg-[#fadb04]/20 backdrop-blur-md border border-[#fadb04]/40 rounded-xl shadow-[0_0_30px_rgba(250,219,4,0.3)] pointer-events-none hidden sm:block"
                />
                <motion.div
                    animate={{ y: [0, 25, 0], rotate: [-15, -30, -15] }}
                    transition={{
                        duration: 7,
                        repeat: Infinity,
                        ease: "easeInOut",
                        delay: 1,
                    }}
                    className="absolute right-[10%] md:right-[20%] bottom-[15%] w-16 h-24 bg-red-500/20 backdrop-blur-md border border-red-500/40 rounded-xl shadow-[0_0_30px_rgba(239,68,68,0.3)] pointer-events-none hidden sm:block"
                />

                {/* ================= MAIN CONTENT GLASS CARD ================= */}
                <motion.div
                    initial={{ opacity: 0, y: 60, scale: 0.9 }}
                    whileInView={{ opacity: 1, y: 0, scale: 1 }}
                    transition={{ duration: 0.8, type: "spring", bounce: 0.4 }}
                    viewport={{ once: true }}
                    whileHover={{ y: -8 }}
                    className="relative z-10 w-full max-w-4xl mx-6 perspective-[1000px]"
                >
                    <div className="relative bg-white/5 backdrop-blur-2xl border border-white/10 rounded-[3rem] p-10 md:p-16 text-center shadow-[0_20px_50px_rgba(0,0,0,0.5)] overflow-hidden group">
                        {/* Inner Hover Glow Reveal */}
                        <div className="absolute inset-0 bg-gradient-to-b from-[#fadb04]/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />

                        {/* Animated Book Icon */}
                        <motion.div
                            initial={{ scale: 0, rotate: -180 }}
                            whileInView={{ scale: 1, rotate: -5 }}
                            transition={{
                                type: "spring",
                                stiffness: 200,
                                damping: 15,
                                delay: 0.2,
                            }}
                            className="w-24 h-24 mx-auto mb-8 bg-gradient-to-br from-[#fadb04] to-[#ffea6e] rounded-3xl flex items-center justify-center shadow-[0_0_40px_rgba(250,219,4,0.5)]"
                        >
                            <span className="text-5xl drop-shadow-lg">📖</span>
                        </motion.div>

                        {/* Title */}
                        <h2 className="text-4xl md:text-6xl font-black mb-6 text-transparent bg-clip-text bg-gradient-to-r from-white via-[#fadb04] to-white uppercase italic tracking-wide drop-shadow-md">
                            Guide Book Resmi
                        </h2>

                        {/* Description */}
                        <p className="text-white/80 max-w-2xl mx-auto mb-12 text-lg md:text-xl font-medium leading-relaxed">
                            Pelajari aturan pertandingan, sistem kompetisi, dan
                            tata tertib resmi sebelum bertanding di arena{" "}
                            <span className="text-[#fadb04] font-bold drop-shadow-[0_0_8px_rgba(250,219,4,0.8)]">
                                FIX CUP 7
                            </span>
                            .
                        </p>

                        {/* Super Button CTA */}
                        <motion.button
                            whileHover={{
                                scale: 1.05,
                                boxShadow: "0 0 40px rgba(250,219,4,0.7)",
                            }}
                            whileTap={{ scale: 0.95 }}
                            className="relative overflow-hidden bg-gradient-to-r from-[#fadb04] to-[#ffea6e] text-black px-12 py-5 rounded-full font-black text-xl shadow-[0_10px_20px_rgba(0,0,0,0.5)] transition-all group/btn"
                        >
                            {/* Shimmer/Shine Effect */}
                            <motion.span
                                animate={{ x: ["-150%", "250%"] }}
                                transition={{
                                    duration: 2,
                                    repeat: Infinity,
                                    ease: "linear",
                                    repeatDelay: 1,
                                }}
                                className="absolute top-0 bottom-0 w-1/2 bg-gradient-to-r from-transparent via-white/60 to-transparent skew-x-[-20deg]"
                            />

                            <span className="relative z-10 flex items-center justify-center gap-3">
                                <motion.span
                                    className="inline-block group-hover/btn:animate-bounce"
                                    animate={{ y: [0, -5, 0] }}
                                    transition={{
                                        repeat: Infinity,
                                        duration: 1.5,
                                        ease: "easeInOut",
                                    }}
                                >
                                    📥
                                </motion.span>
                                DOWNLOAD GUIDE BOOK
                            </span>
                        </motion.button>
                    </div>
                </motion.div>
            </section>

            <footer className="relative pt-24 pb-8 overflow-hidden bg-[#020d08] z-30">
                {/* ================= 1. STADIUM TOP SCANNER & LINE FIX ================= */}
                {/* Ini untuk menutupi garis potong kasar dari section sebelumnya */}
                <div className="absolute top-0 left-0 w-full h-[100px] bg-gradient-to-b from-[#050505] to-transparent pointer-events-none -translate-y-1" />

                {/* Laser Border Halus */}
                <div className="absolute top-0 left-0 w-full h-[1px] bg-white/5" />
                <motion.div
                    animate={{ x: ["-100%", "100%"] }}
                    transition={{
                        duration: 5,
                        repeat: Infinity,
                        ease: "linear",
                    }}
                    className="absolute top-0 left-0 w-[30%] h-[2px] bg-gradient-to-r from-transparent via-[#fadb04] to-transparent drop-shadow-[0_0_10px_#fadb04]"
                />

                {/* ================= 2. BACKGROUND AMBIENCE ================= */}
                <div className="absolute top-1/2 left-0 -translate-y-1/2 w-[500px] h-[500px] bg-[#009b3a]/10 blur-[150px] rounded-full pointer-events-none" />
                <div className="absolute top-1/2 right-0 -translate-y-1/2 w-[500px] h-[500px] bg-[#002776]/15 blur-[150px] rounded-full pointer-events-none" />

                {/* ================= 3. MAIN CONTENT FOOTER ================= */}
                <div className="relative z-10 max-w-7xl mx-auto px-6">
                    <div className="flex flex-col md:flex-row items-center md:items-start justify-between gap-12 md:gap-8">
                        {/* ---------- KIRI: TROPHY LOGO ---------- */}
                        <motion.div
                            initial={{ opacity: 0, x: -30 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.8, type: "spring" }}
                            viewport={{ once: true }}
                            className="w-full md:w-1/4 flex justify-center md:justify-start"
                        >
                            {/* Ganti src dengan logo piala/trophy putih kamu */}
                            <img
                                src="/images/maskot4.png"
                                alt="Trophy FIX CUP"
                                className="h-96 md:h-52 object-contain drop-shadow-[0_0_20px_rgba(255,255,255,0.2)]"
                            />
                        </motion.div>

                        {/* ---------- TENGAH: BRANDING & PRESENTER ---------- */}
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{
                                duration: 0.8,
                                type: "spring",
                                delay: 0.2,
                            }}
                            viewport={{ once: true }}
                            className="w-full md:w-5/12 flex flex-col items-center md:items-start text-center md:text-left space-y-5"
                        >
                            {/* Deretan Logo Kampus/Organisasi */}
                            <div className="flex items-center gap-3 bg-white/5 backdrop-blur-sm border border-white/10 px-4 py-2 rounded-full shadow-lg">
                                {/* Ganti dengan file gambar deretan logo kamu */}
                                <img
                                    src="/images/logofc.png"
                                    alt="Logos"
                                    className="h-8 md:h-10 object-contain"
                                />
                            </div>

                            <div>
                                <h3 className="text-4xl md:text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-white via-[#fadb04] to-white italic tracking-wider drop-shadow-lg mb-2">
                                    FIX CUP 7.0
                                </h3>
                                <p className="text-white/80 text-sm md:text-base font-medium leading-relaxed max-w-sm">
                                    Presented by Badan Eksekutif Mahasiswa
                                    Fakultas Ilmu Komputer Universitas Dian
                                    Nuswantoro
                                </p>
                            </div>
                        </motion.div>

                        {/* ---------- PEMBATAS VERTIKAL (Hanya di Desktop) ---------- */}
                        <div className="hidden md:block w-[1px] h-32 bg-gradient-to-b from-transparent via-white/20 to-transparent self-center mx-4" />

                        {/* ---------- KANAN: IKUTI KAMI (CONTACTS) ---------- */}
                        <motion.div
                            initial={{ opacity: 0, x: 30 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            transition={{
                                duration: 0.8,
                                type: "spring",
                                delay: 0.4,
                            }}
                            viewport={{ once: true }}
                            className="w-full md:w-auto flex flex-col items-center md:items-start gap-5"
                        >
                            <h4 className="text-white font-bold text-lg tracking-widest mb-2 flex items-center gap-3">
                                <span className="w-2 h-2 rounded-full bg-[#00d46a] animate-pulse" />
                                Ikuti Kami
                            </h4>

                            <div className="flex flex-col gap-4 text-white/70 text-sm md:text-base font-medium">
                                {/* Instagram */}
                                <motion.a
                                    href="https://www.instagram.com/fixcup.udinus/?hl=id"
                                    whileHover={{ x: 5, color: "#fadb04" }}
                                    className="flex items-center gap-4 transition-colors"
                                >
                                    <svg
                                        className="w-6 h-6"
                                        fill="currentColor"
                                        viewBox="0 0 24 24"
                                    >
                                        <path
                                            fillRule="evenodd"
                                            d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.45711 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z"
                                            clipRule="evenodd"
                                        />
                                    </svg>
                                    @fixcup.udinus / @bemfikudinus
                                </motion.a>

                                {/* Website */}
                                <motion.a
                                    href="https://bemfikdinus.com/"
                                    whileHover={{ x: 5, color: "#fadb04" }}
                                    className="flex items-center gap-4 transition-colors"
                                >
                                    <svg
                                        className="w-6 h-6"
                                        fill="none"
                                        stroke="currentColor"
                                        viewBox="0 0 24 24"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth="2"
                                            d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9"
                                        />
                                    </svg>
                                    bemfikdinus.com
                                </motion.a>

                                {/* WhatsApp */}
                                <motion.a
                                    href="#"
                                    whileHover={{ x: 5, color: "#00d46a" }}
                                    className="flex items-center gap-4 transition-colors"
                                >
                                    <svg
                                        className="w-6 h-6"
                                        fill="currentColor"
                                        viewBox="0 0 24 24"
                                    >
                                        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 00-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                                    </svg>
                                    +62 882-0063-25524 (Bemo Admin)
                                </motion.a>
                            </div>
                        </motion.div>
                    </div>

                    {/* ================= 4. BOTTOM COPYRIGHT STRIP ================= */}
                    <div className="mt-20 pt-6 border-t border-white/10 text-center">
                        <p className="text-white/40 text-sm font-semibold tracking-wider">
                            © 2026, BEM FIK UDINUS.
                        </p>
                    </div>
                </div>
            </footer>
        </div>
    );
}
