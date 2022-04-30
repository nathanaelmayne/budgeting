import React, { useEffect, useState } from 'react';
import TransactionType from '../../enums/transaction-type.enum';
import { Transaction } from '../../models/transaction.model';
import InputField from '../input-field/InputField';
import SelectField from '../select-field/SelectField';
import TextButton from '../text-button/TextButton';
import './TransactionForm.scss';

interface Props {
  // eslint-disable-next-line no-unused-vars
  handleTransactionSaved: (transaction: Transaction) => void;
  editingTransaction?: Transaction;
}

function TransactionForm({ handleTransactionSaved, editingTransaction }: Props) {
  const [name, setName] = useState<string>('');
  const [amount, setAmount] = useState<string>('');
  const [timestamp, setTimestamp] = useState<string>('');
  const [type, setType] = useState<TransactionType>(TransactionType.Credit);
  const [transaction, setTransaction] = useState<Transaction>();
  const [editing, setEditing] = useState<boolean>(false);

  useEffect(() => {
    if (editingTransaction) {
      setEditing(true);
      setType(editingTransaction.type);
      setName(editingTransaction.name);
      setAmount(editingTransaction.amount.toString());
      setTimestamp(editingTransaction.timestamp.toString());
      setTransaction(editingTransaction);
    }
  }, []);

  useEffect(() => {
    if (!transaction || editing) {
      return;
    }
    handleTransactionSaved(transaction);
  }, [transaction]);

  function handleAddTransaction() {
    setTransaction({
      id: crypto.randomUUID(),
      name,
      amount: parseInt(amount, 10),
      timestamp,
      type,
    });
  }

  function handleEditTransaction() {
    if (!transaction) return;

    const newTransaction: Transaction = {
      id: transaction.id,
      name,
      amount: parseInt(amount, 10),
      timestamp,
      type,
    };

    setEditing(false);
    setTransaction(newTransaction);
  }

  return (
    <div className="TransactionForm">
      <SelectField label="Type">
        <select
          value={type}
          onChange={(e) => {
            // TODO: Move enum parsing to helper function.
            const transactionType: TransactionType = Object.values(TransactionType).find(
              (x) => x === parseInt(e.target.value, 2),
            ) as TransactionType;

            setType(transactionType);
          }}
        >
          <option value="0">Expense</option>
          <option value="1">Income</option>
        </select>
      </SelectField>

      <InputField label="Name">
        <input value={name} type="text" onChange={(e) => setName(e.target.value)} />
      </InputField>

      <InputField label="Amount">
        <input value={amount} type="number" onChange={(e) => setAmount(e.target.value)} />
      </InputField>

      <InputField label="Date">
        <input value={timestamp} type="date" onChange={(e) => setTimestamp(e.target.value)} />
      </InputField>

      <div className="button-wrapper">
        {editing && <TextButton onClick={() => handleEditTransaction()}>Save</TextButton>}
        {!editing && (
          <TextButton onClick={() => handleAddTransaction()}>Add Transaction</TextButton>
        )}
      </div>
    </div>
  );
}

TransactionForm.defaultProps = {
  editingTransaction: undefined,
};

export default TransactionForm;
