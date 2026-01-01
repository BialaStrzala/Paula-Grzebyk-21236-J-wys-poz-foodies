'use client';

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import classes from './navLink.module.css';

export default function NavLink({href, children}){
    const path = usePathname();
    const router = useRouter();

    const handleClick = (e) => {
        if (href === '/meals') {
            e.preventDefault();
            router.refresh();
            router.push(href);
        }
    };

    return (
        <Link
            href={href}
            onClick={handleClick}
            className={
                path.startsWith(href) ? `${classes.link} ${classes.active}` : classes.link
            }>
            {children}
        </Link>
    );
}