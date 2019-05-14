import React, { PureComponent } from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { PasswordSet } from 'components';
import injectReducer from '../../utils/injectReducer';
import reducer from '../HomePage/reducer';

const withReducer = injectReducer({ key: 'PasswordSetPage', reducer });

@connect(
  mapStateToProps,
  mapDispatchToProps
)
@compose(withReducer)
class PasswordSetPage extends PureComponent {
  render() {
    return <PasswordSet />;
  }
}

function mapStateToProps(state) {
  return {};
}

function mapDispatchToProps(dispatch) {
  return {};
}

export default PasswordSetPage;
