import { Component, ReactNode } from 'react';
import ReactDOM from 'react-dom';
import './Modal.scss';

interface Props {
  children: ReactNode;
}

class Modal extends Component<Props> {
  modalRoot = document.getElementById('overlay-root') as HTMLElement;

  modalElement: HTMLElement = document.createElement('div');

  componentDidMount() {
    this.modalRoot.appendChild(this.modalElement);
  }

  componentWillUnmount() {
    this.modalRoot.removeChild(this.modalElement);
  }

  render() {
    const { children } = this.props;
    this.modalElement.className = 'Modal';
    return ReactDOM.createPortal(children, this.modalElement);
  }
}

export default Modal;
