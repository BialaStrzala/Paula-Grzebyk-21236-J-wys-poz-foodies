import sql from 'better-sqlite3';
const db = sql('meals.db');

export async function getMeals(){
    await new Promise((resolve) => setTimeout(resolve, 2000));
    return db.prepare('SELECT * FROM meals').all();
}

export function getMeal(slug){
    return db.prepare('SELECT * FROM meals WHERE slug = ?').get(slug);
}

export async function submitMeal(meal){
    await new Promise((resolve) => setTimeout(resolve, 2000));
    try{
        const stmt = db.prepare('INSERT INTO MEALS VALUES (null, @slug, @title, @image, @summary, @instructions, @creator, @creator_email)');
        stmt.run(meal);
    }
    catch{
        throw new Error('insert db failed');
    }
}