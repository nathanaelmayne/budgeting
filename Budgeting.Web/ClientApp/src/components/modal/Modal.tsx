import React, { Component, ReactNode } from 'react';
import ReactDOM from 'react-dom';
import './Modal.scss';

interface Props {
  children: ReactNode;
}

class Modal extends Component<Props> {
  modalRoot = document.getElementById('overlay-root') as HTMLElement;

  backdropRoot = document.getElementById('backdrop-root') as HTMLElement;

  modalElement: HTMLElement = document.createElement('div');

  backdropElement: HTMLElement = document.createElement('div');

  componentDidMount() {
    this.modalRoot.appendChild(this.modalElement);
    this.backdropRoot.appendChild(this.backdropElement);
  }

  componentWillUnmount() {
    this.modalRoot.removeChild(this.modalElement);
    this.backdropRoot.removeChild(this.backdropElement);
  }

  render() {
    const { children } = this.props;
    this.modalElement.className = 'Modal';
    return (
      <>
        {ReactDOM.createPortal(
          <div className="Backdrop" />,
          this.backdropElement,
        )}
        {ReactDOM.createPortal(children, this.modalElement)}
      </>
    );
  }
}

export default Modal;
