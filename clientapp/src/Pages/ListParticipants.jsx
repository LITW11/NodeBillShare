import axios from 'axios';
import {useState, useEffect} from 'react';

const ListParticipants = () => {
  
  const [participants, setParticipants] = useState([]);

  useEffect(() => {
    const loadParticipants = async () => {
      const { data } = await axios.get('/api/getparticipants');
      setParticipants(data);
    }

    loadParticipants();
  }, []);

  return (
      <div className="container mt-5">
        <h2>Participants List</h2>
        <table className="table table-striped">
          <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">Name</th>
            <th scope="col">Email</th>
          </tr>
          </thead>
          <tbody>
          {participants.map(participant => (
              <tr key={participant.id}>
                <th scope="row">{participant.id}</th>
                <td>{participant.name}</td>
                <td>{participant.email}</td>
              </tr>
          ))}
          </tbody>
        </table>
      </div>
  );
}

export default ListParticipants;
