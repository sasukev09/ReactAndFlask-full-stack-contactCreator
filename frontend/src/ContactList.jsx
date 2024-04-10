// Component for rendering our contacts
import React from "react"


const ContactList = ({contacts}) => { // contacts prop to get all contacts to render
return <div>
    <h2>Contacts</h2>
    <table>
        <thead>
            <tr>
                <th>First Name</th>
                <th>Last Name</th>
                <th>Email</th>
                <th>Actions</th>
            </tr>
        </thead>
        <body>
            {contacts.map((contact) => ( 
                <tr key={contact.id}>
                    <td>{contact.firstName}</td>
                    <td>{contact.lastName}</td>
                    <td>{contact.email}</td>
                    <td>
                        <button>Update</button>
                        <button>Delete</button>
                    </td>
                </tr>
            ))}
        </body>
    </table>
</div>
}

export default ContactList