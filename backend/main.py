# main roots main endpoints
# CRUD operations
# server runs API, ex localhost:5000/home ran in our local machine, endpoint is after slash /
# endpoint will be created for localhost:5000/create_contact
# request anything that we send to our server
# request has types : get(retrieve), post(create), put/path(update), delete
# json data is information that comes along the request
# FRONTEND sends a request and then BACKEND sends a response
# response contains status: (200 success, 404 not found, etc)
# response can include json which is whatever the request is (in this case contact)\

# endpoints code written in pythhon that can handle a request coming from external source (frontend, website)
# api returns response on how it was handled
from flask import request, jsonify # allows to return json data
from configuration import app, database
from models import Contact

# get method
@app.route("/contacts", methods=["GET"]) # specify route url and method 
def retrieve_contact():
    contacts = Contact.query.all() # uses flask to get as qll to get contacts inside db
    #convert python objects into json
    json_contacts = list(map(lambda x: x.to_json(), contacts)) # contact objects have a json method, call the method for all contacts, add them in a new list using lambda (shortcut for writing a function in one line) 
    # x will always be a contact in the contacts list, call to_json on that contact and then it will be put in the new list
    return jsonify({"contacts": json_contacts}) # return json object that says contacts = json_contacts, list prev created

# create contact method
@app.route("/create_contact", methods=["POST"])
def creaet_contact():
    first_name = request.json.get("firstName") 
    last_name = request.json.get("lastName")
    email = request.json.get("email")

    if not first_name or not last_name or not email:
        return (
            jsonify({"message": "Please include a first name, last name and email"}), 
            400,
        )

    # if OK make a new contact, add that in the database and confirmation of action
    new_contact = Contact(first_name=first_name, last_name=lastname, email=email) # new entry
    try:
        database.session.add(new_contact) # added to database section in string area
        database.session.commit() # write in db permanently
    except Exception as e: # catch exception
        return jsonify({"message": str(e)}), 400 # message
    
    return jsonify({"message": "User has been created."}), 201

# create update method
@app.route("/update_contact/<int:user_id>", methods=["PATCH"]) #pass to the route, and the id of the user that'll be updated
def update_contact(user_id):
    contact = Contact.query.get(user_id) # looking for the user
    if not contact:
        return jsonify({"message": "User not found."}), 404
    
    #IF WE FOUND CONTACT 
    data =  request.json
    # modify the contact from py and modify it to json contact
    contact.first_name = data.get("firstName", contact.first_name) # if firstname exists give us firstname, if not give us whatever it was for the cotnact
    contact.last_name = data.get("lastName", contact.last_name)
    contact.email = data.get("email", contact.email)

    database.session.commit() # once modified, commit 

    return jsonify({"message": "User has been updated"}), 200

#create delete 
@app.route("/delete_contact/<int:user_id>", methods=["DELETE"])
def delete_contact(user_id):
    contact = Contact.query.get(user_id) # looking for the user
    if not contact:
        return jsonify({"message": "User not found."}), 404
    
    #IF WE FOUND CONTACT 
    database.session.delete(contact)
    database.session.commit()

    jsonify({"meesage": "User has been deleted."}), 200

# this finishes the API now onto the frontend



# run flask app
if __name__ == "__main__": # if we are running the file directly, execute
    with app.app_context():
        database.create_all() # creates all models defined in our db, spin up the database if it doesn't already exist


    app.run(debug=True) # running app