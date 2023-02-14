//rafce + Enter
//import Image from 'react-bootstrap';

import React, { useEffect, useState } from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { ContactService } from '../../../services/ContactService';
import Spinner from '../../Spinner/Spinner';

const EditContact = () => {

  //To Edit/Update, you need the "id" from useParams
  let { contactId } = useParams();

  let navigate = useNavigate();

  //"state" is an object and we define it as follows. NOTE: "group: []"" is for the drop down on the form.
  //NOTE: the "contact" object's properties must be exactly the same as that in the API.
  let [state, setState] = useState({
    loading: false,
    contact: {
      name: '',
      company: '',
      email: '',
      title: '',
      mobile: '',
      photo: '',
      groupId: ''
    },
    groups: [],
    errorMessage: ''
  });

  //Function to Update/Edit the Form, i.e., change properties inside the "content" object, 
  //contact = {name, company, email, title, mobile, photo, groupId}
  let updateInput = (event) => {
    setState({
      ...state,
      contact: {
        ...state.contact,
        [event.target.name] : event.target.value
      }

    });
  };
  
  /*----------------------------------SECTION: Get One Data from ContactService.js using contactId or id------------------------*/
  //"loadData" is an async function
  const loadData = async () => {
    try {
      setState({...state, loading: true}); //Only changes "loading" to true while leaving "contacts" & "errorMessage" unchanged
      let response = await ContactService.getContact(contactId); // gets single "contact" data from API
      let groupResponse = await ContactService.getGroups(); // get all groups from API
      console.log(response);
      setState({
        ...state,
        loading: false,
        contact: response.data,
        groups: groupResponse.data
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
  }, [contactId])

  /*------------------------------SECTION END: Get One Data from ContactService.js using contactId or id------------------------*/

   //POST Request Function: This Function POST the <form></form>
   let submitForm = async (event) => {
    event.preventDefault();
    try {
      let response = await ContactService.updateContact(state.contact, contactId); //API from ContactService.js
      if (response) {
        navigate('/contacts/list', { replace: true } );
      }
    }
    catch (error) {
      setState({
        ...state,
        loading: false,
        errorMessage: error.message
      }); //If there is an error, then "loading" is changed to false & "errorMessage" is changed from empty string with "error.message".

      navigate(`/contacts/edit/${contactId}`, { replace: false } );
    }
  }

  let { loading, contact, groups, errorMessage } = state;

  return (
    <React.Fragment>
        {
          loading ? <Spinner /> :
          <React.Fragment>
              <pre>{JSON.stringify(contact)}</pre>
              <section className='add-contact p-3'>
                  <Container>
                      <Row>
                        <Col>
                          <p className='h3 text-primary fw-bold'>Edit Contact</p>
                          <p className='fst-italic'>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Id fugit voluptas cumque quia, repellat perspiciatis modi harum nostrum velit asperiores, corporis delectus ipsum quasi! Dolore, quis ducimus! Voluptatibus, animi placeat.</p>
                        </Col>
                      </Row>

                            {/*To vertically Center the Column contents inside the <Row>, use className='align-items-center' */}
                      <Row className='align-items-center'>
                        <Col md={4}>
                          <form onSubmit={submitForm}>
                              <div className='mb-2'>
                                <input type="text" className='form-control' placeholder='Name' 
                                  name='name'
                                  value={contact.name}
                                  onChange={updateInput}
                                  required={true}
                                />
                              </div>

                              <div className='mb-2'>
                                <input type="text" className='form-control' placeholder='Photo Url' 
                                  name='photo'
                                  value={contact.photo}
                                  onChange={updateInput}
                                  required={true}
                                />
                              </div>

                              <div className='mb-2'>
                                <input type="number" className='form-control' placeholder='Mobile' 
                                  name='mobile'
                                  value={contact.mobile}
                                  onChange={updateInput}
                                  required={true}
                                />
                              </div>

                              <div className='mb-2'>
                                <input type="email" className='form-control' placeholder='Email' 
                                  name='email'
                                  value={contact.email}
                                  onChange={updateInput}
                                  required={true}
                                />
                              </div>

                              <div className='mb-2'>
                                <input type="text" className='form-control' placeholder='Company' 
                                  name='company'
                                  value={contact.company}
                                  onChange={updateInput}
                                  required={true}
                                />
                              </div>

                              <div className='mb-2'>
                                <input type="text" className='form-control' placeholder='Title' 
                                  name='title'
                                  value={contact.title}
                                  onChange={updateInput}
                                  required={true}
                                />
                              </div>

                              <div className='mb-2'>
                                  <select className='form-control'
                                    name='groupId'
                                    value={contact.groupId}
                                    onChange={updateInput}
                                    required={true}
                                  >
                                      <option value="">Select a Group ...</option>
                                      {
                                        groups.length > 0
                                              &&
                                        groups.map(group => {
                                          return (
                                            <option key={group.id} value={group.id}>{group.name}</option>
                                          )
                                        })
                                      }
                                  </select>
                              </div>

                                  {/*Below we have two Buttons: NOTE: "btn btn-property" makes any tag into a button*/}
                              <div className='mb-2'>
                                  <input type="submit" className='btn btn-primary me-2' value='Update' />
                                  <Link to={`/contacts/list`} className="btn btn-dark">Cancel</Link>
                              </div>

                          </form>
                        </Col>

                        <Col md={6}>

                        <img src={contact.photo} alt="" className='img-fluid contact-img '/>
                        {/*<Image src="https://www.pngitem.com/pimgs/m/22-220721_circled-user-male-type-user-colorful-icon-png.png" alt="" fluid /> */}
                        </Col>
                      </Row>
                  </Container>
              </section>
          </React.Fragment>
        }
        
    </React.Fragment>
  )
}

export default EditContact;