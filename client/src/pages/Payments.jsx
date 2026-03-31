import React, { useEffect, useState } from "react";
import API from "../Api";

export default function Payments() {
  const [payments, setPayments] = useState([]);

  useEffect(() => {
    fetchPayments();
  }, []);

  const fetchPayments = async () => {
    const res = await API.get("/payments/with-user");
    setPayments(res.data);
  };

  return (
    <div>
      <h2>Payments</h2>

      <table border="1">
        <thead>
          <tr>
            <th>User</th>
            <th>Amount</th>
            <th>Method</th>
            <th>Transaction</th>
          </tr>
        </thead>
        <tbody>
          {payments.map((p, i) => (
            <tr key={i}>
              <td>{p.user.name}</td>
              <td>{p.amount}</td>
              <td>{p.paymentMethod}</td>
              <td>{p.transactionId}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}