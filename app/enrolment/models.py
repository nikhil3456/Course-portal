from flask_sqlalchemy import SQLAlchemy
from app import db

# Your models here
class Enrolment(db.Model):
    __tablename__ = 'Enrolment'
    enrolementNo = db.Column(db.Integer, primary_key = True, autoincrement = True)
    code = db.Column(db.String(6))
    roll = db.Column(db.String(8))

    def __init__ (self, roll, code):
        self.roll = roll
        self.code = code

    def __repr__():
        return "< Enrolled : %r %r >"%(self.roll,self.code) 
