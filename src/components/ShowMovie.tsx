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
    const [showTrailer, setShowTrailer] = useState(false)
    return <div className="md:whitespace-nowrap overflow-hidden text-center text-slate-800 dark:text-slate-200 flex items-center flex-col">
        <a target={"_blank"} className="hover:underline" title="คลิกเพื่อค้นหาใน google" href={`https://www.google.co.th/search?q=${name}`}>
            <h3 className="text-2xl sm:text-lg">{name}</h3>
        </a>
        <h4>ฉายเมื่อปี ค.ศ. {year}</h4>
        {showTrailer ?
            <div className="my-3 max-w-screen-md">
                <iframe className="sm:w-[560px] sm:h-[315px]" src={trailer + '?autoplay=1'} title="YouTube video player" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowFullScreen></iframe>
            </div>
            :
            <a target={"_blank"} href={`https://www.google.co.th/search?q=${name}`}>
                <div className="w-64 text-center rounded overflow-hidden shadow-smooth dark:shadow-md shadow-pink-300 border-2 border-l-pink-400 border-b-pink-400 border-r-emerald-400 border-t-emerald-400 duration-300 dark:border-white transition-all">
                    <img className="w-full" src={img} alt={`${name} image`} title={categories} />
                </div>
            </a>
        }
        {
            trailer.length > 0 &&
            <div className="my-1 hover:underline cursor-pointer" onClick={() => setShowTrailer(!showTrailer)}>
                {showTrailer ? "ซ่อนตัวอย่างภาพยนตร์" : "แสดงตัวอย่างภาพยนตร์"}
            </div>
        }
    </div>
}

export default ShowMovie;
