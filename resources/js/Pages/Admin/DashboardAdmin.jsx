import React from "react";
import { Head, Link } from "@inertiajs/react";
import { motion } from "framer-motion";

export default function Dashboard({ teams }) {
    return (
        <div className="min-h-screen bg-[#020d08] text-white font-sans p-6 md:p-10 relative overflow-hidden">
            <Head title="Admin Dashboard | FIX CUP" />

            {/* Background Effects */}
            <div className="fixed inset-0 pointer-events-none z-0">
                <div className="absolute top-[-20%] left-[-10%] w-[500px] h-[500px] bg-[#00d46a]/10 blur-[150px] rounded-full" />
                <div className="absolute bottom-[-20%] right-[-10%] w-[600px] h-[600px] bg-[#fadb04]/10 blur-[150px] rounded-full" />
            </div>

            <div className="relative z-10 max-w-7xl mx-auto">
                {/* HEADER */}
                <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
                    <div>
                        <h1 className="text-3xl md:text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-[#fadb04] to-[#ffe95c] tracking-wider uppercase mb-2">
                            COMMAND CENTER
                        </h1>
                        <p className="text-white/60 text-sm md:text-base">
                            Monitoring Data Pendaftaran FIX CUP
                        </p>
                    </div>
                    <div className="bg-[#05140d] border border-white/10 px-6 py-3 rounded-2xl shadow-lg">
                        <p className="text-xs text-white/50 uppercase tracking-widest font-bold mb-1">
                            Total Pendaftar
                        </p>
                        <p className="text-3xl font-black text-[#00d46a]">
                            {teams.length}{" "}
                            <span className="text-sm text-white/50">Tim</span>
                        </p>
                    </div>
                </div>

                {/* TABEL DATA */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="bg-[#05140d]/80 backdrop-blur-xl border border-white/10 rounded-3xl overflow-hidden shadow-2xl"
                >
                    <div className="overflow-x-auto">
                        <table className="w-full text-left border-collapse">
                            <thead>
                                <tr className="bg-white/5 text-xs uppercase tracking-widest text-[#fadb04] border-b border-white/10">
                                    <th className="p-5 font-black">No</th>
                                    <th className="p-5 font-black">
                                        Nama Tim / Instansi
                                    </th>
                                    <th className="p-5 font-black">Kategori</th>
                                    <th className="p-5 font-black">
                                        Kontak Captain
                                    </th>
                                    <th className="p-5 font-black">
                                        Status Bayar
                                    </th>
                                    <th className="p-5 font-black text-center">
                                        Aksi
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="text-sm divide-y divide-white/5">
                                {teams.length === 0 ? (
                                    <tr>
                                        <td
                                            colSpan="6"
                                            className="p-10 text-center text-white/40 italic"
                                        >
                                            Belum ada tim yang mendaftar.
                                        </td>
                                    </tr>
                                ) : (
                                    teams.map((team, index) => {
                                        // Cari kontak captain dari relasi
                                        const captain = team.contacts.find(
                                            (c) => c.role === "captain",
                                        );

                                        return (
                                            <tr
                                                key={team.id}
                                                className="hover:bg-white/5 transition-colors group"
                                            >
                                                <td className="p-5 text-white/50 font-bold">
                                                    {index + 1}
                                                </td>
                                                <td className="p-5 font-bold text-white">
                                                    {team.nama}
                                                </td>
                                                <td className="p-5">
                                                    <span
                                                        className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-wider ${team.kategori === "SMA" ? "bg-[#fadb04]/20 text-[#fadb04] border border-[#fadb04]/30" : "bg-[#00d46a]/20 text-[#00d46a] border border-[#00d46a]/30"}`}
                                                    >
                                                        {team.kategori}
                                                    </span>
                                                </td>
                                                <td className="p-5 text-white/70">
                                                    {captain ? (
                                                        <div>
                                                            <p className="font-bold text-white">
                                                                {captain.nama}
                                                            </p>
                                                            <p className="text-xs">
                                                                {captain.no_wa}
                                                            </p>
                                                        </div>
                                                    ) : (
                                                        "-"
                                                    )}
                                                </td>
                                                <td className="p-5">
                                                    {team.payment ? (
                                                        <span className="text-[#00d46a] font-bold flex items-center gap-1">
                                                            ✓ Uploaded
                                                        </span>
                                                    ) : (
                                                        <span className="text-red-500 font-bold flex items-center gap-1">
                                                            ✕ Kosong
                                                        </span>
                                                    )}
                                                </td>
                                                <td className="p-5 text-center">
                                                    <Link
                                                        href={`/admin/team/${team.id}`}
                                                        className="bg-white/10 hover:bg-[#fadb04] text-white hover:text-black px-4 py-2 rounded-xl font-bold text-xs transition-all shadow-lg inline-block"
                                                    >
                                                        Detail
                                                    </Link>
                                                </td>
                                            </tr>
                                        );
                                    })
                                )}
                            </tbody>
                        </table>
                    </div>
                </motion.div>
            </div>
        </div>
    );
}
