import './page404.css';

function Page404(): JSX.Element {

  return (
    <div className="page404__page">
      <div className="container">
        <h1>Error 404</h1>
        <p>Page not found.&nbsp;</p>
        <p>
          <a href="/" className="page404__link">
            Go to main
          </a>
        </p>
      </div>
    </div>
  );
}

export default Page404;
