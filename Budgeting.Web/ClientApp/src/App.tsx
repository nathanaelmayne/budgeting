import React, { useEffect } from 'react';
import './App.scss';
import Modal from './components/modal/Modal';
import TextButton from './components/text-button/TextButton';
import TransactionForm from './components/transaction-form/TransactionForm';
import { Transaction } from './models/transaction.model';

function App() {
  const [transactions, setTransactions] = React.useState<Transaction[]>([]);
  const [showAddTransactionModal, setShowAddTransactionModal] =
    React.useState(false);
  const [showEditTransactionModal, setShowEditTransactionModal] =
    React.useState(false);
  const [editingTransaction, setEditingTransaction] =
    React.useState<Transaction>();

  useEffect(() => {
    setTransactions(() => JSON.parse(localStorage.getItem('expenses') || '[]'));
  }, []);

  useEffect(() => {
    localStorage.setItem('transactions', JSON.stringify(transactions));
  }, [transactions]);

  function handleAddTransaction(transaction: Transaction) {
    setTransactions((prevState) => [...prevState, transaction]);
  }

  function handleEditTransaction(transaction: Transaction) {
    const copy = [...transactions];
    const index = transactions.findIndex((e) => e.id === transaction.id);
    copy.splice(index, 1, transaction);
    setTransactions(copy);
    setShowEditTransactionModal(false);
    setEditingTransaction(undefined);
  }

  function openAddTransactionModal() {
    setShowAddTransactionModal(true);
  }

  function openEditTransactionModal(transaction: Transaction) {
    setEditingTransaction(transaction);
    setShowEditTransactionModal(true);
  }

  return (
    <div className="App">
      <div className="main-container">
        <div className="actions">
          <TextButton onClick={() => openAddTransactionModal()}>
            Add Transaction
          </TextButton>
        </div>
        <div className="historical-expenses">
          <table>
            <tbody>
              {transactions.map((transaction) => (
                <tr
                  onClick={() => openEditTransactionModal(transaction)}
                  key={transaction.id}
                >
                  <td>{transaction.name}</td>
                  <td>{transaction.amount}</td>
                  <td>{transaction.timestamp}</td>
                  <td>{transaction.type}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {showAddTransactionModal && (
        <Modal onClose={() => setShowAddTransactionModal(false)}>
          <TransactionForm
            handleTransactionSaved={(e) => handleAddTransaction(e)}
          />
        </Modal>
      )}

      {showEditTransactionModal && (
        <Modal onClose={() => setShowEditTransactionModal(false)}>
          <TransactionForm
            editingTransaction={editingTransaction}
            handleTransactionSaved={(e) => handleEditTransaction(e)}
          />
        </Modal>
      )}
    </div>
  );
}

export default App;
