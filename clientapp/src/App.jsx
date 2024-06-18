import React from 'react';
import {Route, Routes} from 'react-router-dom';
import Layout from './components/Layout';
import Home from './Pages/Home';
import AddParticipant from "./Pages/AddParticipant.jsx";
import ListParticipants from "./Pages/ListParticipants.jsx";
import AddBill from "./Pages/AddBill.jsx";
import ListBills from "./Pages/ListBills.jsx";
import BillDetails from "./Pages/BillDetails.jsx";

const App = () => {
  return (
      <Layout>
        <Routes>
          <Route path='/' element={<Home/>}/>
          <Route path='/add-participant' element={<AddParticipant/>}/>
          <Route path='/list-participants' element={<ListParticipants/>}/>
          <Route path='/add-bill' element={<AddBill />}/>
          <Route path='/list-bills' element={<ListBills />}/>
          <Route path='/bill-details/:id' element={<BillDetails />}/>
        </Routes>
      </Layout>
  );
}

export default App;