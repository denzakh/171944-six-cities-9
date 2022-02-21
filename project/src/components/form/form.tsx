import {useState, ChangeEvent, FormEvent} from 'react';
import Star from '../star/star';

function Form() {

  const initialState = {
    stars: 0,
    comment: '',
  };

  const [form, setForm] = useState(initialState);

  function handleStar(starCount:number):void {
    setForm({stars: starCount, comment: form.comment});
  }

  function handleTextarea(e:ChangeEvent<HTMLTextAreaElement>):void {
    const comment = e.target.value;
    setForm({stars: form.stars, comment: comment});
  }

  function handleSubmit(e:FormEvent<HTMLFormElement>):void {
    e.preventDefault();
    // const target = e.target as HTMLFormElement;
    // const formData = new FormData(target);
  }

  function isDisabled() {
    return Boolean(!form.comment);
  }

  return (
    <form className="reviews__form form" action="#" method="post" onSubmit={handleSubmit}>
      <label className="reviews__label form__label" htmlFor="review">Your review</label>
      <div className="reviews__rating-form form__rating">
        {[5,4,3,2,1].map((starCount)=>(
          <Star key={starCount} count={starCount} onChange={()=>{handleStar(starCount);}} />
        ))}
      </div>
      <textarea className="reviews__textarea form__textarea" id="review" name="review" placeholder="Tell how was your stay, what you like and what can be improved" defaultValue={''} onChange={handleTextarea} />
      <div className="reviews__button-wrapper">
        <p className="reviews__help">
          To submit review please make sure to set <span className="reviews__star">rating</span> and describe your stay with at least <b className="reviews__text-amount">50 characters</b>.
        </p>
        <button className="reviews__submit form__submit button" type="submit" disabled={isDisabled()}>Submit</button>
      </div>
    </form>
  );
}

export default Form;
