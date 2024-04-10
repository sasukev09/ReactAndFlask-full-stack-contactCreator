# main config of the app
# building api first
from flask import Flask # object relational mapping a python class translated into SQL
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS # CORS = cross origin request, send requests to backend from a different url

# Initialize flask application
app = Flask(__name__)
CORS(app) # disable error mentioned(?), COR to our app

# initialize database, specifying location of the local SQL lite datbase stored in the machine
app.config["SQLALCHEMY_DATABASE_URI"] = "sqlite:///fullStackDatabase.db"
app.config["SQLALCHEMU_TRACK_MODIFICATIONS"] = False # not gonna track all mods, to make it easier

# instance of database, gives us access to previous specified database, to create, mod, delete, etc
database = SQLAlchemy(app)

