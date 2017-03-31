from flask_sqlalchemy import SQLAlchemy
from app import db

class Student(db.Model):
    __tablename__ = 'student'
    # Define the fields here
    roll = db.Column(db.String(8), primary_key = True)
    name = db.Column(db.String(30))
    year = db.Column(db.String(3))
    #courses = db.Column(db.String(1000))



    def __init__(self, roll, name, year):
        # fill this up
        self.roll = roll
        self.name = name
        self.year = year

    def __repr__(self):
        return '<Student\'s Roll Number is: %r, Student\'s Year is: %r>' %(self.roll, self.year)
