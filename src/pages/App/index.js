import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import PT from 'prop-types';
import { loadStore, KEYS } from 'utils/localStorage';
//
import MainMenu from 'components/MainMenu';
import { Header } from 'components/Header';
import { CommonModals } from 'components';
import { setAuthState } from './actions';
import { Wrapper } from './index.styled';

@connect(
  mapStateToProps,
  mapDispatchToProps
)
export class App extends React.PureComponent {
  static propTypes = {
    children: PT.element.isRequired,
    setAuthState: PT.func,
  };

  static defaultProps = {
    children: '',
    setAuthState: Function.prototype,
  };

  componentDidMount() {
    this.props.setAuthState(loadStore(KEYS.AUTH));
  }

  render() {
    const { route } = this.props;

    return (
      <Wrapper>
        <Header />
        <CommonModals />
        <MainMenu style={{ textAlign: 'center' }} route={route} />
        {this.props.children}
        {/* Here could be header / footer / static blocks and etc */}
      </Wrapper>
    );
  }
}

function mapStateToProps(store = {}) {
  const { route } = store;
  return { route };
}

function mapDispatchToProps(dispatch) {
  return {
    setAuthState: bindActionCreators(setAuthState, dispatch),
  };
}
