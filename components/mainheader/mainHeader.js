import Link from "next/link";
import logoImg from '@/assets/logo.png';
import classes from './mainHeader.module.css';
import MainHeaderBackground from "./mainHeaderBackground";
import NavLink from "./navLink";

export default function MainHeader({children}){
    return (
        <>
        <MainHeaderBackground/>
        <header className={classes.header}>
            <Link className={classes.logo} href="/"><img src={logoImg.src}/>NextLevel Food</Link>
            <nav className={classes.nav}>
                <ul>
                    <li><NavLink href="/meals">Browse Meals</NavLink></li>
                    <li><NavLink href="/community">Foodies Community</NavLink></li>
                </ul>
            </nav>
        </header>
        </>
    );
}