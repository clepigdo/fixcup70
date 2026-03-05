import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaBolt } from "react-icons/fa";
import { Link, router } from "@inertiajs/react";

const MotionLink = motion(Link);

export default function Navbar() {
    // State dipindah ke dalam komponen ini agar Navbar mandiri
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [navSolid, setNavSolid] = useState(false);

    // Fungsi transisi solid navbar saat di-scroll
    useEffect(() => {
        const onScroll = () => setNavSolid(window.scrollY > 50);
        window.addEventListener("scroll", onScroll);
        return () => window.removeEventListener("scroll", onScroll);
    }, []);

    // Smart Navigation (Deteksi halaman saat ini)
    const handleScroll = (e, targetId) => {
        e.preventDefault();
        setIsMobileMenuOpen(false);

        // 1. Jika SEDANG TIDAK di Beranda (misal di halaman /pendaftaran/sma)
        if (window.location.pathname !== "/") {
            if (targetId === "top" || targetId === "/") {
                router.visit("/"); // Pindah ke beranda atas
            } else {
                router.visit(`/${targetId}`); // Pindah ke beranda + spesifik section
            }
            return;
        }

        // 2. Jika SUDAH di Beranda, lakukan Smooth Scroll
        if (targetId === "top" || targetId === "/") {
            window.scrollTo({ top: 0, behavior: "smooth" });
            return;
        }

        // Cari elemen target berdasarkan ID (menghapus tanda # jika ada)
        const elementId = targetId.startsWith("#") ? targetId : `#${targetId}`;
        const target = document.querySelector(elementId);

        if (target) {
            const offsetTop =
                target.getBoundingClientRect().top + window.scrollY - 90;
            window.scrollTo({ top: offsetTop, behavior: "smooth" });
        }
    };

    // Daftar menu (Menambahkan "Beranda" dengan target "/")
    const navLinks = [
        ["Beranda", "/"],
        ["Tentang", "#about"],
        ["Info", "#info"],
        ["Guide", "#guide"],
    ];

    return (
        <>
            <nav
                className={`fixed w-full z-50 transition-all duration-500 ${
                    navSolid || isMobileMenuOpen
                        ? "bg-[#063d26]/95 backdrop-blur-xl shadow-[0_10px_30px_rgba(0,0,0,0.5)] border-b border-[#fadb04]/30"
                        : "bg-transparent"
                }`}
            >
                <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
                    {/* LOGO (Sekarang berfungsi ganda sebagai tombol Home) */}
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.6 }}
                        className="flex items-center gap-4 cursor-pointer group z-50"
                        onClick={(e) => handleScroll(e, "/")}
                    >
                        <div className="relative flex items-center justify-center">
                            <div className="absolute inset-0 bg-[#fadb04] blur-2xl opacity-30 rounded-full group-hover:opacity-70 transition duration-500" />
                            <motion.img
                                src="/images/logofc.png" // Pastikan nama filenya benar
                                alt="FIX CUP Logo"
                                className="relative w-12 md:w-14 object-contain drop-shadow-2xl"
                                whileHover={{ scale: 1.1, rotate: 3 }}
                            />
                        </div>
                        <div>
                            <div className="font-black tracking-wide text-lg text-white">
                                FIX CUP
                            </div>
                            <div className="text-xs text-[#fadb04] font-bold tracking-widest">
                                FUTSAL CHAMPIONSHIP
                            </div>
                        </div>
                    </motion.div>

                    {/* MENU DESKTOP */}
                    <motion.ul
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        className="hidden md:flex items-center gap-8 text-sm font-semibold"
                    >
                        {navLinks.map(([label, link], i) => (
                            <li key={i} className="group relative">
                                <a
                                    href={link}
                                    onClick={(e) => handleScroll(e, link)}
                                    className="text-white/80 hover:text-[#fadb04] transition"
                                >
                                    {label}
                                </a>
                                <span className="absolute left-0 -bottom-2 w-0 h-[2px] bg-gradient-to-r from-[#fadb04] to-[#00d46a] transition-all duration-300 group-hover:w-full" />
                            </li>
                        ))}
                    </motion.ul>

                    {/* CTA BUTTON DESKTOP */}
                    <motion.a
                        href="/#daftar"
                        onClick={(e) => handleScroll(e, "#daftar")}
                        whileHover={{ scale: 1.07 }}
                        whileTap={{ scale: 0.95 }}
                        className="hidden md:flex items-center gap-2 bg-gradient-to-r from-[#fadb04] to-[#ffe95c] text-[#063d26] font-black px-6 py-2.5 rounded-full shadow-[0_0_15px_rgba(250,219,4,0.4)] hover:shadow-[0_0_25px_rgba(250,219,4,0.7)] transition cursor-pointer"
                    >
                        <FaBolt />
                        Daftar
                    </motion.a>

                    {/* MOBILE HAMBURGER ICON */}
                    <div
                        className="md:hidden text-3xl text-[#fadb04] cursor-pointer z-50 transition-transform duration-300"
                        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                    >
                        <motion.div
                            animate={{ rotate: isMobileMenuOpen ? 90 : 0 }}
                            transition={{ duration: 0.3 }}
                        >
                            {isMobileMenuOpen ? "✕" : "☰"}
                        </motion.div>
                    </div>
                </div>
            </nav>

            {/* MOBILE MENU SLIDE */}
            <AnimatePresence>
                {isMobileMenuOpen && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        className="fixed inset-0 z-40 md:hidden flex justify-end"
                    >
                        <div
                            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
                            onClick={() => setIsMobileMenuOpen(false)}
                        />
                        <motion.div
                            initial={{ x: "100%" }}
                            animate={{ x: 0 }}
                            exit={{ x: "100%" }}
                            transition={{
                                type: "spring",
                                stiffness: 300,
                                damping: 30,
                            }}
                            className="relative w-3/4 sm:w-1/2 h-full bg-gradient-to-b from-[#063d26] to-[#021810] shadow-[-20px_0_50px_rgba(0,0,0,0.5)] border-l border-[#fadb04]/20 flex flex-col pt-28 px-8"
                        >
                            <div className="absolute top-0 right-0 w-40 h-40 bg-[#fadb04]/10 blur-[60px] rounded-full pointer-events-none" />
                            <ul className="flex flex-col gap-8 text-xl font-bold">
                                {navLinks.map(([label, link], i) => (
                                    <motion.li
                                        key={i}
                                        initial={{ opacity: 0, x: 20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{ delay: 0.1 + i * 0.1 }}
                                    >
                                        <a
                                            href={link}
                                            onClick={(e) =>
                                                handleScroll(e, link)
                                            }
                                            className="text-white/90 active:text-[#fadb04] hover:text-[#fadb04] transition block border-b border-white/10 pb-4"
                                        >
                                            {label}
                                        </a>
                                    </motion.li>
                                ))}
                            </ul>

                            {/* CTA BUTTON MOBILE */}
                            <motion.a
                                href="/#daftar"
                                onClick={(e) => handleScroll(e, "#daftar")}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.5 }}
                                className="mt-12 flex items-center justify-center gap-2 bg-gradient-to-r from-[#fadb04] to-[#ffe95c] text-[#063d26] font-black px-6 py-4 rounded-full shadow-[0_10px_30px_rgba(250,219,4,0.4)] cursor-pointer"
                            >
                                <FaBolt /> Daftar Sekarang
                            </motion.a>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
}
