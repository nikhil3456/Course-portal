from flask_sqlalchemy import SQLAlchemy
from app import db

class Course(db.Model):
    __tablename__= 'course'
    # Define the fields here
    id = db.Column(db.Integer, primary_key = True, autoincrement = True)
    code = db.Column(db.String(6), unique = True)
    name = db.Column(db.String(30))

    def __init__(self, code, name):
        # Fill this up
        self.code = code
        self.name = name

    def __repr__(self):
        return '<Course Id is: %r, Course Name is: %r>' %(self.code, self.name)


