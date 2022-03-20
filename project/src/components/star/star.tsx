type StarPropsType = {
  count: number,
  onChange: ()=>void,
  checked: true | false,
}

function Star(props:StarPropsType) {

  const {
    count,
    onChange,
    checked,
  } = props;

  return (
    <>
      <input
        className="form__rating-input visually-hidden"
        name="rating"
        id={`${count}-stars`}
        type="radio"
        onChange={onChange}
        checked={checked}
        value={count}
      />
      <label htmlFor={`${count}-stars`} className="reviews__rating-label form__rating-label" title="perfect">
        <svg className="form__star-image" width={37} height={33}>
          <use xlinkHref="#icon-star" />
        </svg>
      </label>
    </>
  );
}

export default Star;
