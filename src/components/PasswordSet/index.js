import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { SubmissionError } from 'redux-form';
import { connect } from 'react-redux';
import { passwordSet } from 'pages/App/actions';
import { FormWrapper } from 'components/FormWrapper';
import { PasswordSetForm } from './form';

import lang from './lang.json';

class PasswordSetComponent extends PureComponent {
  static propTypes = {
    dispatch: PropTypes.func,
  };

  static defaultProps = {
    dispatch: Function.prototype,
  };

  onSubmit = async (values) => {
    const res = await passwordSet(values, this.props.dispatch);
    if (!res) {
      throw new SubmissionError({ newPassword: lang.errors.network_error });
    }

    if (res.status === 401) {
      throw new SubmissionError({ newPassword: lang.errors.invalid_pass });
    } else if (res.status !== 200) {
      throw new SubmissionError({ newPassword: lang.errors.unknown_server });
    }
  };

  render() {
    return (
      <FormWrapper>
        <PasswordSetForm onSubmit={this.onSubmit} />
      </FormWrapper>
    );
  }
}

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
  };
}

export const PasswordSet = connect(
  null,
  mapDispatchToProps
)(PasswordSetComponent);
