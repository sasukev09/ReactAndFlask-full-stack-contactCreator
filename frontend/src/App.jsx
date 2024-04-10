import { useState, useEffect } from 'react';
// Importing contact list
import ContactList from './ContactList';
import './App.css';
import ContactForm from './ContactForm';

function App() {
  const [contacts, setContacts] = useState([]); // empty list

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

  return (
  <>
    <ContactList contacts={contacts} />
    <ContactForm />
  </>
  );
}

export default App;
