import React from 'react';
import InputField from '../input-field/InputField';

const [income, setIncome] = React.useState<number>(0);

function IncomeForm() {
  return (
    <div className="income-form">
      <div className="add-income-container">
        <InputField label="Income">
          <input
            defaultValue={income}
            type="number"
            onChange={(e) => setIncome(parseInt(e.target.value, 10))}
          />
        </InputField>
        <InputField label="Income">
          <input
            defaultValue={income}
            type="text"
            onChange={(e) => setIncome(parseInt(e.target.value, 10))}
          />
        </InputField>
      </div>
    </div>
  );
}

export default IncomeForm;
