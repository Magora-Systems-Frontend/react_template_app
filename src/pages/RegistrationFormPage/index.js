import React from 'react';
import PropTypes from 'prop-types';
import { Helmet } from 'react-helmet';
import injectReducer from 'utils/injectReducer';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { Registration } from 'components/RegistrationForm';
import { FormWrapper } from 'components/FormWrapper';
import reducer from '../HomePage/reducer';

const withReducer = injectReducer({ key: 'RegistrationFormPage', reducer });

@connect(
  mapStateToProps,
  mapDispatchToProps
)
@compose(withReducer)
export default class RegistrationFormPage extends React.PureComponent {
  static propTypes = {
    loading: PropTypes.bool,
    onSubmitForm: PropTypes.func,
  };

  static defaultProps = {
    loading: false,
    onSubmitForm: Function.prototype,
  };

  render() {
    return (
      <React.Fragment>
        <Helmet>
          <title>Registration</title>
          <meta name="description" content="User registration" />
        </Helmet>

        <FormWrapper>
          <Registration />
        </FormWrapper>
      </React.Fragment>
    );
  }
}

function mapStateToProps(state) {
  return {};
}

function mapDispatchToProps(dispatch) {
  return {};
}
