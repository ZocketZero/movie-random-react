import { FC, useEffect } from "react";
import { useState } from "react";
import RandomBtn from "../components/RandomBtn";
import ShowMovie from "../components/ShowMovie";
import Movies from "../Data/Movies.json";
import LoadingStatus from "../components/LoadingStatus";
import Footer from "../components/Footer";

const Home: FC = () => {
  const [loadState, setLoadState] = useState(0);
  const [movie, setMovie] = useState(-1);
  const [delayLoading, setDelayLoading] = useState(50);

  useEffect(() => {
    return () => {
      document.title = "ดูอะไรดี";
    };
  }, []);

  useEffect(() => {
    const randomMovie_pressR = (e: KeyboardEvent) => {
      if (e.code === "KeyR") {
        if (loadState === 0 || loadState === 100) setLoadState(1);
      }
    };
    window.addEventListener("keyup", randomMovie_pressR);
    return () => {
      window.removeEventListener("keyup", randomMovie_pressR);
    };
  }, [loadState]);

  useEffect(() => {
    if (loadState === 100) {
      setMovie(Math.floor(Math.random() * Movies.length));
    }
    if (loadState > 0 && loadState < 100) {
      setTimeout(() => {
        setLoadState(loadState + 1);
      }, delayLoading);
    }
    if (loadState === 1) {
      setDelayLoading(Math.floor(Math.random() * 150));
    }
  }, [loadState]);

  const isIdle    = loadState === 0;
  const isLoading = loadState > 0 && loadState < 100;
  const isDone    = loadState === 100 && movie > -1;

  return (
    <>
      <main
        className={`min-h-screen transition-colors duration-500 ${
          isDone
            ? "pt-10 pb-28"
            : "flex flex-col items-center justify-center"
        } bg-gradient-to-br from-slate-50 via-indigo-50/30 to-purple-50/20
          dark:from-[#0d0d14] dark:via-[#11102a] dark:to-[#0b1220]`}
      >
        {/* Hero area (idle + loading) */}
        {!isDone && (
          <div className="flex flex-col items-center gap-6 px-4 text-center fade-up">
            {/* Cinematic film strip icon */}
            <div className="text-5xl select-none" aria-hidden>🎬</div>

            <div>
              <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-slate-800 dark:text-white">
                ดูภาพยนตร์อะไรดี?
              </h1>
              {isIdle && (
                <p className="mt-2 text-base text-slate-500 dark:text-slate-400">
                  อยากดูหนังสักเรื่อง แต่เลือกไม่ถูก — กดแล้วจะรู้!
                </p>
              )}
            </div>

            {isIdle  && <RandomBtn onClick={() => setLoadState(1)} />}
            {isLoading && <LoadingStatus loadState={loadState} />}

            {isIdle && (
              <p className="text-xs text-slate-400 dark:text-slate-600 mt-2">
                หรือกด <kbd className="px-1.5 py-0.5 rounded bg-slate-100 dark:bg-slate-800 font-mono text-[11px] border border-slate-200 dark:border-slate-700">R</kbd> บนคีย์บอร์ด
              </p>
            )}
          </div>
        )}

        {/* Result area */}
        {isDone && (
          <div className="flex flex-col items-center gap-4 px-4">
            <div className="text-center fade-up">
              <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-800 dark:text-white mb-1">
                ดูภาพยนตร์อะไรดี?
              </h1>
              <p className="text-sm text-slate-500 dark:text-slate-400">ผลลัพธ์แบบสุ่มสำหรับคืนนี้</p>
            </div>
            <RandomBtn onClick={() => setLoadState(1)} />
            <ShowMovie {...Movies[movie]} />
          </div>
        )}
      </main>

      {/* Preload images */}
      {Movies.map((mv, idx) => (
        <img key={idx} className="hidden" src={mv.img} alt="" aria-hidden />
      ))}

      <Footer />
    </>
  );
};

export default Home;
