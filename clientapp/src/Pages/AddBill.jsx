import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';


const AddBill = () => {
  const [participants, setParticipants] = useState([]);

  const [selectedParticipants, setSelectedParticipants] = useState([]);
  const [totalAmount, setTotalAmount] = useState('');

  const navigate = useNavigate();

  useEffect(() => {
    const loadParticipants = async () => {
      const { data } = await axios.get('/api/getparticipants');
      setParticipants(data);
    }

    loadParticipants();
  }, []);

  const amountPerPerson = selectedParticipants.length === 0 ? 0 : totalAmount / selectedParticipants.length;

  const onSubmitClick = async () => {
    const bill = {
      amount: totalAmount,
      participantIds: selectedParticipants.map(s => s.id)
    };
    await axios.post('/api/addbill', bill);
    navigate('/list-bills');
  }

  return (
    <div className="container d-flex justify-content-center align-items-center" style={{ minHeight: '80vh' }}>
      <div className="card shadow p-4" style={{ width: '100%', maxWidth: '600px', backgroundColor: '#f8f9fa' }}>
        <h2 className="card-title text-center mb-4">Add Bill</h2>
        <div className="mb-3">
          <label htmlFor="totalAmount" className="form-label">Total Amount</label>
          <input
            type="number"
            className="form-control"
            id="totalAmount"
            value={totalAmount}
            onChange={(e) => setTotalAmount(e.target.value)}
            placeholder="Enter total bill amount"
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Select Participants</label>
          <div className="form-check">
            {participants.map((participant) => (
              <div key={participant.id}>
                <input
                  className="form-check-input"
                  type="checkbox"
                  value={participant.id}
                  onChange={(e) => {
                    if (e.target.checked) {
                      setSelectedParticipants([...selectedParticipants, participant]);
                    } else {
                      setSelectedParticipants(selectedParticipants.filter(p => p.id !== participant.id));
                    }
                  }}
                />
                <label className="form-check-label">
                  {participant.name}
                </label>
              </div>
            ))}
          </div>
        </div>

        {selectedParticipants.length > 0 && (
          <div className="mt-4">
            <h3 className="text-center">Split Amounts</h3>
            <ul className="list-group">
              {selectedParticipants.map(participant => (
                <li key={participant.id} className="list-group-item d-flex justify-content-between align-items-center">
                  <span>{participant.name}</span>
                  <span>${amountPerPerson.toFixed(2)}</span>
                </li>
              ))}
            </ul>
          </div>
        )}
        <button className="btn btn-primary w-100 mt-4" onClick={onSubmitClick}>Submit</button>
      </div>
    </div>
  );
}

export default AddBill;
