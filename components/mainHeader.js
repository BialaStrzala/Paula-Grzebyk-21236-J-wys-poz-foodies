import Link from "next/link";
import logoImg from '@/assets/logo.png';
import styles from './mainHeader.module.css';
import MainHeaderBackground from "./mainHeaderBackground";

export default function MainHeader({children}){
    return (
        <>
        <MainHeaderBackground/>
        <header className={styles.header}>
            <Link className={styles.logo} href="/"><img src={logoImg.src}/></Link>
            <nav className={styles.nav}>
                <ul className={styles.ul}>
                    <li><Link href="/">Home</Link></li>
                    <li><Link href="/meals">Meals</Link></li>
                    <li><Link href="/community">Community</Link></li>
                </ul>
            </nav>
        </header>
        </>
    );
}