import React from 'react';
import PropTypes from 'prop-types';
import {Route, Redirect} from 'react-router-dom';
import {connect} from 'react-redux';
import {AuthorizationStatus, AppRoute} from '../../constants';
import {getAuthStatusSelector} from '../../store/user/selectors';

const PrivateRoute = ({render, path, exact, authorizationStatus}) => {
  const isAuthorized = authorizationStatus === AuthorizationStatus.AUTH;

  return (
    <Route
      path={path}
      exact={exact}
      render={() => {
        return (
          isAuthorized
            ? render()
            : <Redirect to={AppRoute.LOGIN} />
        );
      }}
    />
  );
};

PrivateRoute.propTypes = {
  authorizationStatus: PropTypes.string.isRequired,
  exact: PropTypes.bool.isRequired,
  path: PropTypes.string.isRequired,
  render: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  authorizationStatus: getAuthStatusSelector(state),
});


export {PrivateRoute};
export default connect(mapStateToProps)(PrivateRoute);
