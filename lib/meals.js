import { createClient } from '@libsql/client';

const turso = createClient({
  url: process.env.TURSO_DATABASE_URL,
  authToken: process.env.TURSO_AUTH_TOKEN,
});

export async function getMeals(){
    await new Promise((resolve) => setTimeout(resolve, 2000));
    const result = await turso.execute('SELECT * FROM meals');
    return result.rows;
}

export async function getMeal(slug){
    const result = await turso.execute({
        sql: 'SELECT * FROM meals WHERE slug = ?',
        args: [slug]
    });
    return result.rows[0];
}

export async function submitMeal(meal){
    await new Promise((resolve) => setTimeout(resolve, 2000));
    try{
        await turso.execute({
            sql: 'INSERT INTO meals VALUES (null, ?, ?, ?, ?, ?, ?, ?)',
            args: [meal.slug, meal.title, meal.image, meal.summary, meal.instructions, meal.creator, meal.creator_email]
        });
    }
    catch{
        throw new Error('insert db failed');
    }
}