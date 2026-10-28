import Link from "next/link";
import React from "react";
import s from './Header.module.scss';

export const Header: React.FC<{
    title: React.ReactNode;
    subtitle?: React.ReactNode;
    children?: React.ReactNode;
}> = ({ title, subtitle, children }) => {

    return <header className={s.header}>
        <div className={s.left}>
            <div className={s.sigil} aria-hidden>
                <span className={s.sigilRing} />
                <span className={s.sigilCore} />
            </div>
            <div className={s.titles}>
                <div className={s.wordmark}>NOOSCOPE</div>
                {title && <div className={s.title}>{title}</div>}
                {subtitle && <div className={s.subtitle}>{subtitle}</div>}
            </div>
        </div>

        <div className={s.right}>
            {children}
            <Link href={"/"} className={s.homeLink}>
                <span>Index</span>
                <svg width="9" height="9" viewBox="0 0 10 10" fill="none" aria-hidden>
                    <path d="M1 9L9 1M9 1H3.5M9 1V6.5" stroke="currentColor" strokeWidth="1.1" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
            </Link>
        </div>
    </header>;
};
