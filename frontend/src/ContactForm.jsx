import {useState} from "react"

const ContactForm = ({existingContact = {}, updateCallback}) => {
    // state for all 3 variables needed
    const [firstName, setFirstName] = useState(existingContact.firstName || ""); //if, look@ existing contact, else empty string
    const [lastName, setLastName] = useState(existingContact.lastName || "");
    const [email, setEmail] = useState(existingContact.email || "");

    const updating = Object.entries(existingContact).length !== 0 // if u pass us an object with at leas 1 entry inside of it, we are updating it


    //onSubmit function
    const onSubmit = async (e) => {
        e.preventDefault() // prevents refreshing page automatically

        //defining data object
        const data = {
            firstName,
            lastName,
            email
        }

        //defining URL point, dynamic data endpint. If we update, pass contact id, else just 'create_contact'
        const url = "http://127.0.0.1:5000/" + (updating ? `update_contact/${existingContact.id}` : "create_contact")

        //setting the options for the request
        const options = {
            //if updating use patch method, else POST method
            method: updating ? "PATCH": "POST",
            headers: {
                "Content-Type": "application/json" //about to submit json data, include in a header so api knows that we have json data
            },
            body: JSON.stringify(data) //converts js data object into a json string object, then into body of our request
        }
        
        //sending the request
        const response = await fetch(url, options) // send the request
        //checking if successful
        if (response.status !== 201 && response.status !== 200) {
            const data = await response.json()
            alert(data.message)
        } else {
            //tell app.jsx we finished this we didnt update or create, it'll close the modal and update data that we see from contact list
            updateCallback()
        }
    }

    //once we press button the onSubmit method will be executed
    return (
    <form onSubmit={onSubmit}>  
        <div>
            <label htmlFor="firstName">First Name:</label>
            <input 
            type="text" 
            id="firstName" 
            value={firstName} 
            onChange={(e) => setFirstName(e.target.value)} //get a function e & set FirstName
            />
        </div>
        <div>
            <label htmlFor="lastName">Last Name:</label>
            <input 
            type="text" 
            id="lastName" 
            value={lastName} 
            onChange={(e) => setLastName(e.target.value)} //get a function e & set LastName
            />
        </div>
        <div>
            <label htmlFor="email">Email:</label>
            <input 
            type="text" 
            id="email" 
            value={email} 
            onChange={(e) => setEmail(e.target.value)} //get a function e & set email
            />
        </div>
        <button type = "submit">{updating ? "Update" : "Create"}</button>
    </form>
    );
};

export default ContactForm;