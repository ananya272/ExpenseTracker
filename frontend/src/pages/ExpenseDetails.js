import React from 'react';
import './ExpenseDetails.css'; 
function ExpenseDetails({ incomeAmt, expenseAmt }) {
  return (
    <div className='expense-details-container'>
      <div className='balance'>
        <h2>Your Balance</h2>
        <h1 className='balance-amount'>₹ {incomeAmt - expenseAmt}</h1>
      </div>
      {/* Show Income & Expense amount */}
      <div className='amounts-container'>
        <div className='amount-box income'>
          <h3>Income</h3>
          <p className='amount income-amount'>₹{incomeAmt}</p>
        </div>
        <div className='amount-box expense'>
          <h3>Expense</h3>
          <p className='amount expense-amount'>₹{expenseAmt}</p>
        </div>
      </div>
    </div>
  );
}

export default ExpenseDetails;
