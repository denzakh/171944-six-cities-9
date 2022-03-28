import {useState, ChangeEvent, FormEvent} from 'react';
import {submitComment} from '../../store/api-actions';
import {useAppDispatch} from '../../hooks/';
import Star from '../star/star';
import {STAR_NUMBER_ARR} from '../../constants/constants';

const initialState = {
  stars: 0,
  comment: '',
};

type FormPropsType = {
  hotelId: string | undefined,
}

function Form(props: FormPropsType): JSX.Element {

  const {hotelId} = props;
  const [form, setForm] = useState(initialState);
  const dispatch = useAppDispatch();

  function handleStar(starCount: number): void {
    setForm({stars: starCount, comment: form.comment});
  }

  function handleTextarea(e: ChangeEvent<HTMLTextAreaElement>): void {
    const comment = e.target.value;
    setForm({stars: form.stars, comment: comment});
  }

  function handleSubmit(e: FormEvent<HTMLFormElement>): void {
    e.preventDefault();

    const cb = () => {
      setForm(initialState);
    };

    if(typeof hotelId === 'string') {
      dispatch(
        submitComment({
          comment: form.comment,
          rating: form.stars,
          hotelId: hotelId,
          cb: cb,
        }),
      );
    }
  }

  return (
    <form className="reviews__form form" action="#" method="post" onSubmit={handleSubmit}>
      <label className="reviews__label form__label" htmlFor="review">Your review</label>
      <div className="reviews__rating-form form__rating">
        {STAR_NUMBER_ARR.map((starCount)=>(
          <Star
            key={starCount}
            count={starCount}
            onChange={()=>{handleStar(starCount);}}
            checked={starCount === form.stars}
          />
        ))}
      </div>
      <textarea
        className="reviews__textarea form__textarea"
        id="review"
        name="review"
        placeholder="Tell how was your stay, what you like and what can be improved"
        onChange={handleTextarea}
        value={form.comment}
      />

      <div className="reviews__button-wrapper">
        <p className="reviews__help">
          To submit review please make sure to set <span className="reviews__star">rating</span> and describe your stay with at least <b className="reviews__text-amount">50 characters</b>.
        </p>
        <button className="reviews__submit form__submit button" type="submit" disabled={form.comment.length === 0}>Submit</button>
      </div>
    </form>
  );
}

export default Form;
