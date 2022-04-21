import { Component, ReactNode } from 'react';
import ReactDOM from 'react-dom';
import './Modal.scss';

interface Props {
  children: ReactNode;
  onClose: () => void;
}

class Modal extends Component<Props> {
  modalRoot = document.getElementById('overlay-root') as HTMLElement;

  backdropRoot = document.getElementById('backdrop-root') as HTMLElement;

  modalElement: HTMLElement = document.createElement('div');

  backdropElement: HTMLElement = document.createElement('div');

  componentDidMount() {
    this.appendElements();
  }

  componentWillUnmount() {
    this.removeElements();
  }

  handleCloseModal = () => {
    const { onClose } = this.props;
    onClose();
  };

  appendElements() {
    this.modalRoot.appendChild(this.modalElement);
    this.backdropRoot.appendChild(this.backdropElement);
    this.backdropRoot.addEventListener('click', this.handleCloseModal, false);
  }

  removeElements() {
    this.modalRoot.removeChild(this.modalElement);
    this.backdropRoot.removeChild(this.backdropElement);
    this.backdropRoot.removeEventListener(
      'click',
      this.handleCloseModal,
      false,
    );
  }

  render() {
    const { children } = this.props;
    this.modalElement.className = 'Modal';
    this.backdropElement.className = 'backdrop';
    return ReactDOM.createPortal(children, this.modalElement);
  }
}

export default Modal;
