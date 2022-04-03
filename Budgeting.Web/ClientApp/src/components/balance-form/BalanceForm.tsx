import React from 'react';
import InputField from '../input-field/InputField';

const [balance, setBalance] = React.useState<number>(0);

function BalanceForm() {
  return (
    <InputField label="Current Balance">
      <input
        defaultValue={balance}
        type="number"
        onChange={(e) => setBalance(parseInt(e.target.value, 10))}
      />
    </InputField>
  );
}

export default BalanceForm;
