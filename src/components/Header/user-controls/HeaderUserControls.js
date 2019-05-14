import React from 'react';
import PropTypes from 'prop-types';
import get from 'lodash/get';
import { Link } from 'react-router-dom';
import { Avatar, Menu, Dropdown, Icon } from 'antd';
import { ROUTES } from 'config/constants';
import lang from './lang.json';

export default class HeaderUserControls extends React.PureComponent {
  static propTypes = {
    logout: PropTypes.func,
    authState: PropTypes.object,
  };

  static defaultProps = {
    logout: Function.prototype,
    authState: {},
  };

  logOutClick = () => {
    this.props.logout();
  };

  renderMenu = (userId) => {
    const {
      EN: { viewTitle, editTitle, logoutTitle },
    } = lang;
    return (
      <Menu>
        <Menu.Item key="0">
          <Link to={`${ROUTES.USER_PROFILE}/${userId}`}>
            <Icon type="user" />
            {viewTitle}
          </Link>
        </Menu.Item>
        <Menu.Item key="1">
          <Link to={`${ROUTES.USER_PROFILE}/${userId}/edit`}>
            <Icon type="edit" />
            {editTitle}
          </Link>
        </Menu.Item>
        <Menu.Item key="2" onClick={this.logOutClick}>
          <Icon type="logout" />
          {logoutTitle}
        </Menu.Item>
      </Menu>
    );
  };

  render() {
    const { authState = {} } = this.props;
    const avatarUrl = get(authState, 'userInfo.avatarUrl');
    const userId = get(authState, 'userInfo.id');

    return (
      <Dropdown overlay={this.renderMenu(userId)} trigger={['click']} placement="bottomLeft">
        <Avatar src={avatarUrl} size={35} icon="user" style={{ cursor: 'pointer' }} />
      </Dropdown>
    );
  }
}
