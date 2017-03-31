from flask import Blueprint, request, render_template, \
                  flash, g, session, redirect, url_for,jsonify,make_response
from app import db
from flask_cors import CORS
from app.enrolment.models import Enrolment
from app.courses.models import Course
from app.students.models import Student

mod_report = Blueprint('enrolment', __name__)
CORS(mod_report)
# Your controllers here
@mod_report.route('/enroll', methods=['POST'])
def enroll():
    Roll = request.form["roll"]
    Code = request.form["id"]
    
    if (Roll == '' or Code == ''):
        return make_response("error: Fill all fields", 400, None)
    else:
        try:            
            enrolment = Enrolment(Roll, Code)
            db.session.add(enrolment)
            db.session.commit()
            
            return make_response("success", 200, None)
        except:
            return make_response("error", 400, None)
