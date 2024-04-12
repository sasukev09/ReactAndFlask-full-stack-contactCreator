# database models, define cols data etc

from configuration import database

class Contact(database.Model): # inherit from database.model to define different fields that the object will have
    id = database.Column(database.Integer, primary_key=True)
    first_name = database.Column(database.String(80), unique=False, nullable=False)
    last_name = database.Column(database.String(80), unique=False, nullable=False)
    email = database.Column(database.String(120), unique=True, nullable=False) # no null values

    def to_json(self): #take our object fields and convert it to a dictionary and then to json = javascript object notation
        return {
            "id": self.id,
            "firstName": self.first_name, # Camel case because of json
            "lastName": self.last_name,
            "email": self.email
        }