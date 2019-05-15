import React from 'react';
// import PropTypes from 'prop-types';
import { Button, Icon, Modal, Upload } from 'antd';

export class FileFieldSimple extends React.PureComponent {
  static propTypes = {};

  state = {
    previewVisible: false,
    previewImage: '',
  };

  handleCancel = () => this.setState({ previewVisible: false });

  handlePreview = (file) => {
    this.setState({
      previewImage: file.url || file.thumbUrl,
      previewVisible: true,
    });
  };

  render() {
    const { previewVisible, previewImage } = this.state;

    const inputElement = Upload;

    return (
      <React.Fragment>
        {React.createElement(
          inputElement,
          { ...this.props, beforeUpload: () => false, onPreview: this.handlePreview, listType: 'picture-card' },
          React.createElement(Button, {}, React.createElement(Icon, { type: 'upload' }), 'Upload')
        )}
        <Modal visible={previewVisible} footer={null} onCancel={this.handleCancel}>
          <img alt="example" style={{ width: '100%' }} src={previewImage} />
        </Modal>
      </React.Fragment>
    );
  }
}
