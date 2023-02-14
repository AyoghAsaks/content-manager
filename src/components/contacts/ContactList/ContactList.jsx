//rafce + Enter
//import Image from 'react-bootstrap';
import React, { useEffect, useState } from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import { Link } from 'react-router-dom';


import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { ContactService } from '../../../services/ContactService';
import Spinner from '../../Spinner/Spinner';

const ContactList = () => {

  //"state" is an object and we define it as follows: state = {loading: false, contacts: [], errorMessage: ''}
  let [state, setState] = useState({
    loading: false,
    contacts: [],
    filteredContacts: [],
    errorMessage: ''
  });

  /*----------------------------------SECTION 1: Get all Data from ContactService.js-------------------------------------------*/
  //"loadData" is an async function
  const loadData = async () => {
    try {
      setState({...state, loading: true}); //Only changes "loading" to true while leaving "contacts" & "errorMessage" unchanged
      let response = await ContactService.getAllContacts(); // gets "contacts" data from API
      setState({
        ...state,
        loading: false,
        contacts: response.data,
        filteredContacts: response.data
      }); //Changes "loading" to false & "contacts" is loaded with "response.data" but "errorMessage" is unchanged.
    }
    catch (error) {
      setState({
        ...state,
        loading: false,
        errorMessage: error.message
      }); //If there is an error, then "loading" is changed to false & "errorMessage" is changed from empty string with "error.message".
    }
  }

  useEffect(() => {
    loadData();
  }, [])
  /*----------------------------------SECTION 1 END: Get all Data from ContactService.js-------------------------------------------*/

  /*----------------------------------SECTION 2: Delete contact Data from ContactService.js using contactId or id------------------------*/
  let clickDelete = async (contactId) => {
    try {
      let response = await ContactService.deleteContact(contactId); //API from ContactService.js
      if(response) {
        setState({...state, loading: true}); //Only changes "loading" to true while leaving "contacts" & "errorMessage" unchanged.
        let response = await ContactService.getAllContacts(); // gets "contacts" data from API
        setState({
          ...state,
          loading: false,
          contacts: response.data,
          filteredContacts: response.data
        }); //Changes "loading" to false & "contacts" is loaded with "response.data" but "errorMessage" is unchanged.
      }
    }
    catch(error) {
      setState({
        ...state,
        loading: false,
        errorMessage: error.message
      }); //If there is an error, then "loading" is changed to false & "errorMessage" is changed from empty string with "error.message".
    }
  }

  /*----------------------------------SECTION 2 END: Delete contact Data from ContactService.js using contactId or id------------------------*/

  //Search object "query"
  let [query, setQuery] = useState({
    text: ''
  });

  //Search contacts Function
  let searchContacts = (event) => {
    setQuery({
      ...query, text: event.target.value
    }); //text in query is changed by receiving input the user types in.

    let theContacts = state.contacts.filter(contact => {
      return  contact.name.toLowerCase().includes(event.target.value.toLowerCase()); //compares what user enters with "contact.name", sends true if they are the same 
    }); //returns 

    console.log(theContacts);

    setState({
      ...state,
      filteredContacts: theContacts
    });
  }

  let { loading, contacts, filteredContacts, errorMessage } = state; //Destructure the object "state" to get its individual objects.
  
  return (
    <React.Fragment>
      <pre>{query.text}</pre>
      <pre>{JSON.stringify(contacts)}</pre>
      <section className='contact-search p-3'>
        <Container>
          <Row>
            <Col>
              <p className='h3 fw-bolder'>
                Contact Manager <Link to={'/contacts/add'} className='btn btn-primary'><i className='fa fa-plus-circle me-2'></i>New</Link>
              </p>
              <p className='fst-italic'>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Accusantium minus libero esse temporibus laudantium consequuntur ad facilis reprehenderit porro. Voluptates libero neque dolorum vel est animi sequi sint dolores tenetur!
              </p>
            </Col>
          </Row>

          <Row>
            <Col md={6}>
                  <Form>
                      <Row>
                          <Col>
                              <Form.Group className="mb-3" controlId="formBasicSearch">
                                <Form.Control type="text" placeholder="Search Names" style={{ backgroundColor: 'white' }}
                                  name="text"
                                  value={query.text}
                                  onChange={searchContacts}
                                />
                              </Form.Group>
                          </Col>
                          <Col>
                              <Button variant="" type="submit" style={{ backgroundColor: '#EEEBE8'}}>
                                Search
                              </Button>
                          </Col>
                      </Row>
                  </Form>
            </Col>
          </Row>

          {
            loading ? <Spinner /> :
            <React.Fragment>
                <section className='contact-list'>
                    <Container>
                        <Row>
                              {
                                  filteredContacts.length > 0 
                                        &&
                                  filteredContacts.map(contact => {
                                      return (
                                        <Col md={6} className='my-2' key={contact.id}>
                                              <div className='card'>
                                                <div className='card-body'>
                                                    {/*align-items-center centers an item vertically*/}
                                                    <Row className='align-items-center'>
                                                                                    {/*Image Column*/}
                                                          <Col md={4}>
                                                            <img src={contact.photo} alt="" className='img-fluid contact-img '/>
                                                            {/*<Image src="https://www.pngitem.com/pimgs/m/22-220721_circled-user-male-type-user-colorful-icon-png.png" alt="" fluid /> */}
                                                          </Col>

                                                                                        {/*Name, Mobile, Email Column*/}
                                                          <Col md={7}>
                                                            <ul className='list-group'>
                                                              <li className='list-group-item list-group-item-action'>
                                                                Name : <span className='fw-bold'>{contact.name}</span>
                                                              </li>
                                                              <li className='list-group-item list-group-item-action'>
                                                                Mobile : <span className='fw-bold'>{contact.mobile}</span>
                                                              </li>
                                                              <li className='list-group-item list-group-item-action'>
                                                                Email : <span className='fw-bold'>{contact.email}</span>
                                                              </li>
                                                            </ul>
                                                          </Col>

                                                                                        {/*Links and Button Column*/}
                                                          <Col md={1} className='d-flex flex-column align-items-center'>
                                                              <Link to={`/contacts/view/${contact.id}`} className="btn btn-warning my-1">
                                                                <i className="fa fa-eye" />
                                                              </Link>
                                                              <Link to={`/contacts/edit/${contact.id}`} className="btn btn-primary my-1">
                                                                <i className="fa fa-pen" />
                                                              </Link>
                                                              <button className='btn btn-danger my-1' onClick={() => clickDelete(contact.id)}>
                                                                <i className="fa fa-trash" />
                                                              </button>
                                                        </Col>
                                                    </Row>
                                                </div>
                                              </div>
                                          </Col>
                                      )
                                  })
                              }
                              
                        </Row>
                    </Container>
                </section>
            </React.Fragment>
          }
          
        </Container>
      </section>
    </React.Fragment>
  )
}

export default ContactList;