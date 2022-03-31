import {useState, ChangeEvent, FormEvent} from 'react';
import {toast} from 'react-toastify';
import {submitComment} from '../../store/api-actions';
import {useAppDispatch} from '../../hooks/';
import Star from '../star/star';
import {STAR_NUMBER_ARR, COMMENTS_LENGTH_MIN, COMMENTS_LENGTH_MAX} from '../../constants/constants';

const initialState = {
  stars: 0,
  comment: '',
  msg: '',
};

type FormPropsType = {
  hotelId: number | undefined,
}

function Form(props: FormPropsType): JSX.Element {

  const {hotelId} = props;
  const [form, setForm] = useState(initialState);
  const dispatch = useAppDispatch();

  function isReadyForSend(): boolean {
    return form.stars > 0 &&
      form.comment.length > COMMENTS_LENGTH_MIN &&
      form.comment.length < COMMENTS_LENGTH_MAX;
  }

  function checkError() {
    let errorMsg = '';

    if(form.stars === 0) {
      errorMsg += 'Set rating. ';
    }

    if(form.comment.length < COMMENTS_LENGTH_MIN) {
      errorMsg += `Comments length less then ${COMMENTS_LENGTH_MIN}`;
    }

    if(form.comment.length > 300) {
      errorMsg += `Comments length more then ${COMMENTS_LENGTH_MAX}`;
    }

    if(errorMsg) {
      toast.error(errorMsg);
    }
  }

  function handleStar(starCount: number): void {
    setForm({...form, stars: starCount});
  }

  function handleTextarea(e: ChangeEvent<HTMLTextAreaElement>): void {
    const comment = e.target.value;
    setForm({...form, comment: comment});
  }

  function handleSubmit(e: FormEvent<HTMLFormElement>): void {
    e.preventDefault();

    const cb = () => {
      setForm(initialState);
    };

    if(isReadyForSend()) {
      if(typeof hotelId === 'number') {
        dispatch(
          submitComment({
            comment: form.comment,
            rating: form.stars,
            hotelId,
            cb,
          }),
        );
      }
    }
  }

  function onMouseEnter() {
    checkError();
  }

  function onMouseLeave() {
    setForm({...form, msg: ''});
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

      <div className="reviews__button-wrapper"
        onMouseEnter={onMouseEnter}
        onMouseLeave={onMouseLeave}
      >
        <p className="reviews__help">
          To submit review please make sure to set <span className="reviews__star">rating</span> and describe your stay with at least <b className="reviews__text-amount">50 characters</b>.
        </p>
        <button className="reviews__submit form__submit button" type="submit" disabled={!isReadyForSend()}>Submit</button>
      </div>
    </form>
  );
}

export default Form;
