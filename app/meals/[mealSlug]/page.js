import { getMeal } from '@/lib/meals';
import classes from './page.module.css';
import { Suspense } from 'react';
import Image from 'next/image';
import { notFound } from 'next/navigation';

export const dynamic = 'force-dynamic';

async function Meal({ slug }) {
  const meal = await getMeal(slug);

  if(!meal){
    return <p>Meal not found</p>;}

  return(
    <>
      <div className={classes.meal}>
        <header className={classes.header}>
          <div className={classes.image}>
          <Image src={meal.image} alt={meal.title} fill />
          </div>
          <div className={classes.headerText}>
            <h1>{meal.title}</h1>
            <a className={classes.creator} href="#">by {meal.creator} ({meal.creator_email})</a>
          </div>
        </header>

        <div className={classes.meal}>
          <p className={classes.summary}>{meal.summary}</p>
          <p className={classes.instructions}>{meal.instructions}</p>
        </div>
      </div>
    </>
  );
}

export default function Page({ params }){
  const slug = params.mealSlug;

  return (
    <main className={classes.main}>
      <Suspense fallback={<p className={classes.loading}>Fetching meal...</p>}>
        <Meal slug={slug} />
      </Suspense>
    </main>
  );
}
