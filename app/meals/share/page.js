import classes from './page.module.css';
import { submitMeal } from '@/lib/meals';
import { put } from '@vercel/blob';
import { redirect } from 'next/navigation';

export default function ShareMealPage() {

  async function submitForm(formData){
    'use server'
    
    const file = formData.get('file');
    let imageUrl = '/images/burger.jpg';
    
    if (file && file.size > 0) {
      // Vercel Blob
      const blob = await put(file.name, file, { access: 'public' });
      imageUrl = blob.url;
    }
    
    const title = formData.get('title');
    const slug = title.toLowerCase().replace(/[^a-z0-9]/g, '-').replace(/-+/g, '-').replace(/^-|-$/g, '');
    
    const rawFormData = {
      title: title,
      slug: slug,
      image: imageUrl,
      summary: formData.get('summary'),
      instructions: formData.get('instructions'),
      creator: formData.get('name'),
      creator_email: formData.get('email')
    }
    
    await submitMeal(rawFormData);
    console.log('Meal submitted successfully');
    redirect('/meals');
  }

  return (
    <>
      <header className={classes.header}>
        <h1>
          Share your <span className={classes.highlight}>favorite meal</span>
        </h1>
        <p>Or any other meal you feel needs sharing!</p>
      </header>
      <main className={classes.main}>
        <form className={classes.form} method='post' action={submitForm} encType="multipart/form-data">
          <div className={classes.row}>
            <p>
              <label htmlFor="name">Your name</label>
              <input type="text" id="name" name="name" required />
            </p>
            <p>
              <label htmlFor="email">Your email</label>
              <input type="email" id="email" name="email" required />
            </p>
          </div>
          <p>
            <label htmlFor="title">Title</label>
            <input type="text" id="title" name="title" required />
          </p>
          <p>
            <label htmlFor="summary">Short Summary</label>
            <input type="text" id="summary" name="summary" required />
          </p>
          <p>
            <label htmlFor="instructions">Instructions</label>
            <textarea
              id="instructions"
              name="instructions"
              rows="10"
              required
            ></textarea>
          </p>
          <p>
            <label htmlFor="file">Meal Image</label>
            <input type="file" id="file" name="file" accept="image/*" required />
          </p>
          <p className={classes.actions}>
            <button type="submit">Share Meal</button>
          </p>
        </form>
      </main>
    </>
  );
}
