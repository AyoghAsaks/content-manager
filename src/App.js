
import React from 'react';
import { Route, Routes, Navigate } from 'react-router-dom';
import AddContact from './components/contacts/AddContact/AddContact';
import ContactList from './components/contacts/ContactList/ContactList';
import EditContact from './components/contacts/EditContact/EditContact';
import ViewContact from './components/contacts/ViewContact/ViewContact';
import NavBar from './components/NavBar/NavBar';
//import './App.css';



//https://beta.reactjs.org/learn/updating-objects-in-state#copying-objects-with-the-spread-syntax


let App = () => {
  return (
    <React.Fragment>
      <NavBar />
      <Routes>
        <Route path={'/'} element={<Navigate to={'/contacts/list' } />} />  
        <Route path='/contacts/list' element={<ContactList />} />  
        <Route path='/contacts/add' element={<AddContact />} />
        <Route path='/contacts/view/:contactId' element={<ViewContact />} />
        <Route path='/contacts/edit/:contactId' element={<EditContact />} />
      </Routes>
    </React.Fragment>
  );
}

export default App;
