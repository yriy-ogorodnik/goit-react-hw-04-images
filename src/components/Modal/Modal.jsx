import css from './Modal.module.css';
import PropTypes from 'prop-types';
import { Component } from 'react';

class Modal extends Component {
  static propTypes = {
    onClose: PropTypes.func.isRequired,
    currentImageUrl: PropTypes.string.isRequired,
  };

  state = {};

  componentDidMount() {
    window.addEventListener('keydown', this.handlePressESC);
  }

  componentWillUnmount() {
    window.removeEventListener('keydown', this.handlePressESC);
  }

  handlePressESC = e => {
    console.log('object :>> ', e.keyCode);
    if (e.keyCode === 27) {
      this.props.onClose();
    }
  };

  handleBackdropClick = event => {
    if (event.currentTarget === event.target) {
      this.props.onClose();
    }
  };

  render() {
    console.log('this.props :>> ', this.props);
    return (
      <div className={css.Overlay} onClick={this.handleBackdropClick}>
        <div className={css.Modal}>
          <img src={this.props.currentImageUrl} alt="imge" />
        </div>
      </div>
    );
  }
}

export default Modal;
