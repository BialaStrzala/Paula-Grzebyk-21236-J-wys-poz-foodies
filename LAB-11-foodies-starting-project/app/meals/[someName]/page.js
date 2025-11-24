'use client'
import { usePathname, useParams } from 'next/navigation'

export default async function Home() {
    const pathname = usePathname()
    return (
      <main>
        <h1 style={{ color: 'white', textAlign: 'center' }}>
          MealDetails {pathname}
        </h1>
      </main>
    );
  }
  