import {useState, useEffect} from 'react';
import { useParams } from 'react-router-dom';
import { FaUser } from 'react-icons/fa';
import axios from 'axios';
import dayjs from 'dayjs';

const BillDetails = () => {
  const { id } = useParams();
 
  const [billDetails, setBillDetails] = useState();

  useEffect(() => {
    const loadBillDetails = async () => {
      const { data } = await axios.get(`/api/getbill?id=${id}`);
      setBillDetails(data);
    }

    loadBillDetails();
  }, []);


  if(!billDetails) {
    return <h3>Loading...</h3>
  }

  return (
      <div className="container mt-5 d-flex justify-content-center">
        <div className="card shadow-lg" style={{ width: '100%', maxWidth: '600px' }}>
          <div className="card-header bg-dark text-white">
            <h2 className="card-title text-center mb-0">Bill Details</h2>
          </div>
          <div className="card-body">
            <p><strong>Date:</strong> {dayjs(billDetails.date).format("MM/DD/YYYY")}</p>
            <p><strong>Total Amount:</strong> ${billDetails.amount.toFixed(2)}</p>
            <h3 className="mt-4">Participants</h3>
            <ul className="list-group">
              {billDetails.participants.map(participant => (
                  <li key={participant.id} className="list-group-item d-flex justify-content-between align-items-center">
                    <span><FaUser className="me-2" />{participant.name}</span>
                    <span className="badge bg-success rounded-pill">${(billDetails.amount / billDetails.participants.length).toFixed(2)}</span>
                  </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
  );
}

export default BillDetails;
