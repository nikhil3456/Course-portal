from flask import Blueprint, request, render_template, \
				  flash, g, session, redirect, url_for, jsonify, make_response
from app import db
from flask_cors import CORS
from app.students.models import Student
from app.enrolment.models import Enrolment

mod_students = Blueprint('students', __name__)
CORS(mod_students)

@mod_students.route('/students', methods=['GET'])
def get_all_students():
	students = Student.query.all()
	enrolled = Enrolment.query.all()
	output = {'students': []}
	for i in students:
		Roll = i.roll
		courses = []
		for j in enrolled:
			if(j.roll == Roll):
				courses.append(j.code)
		output['students'].append({"roll": Roll, "name": i.name, "year": i.year, "courses": courses})

	return jsonify(output)		

@mod_students.route("/addStudent", methods = ['POST'])
def addStudent():
	Roll = request.form["roll"]
	Year = request.form["year"]
	Name = request.form["name"]
	if(Roll == '' or Name == '' or Year == ''):
		return make_response('error: Fill all fields!', 400, None)
	else:
		try:
			st = Student(Roll, Name, Year)
			db.session.add(st)
			db.session.commit()
			return make_response("success", 200, None)
		except:
			return make_response("Error", 400, None)


