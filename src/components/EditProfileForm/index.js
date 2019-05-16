import React from 'react';
import PropTypes from 'prop-types';
import { message } from 'antd';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { updateProfile } from 'pages/App/actions';
import { FormWrapper } from 'components/FormWrapper';
import { EditProfileForm } from './form';
import lang from './lang.json';

@connect(
  mapStateToProps,
  mapDispatchToProps
)
export class EditProfile extends React.PureComponent {
  onSubmit = (values) => {
    const { userInfo } = this.props;
    const {
      EN: { messages },
    } = lang;

    let avatarUrl = userInfo.avatarUrl;

    const { photo = {} } = values;
    const { fileList = [] } = photo;
    if (fileList.length) {
      avatarUrl = fileList[0].thumbUrl;
    }
    this.props.updateProfile({
      ...values,
      avatarUrl,
    });

    window.scrollTo(0, 0);
    message.success(messages.success);
  };

  render() {
    const { userInfo } = this.props;

    return (
      <FormWrapper>
        <EditProfileForm
          onSubmit={this.onSubmit}
          initialValues={{
            lastName: userInfo.lastName || '',
            firstName: userInfo.firstName || '',
            patronymic: userInfo.patronymic || '',
            userName: userInfo.userName || '',
            date: userInfo.date || '',
            gender: userInfo.gender || '',
          }}
        />
      </FormWrapper>
    );
  }
}

function mapStateToProps({ global }) {
  const { authState = {} } = global;
  const { userInfo = {} } = authState;
  return {
    userInfo,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    updateProfile: bindActionCreators(updateProfile, dispatch),
  };
}

EditProfile.propTypes = {
  userInfo: PropTypes.object,
  updateProfile: PropTypes.func,
};
