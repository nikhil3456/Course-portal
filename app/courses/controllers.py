from flask import Blueprint, request, render_template, \
				  flash, g, session, redirect, url_for,jsonify,make_response
from app import db
from flask_cors import CORS
from app.courses.models import Course

mod_courses = Blueprint('courses', __name__)
CORS(mod_courses)

@mod_courses.route('/courses', methods=['GET'])
def get_all_courses():
	courses = Course.query.all()
	output = {"courses": []}
	for i in courses:
		output["courses"].append({"id": i.code, "name": i.name})
	return jsonify(output)

@mod_courses.route('/addCourse', methods = ['POST'])
def add_course():
	Code = request.form['id']
	Name = request.form['name']

	if (Code == '' or Name == ''):
		return make_response('error: Fill all fields!', 400, None)
	try:
		course = Course(Code, Name)
		db.session.add(course)
		db.session.commit() 
		return make_response('success', 200, None)
	except:
		return make_response('error', 400, None)

