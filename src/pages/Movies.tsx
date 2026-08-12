import { FC, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import ShowMovie from "../components/ShowMovie";
import movies from "../Data/Movies.json";

const Movies: FC = () => {
  const [searchKey, setSearchKey] = useState<string>("");

  useEffect(() => {
    document.title = "ภาพยนตร์ทั้งหมด";
  }, []);

  const MovieSearched = movies.filter(
    (m) =>
      m.name.toLowerCase().includes(searchKey.toLocaleLowerCase()) ||
      m.year.includes(searchKey) ||
      m.categories.toLocaleLowerCase().includes(searchKey) ||
      m.tag.toLocaleLowerCase().includes(searchKey)
  );

  return (
    <main
      className="frame min-h-screen pb-24 bg-gradient-to-br
                 from-slate-50 via-indigo-50/30 to-purple-50/20
                 dark:from-[#0d0d14] dark:via-[#11102a] dark:to-[#0b1220]"
    >
      {/* Sticky top bar */}
      <div
        className="sticky top-0 z-40 px-4 sm:px-6 py-3 flex flex-wrap gap-3 items-center justify-between
                   bg-white/80 dark:bg-[#0d0d14]/85
                   border-b border-slate-100 dark:border-slate-800
                   backdrop-blur-md"
      >
        <Link to="/" id="back-link">
          <span className="nav-btn">
            <svg
              className="w-4 h-4"
              viewBox="0 0 20 20"
              fill="currentColor"
              aria-hidden
            >
              <path
                fillRule="evenodd"
                d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
                clipRule="evenodd"
              />
            </svg>
            ย้อนกลับ
          </span>
        </Link>

        <div className="flex items-center gap-3 flex-1 justify-end">
          <span className="text-xs text-slate-400 dark:text-slate-500 hidden sm:inline">
            {MovieSearched.length} เรื่อง
          </span>
          <input
            id="movie-search"
            className="search-input"
            type="search"
            placeholder="ค้นหาภาพยนตร์…"
            onChange={(e) => setSearchKey(e.target.value)}
            value={searchKey}
            autoComplete="off"
          />
        </div>
      </div>

      {/* Page title */}
      <div className="px-4 sm:px-6 pt-6 pb-3">
        <h1 className="text-2xl font-bold tracking-tight text-slate-800 dark:text-white">
          ภาพยนตร์ทั้งหมด
        </h1>
        <p className="text-sm text-slate-500 dark:text-slate-400 mt-0.5">
          {searchKey
            ? `พบ ${MovieSearched.length} เรื่องสำหรับ "${searchKey}"`
            : `มีทั้งหมด ${movies.length} เรื่อง`}
        </p>
      </div>

      {/* Grid */}
      {MovieSearched.length > 0 ? (
        <div
          className="grid gap-4 px-4 sm:px-6 py-2
                     grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6"
        >
          {MovieSearched.map((mv, key) => (
            <div key={key} className="flex justify-center">
              <ShowMovie
                name={mv.name}
                img={mv.img}
                year={mv.year}
                trailer={mv.trailer}
                categories={mv.categories}
                tag={mv.tag}
              />
            </div>
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center py-24 text-center fade-up">
          <div className="text-5xl mb-4">🔍</div>
          <p className="text-lg font-semibold text-slate-700 dark:text-slate-300">
            ไม่พบภาพยนตร์
          </p>
          <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
            ลองค้นหาด้วยคำอื่น
          </p>
        </div>
      )}
    </main>
  );
};

export default Movies;
