import React from 'react';
import PropTypes from 'prop-types';
import { Button } from 'antd';
import { withCommonModals } from 'components/CommonModals';
import './header-controls.scss';
import lang from './lang.json';

@withCommonModals
export default class HeaderControls extends React.PureComponent {
  static propTypes = {
    showModal: PropTypes.func,
  };

  static defaultProps = {
    showModal: Function.prototype,
  };

  showLoginModal = () => {
    this.props.showModal('login');
  };

  showSignUpModal = () => {
    this.props.showModal('sign-up');
  };

  render() {
    const {
      EN: { loginTitle, signTitle },
    } = lang;
    return (
      <div className="header-controls">
        <Button type="primary" onClick={this.showLoginModal}>
          {loginTitle}
        </Button>
        <Button type="primary" onClick={this.showSignUpModal}>
          {signTitle}
        </Button>
      </div>
    );
  }
}
