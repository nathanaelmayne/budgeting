import React, { useEffect, useState } from 'react';
import { Income } from '../../models/income.model';
import InputField from '../input-field/InputField';
import TextButton from '../text-button/TextButton';
import './IncomeForm.scss';

interface Props {
  // eslint-disable-next-line no-unused-vars
  handleIncomeSaved: (income: Income) => void;
  editingIncome?: Income;
}

function IncomeForm({ handleIncomeSaved, editingIncome }: Props) {
  const [name, setName] = useState<string>('');
  const [amount, setAmount] = useState<string>('');
  const [timestamp, setTimestamp] = useState<string>('');
  const [income, setIncome] = useState<Income>();
  const [editing, setEditing] = useState<boolean>(false);

  useEffect(() => {
    if (editingIncome) {
      setEditing(true);
      setName(editingIncome.name);
      setAmount(editingIncome.amount.toString());
      setTimestamp(editingIncome.timestamp.toString());
      setIncome(editingIncome);
    }
  }, []);

  useEffect(() => {
    if (!income || editing) {
      return;
    }
    handleIncomeSaved(income);
  }, [income]);

  function handleAddIncome() {
    setIncome({
      id: crypto.randomUUID(),
      name,
      amount: parseInt(amount, 10),
      timestamp,
    });
  }

  function handleEditIncome() {
    if (!income) return;

    const newIncome: Income = {
      id: income.id,
      name,
      amount: parseInt(amount, 10),
      timestamp,
    };

    setEditing(false);
    setIncome(newIncome);
  }

  return (
    <div className="IncomeForm">
      <InputField label="Name">
        <input
          defaultValue={name}
          type="text"
          onChange={(e) => setName(e.target.value)}
        />
      </InputField>

      <InputField label="Amount">
        <input
          defaultValue={amount}
          type="number"
          onChange={(e) => setAmount(e.target.value)}
        />
      </InputField>

      <InputField label="Date">
        <input
          defaultValue={timestamp}
          type="text"
          onChange={(e) => setTimestamp(e.target.value)}
        />
      </InputField>

      <div className="button-wrapper">
        {editing && (
          <TextButton onClick={() => handleEditIncome()}>
            Edit Income
          </TextButton>
        )}
        {!editing && (
          <TextButton onClick={() => handleAddIncome()}>Add Income</TextButton>
        )}
      </div>
    </div>
  );
}

IncomeForm.defaultProps = {
  editingIncome: undefined,
};

export default IncomeForm;
