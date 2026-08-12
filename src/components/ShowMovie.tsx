import { FC, useState, useEffect, useCallback } from "react";

type ShowMovieInput = {
    name: string;
    img: string;
    year: string;
    trailer: string;
    categories: string;
    tag: string;
}

/** Extract YouTube video ID from an embed URL */
function getYouTubeId(embedUrl: string): string | null {
    const match = embedUrl.match(/\/embed\/([A-Za-z0-9_-]{11})/);
    return match ? match[1] : null;
}

/* ─── Trailer Modal ──────────────────────────────────────────── */
type TrailerModalProps = {
    videoId: string;
    title: string;
    onClose: () => void;
}

const TrailerModal: FC<TrailerModalProps> = ({ videoId, title, onClose }) => {
    // Close on Escape key
    useEffect(() => {
        const handler = (e: KeyboardEvent) => {
            if (e.key === "Escape") onClose();
        };
        window.addEventListener("keydown", handler);
        return () => window.removeEventListener("keydown", handler);
    }, [onClose]);

    // Lock body scroll while open
    useEffect(() => {
        document.body.style.overflow = "hidden";
        return () => { document.body.style.overflow = ""; };
    }, []);

    const src = `https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0&modestbranding=1`;

    return (
        /* Backdrop */
        <div
            className="trailer-modal-backdrop"
            onClick={onClose}
            role="dialog"
            aria-modal="true"
            aria-label={`ตัวอย่างภาพยนตร์: ${title}`}
        >
            {/* Panel — stops click propagation */}
            <div
                className="trailer-modal-panel"
                onClick={(e) => e.stopPropagation()}
            >
                {/* Header */}
                <div className="flex items-center justify-between px-4 py-3 border-b border-white/10">
                    <div className="flex items-center gap-2 min-w-0">
                        <span className="text-red-500 text-lg">▶</span>
                        <span className="text-sm font-semibold text-white truncate">{title}</span>
                    </div>
                    <button
                        onClick={onClose}
                        className="trailer-close-btn"
                        aria-label="ปิด"
                    >
                        <svg viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4">
                            <path d="M6.28 5.22a.75.75 0 00-1.06 1.06L8.94 10l-3.72 3.72a.75.75 0 101.06 1.06L10 11.06l3.72 3.72a.75.75 0 101.06-1.06L11.06 10l3.72-3.72a.75.75 0 00-1.06-1.06L10 8.94 6.28 5.22z" />
                        </svg>
                    </button>
                </div>

                {/* YouTube iframe */}
                <div className="trailer-iframe-wrapper">
                    <iframe
                        src={src}
                        title={`${title} — ตัวอย่างภาพยนตร์`}
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share; fullscreen"
                        allowFullScreen
                        className="w-full h-full border-0"
                    />
                </div>

                {/* Footer hint */}
                <div className="px-4 py-2.5 flex items-center justify-between">
                    <a
                        href={`https://www.youtube.com/watch?v=${videoId}`}
                        target="_blank"
                        rel="noreferrer"
                        className="text-xs text-slate-400 hover:text-white transition-colors flex items-center gap-1"
                    >
                        <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24" aria-hidden>
                            <path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-2.88 2.5 2.89 2.89 0 01-2.89-2.89 2.89 2.89 0 012.89-2.89c.28 0 .54.04.79.1V9.01a6.33 6.33 0 00-.79-.05 6.34 6.34 0 00-6.34 6.34 6.34 6.34 0 006.34 6.34 6.34 6.34 0 006.33-6.34V8.69a8.27 8.27 0 004.84 1.56V6.79a4.85 4.85 0 01-1.07-.1z"/>
                        </svg>
                        เปิดใน YouTube
                    </a>
                    <span className="text-xs text-slate-600">กด Esc เพื่อปิด</span>
                </div>
            </div>
        </div>
    );
};

/* ─── ShowMovie Card ─────────────────────────────────────────── */
const ShowMovie: FC<ShowMovieInput> = ({ img, name, year, trailer, categories, tag }) => {
    const [showTrailer, setShowTrailer] = useState(false);

    const videoId = trailer.length > 0 ? getYouTubeId(trailer) : null;
    const ytThumb = videoId
        ? `https://i.ytimg.com/vi/${videoId}/hqdefault.jpg`
        : null;

    const tagList = tag
        .split(/[,،,]/)
        .map((t) => t.trim())
        .filter(Boolean);

    const openTrailer = useCallback(() => setShowTrailer(true), []);
    const closeTrailer = useCallback(() => setShowTrailer(false), []);

    return (
        <>
            <div className="movie-card w-64 sm:w-72 text-left fade-up group">
                {/* Poster */}
                <div className="relative overflow-hidden rounded-t-2xl aspect-[2/3]">
                    <a
                        target="_blank"
                        rel="noreferrer"
                        href={`https://www.google.co.th/search?q=${encodeURIComponent(name)}`}
                        title="คลิกเพื่อค้นหาใน Google"
                        className="block w-full h-full"
                    >
                        <img
                            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                            src={img}
                            alt={`${name} poster`}
                        />
                        {/* Poster hover overlay */}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-3">
                            <span className="text-white text-xs font-medium">ค้นหาใน Google →</span>
                        </div>
                    </a>

                    {/* Play button badge — shows when trailer exists */}
                    {videoId && (
                        <button
                            onClick={openTrailer}
                            className="trailer-play-badge"
                            aria-label="ดูตัวอย่างภาพยนตร์"
                        >
                            <span className="trailer-play-icon">▶</span>
                        </button>
                    )}
                </div>

                {/* Info */}
                <div className="p-3 flex flex-col gap-1.5">
                    <a
                        target="_blank"
                        rel="noreferrer"
                        href={`https://www.google.co.th/search?q=${encodeURIComponent(name)}`}
                        className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors duration-150"
                    >
                        <h3 className="text-base font-semibold leading-snug">{name}</h3>
                    </a>

                    <div className="flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400">
                        <span>📅 {year}</span>
                        <span className="opacity-40">·</span>
                        <span className="truncate">{categories}</span>
                    </div>

                    {/* Tags */}
                    {tagList.length > 0 && (
                        <div className="flex flex-wrap gap-1 mt-0.5">
                            {tagList.slice(0, 3).map((t, i) => (
                                <span key={i} className="tag">{t}</span>
                            ))}
                        </div>
                    )}

                    {/* Trailer button */}
                    {videoId && (
                        <button
                            className="trailer-link w-fit mt-1"
                            onClick={openTrailer}
                        >
                            {/* YouTube thumbnail strip */}
                            {ytThumb && (
                                <img
                                    src={ytThumb}
                                    alt="thumbnail"
                                    className="w-8 h-5 object-cover rounded"
                                />
                            )}
                            <span>▶</span>
                            <span>ดูตัวอย่าง</span>
                        </button>
                    )}
                </div>
            </div>

            {/* Modal — rendered via portal-like pattern */}
            {showTrailer && videoId && (
                <TrailerModal
                    videoId={videoId}
                    title={name}
                    onClose={closeTrailer}
                />
            )}
        </>
    );
}

export default ShowMovie;
