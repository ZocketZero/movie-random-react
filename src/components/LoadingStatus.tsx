import { FC } from "react";

type LoadingStatusInput = {
    loadState: number;
}

const LoadingStatus: FC<LoadingStatusInput> = ({ loadState }) => {
    return (
        <div className="flex flex-col items-center gap-3 fade-up">
            <div className="progress-track">
                <div className="progress-fill" style={{ width: `${loadState}%` }} />
            </div>
            <p className="text-sm font-medium text-slate-500 dark:text-slate-400 tabular-nums">
                กำลังประมวลผล&nbsp;
                <span className="text-indigo-500 dark:text-indigo-400 font-semibold">
                    {loadState}%
                </span>
            </p>
        </div>
    );
}

export default LoadingStatus;