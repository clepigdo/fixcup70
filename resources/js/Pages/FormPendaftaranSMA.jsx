import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Head, useForm } from "@inertiajs/react";
import Navbar from "../Components/Navbar";

export default function FormPendaftaran() {
    const [currentStep, setCurrentStep] = useState(1);
    const [submitSuccess, setSubmitSuccess] = useState(false);
    const [submitError, setSubmitError] = useState(false);

    // Auto-scroll ke atas setiap ganti step
    useEffect(() => {
        window.scrollTo({ top: 0, behavior: "smooth" });
    }, [currentStep]);

    const steps = [
        "Tim",
        "Kontak",
        "Pemain",
        "Official",
        "Dokumen",
        "Payment",
        "Review",
    ];

    const { data, setData, post, processing, errors } = useForm({
        nama: "",
        kategori: "SMA",
        logo: null,
        contacts: {
            captain: { nama: "", no_wa: "" },
            official: { nama: "", no_wa: "" },
            capo: { nama: "", no_wa: "" },
        },
        players: Array.from({ length: 12 }, () => ({
            nama: "",
            pas_foto: null,
            foto_kartu: null,
        })),
        officials: [
            { nama: "", pas_foto: null, foto_ktp: null },
            { nama: "", pas_foto: null, foto_ktp: null },
        ],
        documents: {
            foto_tim_berjersey: null,
            foto_jersey_pemain: null,
            foto_jersey_kiper: null,
            surat_rekomendasi: null,
            foto_player_satu: null,
            foto_player_dua: null,
            foto_player_tiga: null,
        },
        payment: {
            bukti_pembayaran: null,
        },
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        post(route("registration.store"), {
            forceFormData: true,
            onSuccess: () => {
                // Tampilkan animasi sukses!
                setSubmitSuccess(true);
            },
            onError: (errors) => {
                console.log("Error detail:", errors);
                setSubmitError(true);
            },
        });
    };

    return (
        // 1. Ubah h-[100dvh] dan overflow-hidden menjadi min-h-screen agar bisa memanjang ke bawah
        <div className="min-h-screen bg-[#020d08] text-white font-sans relative flex flex-col pb-12">
            <Head title="Pendaftaran SMA | FIX CUP 6.0" />

            {/* BACKGROUND AMBIENCE (Fixed agar ngikutin saat di-scroll) */}
            <div className="fixed inset-0 pointer-events-none z-0">
                <div className="absolute top-[-10%] left-[-10%] w-[400px] h-[400px] bg-[#009b3a]/20 blur-[150px] rounded-full" />
                <div className="absolute bottom-[-10%] right-[-10%] w-[500px] h-[500px] bg-[#fadb04]/10 blur-[150px] rounded-full" />
            </div>

            <Navbar />

            {/* MAIN: Diberi pt-32 agar turun ke bawah navbar */}
            <main className="relative z-10 w-full max-w-5xl mx-auto px-4 sm:px-6 pt-28 md:pt-32 flex flex-col">
                {/* HEADER COMPACT */}
                <div className="text-center mb-6">
                    <h1 className="text-3xl md:text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-[#fadb04] to-[#ffea6e] uppercase tracking-wide drop-shadow-lg">
                        Pendaftaran FIX CUP 6.0
                    </h1>
                    <p className="text-[#00d46a] font-bold tracking-[0.3em] text-[10px] md:text-xs uppercase mt-1">
                        Kategori SMA / SMK Sederajat
                    </p>
                </div>

                {/* CARD: Dibuang batasan flex-1 dan min-h-0 agar tingginya bebas mengikuti isi konten */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="bg-[#061810]/70 backdrop-blur-xl border border-white/10 rounded-[2rem] p-6 md:p-10 shadow-[0_20px_50px_rgba(0,0,0,0.5)] flex flex-col w-full h-auto mb-10"
                >
                    {/* --- 1. STEPPER --- */}
                    <div className="mb-10 md:mb-12 relative px-2 md:px-6">
                        <div className="relative flex justify-between items-center z-10">
                            <div className="absolute left-0 top-1/2 w-full h-[2px] bg-white/10 -translate-y-1/2 z-0" />
                            <div
                                className="absolute left-0 top-1/2 h-[3px] bg-gradient-to-r from-[#00d46a] to-[#fadb04] -translate-y-1/2 z-0 transition-all duration-500 ease-out shadow-[0_0_15px_rgba(250,219,4,0.5)]"
                                style={{
                                    width: `${((currentStep - 1) / (steps.length - 1)) * 100}%`,
                                }}
                            />

                            {steps.map((step, index) => {
                                const isActive = currentStep === index + 1;
                                const isDone = currentStep > index + 1;
                                return (
                                    <div
                                        key={index}
                                        className="relative z-10 flex flex-col items-center"
                                    >
                                        <div
                                            className={`w-8 h-8 md:w-10 md:h-10 rounded-full flex items-center justify-center font-bold text-xs transition-all duration-300 ${isActive ? "bg-[#fadb04] text-black shadow-[0_0_15px_rgba(250,219,4,0.6)] scale-110 border-2 border-[#061810]" : isDone ? "bg-[#00d46a] text-black border-2 border-[#061810]" : "bg-[#020d08] text-white/40 border border-white/10"}`}
                                        >
                                            {isDone ? "✓" : index + 1}
                                        </div>
                                        <div className="absolute top-full mt-3 w-24 text-center hidden sm:block left-1/2 -translate-x-1/2">
                                            <span
                                                className={`text-[9px] md:text-[10px] uppercase font-bold transition-colors ${isActive ? "text-[#fadb04]" : isDone ? "text-[#00d46a]" : "text-white/30"}`}
                                            >
                                                {step}
                                            </span>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>

                    {/* --- 2. FORM CONTENT --- */}
                    {/* Dibuang class overflow-y-auto, sekarang div ini membesar mengikuti form */}
                    <div className="w-full">
                        <AnimatePresence mode="wait">
                            <motion.div
                                key={currentStep}
                                initial={{ opacity: 0, x: 15 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: -15 }}
                                transition={{ duration: 0.25 }}
                            >
                                {/* STEP 1: TIM */}
                                {currentStep === 1 && (
                                    <div className="space-y-6 max-w-2xl mx-auto">
                                        <div className="text-center mb-8">
                                            <h2 className="text-2xl font-black text-[#fadb04]">
                                                Identitas Tim
                                            </h2>
                                            <p className="text-sm text-white/50 mt-1">
                                                Lengkapi data dasar sekolah atau
                                                tim Anda
                                            </p>
                                        </div>

                                        <div className="space-y-3">
                                            <label className="text-xs font-bold text-[#00d46a] uppercase tracking-wider ml-1">
                                                Nama Sekolah
                                            </label>
                                            <div className="relative">
                                                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                                    <svg
                                                        className="w-5 h-5 text-white/40"
                                                        fill="none"
                                                        stroke="currentColor"
                                                        viewBox="0 0 24 24"
                                                    >
                                                        <path
                                                            strokeLinecap="round"
                                                            strokeLinejoin="round"
                                                            strokeWidth="2"
                                                            d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
                                                        />
                                                    </svg>
                                                </div>
                                                <input
                                                    value={data.nama}
                                                    onChange={(e) =>
                                                        setData(
                                                            "nama",
                                                            e.target.value,
                                                        )
                                                    }
                                                    className="w-full bg-black/40 border border-white/10 rounded-xl pl-12 pr-4 py-4 text-sm focus:border-[#fadb04] focus:ring-1 focus:ring-[#fadb04] transition-all outline-none"
                                                    placeholder="Contoh: SMA Negeri 1 Semarang"
                                                />
                                            </div>
                                        </div>

                                        <div className="space-y-3 pt-2">
                                            <label className="text-xs font-bold text-[#00d46a] uppercase tracking-wider ml-1">
                                                Logo Tim / Sekolah{" "}
                                                <span className="text-white/40 font-normal">
                                                    (Max 2MB)
                                                </span>
                                            </label>
                                            <input
                                                type="file"
                                                id="logo"
                                                className="hidden"
                                                onChange={(e) =>
                                                    setData(
                                                        "logo",
                                                        e.target.files[0],
                                                    )
                                                }
                                                accept="image/*"
                                            />
                                            <label
                                                htmlFor="logo"
                                                className="flex flex-col items-center justify-center w-full border-2 border-dashed border-white/20 bg-black/20 hover:bg-[#fadb04]/5 hover:border-[#fadb04]/50 rounded-2xl p-12 cursor-pointer transition-all group"
                                            >
                                                <div className="w-16 h-16 bg-white/5 rounded-full flex items-center justify-center mb-4 group-hover:scale-110 transition-transform shadow-lg">
                                                    <svg
                                                        className="w-8 h-8 text-[#fadb04]"
                                                        fill="none"
                                                        stroke="currentColor"
                                                        viewBox="0 0 24 24"
                                                    >
                                                        <path
                                                            strokeLinecap="round"
                                                            strokeLinejoin="round"
                                                            strokeWidth="2"
                                                            d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                                                        />
                                                    </svg>
                                                </div>
                                                <p className="text-base font-semibold text-white/80 group-hover:text-white">
                                                    {data.logo
                                                        ? data.logo.name
                                                        : "Pilih File Logo"}
                                                </p>
                                                <p className="text-xs text-white/40 mt-2">
                                                    Format: JPG, PNG
                                                </p>
                                            </label>
                                        </div>
                                    </div>
                                )}

                                {/* STEP 2: KONTAK */}
                                {currentStep === 2 && (
                                    <div className="space-y-6">
                                        <div className="text-center mb-8">
                                            <h2 className="text-2xl font-black text-[#fadb04]">
                                                Kontak Perwakilan
                                            </h2>
                                            <p className="text-sm text-white/50 mt-1">
                                                Wajib diisi agar panitia mudah
                                                menghubungi tim
                                            </p>
                                        </div>
                                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                            {[
                                                "captain",
                                                "official",
                                                "capo",
                                            ].map((role) => (
                                                <div
                                                    key={role}
                                                    className="bg-gradient-to-b from-white/10 to-transparent p-[1px] rounded-2xl"
                                                >
                                                    <div className="bg-[#04120a] h-full p-6 rounded-2xl border border-white/5 hover:border-[#00d46a]/30 transition-colors">
                                                        <div className="flex items-center gap-3 mb-6 pb-4 border-b border-white/10">
                                                            <div className="w-10 h-10 rounded-full bg-[#00d46a]/20 flex items-center justify-center text-[#00d46a]">
                                                                <svg
                                                                    className="w-5 h-5"
                                                                    fill="none"
                                                                    stroke="currentColor"
                                                                    viewBox="0 0 24 24"
                                                                >
                                                                    <path
                                                                        strokeLinecap="round"
                                                                        strokeLinejoin="round"
                                                                        strokeWidth="2"
                                                                        d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                                                                    />
                                                                </svg>
                                                            </div>
                                                            <h3 className="text-base font-black text-white uppercase tracking-wide">
                                                                {role}
                                                            </h3>
                                                        </div>
                                                        <div className="space-y-5">
                                                            <input
                                                                placeholder="Nama Lengkap"
                                                                value={
                                                                    data
                                                                        .contacts[
                                                                        role
                                                                    ].nama
                                                                }
                                                                onChange={(
                                                                    e,
                                                                ) => {
                                                                    const updated =
                                                                        {
                                                                            ...data.contacts,
                                                                        };
                                                                    updated[
                                                                        role
                                                                    ].nama =
                                                                        e.target.value;
                                                                    setData(
                                                                        "contacts",
                                                                        updated,
                                                                    );
                                                                }}
                                                                className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-3 text-sm focus:border-[#fadb04] outline-none"
                                                            />
                                                            <input
                                                                placeholder="No. WhatsApp"
                                                                type="tel"
                                                                value={
                                                                    data
                                                                        .contacts[
                                                                        role
                                                                    ].no_wa
                                                                }
                                                                onChange={(
                                                                    e,
                                                                ) => {
                                                                    const updated =
                                                                        {
                                                                            ...data.contacts,
                                                                        };
                                                                    updated[
                                                                        role
                                                                    ].no_wa =
                                                                        e.target.value;
                                                                    setData(
                                                                        "contacts",
                                                                        updated,
                                                                    );
                                                                }}
                                                                className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-3 text-sm focus:border-[#fadb04] outline-none"
                                                            />
                                                        </div>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                )}

                                {/* STEP 3: PEMAIN */}
                                {currentStep === 3 && (
                                    <div className="space-y-6">
                                        <div className="flex flex-col md:flex-row md:items-end justify-between mb-6 gap-2 border-b border-white/10 pb-4">
                                            <div>
                                                <h2 className="text-2xl font-black text-[#fadb04]">
                                                    Data Pemain
                                                </h2>
                                                <p className="text-sm text-white/50 mt-1">
                                                    Maksimal 12 pemain terdaftar
                                                </p>
                                            </div>
                                            <div className="bg-[#00d46a]/10 text-[#00d46a] px-4 py-2 rounded-xl text-sm font-bold border border-[#00d46a]/20">
                                                Total:{" "}
                                                {
                                                    data.players.filter(
                                                        (p) => p.nama !== "",
                                                    ).length
                                                }{" "}
                                                / 12 Terisi
                                            </div>
                                        </div>

                                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                                            {data.players.map((player, i) => (
                                                <div
                                                    key={i}
                                                    className="relative bg-[#05140d] border border-white/10 p-5 rounded-2xl hover:border-[#fadb04]/40 transition-all group"
                                                >
                                                    <div className="absolute -top-3 -right-2 w-8 h-8 bg-gradient-to-br from-[#fadb04] to-[#e6c200] text-black font-black text-sm rounded-full flex items-center justify-center border-2 border-[#05140d] shadow-lg">
                                                        {i + 1}
                                                    </div>
                                                    <input
                                                        placeholder="Nama Pemain"
                                                        value={player.nama}
                                                        onChange={(e) => {
                                                            const updated = [
                                                                ...data.players,
                                                            ];
                                                            updated[i].nama =
                                                                e.target.value;
                                                            setData(
                                                                "players",
                                                                updated,
                                                            );
                                                        }}
                                                        className="w-full bg-black/50 border border-white/5 rounded-xl px-4 py-3 text-sm font-semibold focus:border-[#fadb04] mb-4 outline-none"
                                                    />

                                                    <div className="space-y-4">
                                                        <div className="flex flex-col bg-white/5 p-3 rounded-xl border border-dashed border-white/10">
                                                            <label className="text-[10px] text-white/60 mb-2 font-bold uppercase">
                                                                Pas Foto 3x4
                                                            </label>
                                                            <input
                                                                type="file"
                                                                className="text-[10px] file:mr-2 file:py-1.5 file:px-3 file:rounded-full file:border-0 file:text-[10px] file:bg-white/10 file:text-white hover:file:bg-white/20 transition-all w-full text-white/60"
                                                                onChange={(
                                                                    e,
                                                                ) => {
                                                                    const updated =
                                                                        [
                                                                            ...data.players,
                                                                        ];
                                                                    updated[
                                                                        i
                                                                    ].pas_foto =
                                                                        e.target.files[0];
                                                                    setData(
                                                                        "players",
                                                                        updated,
                                                                    );
                                                                }}
                                                            />
                                                        </div>
                                                        <div className="flex flex-col bg-white/5 p-3 rounded-xl border border-dashed border-white/10">
                                                            <label className="text-[10px] text-white/60 mb-2 font-bold uppercase">
                                                                Kartu Pelajar
                                                            </label>
                                                            <input
                                                                type="file"
                                                                className="text-[10px] file:mr-2 file:py-1.5 file:px-3 file:rounded-full file:border-0 file:text-[10px] file:bg-white/10 file:text-white hover:file:bg-white/20 transition-all w-full text-white/60"
                                                                onChange={(
                                                                    e,
                                                                ) => {
                                                                    const updated =
                                                                        [
                                                                            ...data.players,
                                                                        ];
                                                                    updated[
                                                                        i
                                                                    ].foto_kartu =
                                                                        e.target.files[0];
                                                                    setData(
                                                                        "players",
                                                                        updated,
                                                                    );
                                                                }}
                                                            />
                                                        </div>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                )}

                                {/* STEP 4: OFFICIAL */}
                                {currentStep === 4 && (
                                    <div className="space-y-6 max-w-4xl mx-auto">
                                        <div className="text-center mb-8">
                                            <h2 className="text-2xl font-black text-[#fadb04]">
                                                Data Official
                                            </h2>
                                            <p className="text-sm text-white/50 mt-1">
                                                Manager dan Pelatih (Maksimal 2
                                                Orang)
                                            </p>
                                        </div>
                                        <div className="grid md:grid-cols-2 gap-8">
                                            {data.officials.map(
                                                (official, i) => (
                                                    <div
                                                        key={i}
                                                        className="bg-white/5 border border-white/10 rounded-2xl p-6 shadow-lg relative overflow-hidden"
                                                    >
                                                        <div className="absolute top-0 left-0 w-1.5 h-full bg-gradient-to-b from-[#00d46a] to-[#fadb04]" />
                                                        <h4 className="text-base font-black text-white mb-5 pl-2 uppercase tracking-wider">
                                                            Official {i + 1}
                                                        </h4>
                                                        <div className="space-y-4 pl-2">
                                                            <input
                                                                placeholder="Nama Lengkap Official"
                                                                value={
                                                                    official.nama
                                                                }
                                                                onChange={(
                                                                    e,
                                                                ) => {
                                                                    const updated =
                                                                        [
                                                                            ...data.officials,
                                                                        ];
                                                                    updated[
                                                                        i
                                                                    ].nama =
                                                                        e.target.value;
                                                                    setData(
                                                                        "officials",
                                                                        updated,
                                                                    );
                                                                }}
                                                                className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-sm focus:border-[#00d46a] outline-none"
                                                            />
                                                            <div className="bg-black/20 p-4 rounded-xl border border-dashed border-white/10">
                                                                <label className="text-[11px] text-white/50 block mb-2 font-bold uppercase">
                                                                    Pas Foto
                                                                </label>
                                                                <input
                                                                    type="file"
                                                                    className="text-xs file:mr-3 file:py-1.5 file:px-4 file:rounded-full file:border-0 file:text-[10px] file:bg-white/10 file:text-white hover:file:bg-white/20 w-full text-white/70"
                                                                    onChange={(
                                                                        e,
                                                                    ) => {
                                                                        const updated =
                                                                            [
                                                                                ...data.officials,
                                                                            ];
                                                                        updated[
                                                                            i
                                                                        ].pas_foto =
                                                                            e.target.files[0];
                                                                        setData(
                                                                            "officials",
                                                                            updated,
                                                                        );
                                                                    }}
                                                                />
                                                            </div>
                                                            <div className="bg-black/20 p-4 rounded-xl border border-dashed border-white/10">
                                                                <label className="text-[11px] text-white/50 block mb-2 font-bold uppercase">
                                                                    Foto KTP /
                                                                    Identitas
                                                                </label>
                                                                <input
                                                                    type="file"
                                                                    className="text-xs file:mr-3 file:py-1.5 file:px-4 file:rounded-full file:border-0 file:text-[10px] file:bg-white/10 file:text-white hover:file:bg-white/20 w-full text-white/70"
                                                                    onChange={(
                                                                        e,
                                                                    ) => {
                                                                        const updated =
                                                                            [
                                                                                ...data.officials,
                                                                            ];
                                                                        updated[
                                                                            i
                                                                        ].foto_ktp =
                                                                            e.target.files[0];
                                                                        setData(
                                                                            "officials",
                                                                            updated,
                                                                        );
                                                                    }}
                                                                />
                                                            </div>
                                                        </div>
                                                    </div>
                                                ),
                                            )}
                                        </div>
                                    </div>
                                )}

                                {/* STEP 5: DOKUMEN */}
                                {currentStep === 5 && (
                                    <div className="space-y-8 max-w-4xl mx-auto">
                                        <div className="text-center mb-6">
                                            <h2 className="text-2xl font-black text-[#fadb04]">
                                                Berkas Tambahan
                                            </h2>
                                            <p className="text-sm text-white/50 mt-1">
                                                Upload kelengkapan dokumen dan
                                                foto promosi tim
                                            </p>
                                        </div>

                                        {/* --- BAGIAN 1: BERKAS UTAMA --- */}
                                        <div className="space-y-4">
                                            <div className="border-b border-white/10 pb-2 mb-4">
                                                <h3 className="text-sm font-bold text-[#00d46a] uppercase tracking-widest">
                                                    1. Berkas Utama Tim
                                                </h3>
                                            </div>
                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                                                {[
                                                    {
                                                        id: "foto_tim_berjersey",
                                                        label: "Foto Tim Berjersey",
                                                        format: "JPG, PNG",
                                                    },
                                                    {
                                                        id: "foto_jersey_pemain",
                                                        label: "Desain / Foto Jersey Pemain",
                                                        format: "JPG, PNG",
                                                    },
                                                    {
                                                        id: "foto_jersey_kiper",
                                                        label: "Desain / Foto Jersey Kiper",
                                                        format: "JPG, PNG",
                                                    },
                                                    {
                                                        id: "surat_rekomendasi",
                                                        label: "Surat Rekomendasi Sekolah",
                                                        format: "PDF, JPG, PNG",
                                                    },
                                                ].map((doc) => (
                                                    <div
                                                        key={doc.id}
                                                        className="bg-white/5 border border-white/10 rounded-2xl p-5 hover:bg-white/10 transition-colors"
                                                    >
                                                        <label className="text-xs font-bold text-white uppercase block mb-1 tracking-wide">
                                                            {doc.label}
                                                        </label>
                                                        <p className="text-[9px] text-white/40 mb-3">
                                                            Format: {doc.format}
                                                        </p>
                                                        <input
                                                            type="file"
                                                            id={doc.id}
                                                            className="hidden"
                                                            onChange={(e) =>
                                                                setData(
                                                                    "documents",
                                                                    {
                                                                        ...data.documents,
                                                                        [doc.id]:
                                                                            e
                                                                                .target
                                                                                .files[0],
                                                                    },
                                                                )
                                                            }
                                                        />
                                                        <label
                                                            htmlFor={doc.id}
                                                            className="flex items-center gap-4 bg-black/40 border border-dashed border-white/20 p-3.5 rounded-xl cursor-pointer hover:border-[#fadb04]/50 hover:bg-[#fadb04]/5 transition-colors group"
                                                        >
                                                            <div className="w-10 h-10 bg-white/10 rounded-lg flex items-center justify-center text-white/50 group-hover:text-[#fadb04] transition-colors">
                                                                📄
                                                            </div>
                                                            <span className="text-xs text-white/70 truncate flex-1 font-semibold group-hover:text-[#fadb04]">
                                                                {data.documents[
                                                                    doc.id
                                                                ]
                                                                    ? data
                                                                          .documents[
                                                                          doc.id
                                                                      ].name
                                                                    : "Pilih File"}
                                                            </span>
                                                        </label>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>

                                        {/* --- BAGIAN 2: FOTO PROMOSI (3 ORANG) --- */}
                                        <div className="space-y-4 pt-4">
                                            <div className="border-b border-white/10 pb-2 mb-4">
                                                <h3 className="text-sm font-bold text-[#00d46a] uppercase tracking-widest">
                                                    2. Foto Promosi Player
                                                </h3>
                                            </div>

                                            <div className="flex flex-col md:flex-row gap-6">
                                                {/* KOTAK CONTOH FOTO */}
                                                <div className="w-full md:w-1/3 bg-gradient-to-b from-white/10 to-transparent border border-white/10 rounded-2xl p-4 text-center shrink-0 flex flex-col justify-center">
                                                    <p className="text-xs font-black text-[#fadb04] uppercase mb-3 tracking-widest">
                                                        Contoh Foto 3 Orang
                                                    </p>
                                                    <div className="w-full aspect-[4/5] bg-black/50 rounded-xl overflow-hidden border border-white/20 relative shadow-lg">
                                                        {/* PASTIKAN KAMU MENARUH GAMBAR CONTOH DI FOLDER public/images/ */}
                                                        <img
                                                            src="/images/daffa.jpeg"
                                                            alt="Contoh Pose"
                                                            className="w-full h-full object-cover opacity-90 hover:opacity-100 transition-opacity"
                                                        />
                                                    </div>
                                                    <p className="text-[10px] text-white/50 mt-3 italic">
                                                        *Gunakan pose terbaik
                                                        dengan jersey tim
                                                        kesayangan kalian.
                                                    </p>
                                                </div>

                                                {/* INPUT FOTO PLAYER 1, 2, 3 */}
                                                <div className="flex-1 flex flex-col gap-4 justify-center">
                                                    {[
                                                        {
                                                            id: "foto_player_satu",
                                                            label: "Foto Player Satu",
                                                        },
                                                        {
                                                            id: "foto_player_dua",
                                                            label: "Foto Player Dua",
                                                        },
                                                        {
                                                            id: "foto_player_tiga",
                                                            label: "Foto Player Tiga",
                                                        },
                                                    ].map((playerDoc, idx) => (
                                                        <div
                                                            key={playerDoc.id}
                                                            className="bg-black/20 border border-white/10 rounded-xl p-4 hover:border-[#00d46a]/50 transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-3"
                                                        >
                                                            <div>
                                                                <label className="text-xs font-bold text-white uppercase block mb-1">
                                                                    {
                                                                        playerDoc.label
                                                                    }
                                                                </label>
                                                                <p className="text-[9px] text-white/40">
                                                                    Format: JPG,
                                                                    PNG
                                                                </p>
                                                            </div>
                                                            <div className="sm:w-1/2">
                                                                <input
                                                                    type="file"
                                                                    id={
                                                                        playerDoc.id
                                                                    }
                                                                    className="hidden"
                                                                    accept="image/png, image/jpeg, image/jpg"
                                                                    onChange={(
                                                                        e,
                                                                    ) =>
                                                                        setData(
                                                                            "documents",
                                                                            {
                                                                                ...data.documents,
                                                                                [playerDoc.id]:
                                                                                    e
                                                                                        .target
                                                                                        .files[0],
                                                                            },
                                                                        )
                                                                    }
                                                                />
                                                                <label
                                                                    htmlFor={
                                                                        playerDoc.id
                                                                    }
                                                                    className="flex items-center justify-center gap-2 bg-white/5 border border-dashed border-white/20 p-2.5 rounded-lg cursor-pointer hover:border-[#00d46a] hover:bg-[#00d46a]/10 transition-colors w-full"
                                                                >
                                                                    <span className="text-xs text-white/70 truncate max-w-[150px]">
                                                                        {data
                                                                            .documents[
                                                                            playerDoc
                                                                                .id
                                                                        ]
                                                                            ? data
                                                                                  .documents[
                                                                                  playerDoc
                                                                                      .id
                                                                              ]
                                                                                  .name
                                                                            : "Upload Foto"}
                                                                    </span>
                                                                </label>
                                                            </div>
                                                        </div>
                                                    ))}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                )}

                                {/* STEP 6: PAYMENT */}
                                {currentStep === 6 && (
                                    <div className="space-y-6 max-w-2xl mx-auto">
                                        <div className="bg-gradient-to-br from-[#00d46a]/20 to-[#021810] p-10 rounded-3xl border border-[#00d46a]/30 shadow-[0_0_30px_rgba(0,212,106,0.1)] text-center relative overflow-hidden">
                                            <div className="absolute -right-10 -top-10 w-40 h-40 bg-[#fadb04]/10 rounded-full blur-2xl"></div>
                                            <p className="text-sm font-bold text-white/60 uppercase tracking-widest mb-2">
                                                Total Tagihan
                                            </p>
                                            <h2 className="text-5xl font-black text-white mb-8">
                                                Rp 350.000
                                            </h2>

                                            <div className="bg-black/40 p-6 rounded-2xl border border-white/5 mb-8">
                                                <p className="text-base text-white/60 mb-2">
                                                    Transfer ke Bank Mandiri
                                                </p>
                                                <p className="text-3xl font-mono font-black text-[#fadb04] tracking-widest">
                                                    136-00-1234567-8
                                                </p>
                                                <p className="text-sm font-bold text-white/80 mt-2">
                                                    A.N. PANITIA FIX CUP 6.0
                                                </p>
                                            </div>

                                            <input
                                                type="file"
                                                id="pay"
                                                className="hidden"
                                                accept="image/*"
                                                onChange={(e) =>
                                                    setData("payment", {
                                                        bukti_pembayaran:
                                                            e.target.files[0],
                                                    })
                                                }
                                            />
                                            <label
                                                htmlFor="pay"
                                                className={`flex flex-col items-center justify-center w-full border-2 border-dashed ${data.payment.bukti_pembayaran ? "border-[#00d46a] bg-[#00d46a]/10" : "border-white/20 hover:border-[#fadb04]/50 bg-black/20"} rounded-2xl p-8 cursor-pointer transition-all`}
                                            >
                                                <span
                                                    className={`font-bold text-lg ${data.payment.bukti_pembayaran ? "text-[#00d46a]" : "text-[#fadb04]"}`}
                                                >
                                                    {data.payment
                                                        .bukti_pembayaran
                                                        ? "✓ " +
                                                          data.payment
                                                              .bukti_pembayaran
                                                              .name
                                                        : "Upload Bukti Transfer"}
                                                </span>
                                                <p className="text-xs text-white/40 mt-2">
                                                    Format: JPG, PNG, PDF
                                                </p>
                                            </label>
                                        </div>
                                    </div>
                                )}

                                {/* STEP 7: REVIEW */}
                                {currentStep === 7 &&
                                    (() => {
                                        // Susun array data untuk tabel review secara otomatis
                                        const reviewRows = [
                                            {
                                                label: "Nama Tim",
                                                value: data.nama,
                                            },
                                            {
                                                label: "Logo Tim",
                                                value: data.logo?.name,
                                                isFile: true,
                                            },
                                            {
                                                label: "Nama Captain",
                                                value: data.contacts.captain
                                                    .nama,
                                            },
                                            {
                                                label: "No WA Captain",
                                                value: data.contacts.captain
                                                    .no_wa,
                                            },
                                            {
                                                label: "Nama Official",
                                                value: data.contacts.official
                                                    .nama,
                                            },
                                            {
                                                label: "No WA Official",
                                                value: data.contacts.official
                                                    .no_wa,
                                            },
                                            {
                                                label: "Nama Capo",
                                                value: data.contacts.capo.nama,
                                            },
                                            {
                                                label: "No WA Capo",
                                                value: data.contacts.capo.no_wa,
                                            },
                                        ];

                                        // Masukkan data pemain (hanya yang sudah diisi sebagian/penuh)
                                        data.players.forEach((p, i) => {
                                            if (
                                                p.nama ||
                                                p.pas_foto ||
                                                p.foto_kartu
                                            ) {
                                                reviewRows.push({
                                                    label: `Pemain ${i + 1} - Nama`,
                                                    value: p.nama,
                                                });
                                                reviewRows.push({
                                                    label: `Pemain ${i + 1} - Pas Foto`,
                                                    value: p.pas_foto?.name,
                                                    isFile: true,
                                                });
                                                reviewRows.push({
                                                    label: `Pemain ${i + 1} - Kartu Pelajar`,
                                                    value: p.foto_kartu?.name,
                                                    isFile: true,
                                                });
                                            }
                                        });

                                        // Masukkan data official (hanya yang sudah diisi sebagian/penuh)
                                        data.officials.forEach((o, i) => {
                                            if (
                                                o.nama ||
                                                o.pas_foto ||
                                                o.foto_ktp
                                            ) {
                                                reviewRows.push({
                                                    label: `Official Pelatih/Manager ${i + 1} - Nama`,
                                                    value: o.nama,
                                                });
                                                reviewRows.push({
                                                    label: `Official Pelatih/Manager ${i + 1} - Pas Foto`,
                                                    value: o.pas_foto?.name,
                                                    isFile: true,
                                                });
                                                reviewRows.push({
                                                    label: `Official Pelatih/Manager ${i + 1} - KTP`,
                                                    value: o.foto_ktp?.name,
                                                    isFile: true,
                                                });
                                            }
                                        });

                                        // Masukkan semua data file dokumen & pembayaran
                                        reviewRows.push(
                                            {
                                                label: "Foto Tim Berjersey",
                                                value: data.documents
                                                    .foto_tim_berjersey?.name,
                                                isFile: true,
                                            },
                                            {
                                                label: "Foto Jersey Pemain",
                                                value: data.documents
                                                    .foto_jersey_pemain?.name,
                                                isFile: true,
                                            },
                                            {
                                                label: "Foto Jersey Kiper",
                                                value: data.documents
                                                    .foto_jersey_kiper?.name,
                                                isFile: true,
                                            },
                                            {
                                                label: "Foto Player Satu",
                                                value: data.documents
                                                    .foto_player_satu?.name,
                                                isFile: true,
                                            },
                                            {
                                                label: "Foto Player Dua",
                                                value: data.documents
                                                    .foto_player_dua?.name,
                                                isFile: true,
                                            },
                                            {
                                                label: "Foto Player Tiga",
                                                value: data.documents
                                                    .foto_player_tiga?.name,
                                                isFile: true,
                                            },
                                            {
                                                label: "Surat Rekomendasi",
                                                value: data.documents
                                                    .surat_rekomendasi?.name,
                                                isFile: true,
                                            },
                                            {
                                                label: "Bukti Pembayaran",
                                                value: data.payment
                                                    .bukti_pembayaran?.name,
                                                isFile: true,
                                            },
                                        );

                                        return (
                                            <div className="space-y-8 max-w-4xl mx-auto">
                                                {/* HEADER INFO */}
                                                <div className="bg-[#fadb04]/10 border border-[#fadb04]/30 rounded-3xl p-6 md:p-8 text-center shadow-[0_0_20px_rgba(250,219,4,0.05)]">
                                                    <div className="w-16 h-16 bg-[#fadb04] rounded-full flex items-center justify-center mx-auto mb-4 text-black text-2xl shadow-[0_0_15px_rgba(250,219,4,0.5)]">
                                                        ✨
                                                    </div>
                                                    <h2 className="text-2xl font-black text-white mb-2">
                                                        Review Pendaftaran
                                                    </h2>
                                                    <p className="text-sm text-white/70">
                                                        Pastikan seluruh data
                                                        valid dan foto yang
                                                        diupload terlihat jelas.
                                                        Data tidak bisa diubah
                                                        setelah dikirim.
                                                    </p>
                                                </div>

                                                {/* TABEL REVIEW */}
                                                <div className="bg-[#05140d] border border-white/10 rounded-2xl overflow-hidden shadow-2xl">
                                                    {/* Kolom Judul Tabel */}
                                                    <div className="grid grid-cols-1 md:grid-cols-3 bg-white/10 p-4 font-black text-[#fadb04] text-sm uppercase tracking-wider border-b border-white/10">
                                                        <div className="col-span-1 hidden md:block">
                                                            Label
                                                        </div>
                                                        <div className="col-span-2 md:border-l border-white/10 md:pl-4 hidden md:block">
                                                            Isi
                                                        </div>
                                                        <div className="md:hidden text-center">
                                                            Rincian Seluruh Data
                                                        </div>
                                                    </div>

                                                    {/* Baris Isi Tabel */}
                                                    <div className="divide-y divide-white/5 text-sm">
                                                        {reviewRows.map(
                                                            (row, idx) => (
                                                                <div
                                                                    key={idx}
                                                                    className="grid grid-cols-1 md:grid-cols-3 p-4 hover:bg-white/5 transition-colors"
                                                                >
                                                                    <div className="col-span-1 text-white/60 font-semibold mb-1 md:mb-0 pr-2">
                                                                        {
                                                                            row.label
                                                                        }
                                                                    </div>
                                                                    <div className="col-span-2 md:border-l border-white/10 md:pl-4 font-medium truncate">
                                                                        {row.value ? (
                                                                            <span
                                                                                className={
                                                                                    row.isFile
                                                                                        ? "text-[#00d46a]"
                                                                                        : "text-white"
                                                                                }
                                                                            >
                                                                                {
                                                                                    row.value
                                                                                }
                                                                            </span>
                                                                        ) : (
                                                                            <span className="text-red-500/80 italic text-xs">
                                                                                Kosong
                                                                                /
                                                                                Belum
                                                                                diupload
                                                                            </span>
                                                                        )}
                                                                    </div>
                                                                </div>
                                                            ),
                                                        )}
                                                    </div>
                                                </div>
                                            </div>
                                        );
                                    })()}
                            </motion.div>
                        </AnimatePresence>
                    </div>

                    {/* --- 3. BOTTOM NAVIGATION --- */}
                    <div className="mt-10 pt-6 border-t border-white/10 flex items-center justify-between w-full">
                        <button
                            onClick={() =>
                                setCurrentStep(Math.max(1, currentStep - 1))
                            }
                            className={`px-8 py-3.5 rounded-full font-bold text-sm transition-all ${currentStep === 1 ? "opacity-0 pointer-events-none" : "bg-white/5 hover:bg-white/10 text-white/80 hover:text-white border border-white/10"}`}
                        >
                            ← Kembali
                        </button>

                        <button
                            onClick={
                                currentStep === steps.length
                                    ? handleSubmit
                                    : () => setCurrentStep(currentStep + 1)
                            }
                            disabled={processing}
                            className="bg-gradient-to-r from-[#fadb04] to-[#ffe95c] text-black px-10 md:px-14 py-3.5 rounded-full font-black text-sm shadow-[0_10px_20px_rgba(250,219,4,0.3)] hover:shadow-[0_10px_30px_rgba(250,219,4,0.5)] hover:scale-105 transition-all flex items-center gap-2"
                        >
                            {processing
                                ? "Memproses..."
                                : currentStep === steps.length
                                  ? "Kirim Pendaftaran"
                                  : "Selanjutnya"}
                            {currentStep !== steps.length && !processing && (
                                <span>→</span>
                            )}
                        </button>
                    </div>
                </motion.div>
            </main>

            {/* SCROLLBAR UNTUK BROWSER KESELURUHAN */}
            <AnimatePresence>
                {submitSuccess && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-[100] flex items-center justify-center bg-[#020d08]/90 backdrop-blur-xl overflow-hidden"
                    >
                        {/* Efek Cahaya Berputar di Belakang */}
                        <motion.div
                            animate={{
                                scale: [1, 1.2, 1],
                                rotate: [0, 90, 360],
                            }}
                            transition={{
                                duration: 10,
                                repeat: Infinity,
                                ease: "linear",
                            }}
                            className="absolute w-[600px] h-[600px] md:w-[800px] md:h-[800px] bg-gradient-to-r from-[#fadb04]/20 via-[#00d46a]/20 to-[#002776]/20 blur-[100px] rounded-full pointer-events-none"
                        />

                        {/* Partikel Berterbangan ala E-Sport */}
                        {[...Array(30)].map((_, i) => (
                            <motion.div
                                key={i}
                                initial={{
                                    x: 0,
                                    y: "100vh",
                                    opacity: 1,
                                    scale: Math.random() * 1.5,
                                }}
                                animate={{
                                    x: (Math.random() - 0.5) * 800,
                                    y: "-100vh",
                                    rotate: Math.random() * 360,
                                    opacity: [1, 1, 0],
                                }}
                                transition={{
                                    duration: 2 + Math.random() * 3,
                                    delay: Math.random() * 0.5,
                                    repeat: Infinity,
                                    ease: "easeOut",
                                }}
                                className="absolute w-3 h-3 z-0"
                                style={{
                                    backgroundColor:
                                        i % 3 === 0
                                            ? "#fadb04"
                                            : i % 3 === 1
                                              ? "#00d46a"
                                              : "#ffffff",
                                    clipPath:
                                        i % 2 === 0
                                            ? "polygon(50% 0%, 0% 100%, 100% 100%)"
                                            : "circle(50% at 50% 50%)", // Campuran bentuk segitiga dan lingkaran
                                }}
                            />
                        ))}

                        {/* Konten Utama Pop-up */}
                        <motion.div
                            initial={{ scale: 0.5, y: 150, opacity: 0 }}
                            animate={{ scale: 1, y: 0, opacity: 1 }}
                            transition={{
                                type: "spring",
                                bounce: 0.5,
                                duration: 1,
                            }}
                            className="relative flex flex-col items-center z-10 text-center px-4"
                        >
                            {/* MASKOT / LOGO MUNCUL DARI BAWAH */}
                            <motion.img
                                src="/images/maskot2.png" // <--- GANTI NAMA FILE INI SESUAI MASKOT KAMU DI FOLDER PUBLIC
                                alt="Mascot Sukses"
                                initial={{ y: -20 }}
                                animate={{ y: [0, -30, 0] }}
                                transition={{
                                    duration: 3,
                                    repeat: Infinity,
                                    ease: "easeInOut",
                                }}
                                className="w-56 md:w-80 drop-shadow-[0_20px_50px_rgba(250,219,4,0.6)] mb-6 z-20"
                            />

                            {/* Teks Sukses */}
                            <motion.div
                                initial={{ scale: 0.8, opacity: 0 }}
                                animate={{ scale: 1, opacity: 1 }}
                                transition={{ delay: 0.5, duration: 0.5 }}
                            >
                                <h2 className="text-5xl md:text-7xl font-black text-transparent bg-clip-text bg-gradient-to-r from-[#fadb04] to-[#ffffff] uppercase tracking-widest drop-shadow-[0_0_20px_rgba(250,219,4,0.5)] mb-2 italic">
                                    BOOM! BERHASIL!
                                </h2>
                                <p className="text-lg md:text-2xl text-[#00d46a] font-bold mb-10 tracking-wider">
                                    Tim{" "}
                                    <span className="text-white underline decoration-[#fadb04] decoration-4 underline-offset-4 px-2">
                                        {data.nama || "Kamu"}
                                    </span>{" "}
                                    Resmi Terdaftar ke Arena!
                                </p>
                            </motion.div>

                            {/* Tombol Kembali ke Beranda */}
                            <motion.a
                                href="/"
                                whileHover={{
                                    scale: 1.05,
                                    boxShadow:
                                        "0px 0px 30px rgba(250,219,4,0.8)",
                                }}
                                whileTap={{ scale: 0.95 }}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 1 }}
                                className="bg-gradient-to-r from-[#fadb04] to-[#ffe95c] text-[#020d08] px-10 py-4 md:px-14 md:py-5 rounded-full font-black text-sm md:text-lg shadow-[0_10px_40px_rgba(250,219,4,0.5)] flex items-center gap-3 uppercase tracking-widest border border-white/50"
                            >
                                <span>🏆</span> Kembali ke Beranda
                            </motion.a>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>

            <AnimatePresence>
                {submitError && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-[100] flex items-center justify-center bg-[#020d08]/80 backdrop-blur-sm px-4"
                    >
                        <motion.div
                            initial={{ scale: 0.9, y: 20, opacity: 0 }}
                            animate={{ scale: 1, y: 0, opacity: 1 }}
                            exit={{ scale: 0.9, y: 20, opacity: 0 }}
                            transition={{
                                type: "spring",
                                bounce: 0.4,
                                duration: 0.6,
                            }}
                            className="bg-[#05140d] border border-red-500/30 rounded-3xl p-8 max-w-md w-full text-center shadow-[0_10px_40px_rgba(239,68,68,0.1)] flex flex-col items-center relative overflow-hidden"
                        >
                            {/* Cahaya merah tipis di background */}
                            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-40 h-40 bg-red-500/10 blur-[50px] rounded-full pointer-events-none" />

                            {/* Maskot - Animasi mengambang pelan (biasa aja) */}
                            <motion.img
                                src="/images/maskot5.png" // Pastikan nama filenya sama
                                alt="Mascot Peringatan"
                                animate={{ y: [-3, 3, -3] }}
                                transition={{
                                    duration: 4,
                                    repeat: Infinity,
                                    ease: "easeInOut",
                                }}
                                className="w-28 md:w-36 drop-shadow-lg mb-5 opacity-90 relative z-10 grayscale-[30%]"
                            />

                            <h2 className="text-xl md:text-2xl font-black text-red-500 uppercase tracking-wider mb-2 relative z-10">
                                Oops! Ada yang Terlewat
                            </h2>
                            <p className="text-xs md:text-sm text-white/70 mb-8 relative z-10">
                                Pendaftaran gagal diproses. Pastikan{" "}
                                <span className="font-bold text-white">
                                    Nama Tim
                                </span>{" "}
                                dan data penting lainnya sudah terisi dengan
                                benar di halaman form.
                            </p>

                            <button
                                onClick={() => setSubmitError(false)}
                                className="bg-white/5 hover:bg-white/10 text-white px-8 py-3 rounded-full font-bold text-xs md:text-sm transition-all border border-white/10 relative z-10"
                            >
                                Kembali Periksa Data
                            </button>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
