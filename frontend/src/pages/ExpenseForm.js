import React, { useState } from 'react';
import { handleError } from '../utils';
import './ExpenseForm.css'; // Custom CSS for styling

function ExpenseForm({ addTransaction }) {
  const [expenseInfo, setExpenseInfo] = useState({
    amount: '',
    text: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setExpenseInfo((prevState) => ({ ...prevState, [name]: value }));
  };

  const addExpenses = (e) => {
    e.preventDefault();
    const { amount, text } = expenseInfo;
    if (!amount || !text) {
      handleError('Please add Expense Details');
      return;
    }
    addTransaction(expenseInfo);
    setExpenseInfo({ amount: '', text: '' });
  };

  return (
    <div className='expense-container'>
      <div className='expense-card'>
        <h1 className='expense-title'>Expense Tracker</h1>
        <form onSubmit={addExpenses} className='expense-form'>
          <div className='form-group'>
            <label htmlFor='text'>Expense Detail</label>
            <input
              onChange={handleChange}
              type='text'
              name='text'
              placeholder='Enter your Expense Detail...'
              value={expenseInfo.text}
              className='form-control'
            />
          </div>
          <div className='form-group'>
            <label htmlFor='amount'>Amount</label>
            <input
              onChange={handleChange}
              type='number'
              name='amount'
              placeholder='Enter your Amount...'
              value={expenseInfo.amount}
              className='form-control'
            />
          </div>
          <button type='submit' className='btn-expense'>
            Add Expense
          </button>
        </form>
      </div>
    </div>
  );
}

export default ExpenseForm;
