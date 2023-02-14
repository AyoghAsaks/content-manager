import axios from "axios";

export class ContactService {
    //http://localhost:9000/contacts
    //http://localhost:9000/groups

    static serverURL = `http://localhost:9000`;

    //GET: http://localhost:9000/contacts - get all contacts
    static getAllContacts() {
        let dataURL = `${this.serverURL}/contacts`;
        return axios.get(dataURL);
    }

    //GET by id: http://localhost:9000/contacts/contactId - get one contact of a person using contactId or "id"
    static getContact(contactId) {
        let dataURL = `${this.serverURL}/contacts/${contactId}`;
        return axios.get(dataURL);
    }

    //GET: http://localhost:9000/groups -get all the groups
    static getGroups() {
        let dataURL = `${this.serverURL}/groups`;
        return axios.get(dataURL);
    }

    //GET by object=contact: http://localhost:9000/contacts/contact - We want to be able to return group "name" with a specific "contact". NOTE: "contacts" has "groupId" but not the "name".
    //contact = {id, name, company, email, title, mobile, photo, groupId}
    static getGroup(contact) {
        let groupId = contact.groupId; //this returns the groupId to the variable groupId.
        let dataURL = `${this.serverURL}/groups/${groupId}`; //this returns a specific group with its "id, name". dataURL = {id, name}
        return axios.get(dataURL); // returns group = {id, name}
    }

    //POST: http://localhost:9000/contacts - We Post "contacts" object to the server
    static createContact(contact) {
        let dataURL = `${this.serverURL}/contacts`;
        return axios.post(dataURL, contact);
    }

    //PUT: Update/Edit a contact : PUT --> http://localhost:9000/contacts/contactId
    static updateContact(contact, contactId) {
        let dataURL = `${this.serverURL}/contacts/${contactId}`;
        return axios.put(dataURL, contact);
    }

    //DELETE: Delete a contact : DELETE --> http://localhost:9000/contacts/contactId
    static deleteContact(contactId) {
        let dataURL = `${this.serverURL}/contacts/${contactId}`;
        return axios.delete(dataURL);
    }

}
