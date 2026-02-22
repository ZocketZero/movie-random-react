import { FC, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import ShowMovie from "../components/ShowMovie";
import movies from "../Data/Movies.json";

const Movies: FC = () => {
  const [searchKey, setSearchKey] = useState<string>("");
  useEffect(() => {
    document.title = "ภาพยนตร์ทั้งหมด";
  }, []);

  // for search movies
  const MovieSearched = movies.filter(
    (m) =>
      // search with name
      m.name.toLowerCase().includes(searchKey.toLocaleLowerCase()) ||
      // search with year
      m.year.includes(searchKey) ||
      // search with categories
      m.categories.toLocaleLowerCase().includes(searchKey) ||
      // search with tag
      m.tag.toLocaleLowerCase().includes(searchKey)
  );

  return (
    <main className="frame">
      <div className="mb-3 mt-3 px-3 flex flex-wrap items-center justify-between">
        <Link to={"/"}>
          <span className="left-0 p-2 m-3 bg-emerald-400 dark:bg-black hover:bg-emerald-500 dark:hover:bg-white text-white dark:text-slate-200 dark:hover:text-black shadow-md dark:shadow shadow-emerald-300 dark:shadow-transparent dark:border dark:border-white rounded transition-all duration-300">
            ย้อนกลับ
          </span>
        </Link>
        <span className=" text-center m-3 w-full sm:w-auto">
          <input
            className="px-2 py-1 w-auto focus:outline-none rounded-md shadow-md shadow-zinc-300 dark:shadow-zinc-500"
            type="search"
            placeholder="search movies here"
            onChange={(e) => setSearchKey(e.target.value)}
            value={searchKey}
          />
        </span>
      </div>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 2xl:grid-cols-4">
        {MovieSearched.map((mv, key) => {
          return (
            <div key={key} className="my-3">
              <ShowMovie
                name={mv.name}
                img={mv.img}
                year={mv.year}
                trailer={mv.trailer}
                categories={mv.categories}
                tag={mv.tag}
              />
            </div>
          );
        })}
      </div>
      <div className="h-20"></div>
    </main>
  );
};

export default Movies;
