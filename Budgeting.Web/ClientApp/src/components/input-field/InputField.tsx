import React, { ReactNode } from 'react';
import './InputField.scss';

interface Props {
  children: ReactNode;
  label?: string;
}

function InputField({ children, label }: Props) {
  return (
    <div className="InputField">
      {label && (
        <label className="label" htmlFor="input-field">
          {label}
        </label>
      )}
      {children}
    </div>
  );
}

InputField.defaultProps = {
  label: undefined,
};

export default InputField;
