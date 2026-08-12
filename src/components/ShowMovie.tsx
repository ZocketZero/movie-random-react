import { FC, useState } from "react";

type ShowMovieInput = {
    name: string;
    img: string;
    year: string;
    trailer: string;
    categories: string;
    tag: string;
}

const ShowMovie: FC<ShowMovieInput> = ({ img, name, year, trailer, categories, tag }) => {
    const [showTrailer, setShowTrailer] = useState(false);

    const tagList = tag
        .split(/[,،,]/)
        .map((t) => t.trim())
        .filter(Boolean);

    return (
        <div className="movie-card w-64 sm:w-72 text-left fade-up">
            {/* Poster / Trailer area */}
            {showTrailer ? (
                <div className="trailer-frame rounded-t-2xl rounded-b-none m-3">
                    <iframe
                        src={trailer + "?autoplay=1"}
                        title="YouTube video player"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                        allowFullScreen
                    />
                </div>
            ) : (
                <a
                    target="_blank"
                    rel="noreferrer"
                    href={`https://www.google.co.th/search?q=${encodeURIComponent(name)}`}
                    title="คลิกเพื่อค้นหาใน Google"
                    className="block"
                >
                    <div className="relative overflow-hidden rounded-t-2xl aspect-[2/3]">
                        <img
                            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                            src={img}
                            alt={`${name} poster`}
                        />
                        {/* overlay gradient */}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300 flex items-end p-3">
                            <span className="text-white text-xs font-medium">ค้นหาใน Google →</span>
                        </div>
                    </div>
                </a>
            )}

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

                {/* Trailer toggle */}
                {trailer.length > 0 && (
                    <button
                        className="trailer-link w-fit"
                        onClick={() => setShowTrailer(!showTrailer)}
                    >
                        {showTrailer ? (
                            <><span>✕</span><span>ซ่อนตัวอย่าง</span></>
                        ) : (
                            <><span>▶</span><span>ดูตัวอย่าง</span></>
                        )}
                    </button>
                )}
            </div>
        </div>
    );
}

export default ShowMovie;
