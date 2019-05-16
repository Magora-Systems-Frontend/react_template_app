import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { reduxForm, propTypes, Field } from 'redux-form';
import { TextField } from 'components/FormFields';

import { Icon, Button, Form, Tooltip } from 'antd';

import { validateInput, validationTypes } from 'lib/validation';

import lang from '../lang.json';

const validate = (values) => {
  const errors = {};

  if (!values.email) {
    errors.email = lang.errors.required_field;
  } else {
    if (!validateInput(validationTypes.EMAIL, values.email)) {
      errors.email = lang.errors.invalid_email;
    }
  }

  return errors;
};

class PasswordRecoveryFormComponent extends PureComponent {
  static propTypes = {
    ...propTypes,
    isLoading: PropTypes.bool,
    handleSubmit: PropTypes.func,
  };

  static defaultProps = {
    isLoading: false,
    handleSubmit: Function.prototype,
  };

  render() {
    const { handleSubmit } = this.props;

    return (
      <form onSubmit={handleSubmit}>
        <Field
          name="email"
          type="email"
          placeholder={lang.EN.email}
          component={TextField}
          prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
          suffix={
            <Tooltip title="test@email.com">
              <Icon type="info-circle" style={{ color: 'rgba(0,0,0,.45)' }} />
            </Tooltip>
          }
        />

        <Form.Item style={{ margin: '0' }}>
          <Button
            type="primary"
            htmlType="submit"
            className="recovery-password-form-button"
            style={{ width: '100%' }}
            loading={this.props.isLoading}
            icon="login">
            {lang.EN.btn}
          </Button>
        </Form.Item>
      </form>
    );
  }
}

export const PasswordRecoveryForm = reduxForm({
  form: 'passwordRecovery',
  validate,
})(PasswordRecoveryFormComponent);
