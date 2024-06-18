import {useState, useEffect} from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import dayjs from 'dayjs';

const ListBills = () => {
  const [bills, setBills] = useState([]);

  useEffect(() => {
    const loadBills = async () => {
      const { data } = await axios.get('/api/getbills');
      setBills(data);
    }

    loadBills();
  }, []);

  return (
      <div className="container mt-5">
        <h2>Bills List</h2>
        <table className="table table-striped">
          <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">Date</th>
            <th scope="col">Total Amount</th>
            <th scope="col">Participants</th>
            <th scope="col">Actions</th>
          </tr>
          </thead>
          <tbody>
          {bills.map((bill) => (
              <tr key={bill.id}>
                <th scope="row">{bill.id}</th>
                <td>{dayjs(bill.date).format("MM/DD/YYYY")}</td>
                <td>${bill.amount.toFixed(2)}</td>
                <td>{bill.participantCount}</td>
                <td>
                  <Link to={`/bill-details/${bill.id}`} className="btn btn-primary btn-sm">View Details</Link>
                </td>
              </tr>
          ))}
          </tbody>
        </table>
      </div>
  );
}

export default ListBills;
