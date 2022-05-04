import { AnimatedAxis, AnimatedGrid, AnimatedLineSeries, darkTheme, XYChart } from '@visx/xychart';
import React, { useEffect } from 'react';
import './App.scss';
import Modal from './components/modal/Modal';
import TextButton from './components/text-button/TextButton';
import TransactionForm from './components/transaction-form/TransactionForm';
import TransactionType, { TransactionTypeDisplay } from './enums/transaction-type.enum';
import { LineChartPoint } from './models/line-chart-point.model';
import { Transaction } from './models/transaction.model';
import getTrendlineFunc from './utils/chart.utils';

function App() {
  const [transactions, setTransactions] = React.useState<Transaction[]>([]);
  const [showAddTransactionModal, setShowAddTransactionModal] = React.useState(false);
  const [showEditTransactionModal, setShowEditTransactionModal] = React.useState(false);
  const [editingTransaction, setEditingTransaction] = React.useState<Transaction>();

  useEffect(() => {
    setTransactions(() => JSON.parse(localStorage.getItem('transactions') || '[]'));
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

  function getOrderedTransactions() {
    return transactions.sort((a, b) => a.timestamp.localeCompare(b.timestamp));
  }

  function getLineChartData() {
    const orderedTransactions = getOrderedTransactions();
    if (!orderedTransactions.length) return [];

    const pointData: LineChartPoint[] = [];
    for (let i = 0; i < orderedTransactions.length; i++) {
      const currentTransaction = orderedTransactions[i];
      const prevBalance = pointData[i - 1];

      let balance = prevBalance ? prevBalance.y : 0;

      switch (currentTransaction.type) {
        case TransactionType.Debit:
          balance += currentTransaction.amount;
          break;
        case TransactionType.Credit:
        default:
          balance -= currentTransaction.amount;
          break;
      }

      pointData.push({
        x: new Date(currentTransaction.timestamp).valueOf(),
        y: balance,
      });
    }

    return pointData;
  }

  function getTrendline(): LineChartPoint[] {
    if (transactions.length < 2) return [];

    const trendLinePoints = getLineChartData();
    const trendLineFunc = getTrendlineFunc(trendLinePoints);

    trendLinePoints.forEach((p) => {
      // eslint-disable-next-line no-param-reassign
      p.y = trendLineFunc(p.x);
    });

    return trendLinePoints;
  }

  function getTrendlineProjection(): LineChartPoint[] {
    const trendline = getTrendline();
    const trendLineFunc = getTrendlineFunc(getLineChartData());

    const lastPoint = trendline[trendline.length - 1];
    const length = lastPoint.x - trendline[0].x;
    const projectionToX = lastPoint.x + length;

    return [
      {
        x: lastPoint.x,
        y: lastPoint.y,
      },
      {
        x: projectionToX,
        y: trendLineFunc(projectionToX),
      },
    ];
  }

  function xAccessor() {
    return (d: LineChartPoint) => d.x;
  }

  function yAccessor() {
    return (d: LineChartPoint) => d.y;
  }

  return (
    <div className="App">
      <div className="main-container">
        <div className="actions">
          <TextButton onClick={() => openAddTransactionModal()}>Add Transaction</TextButton>
        </div>
        <div className="historical-expenses">
          <table>
            <thead>
              <tr>
                <th>Name</th>
                <th>Amount</th>
                <th>Date</th>
                <th>Type</th>
              </tr>
            </thead>
            <tbody>
              {getOrderedTransactions().map((transaction) => (
                <tr onClick={() => openEditTransactionModal(transaction)} key={transaction.id}>
                  <td>{transaction.name}</td>
                  <td>{transaction.amount}</td>
                  <td>{transaction.timestamp}</td>
                  <td>{TransactionTypeDisplay[transaction.type]}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {getLineChartData().length && (
          <div className="balance-chart">
            <XYChart
              height={500}
              width={1000}
              xScale={{ type: 'time' }}
              yScale={{ type: 'linear' }}
              theme={darkTheme}
            >
              <AnimatedAxis orientation="bottom" />
              <AnimatedAxis orientation="left" />
              <AnimatedGrid columns={false} />
              <AnimatedLineSeries
                dataKey="Balance"
                data={getLineChartData()}
                xAccessor={xAccessor()}
                yAccessor={yAccessor()}
              />
              <AnimatedLineSeries
                dataKey="Trendline"
                data={getTrendline()}
                xAccessor={xAccessor()}
                yAccessor={yAccessor()}
              />
              <AnimatedLineSeries
                dataKey="Projection"
                data={getTrendlineProjection()}
                xAccessor={xAccessor()}
                yAccessor={yAccessor()}
              />
            </XYChart>
          </div>
        )}
      </div>

      {showAddTransactionModal && (
        <Modal onClose={() => setShowAddTransactionModal(false)}>
          <TransactionForm handleTransactionSaved={(e) => handleAddTransaction(e)} />
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
