import { useState, useEffect } from 'react';
// Importing contact list
import ContactList from './ContactList';
import './App.css';
import ContactForm from './ContactForm';

function App() {
  const [contacts, setContacts] = useState([]); // empty list
  const [isModalOpen, setIsModalOpen] = useState(false) //set to true when we want to open the modal
  const [currentContact, setCurrentContact] = useState({})



  //useEffect hookup, passing an arrow function, passing fetchcontacts function
  useEffect(() => {
    fetchContacts()  //as soon as it renders, call this function
  }, []);

  //fetch contacts function, async becasue it needs to wait a min to fetch the contacts
  const fetchContacts = async () => {
     //send a request to the backend to get the contacts
    const response = await fetch("http://127.0.0.1:5000/contacts"); //fetch to send a request,by default a GET req
    // once response is given, we need json data associated with response
    const data = await response.json();
    setContacts(data.contacts); // we will get json contact list
    console.log(data.contacts); // we call this whenever the json renders
    // and then its set in the useState list coded above
  };

  //function that will allow to toggle modal
  const closeModal = () => {
    setIsModalOpen(false)
    setCurrentContact({})
  }


  //modal can be opened when creating AND updating a contact

  const openCreateModal = () => {
    if (!isModalOpen) setIsModalOpen(true) // if not open we will open up
  }

  const openEditModal = (contact) => {
    if (isModalOpen) return
    setCurrentContact(contact)
    setIsModalOpen(true)
  }

  //perform update function
  const onUpdate = () => {
    closeModal() //closes model
    fetchContacts() //fetch contacts again after they could've been updated
  }

  //display
  return (
  <>
    <ContactList contacts={contacts} updateContact={openEditModal} updateCallback={onUpdate}/>
    <button onClick ={openCreateModal}>New Contact</button>
    { isModalOpen && <div className="modal">
    <div className= "modal-content">
      <span className = "close" onClick={closeModal}>&times;</span>
      <ContactForm existingContact={currentContact} updateCallback={onUpdate} />
    </div>
    </div>
    }
  </>
  );
}

export default App;
