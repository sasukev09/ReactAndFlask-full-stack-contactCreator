// Component for rendering our contacts
import React from "react"


const ContactList = ({contacts, updateContact, updateCallback}) => { // contacts prop to get all contacts to render
    //delete function, passing the id of the contact
    const onDelete = async (id) => {
        // creating the request to delete
        try { //try/catch for any potential errors when deleting
            // options specifying the delete method
            const options = {
                method: "DELETE"
            }
            //backticks to embbed a variable (id) ``, using options to pass delete request
            const response = await fetch(`http://127.0.0.1:5000/delete_contact/${id}`, options)
            if (response.status === 200) { // if response is 200
                updateCallback() //call func, it will tell app.jsx to close model and fetchContacts based in onUpdate method
            } else {    //error message
                console.error("Delete unsuccessful, error occurred.")
            }
        } catch (error) { //alert for the error
            alert(error)
        }
    }


    return <div>
        <h2>Contacts</h2>
        <table>
            <thead>
                <tr>
                    <th>First Name</th>
                <th >Last Name</th>
                <th >Email</th>
                    <th>Actions</th>
                </tr>
            </thead>
            <tbody>
                {contacts.map((contact) => ( 
                    <tr key={contact.id}>
                        <td>{contact.firstName}</td>
                        <td>{contact.lastName}</td>
                        <td>{contact.email}</td>
                        <td>
                            <button onClick={() => updateContact(contact)}>Update</button>
                            <button onClick={() => onDelete(contact.id)}>Delete</button>
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    </div>
}

export default ContactList
