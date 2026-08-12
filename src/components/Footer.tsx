import { FC } from "react";
import { Link } from "react-router-dom";
import GithubIcon from "./GithubIcon";

const Footer: FC = () => {
    return (
        <footer>
            <div className="footer-bar">
                <Link to="/movies" id="all-movies-link">
                    <span className="nav-btn">
                        <span>🎬</span>
                        <span>ภาพยนตร์ทั้งหมด</span>
                    </span>
                </Link>
                <GithubIcon />
            </div>
        </footer>
    );
}

export default Footer;