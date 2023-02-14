//rafce + Enter
//import Image from 'react-bootstrap';

import React, { useEffect, useState } from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import { Link, useParams } from 'react-router-dom';
import { ContactService } from '../../../services/ContactService';
import Spinner from '../../Spinner/Spinner';

const ViewContact = () => {

  let { contactId } = useParams();

  //"state" is an object and we define it as follows: state = {loading: false, contacts: [], errorMessage: ''}
  let [state, setState] = useState({
    loading: false,
    contact: {},
    errorMessage: '',
    group: {}
  });

  /*----------------------------------SECTION: Get One Data from ContactService.js using contactId or id------------------------*/
  //"loadData" is an async function
  const loadData = async () => {
    try {
      setState({...state, loading: true}); //Only changes "loading" to true while leaving "contacts" & "errorMessage" unchanged
      let response = await ContactService.getContact(contactId); // gets "contacts" data from API
      let groupResponse = await ContactService.getGroup(response.data); //groupResponse.data={id, name}
      console.log(response);
      setState({
        ...state,
        loading: false,
        contact: response.data,
        group: groupResponse.data
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
  }, )
  /*----------------------------------SECTION: Get One Data from ContactService.js using contactId or id------------------------*/

  let { loading, contact, errorMessage, group } = state; //Destructure the object "state" to get its individual objects.
  
  return (
    <React.Fragment>
        <section className='view-contact-intro p-3'>
            <Container>
                <Row>
                    <Col>
                        <p className='h3 text-warning fw-bold'>View Contact</p>
                        <p className='fst-italic'>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Asperiores laborum modi magnam quasi dolorum corporis exercitationem enim. Delectus, suscipit perspiciatis provident iste placeat, et tempore fuga magnam eaque numquam ab.</p>
                    </Col>
                </Row>
            </Container>
        </section>

        { 
            loading ? <Spinner /> :
            <React.Fragment>
            {
                Object.keys(contact).length > 0
                       &&
                Object.keys(group).length > 0
                       &&
                <section className='view-contact p-3'>
                    <Container>
                        {/*To vertically Center the Column contents inside the <Row>, use className='align-items-center' */}
                        <Row className='align-items-center'>
                            <Col md={4}>
                                <img src={contact.photo} alt="" className='img-fluid contact-img '/>
                                {/*<Image src="https://www.pngitem.com/pimgs/m/22-220721_circled-user-male-type-user-colorful-icon-png.png" alt="" fluid /> */}
                            </Col>

                            <Col md={8}>
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
                                      <li className='list-group-item list-group-item-action'>
                                          Company : <span className='fw-bold'>{contact.company}</span>
                                      </li>
                                      <li className='list-group-item list-group-item-action'>
                                          Title : <span className='fw-bold'>{contact.title}</span>
                                      </li>
                                      <li className='list-group-item list-group-item-action'>
                                          Group : <span className='fw-bold'>{group.name}</span>
                                      </li>
                                  </ul>
                            </Col>
                        </Row>

                        <Row>
                            <Col>
                                {/*Below we have a Button: NOTE: "btn btn-property" makes any tag into a button*/}
                                <Link to={`/contacts/list`} className='btn btn-warning'>Back</Link>
                            </Col>
                        </Row>
                    </Container>
                </section>
            }
            </React.Fragment>
        }
    </React.Fragment>
  )
}

export default ViewContact;