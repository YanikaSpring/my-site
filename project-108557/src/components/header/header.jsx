import React from 'react';
import {Link} from 'react-router-dom';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {AuthorizationStatus} from '../../constants';
import {logout} from '../../store/user/operations';
import {AppRoute} from '../../constants';
import {getAuthStatusSelector, getUserInfoSelector} from '../../store/user/selectors';
import {userInfoPropTypes} from '../../prop-types';

const Header = ({authorizationStatus, userInfo, onLogoutClick}) => {
  let isAuthorized = false;
  let user = `Sign In`;
  if (authorizationStatus === AuthorizationStatus.AUTH) {
    user = userInfo.email;
    isAuthorized = true;
  }

  const handleLogoutClick = (evt) => {
    evt.preventDefault();
    onLogoutClick();
  };

  return (
    <header className="header">
      <div className="container">
        <div className="header__wrapper">
          <div className="header__left">
            <Link className="header__logo-link" to={AppRoute.MAIN}>
              <img className="header__logo" src="img/logo.svg" alt="6 cities logo" width="81" height="41" />
            </Link>
          </div>
          <nav className="header__nav">
            <ul className="header__nav-list">
              <li className="header__nav-item user">
                <Link className="header__nav-link header__nav-link--profile" to={AppRoute.FAVORITES}>
                  <div className="header__avatar-wrapper user__avatar-wrapper"></div>
                  <span className="header__user-name user__name">{user}</span>
                </Link>
                {isAuthorized &&
                  <button className="button" onClick={handleLogoutClick}>
                    <p>Logout</p>
                  </button>
                }
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </header>
  );
};

Header.propTypes = {
  authorizationStatus: PropTypes.string.isRequired,
  userInfo: userInfoPropTypes,
  onLogoutClick: PropTypes.func.isRequired
};

const mapStateToProps = (state) => ({
  authorizationStatus: getAuthStatusSelector(state),
  userInfo: getUserInfoSelector(state),
});

const mapDispatchToProps = (dispatch) => ({
  onLogoutClick() {
    dispatch(logout());
  }
});


export {Header};
export default connect(mapStateToProps, mapDispatchToProps)(Header);
