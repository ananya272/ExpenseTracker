import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { APIUrl, handleError, handleSuccess } from '../utils';
import { ToastContainer } from 'react-toastify';
import ExpenseTable from './ExpenseTable';
import ExpenseDetails from './ExpenseDetails';
import ExpenseForm from './ExpenseForm';
import './Home.css'; // Custom CSS for styling

function Home() {
  const [loggedInUser, setLoggedInUser] = useState('');
  const [expenses, setExpenses] = useState([]);
  const [incomeAmt, setIncomeAmt] = useState(0);
  const [expenseAmt, setExpenseAmt] = useState(0);

  const navigate = useNavigate();

  useEffect(() => {
    setLoggedInUser(localStorage.getItem('loggedInUser'));
  }, []);

  const handleLogout = (e) => {
    localStorage.removeItem('token');
    localStorage.removeItem('loggedInUser');
    handleSuccess('User Logged out');
    setTimeout(() => {
      navigate('/login');
    }, 1000);
  };

  useEffect(() => {
    const amounts = expenses.map((item) => item.amount);
    const income = amounts.filter((item) => item > 0).reduce((acc, item) => (acc += item), 0);
    const exp = amounts.filter((item) => item < 0).reduce((acc, item) => (acc += item), 0) * -1;
    setIncomeAmt(income);
    setExpenseAmt(exp);
  }, [expenses]);

  const deleteExpens = async (id) => {
    try {
      const url = `${APIUrl}/expenses/${id}`;
      const headers = {
        headers: {
          Authorization: localStorage.getItem('token'),
        },
        method: 'DELETE',
      };
      const response = await fetch(url, headers);
      if (response.status === 403) {
        localStorage.removeItem('token');
        navigate('/login');
        return;
      }
      const result = await response.json();
      handleSuccess(result?.message);
      setExpenses(result.data);
    } catch (err) {
      handleError(err);
    }
  };

  const fetchExpenses = async () => {
    try {
      const url = `${APIUrl}/expenses`;
      const headers = {
        headers: {
          Authorization: localStorage.getItem('token'),
        },
      };
      const response = await fetch(url, headers);
      if (response.status === 403) {
        localStorage.removeItem('token');
        navigate('/login');
        return;
      }
      const result = await response.json();
      setExpenses(result.data);
    } catch (err) {
      handleError(err);
    }
  };

  const addTransaction = async (data) => {
    try {
      const url = `${APIUrl}/expenses`;
      const headers = {
        headers: {
          Authorization: localStorage.getItem('token'),
          'Content-Type': 'application/json',
        },
        method: 'POST',
        body: JSON.stringify(data),
      };
      const response = await fetch(url, headers);
      if (response.status === 403) {
        localStorage.removeItem('token');
        navigate('/login');
        return;
      }
      const result = await response.json();
      handleSuccess(result?.message);
      setExpenses(result.data);
    } catch (err) {
      handleError(err);
    }
  };

  useEffect(() => {
    fetchExpenses();
  }, []);

  return (
    <div className='home-container'>
      <div className='user-section'>
        <h1>Welcome, {loggedInUser}!</h1>
        <button className='logout-button' onClick={handleLogout}>
          Logout
        </button>
      </div>

      <div className='note-section'>
        <h2>Note: Please enter your income as a positive value and your expenses as a negative value (using '-').</h2>
      </div>

      <div className='expenses-section'>
        <ExpenseDetails incomeAmt={incomeAmt} expenseAmt={expenseAmt} />
      </div>

      <div className='form-section'>
        <ExpenseForm addTransaction={addTransaction} />
      </div>

      <div className='table-section'>
        <ExpenseTable expenses={expenses} deleteExpens={deleteExpens} />
      </div>

      <ToastContainer />
    </div>
  );
}

export default Home;
