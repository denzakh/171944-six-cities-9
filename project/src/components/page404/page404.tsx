import './page404.css';

function Page404(): JSX.Element {

  return (
    <div className="page404__page">
      <div className="container">
        <h1>Ошибка 404</h1>
        <p>Страница не найдена.&nbsp;</p>
        <p>
          <a href="/" className="page404__link">
            Перейти на главную
          </a>
        </p>
      </div>
    </div>
  );
}

export default Page404;
