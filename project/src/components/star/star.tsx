type StarPropsType = {
  count: number,
  onChange: ()=>void,
}

function Star(props:StarPropsType) {
  const {
    count,
    onChange,
  } = props;

  return (
    <>
      <input className="form__rating-input visually-hidden" name="rating" defaultValue={count} id={`${count}-stars`} type="radio" onChange={onChange} />
      <label htmlFor={`${count}-stars`} className="reviews__rating-label form__rating-label" title="perfect">
        <svg className="form__star-image" width={37} height={33}>
          <use xlinkHref="#icon-star" />
        </svg>
      </label>
    </>
  );
}

export default Star;
