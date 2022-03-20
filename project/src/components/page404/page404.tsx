function Page404(): JSX.Element {

  return (
    <div className="page" style={{
      'padding': '50px 0',
      'minHeight': '90vh',
      'backgroundColor': 'transparent',
    }}
    >
      <div className="container">
        <h1>Ошибка 404</h1>
        <p>Страница не найдена.&nbsp;
          <a href="/" style={{
            'textDecoration': 'underline',
          }}
          >
            Перейти на главную
          </a>
        </p>
      </div>
    </div>
  );
}

export default Page404;
