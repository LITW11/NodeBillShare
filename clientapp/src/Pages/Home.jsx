import React from 'react';
import { Link } from 'react-router-dom';

const HomePage = () => {
  return (
    <div className="container mt-5">
      <div className="jumbotron bg-light p-5 shadow-lg rounded">
        <h1 className="display-4 text-center">Welcome to BillShare!</h1>
        <p className="lead text-center mt-3">
          Easily split bills with friends and keep track of expenses. Get started by adding participants, creating bills, and viewing the details.
        </p>
        <hr className="my-4" />
        <div className="d-flex justify-content-center mt-4">
          <Link to="/add-participant" className="btn btn-primary mx-2">Add Participant</Link>
          <Link to="/list-participants" className="btn btn-secondary mx-2">List Participants</Link>
          <Link to="/add-bill" className="btn btn-success mx-2">Add Bill</Link>
          <Link to="/list-bills" className="btn btn-info mx-2">List Bills</Link>
        </div>
      </div>
    </div>
  );
}

export default HomePage;
