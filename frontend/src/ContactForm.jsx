import {useState} from "react"

const ContactForm = ({}) => {
    // state for all 3 variables needed
    const [firstName, setFirstName] = useSate("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");

    //onSubmit function
    const onSubmit = async (e) => {
        e.preventDefault() // prevents refreshing page automatically

        //defining data object
        const data = {
            firstName,
            lastName,
            email
        }

        //defining URL point
        const url = "http://127.0.0.1:5000/create_contact"

        //setting the options for the request
        const options = {
            method: "POST",
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
            // it WORKED!
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
        <button type = "submit">Create Contact</button>
    </form>
    );
};

export default ContactForm