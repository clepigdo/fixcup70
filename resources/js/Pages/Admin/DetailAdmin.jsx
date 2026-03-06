import React from "react";
import { Head, Link } from "@inertiajs/react";
import {
    FaFilePdf,
    FaArrowLeft,
    FaCheckCircle,
    FaTimesCircle,
    FaWhatsapp,
    FaDownload,
} from "react-icons/fa";

export default function DetailAdmin({ team }) {
    const getImageUrl = (path) => (path ? `/storage/${path}` : null);
    const isPdf = (path) => path && path.toLowerCase().endsWith(".pdf");

    const handleDownloadPDF = () => {
        window.print();
    };

    // KOMPONEN RENDER FILE (Kini Dilengkapi Fitur Smart Download)
    const RenderFile = ({ path, altText, containerClass, imgClass = "" }) => {
        if (!path) {
            return (
                <div
                    className={`${containerClass} flex items-center justify-center bg-black/40 text-white/30 text-[10px] font-medium border border-white/10 rounded-lg print:bg-gray-100 print:text-black print:border-gray-300 print:border print:rounded-none`}
                >
                    Kosong
                </div>
            );
        }

        const fileUrl = getImageUrl(path);

        // Membuat nama file pintar saat didownload (Contoh: "NAMA TIM - Pas Foto Budi.jpg")
        // Mengambil ekstensi asli dari path (misal: .jpg, .png)
        const fileExtension = path.split(".").pop();
        const smartFileName = `${team.nama} - ${altText}.${fileExtension}`;

        if (isPdf(path)) {
            return (
                <div className={`${containerClass} relative group`}>
                    <a
                        href={fileUrl}
                        target="_blank"
                        rel="noreferrer"
                        className={`w-full h-full flex flex-col items-center justify-center bg-red-500/10 border border-red-500/30 text-red-500 rounded-lg gap-2 p-2 print:bg-white print:border-black print:border print:text-black print:rounded-none`}
                    >
                        <FaFilePdf className="text-2xl print:hidden" />
                        <span className="text-[10px] font-bold text-center uppercase tracking-widest">
                            PDF (Terlampir)
                        </span>
                    </a>

                    {/* Tombol Download Khusus PDF */}
                    <a
                        href={fileUrl}
                        download={smartFileName}
                        onClick={(e) => e.stopPropagation()}
                        className="absolute top-2 right-2 bg-black/80 backdrop-blur-md hover:bg-[#fadb04] text-white hover:text-black p-2 rounded-lg opacity-0 group-hover:opacity-100 transition-all shadow-lg border border-white/20 print:hidden z-10"
                        title={`Download ${altText}`}
                    >
                        <FaDownload className="text-sm" />
                    </a>
                </div>
            );
        }

        return (
            <div
                className={`${containerClass} bg-black/40 rounded-lg overflow-hidden border border-white/10 print:bg-transparent print:border-gray-300 print:border print:rounded-none flex items-center justify-center p-1 relative group`}
            >
                <a
                    href={fileUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="w-full h-full flex items-center justify-center pointer-events-auto print:pointer-events-none"
                >
                    <img
                        src={fileUrl}
                        alt={altText}
                        className={`max-w-full max-h-full object-contain print:object-contain ${imgClass}`}
                    />
                </a>

                {/* Tombol Download Pintar untuk Gambar */}
                <a
                    href={fileUrl}
                    download={smartFileName}
                    onClick={(e) => e.stopPropagation()}
                    className="absolute bottom-2 right-2 bg-black/80 backdrop-blur-md hover:bg-[#00d46a] text-white hover:text-white p-2.5 rounded-lg opacity-0 group-hover:opacity-100 transition-all shadow-[0_5px_15px_rgba(0,0,0,0.5)] border border-white/20 print:hidden z-10 translate-y-2 group-hover:translate-y-0"
                    title={`Download ${altText}`}
                >
                    <FaDownload className="text-sm" />
                </a>
            </div>
        );
    };

    return (
        <div className="min-h-screen bg-[#020d08] text-white font-sans p-6 md:p-10 relative print:bg-white print:text-black print:p-8">
            <Head title={`Detail ${team.nama} | Admin FIX CUP`} />

            {/* Background Web */}
            <div className="fixed inset-0 pointer-events-none z-0 print:hidden">
                <div className="absolute top-[-10%] left-[-10%] w-[400px] h-[400px] bg-[#00d46a]/10 blur-[150px] rounded-full" />
                <div className="absolute bottom-[-10%] right-[-10%] w-[500px] h-[500px] bg-[#fadb04]/10 blur-[150px] rounded-full" />
            </div>

            <div className="relative z-10 max-w-6xl mx-auto">
                {/* HEADER TOMBOL WEB */}
                <div className="flex flex-col md:flex-row justify-between items-center mb-10 gap-6 print:hidden">
                    <Link
                        href="/admin/dashboard"
                        className="flex items-center gap-2 text-white/60 hover:text-white transition bg-white/5 px-5 py-2.5 rounded-full"
                    >
                        <FaArrowLeft /> Kembali ke Dashboard
                    </Link>
                    <button
                        onClick={handleDownloadPDF}
                        className="flex items-center gap-2 bg-gradient-to-r from-red-500 to-red-600 text-white px-6 py-2.5 rounded-full font-bold shadow-[0_5px_20px_rgba(239,68,68,0.4)] hover:scale-105 transition"
                    >
                        <FaFilePdf /> Cetak Dokumen (PDF)
                    </button>
                </div>

                {/* === BAGIAN 1: KHUSUS PRINT PDF === */}
                <div className="hidden print:block mb-8 break-inside-avoid">
                    <div className="text-center border-b-[3px] border-black pb-4 mb-6">
                        <h1 className="text-xl font-bold tracking-widest uppercase text-gray-600 mb-1">
                            DOSSIER TIM FIX CUP
                        </h1>
                        <h2 className="text-4xl font-black uppercase text-black leading-tight mb-3">
                            {team.nama}
                        </h2>
                        <span className="text-sm font-bold mt-2 text-black bg-gray-200 px-4 py-1 border border-black uppercase tracking-widest">
                            Divisi: {team.kategori}
                        </span>
                    </div>

                    <div className="flex items-center gap-6 border border-gray-400 p-4 bg-gray-50">
                        <div className="w-28 h-28 shrink-0 flex items-center justify-center p-1 bg-white border border-gray-300">
                            {team.logo ? (
                                <img
                                    src={getImageUrl(team.logo)}
                                    alt="Logo"
                                    className="max-w-full max-h-full object-contain"
                                />
                            ) : (
                                <span className="text-[10px] text-gray-400">
                                    Tanpa Logo
                                </span>
                            )}
                        </div>

                        <div className="flex-1 grid grid-cols-3 gap-4">
                            {team.contacts.map((c, i) => (
                                <div
                                    key={i}
                                    className="border-l-[3px] border-black pl-4"
                                >
                                    <p className="text-[10px] font-black uppercase text-gray-500 tracking-wider mb-1">
                                        {c.role}
                                    </p>
                                    <p className="font-bold text-sm text-black mb-1 leading-tight">
                                        {c.nama || "-"}
                                    </p>
                                    <p className="font-mono text-xs text-black font-bold">
                                        WA: {c.no_wa || "-"}
                                    </p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* === BAGIAN 1: KHUSUS TAMPILAN WEB LAYAR === */}
                <div className="bg-[#05140d]/80 backdrop-blur-md border border-white/10 rounded-3xl p-8 mb-8 shadow-2xl print:hidden">
                    <div className="flex flex-col md:flex-row gap-8 items-center md:items-start">
                        {/* Logo Web */}
                        <RenderFile
                            path={team.logo}
                            altText="Logo Tim"
                            containerClass="w-32 h-32 md:w-48 md:h-48 shrink-0 bg-black/50 rounded-2xl border-2 border-white/10 p-2"
                        />

                        {/* Nama & Kontak Web */}
                        <div className="flex-1 w-full text-center md:text-left">
                            <span className="bg-[#fadb04]/20 text-[#fadb04] px-4 py-1.5 rounded-full text-xs font-black uppercase tracking-widest">
                                {team.kategori}
                            </span>
                            <h2 className="text-4xl md:text-5xl font-black mt-4 mb-4 uppercase tracking-wide">
                                {team.nama}
                            </h2>
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
                                {team.contacts.map((c, i) => (
                                    <div
                                        key={i}
                                        className="bg-gradient-to-br from-white/10 to-transparent border border-white/20 rounded-xl p-5 text-left"
                                    >
                                        <p className="text-[#00d46a] text-[11px] font-black uppercase tracking-widest mb-2">
                                            {c.role}
                                        </p>
                                        <p className="font-bold text-xl leading-tight text-white mb-2">
                                            {c.nama || "-"}
                                        </p>
                                        <div className="flex items-center gap-2 text-[#fadb04] bg-black/40 p-2 rounded-lg">
                                            <FaWhatsapp className="text-lg" />
                                            <p className="text-lg font-mono font-bold tracking-wider">
                                                {c.no_wa || "-"}
                                            </p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>

                {/* === 2. ROSTER PEMAIN === */}
                <div className="bg-[#05140d]/80 border border-white/10 rounded-3xl p-8 mb-8 shadow-xl print:border-none print:bg-transparent print:shadow-none print:p-0 print:mb-8">
                    <h3 className="text-2xl font-black mb-6 flex items-center gap-3 border-b border-white/10 pb-4 print:border-black print:text-xl print:mb-4 print:pb-2 print:text-black">
                        <span>⚡</span> Roster Pemain
                    </h3>
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 print:grid-cols-4 gap-6 print:gap-4">
                        {team.players.map((p, i) => (
                            <div
                                key={i}
                                className="bg-white/5 border border-white/10 rounded-2xl overflow-hidden relative flex flex-col print:border-gray-400 print:bg-transparent print:rounded-none print:break-inside-avoid"
                            >
                                <div className="absolute top-0 left-0 bg-[#fadb04] text-black w-8 h-8 flex items-center justify-center text-sm font-black z-10 rounded-br-xl shadow-lg print:rounded-none print:border-b print:border-r print:border-black print:w-6 print:h-6 print:text-xs">
                                    {i + 1}
                                </div>

                                <div className="p-3 pt-10 text-center border-b border-white/10 print:border-gray-400 print:pt-8 print:p-2 bg-black/40 print:bg-gray-100">
                                    <p className="font-black text-xs uppercase tracking-wide leading-tight print:text-black">
                                        {p.nama || "Kosong"}
                                    </p>
                                </div>

                                <div className="p-3 flex flex-col gap-3 flex-1 bg-black/20 print:bg-transparent print:p-2 print:gap-2">
                                    <div>
                                        <p className="text-[9px] text-white/50 text-center mb-1 font-bold print:text-gray-600">
                                            PAS FOTO
                                        </p>
                                        <RenderFile
                                            path={p.pas_foto}
                                            altText={`Pas Foto - ${p.nama}`}
                                            containerClass="w-full aspect-[3/4]"
                                        />
                                    </div>
                                    <div>
                                        <p className="text-[9px] text-white/50 text-center mb-1 font-bold print:text-gray-600">
                                            KARTU ID / KTM
                                        </p>
                                        <RenderFile
                                            path={p.foto_kartu}
                                            altText={`Kartu ID - ${p.nama}`}
                                            containerClass="w-full aspect-[4/3]"
                                        />
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* === 3. OFFICIALS === */}
                <div className="bg-[#05140d]/80 border border-white/10 rounded-3xl p-8 mb-8 shadow-xl print:border-none print:bg-transparent print:shadow-none print:p-0 print:mb-8 print:break-inside-avoid">
                    <h3 className="text-2xl font-black mb-6 flex items-center gap-3 border-b border-white/10 pb-4 print:border-black print:text-xl print:mb-4 print:pb-2 print:text-black">
                        <span>👔</span> Data Official (Manager/Pelatih)
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 print:gap-4">
                        {team.officials.map((off, i) => (
                            <div
                                key={i}
                                className="flex flex-col sm:flex-row items-center sm:items-start gap-4 bg-white/5 p-6 rounded-2xl border border-white/10 print:border-gray-400 print:bg-transparent print:p-3 print:rounded-none"
                            >
                                <div className="text-center sm:text-left w-full sm:w-auto flex-1">
                                    <p className="font-black text-2xl mb-4 print:text-black print:text-lg print:mb-2">
                                        {off.nama || "Kosong"}
                                    </p>
                                    <div className="flex gap-4 justify-center sm:justify-start">
                                        <div className="w-24 print:w-20">
                                            <p className="text-[10px] text-white/50 text-center mb-1 font-bold print:text-gray-600">
                                                PAS FOTO
                                            </p>
                                            <RenderFile
                                                path={off.pas_foto}
                                                altText={`Pas Foto Official - ${off.nama}`}
                                                containerClass="w-full aspect-[3/4]"
                                            />
                                        </div>
                                        <div className="w-32 print:w-28">
                                            <p className="text-[10px] text-white/50 text-center mb-1 font-bold print:text-gray-600">
                                                KTP / ID
                                            </p>
                                            <RenderFile
                                                path={off.foto_ktp}
                                                altText={`KTP Official - ${off.nama}`}
                                                containerClass="w-full aspect-[4/3]"
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* === 4. DOKUMEN KELENGKAPAN === */}
                <div className="bg-[#05140d]/80 border border-white/10 rounded-3xl p-8 mb-8 shadow-xl print:border-none print:bg-transparent print:shadow-none print:p-0 print:mb-8">
                    <h3 className="text-2xl font-black mb-6 flex items-center gap-3 border-b border-white/10 pb-4 print:border-black print:text-xl print:mb-4 print:pb-2 print:text-black">
                        <span>📁</span> Dokumen & Foto Promosi
                    </h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 print:grid-cols-4 print:gap-3">
                        {[
                            {
                                label: "Foto Tim Berjersey",
                                path: team.document?.foto_tim_berjersey,
                            },
                            {
                                label: "Jersey Pemain",
                                path: team.document?.foto_jersey_pemain,
                            },
                            {
                                label: "Jersey Kiper",
                                path: team.document?.foto_jersey_kiper,
                            },
                            {
                                label: "Surat Rekomendasi",
                                path: team.document?.surat_rekomendasi,
                            },
                            {
                                label: "Promosi Player 1",
                                path: team.document?.foto_player_satu,
                            },
                            {
                                label: "Promosi Player 2",
                                path: team.document?.foto_player_dua,
                            },
                            
                        ].map((doc, idx) => (
                            <div
                                key={idx}
                                className="bg-white/5 border border-white/10 rounded-2xl p-5 text-center flex flex-col print:border-gray-400 print:bg-transparent print:rounded-none print:break-inside-avoid print:p-2"
                            >
                                <p className="text-sm font-black text-[#fadb04] uppercase mb-4 tracking-wider print:text-black print:text-[10px] print:mb-2">
                                    {doc.label}
                                </p>
                                <RenderFile
                                    path={doc.path}
                                    altText={doc.label}
                                    containerClass="w-full h-56 md:h-64 print:h-36"
                                />
                            </div>
                        ))}
                    </div>
                </div>

                {/* === 5. STATUS PEMBAYARAN === */}
                <div className="bg-[#05140d]/80 border border-white/10 rounded-3xl p-8 mb-8 shadow-xl print:border-none print:bg-transparent print:shadow-none print:p-0 print:break-inside-avoid">
                    <h3 className="text-2xl font-black mb-6 flex items-center gap-3 border-b border-white/10 pb-4 print:border-black print:text-xl print:mb-4 print:pb-2 print:text-black">
                        <span>💰</span> Bukti Pembayaran
                    </h3>

                    <div className="flex flex-col md:flex-row gap-8 items-start print:flex-row print:items-center print:gap-6">
                        {team.payment?.bukti_pembayaran ? (
                            <>
                                <RenderFile
                                    path={team.payment.bukti_pembayaran}
                                    altText="Bukti Transfer"
                                    containerClass="w-full md:w-1/3 aspect-[3/4] print:w-40 print:h-auto"
                                />
                                <div className="text-[#00d46a] flex items-center gap-3 text-2xl font-black bg-[#00d46a]/10 border border-[#00d46a]/30 px-6 py-4 rounded-2xl w-full md:w-auto print:bg-transparent print:border-black print:border print:text-black print:rounded-none print:text-xl">
                                    <FaCheckCircle className="text-4xl print:text-gray-800 print:text-3xl print:hidden" />{" "}
                                    STATUS: TERLAMPIR
                                </div>
                            </>
                        ) : (
                            <div className="text-red-500 flex items-center gap-3 text-2xl font-black bg-red-500/10 border border-red-500/30 px-6 py-4 rounded-2xl w-full print:bg-transparent print:border-black print:border print:text-black print:rounded-none print:text-xl">
                                <FaTimesCircle className="text-4xl print:text-gray-800 print:text-3xl print:hidden" />{" "}
                                BELUM ADA BUKTI TRANSFER
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
