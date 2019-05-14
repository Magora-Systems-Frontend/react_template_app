import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { ROUTES } from 'config/constants';
import { logout } from 'pages/App/actions';
import HeaderControls from './controls/HeaderControls';
import HeaderUserControls from './user-controls/HeaderUserControls';
import lang from './lang.json';
import './header.scss';

@connect(
  mapStateToProps,
  mapDispatchToProps
)
class Header extends React.PureComponent {
  static propTypes = {
    authState: PropTypes.object,
    logout: PropTypes.func,
  };

  renderControls = () => {
    const { authState = {}, logout } = this.props;

    if (authState.isAuth) {
      return <HeaderUserControls logout={logout} authState={authState} />;
    }

    return <HeaderControls />;
  };

  render() {
    return (
      <header className="header">
        <div className="full-width header__container">
          <Link to={ROUTES.HOME_PAGE} className="header__left-side">
            <div className="header__logo">
              <img className="header__logo-img" src="/assets/images/logo.svg" alt="logo" />
              <span className="header__logo-text">{lang.EN.headerTitle}</span>
            </div>
          </Link>

          <div className="header__right-side">{this.renderControls()}</div>
        </div>
      </header>
    );
  }
}

function mapStateToProps(store = {}) {
  const { global = {} } = store;
  const { authState = {} } = global;
  return { authState };
}

function mapDispatchToProps(dispatch) {
  return {
    logout: bindActionCreators(logout, dispatch),
  };
}

export { Header };
