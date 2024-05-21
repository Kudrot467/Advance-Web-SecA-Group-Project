'use client';
import { useState } from 'react';
import 'tailwindcss/tailwind.css';

const DepositForm = () => {
  const [email, setEmail] = useState('');
  const [amount, setAmount] = useState('');
  const [method, setMethod] = useState('');
  const [trxId, setTrxId] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:3000/deposits', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, amount, method, trxId }),
      });
      const data = await response.json();
      if (response.ok) {
        setMessage(data.message);
      } else {
        setError(data.error);
      }
    } catch (error) {
      setError('An error occurred while processing your request');
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-blue-50">
      <div className="max-w-md w-full p-6 bg-blue-200 rounded-lg shadow-md">
        <h1 className="text-3xl font-semibold mb-4 text-center">Deposit Money</h1>
        {message && <p className="text-green-600">{message}</p>}
        {error && <p className="text-red-600">{error}</p>}
        <form onSubmit={handleSubmit} className="max-w-md">
          <div className="mb-4">
            <label htmlFor="email" className="block mb-1">Email:</label>
            <input type="email" id="email" value={email} onChange={(e) => setEmail(e.target.value)} className="border border-gray-300 rounded-md p-2 w-full" required />
          </div>
          <div className="mb-4">
            <label htmlFor="amount" className="block mb-1">Amount:</label>
            <input type="number" id="amount" value={amount} onChange={(e) => setAmount(e.target.value)} className="border border-gray-300 rounded-md p-2 w-full" required />
          </div>
          <div className="mb-4">
            <label htmlFor="method" className="block mb-1">Method:</label>
            <select id="method" value={method} onChange={(e) => setMethod(e.target.value)} className="border border-gray-300 rounded-md p-2 w-full" required>
              <option value="">Select Method</option>
              <option value="bKash">bKash</option>
              <option value="Nagad">Nagad</option>
              <option value="Bank account">Bank account</option>
            </select>
          </div>
          <div className="mb-4">
            <label htmlFor="trxId" className="block mb-1">Transaction ID:</label>
            <input type="text" id="trxId" value={trxId} onChange={(e) => setTrxId(e.target.value)} className="border border-gray-300 rounded-md p-2 w-full" required />
          </div>
          <button type="submit" className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 w-full">Deposit</button>
        </form>
      </div>
    </div>
  );
};

export default DepositForm;
