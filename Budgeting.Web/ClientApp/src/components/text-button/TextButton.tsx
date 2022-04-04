import React, { ReactNode } from 'react';
import './TextButton.scss';

interface Props {
  children: ReactNode;
  onClick: () => void;
}

function TextButton({ children, onClick }: Props) {
  return (
    <button className="TextButton" type="button" onClick={onClick}>
      {children}
    </button>
  );
}

export default TextButton;
