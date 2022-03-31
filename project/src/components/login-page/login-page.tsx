import {Link} from 'react-router-dom';
import {useRef} from 'react';
import {toast} from 'react-toastify';
import LogoLink from '../logo-link/logo-link';
import {loginAction} from  '../../store/api-actions';
import {useAppDispatch} from '../../hooks/';
import cities from '../../constants/cities';

function LoginPage(): JSX.Element {

  const formRef = useRef(null);
  const dispatch = useAppDispatch();

  function getRandomCity() {
    const index = Math.floor(Math.random() * cities.length);
    return cities[index];
  }

  const randomCity = getRandomCity();

  const submitHandle = (e: React.SyntheticEvent<HTMLFormElement>): void => {
    e.preventDefault();
    const form = formRef.current;

    const EMAIL_ERROR = 'Email is not valid';
    const PASS_ERROR = 'Password is not valid';

    if(form) {
      const formData = new FormData(form);

      let email = formData.get('email');
      let passw = formData.get('password');

      const isEmail = (em: string): true | false => {
        if(
          em
            .toLowerCase()
            .includes('@')
        ) {
          return true;
        }

        toast.error(EMAIL_ERROR);
        return false;
      };

      const isPassword = (pass: string): true | false => {
        let msg = EMAIL_ERROR;

        if(
          /[\d]/.test(pass) &&
          /[A-Za-z]/.test(pass)
        ) {
          return true;
        }

        toast.error(PASS_ERROR);
        return false;
      }

      if(email && passw) {
        email = email.toString();
        passw = passw.toString();

        if(isEmail(email) && isPassword(passw)) {

          dispatch(
            loginAction({
              login: email,
              password: passw,
            }),
          );
        }
      }
    }
  };

  return (
    <div className="page page--gray page--login">
      <header className="header">
        <div className="container">
          <div className="header__wrapper">
            <div className="header__left">
              <LogoLink />
            </div>
          </div>
        </div>
      </header>
      <main className="page__main page__main--login">
        <div className="page__login-container container">
          <section className="login">
            <h1 className="login__title">Sign in</h1>
            <form className="login__form form" action="#" method="post" ref={formRef} onSubmit={submitHandle}>
              <div className="login__input-wrapper form__input-wrapper">
                <label className="visually-hidden">E-mail</label>
                <input className="login__input form__input" type="email" name="email" placeholder="Email" required />
              </div>
              <div className="login__input-wrapper form__input-wrapper">
                <label className="visually-hidden">Password</label>
                <input className="login__input form__input" type="password" name="password" placeholder="Password" required />
              </div>
              <button className="login__submit form__submit button" type="submit">Sign in</button>
            </form>
          </section>
          <section className="locations locations--login locations--current">
            <div className="locations__item">
              <Link className="locations__item-link" to={`/?city=${randomCity}`}>
                <span>{randomCity}</span>
              </Link>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}

export default LoginPage;
