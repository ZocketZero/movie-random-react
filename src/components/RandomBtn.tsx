import { FC } from "react";

type RandomBtnInput = {
    onClick: Function;
}

const RandomBtn: FC<RandomBtnInput> = ({ onClick }) => {
    return (
        <button
            id="random-btn"
            onClick={() => onClick()}
            className="btn-primary text-base"
        >
            <span>🎲</span>
            <span>สุ่มภาพยนตร์</span>
        </button>
    );
}

export default RandomBtn;