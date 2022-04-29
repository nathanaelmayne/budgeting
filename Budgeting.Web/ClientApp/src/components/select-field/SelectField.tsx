import React, { ReactNode } from 'react';
import './SelectField.scss';

interface Props {
  children: ReactNode;
  label?: string;
}

function SelectField({ children, label }: Props) {
  return (
    <div className="SelectField">
      {label && (
        <label className="label" htmlFor="select-field">
          {label}
        </label>
      )}
      {children}
    </div>
  );
}

SelectField.defaultProps = {
  label: undefined,
};

export default SelectField;
