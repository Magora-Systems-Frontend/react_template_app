import React from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators, compose } from 'redux';
import { connect } from 'react-redux';
import { getUserProfile } from './actions';

import lang from './lang.json';

import './user.scss';

const mapStateToProps = ({ userState }) => ({
  userState,
});

const mapDispatchToProps = (dispatch) => ({
  getUserProfile: bindActionCreators(getUserProfile, dispatch),
});

@connect(
  mapStateToProps,
  mapDispatchToProps
)
export default class UserProfilePage extends React.PureComponent {
  static propTypes = {
    match: PropTypes.object,
    userState: PropTypes.object,
    getUserProfile: PropTypes.func,
  };

  static defaultProps = {
    match: {},
    userState: {},
    getUserProfile: Function.prototype,
  };

  async componentDidMount() {
    const { match } = this.props;
    const { params } = match;
    const { id: userId } = params;
    await this.props.getUserProfile(userId);
  }

  render() {
    const { userState } = this.props;
    const { payload = {} } = userState;
    return (
      <div className="user">
        <div className="user__logo-container">
          <img className="user__logo-container_img" src={payload.avatarUrl} alt="" />
          <div className="user__logo-container_name">
            {payload.firstName} {payload.lastName}
          </div>
        </div>
        <div className="user__text-container">
          <div className="user__text-container_item">
            <div className="title">{lang.EN.firstName}:</div>
            <div className="text">{payload.firstName}</div>
          </div>
          <div className="user__text-container_item">
            <div className="title">{lang.EN.lastName}:</div>
            <div className="text">{payload.lastName}</div>
          </div>
          <div className="user__text-container_item">
            <div className="title">{lang.EN.userName}:</div>
            <div className="text">{payload.username}</div>
          </div>
          <div className="user__text-container_item">
            <div className="title">{lang.EN.email}:</div>
            <div className="text">{payload.email}</div>
          </div>
          <div className="user__text-container_item">
            <div className="title">{lang.EN.city}:</div>
            <div className="text">{payload.city}</div>
          </div>
        </div>
      </div>
    );
  }
}
