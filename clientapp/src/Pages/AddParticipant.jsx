import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';


const AddParticipant = () => {

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const navigate = useNavigate();

  const onAddClick = async () => {
    await axios.post('/api/addparticipant', {name, email});
    navigate('/list-participants');
  }

  return (
    <div className="container d-flex justify-content-center align-items-center" style={{ minHeight: '80vh' }}>
      <div className="card shadow p-4" style={{ width: '100%', maxWidth: '600px', backgroundColor: '#f8f9fa' }}>
        <h2 className="card-title text-center mb-4">Add Participant</h2>
        <div className="mb-3">
          <label htmlFor="participantName" className="form-label">Name</label>
          <input type="text" value={name} onChange={e => setName(e.target.value)} className="form-control" placeholder="Enter participant name" />
        </div>
        <div className="mb-3">
          <label htmlFor="participantEmail" className="form-label">Email (optional)</label>
          <input type="email" value={email} onChange={e => setEmail(e.target.value)} className="form-control" placeholder="Enter participant email" />
        </div>
        <button onClick={onAddClick} className="btn btn-primary w-100">Add Participant</button>
      </div>
    </div>
  );
}

export default AddParticipant;
