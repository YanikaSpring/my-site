import React, {useRef} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {Redirect} from 'react-router-dom';
import {login} from '../../store/user/operations';
import {getAuthStatusSelector} from '../../store/user/selectors';
import {AuthorizationStatus, AppRoute} from '../../constants';

import Header from '../header/header';

const LoginScreen = (props) => {
  const {onSubmitAuthInfo, authorizationStatus} = props;

  const loginRef = useRef();
  const passwordRef = useRef();
  const isAuthorized = authorizationStatus === AuthorizationStatus.AUTH;

  const handleSubmit = (evt) => {
    evt.preventDefault();

    onSubmitAuthInfo({
      email: loginRef.current.value,
      password: passwordRef.current.value,
    });
  };

  if (isAuthorized) {
    return <Redirect to={AppRoute.MAIN} />;
  }

  return (
    <div className="page page--gray page--login">
      <Header />

      <main className="page__main page__main--login">
        <div className="page__login-container container">
          <section className="login">
            <h1 className="login__title">Sign in</h1>
            <form className="login__form form" action="#" method="post" onSubmit={handleSubmit}>
              <div className="login__input-wrapper form__input-wrapper">
                <label
                  className="visually-hidden"
                  type="email"
                  name="email"
                  placeholder="Email"
                  required={true}
                >E-mail</label>
                <input className="login__input form__input" type="email" name="email" placeholder="Email" required="" ref={loginRef} />
              </div>
              <div className="login__input-wrapper form__input-wrapper">
                <label className="visually-hidden">Password</label>
                <input
                  className="login__input form__input"
                  type="password"
                  name="password"
                  placeholder="Password"
                  required={true}
                  ref={passwordRef}
                />
              </div>
              <button className="login__submit form__submit button" type="submit">Sign in</button>
            </form>
          </section>
          <section className="locations locations--login locations--current">
            <div className="locations__item">
              <a className="locations__item-link" href="#">
                <span>Amsterdam</span>
              </a>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
};

LoginScreen.propTypes = {
  onSubmitAuthInfo: PropTypes.func.isRequired,
  authorizationStatus: PropTypes.string.isRequired,
};

const mapStateToProps = (state) => ({
  authorizationStatus: getAuthStatusSelector(state),
});


const mapDispatchToProps = (dispatch) => ({
  onSubmitAuthInfo(authData) {
    dispatch(login(authData));
  }
});

export {LoginScreen};
export default connect(mapStateToProps, mapDispatchToProps)(LoginScreen);
