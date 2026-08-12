import { useState } from "react";
import { checkDarkFromLocal } from "./CheckTheme";

function ToggleMode() {
    const [isDark, setIsDark] = useState<boolean>(checkDarkFromLocal());

    function changeMode(): void {
        const html = window.document.documentElement;
        if (html.classList.contains("dark")) {
            html.classList.remove("dark");
            setIsDark(false);
        } else {
            html.classList.add("dark");
            setIsDark(true);
        }
    }

    return (
        <div className="fixed top-3 right-4 z-50">
            <button
                id="theme-toggle-btn"
                onClick={changeMode}
                className="theme-toggle"
                title={isDark ? "เปลี่ยนเป็นโหมดสว่าง" : "เปลี่ยนเป็นโหมดมืด"}
                aria-label="toggle color mode"
            >
                {isDark ? "🌞" : "🌚"}
            </button>
        </div>
    );
}

export default ToggleMode;