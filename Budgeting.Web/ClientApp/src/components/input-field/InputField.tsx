import React, { ReactNode } from 'react';
import './InputField.scss';

interface InputFieldProps {
  children: ReactNode;
  label?: string;
}

function InputField({ children, label }: InputFieldProps) {
  return (
    <div className="form-group">
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
