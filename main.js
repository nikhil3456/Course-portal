
$(document).ready(
    function() {
        viewAllStudents()
        viewAllCourses()
    });

function helperaddNewStudent() {
    addNewStudent($("#srollno").val(), $("#sname").val(), $("#syear").val());
}

function addNewStudent(roll, name, year) {
    var object = "roll=" + roll + "\&name=" + name + "\&year=" + year;
    var ret;
    $.ajax({
        method: 'POST',
        url: 'http://127.0.0.1:5000/addStudent',
        async: false,
        data: object,
        success: function(response) {
            ret = response;
            console.log(response);
            viewAllStudents();
        },
        error: function(response) {
            ret = response.responseText;
            console.log(response.responseText);
        }
    });
    return ret;
}

function helperaddNewCourse() {
    addNewCourse($("#cid").val(), $("#cname").val());
}

function addNewCourse(id, name) {
    var object = "id=" + id + "\&name=" + name;
    var ret;
    $.ajax({
        method: 'POST',
        url: 'http://127.0.0.1:5000/addCourse',
        async: false,
        data: object,
        success: function(response) {
            ret = response;
            console.log(response);
            viewAllCourses();
        },
        error: function(response) {
            console.log(response.responseText);
            ret = response.responseText;
        }
    });
    return ret;
}

function viewAllStudents() {
    var ret;
    $.ajax({
        method: 'GET',
        url: 'http://127.0.0.1:5000/students',
        async: false,
        data: {},
        success: function(response) {
            ret = response;
            allstudents = response["students"];
            viewAllStudents1(allstudents);
            addToStudentDropdown(allstudents);
        },
        error: function(response) {
            ret = response.responseText;
            console.log(response.responseText);
        }
    });
    return ret;
};

function viewAllStudents1(allStudents) {
    var st = "<thead><tr><td>Roll</td><td>Name</td><td>Year</td></tr></thead>";
    for (i = 0; i < allStudents.length; i++) {
        st += "<tr>" +
            "<td>" + allStudents[i].roll + "</td>" +
            "<td>" + allStudents[i].name + "</td>" +
            "<td>" + allStudents[i].year + "</td>" +
            "</tr>";
    }
    st += "</tbody>";
    $("#allStudents").html(st);
}

function viewAllCourses() {
    var ret;
    $.ajax({
        method: 'GET',
        url: 'http://127.0.0.1:5000/courses',
        async: false,
        data: {},
        success: function(response) {
            ret = response;
            allcourses = response["courses"];
            viewAllCourses1(allcourses);
            addToCourseDropdown(allcourses);
        },
        error: function(response) {
            ret = response.responseText;
            console.log(response.responseText);
        }
    });
    return ret;
};

function viewAllCourses1(allCourses) {
    var st = "";
    for (var i = 0; i < allCourses.length; i++) {
        st += "<tr>" +
            "<td>" + allCourses[i].id + "</td>" +
            "<td>" + allCourses[i].name + "</td>" +
            "</tr>";
    }
    $("#ctable").html(st);
}

function addToStudentDropdown(allStudents) {
    var str = "";
    for (var i = 0; i < allStudents.length; i++) {
        str += "<option value = \"" + allStudents[i].roll + "\">" + allStudents[i].roll + "</option>";
    }
    $("#sRoll").html(str);
    $("#sDName").html(str);
    $("#sRName").html(str);
    $("#sVName").html(str);
    return allStudents;
}

function addToCourseDropdown(allCourses) {
    var str = "";
    for (var i = 0; i < allCourses.length; i++) {
        str += "<option value = \"" + allCourses[i].id + "\">" + allCourses[i].id + "</option>";
    }
    $("#cId").html(str);
    $("#cDName").html(str);
    $("#cRName").html(str);
    $("#cVName").html(str);
    return allCourses;
}

function helperAddStudentToCourse() {
    addStudentToCourse($("#sRoll").val(), $("#cId").val());
}

function addStudentToCourse(roll, id) {
    var ret;
    var object = "roll=" + roll + "\&id=" + id;
    $.ajax({
        method: 'POST',
        url: 'http://127.0.0.1:5000/enroll',
        async: false,
        data: object,
        success: function(response) {
            ret = response;
            console.log(response);
            blankTable();
        },
        error: function(response) {
            ret = response.responseText;
            console.log(response.responseText);
        }
    });
    return ret;
}

function helperdropStudentFromCourse() {

    dropStudentFromCourse($("#sDName").val(), $("#cDName").val());
}

function dropStudentFromCourse(roll, id) {
    var ret;
    var object = "roll=" + roll + "\&id=" + id;
    $.ajax({
        method: 'POST',
        url: 'http://127.0.0.1:5000/drop',
        async: false,
        data: object,
        success: function(response) {
            ret = response;
            console.log(response);
            blankTable();
        },
        error: function(response) {
            ret = response.responseText;
            console.log(response.responseText);
        }
    });
    return ret;
}

function helperviewEnrolled() {
    
    viewEnrolled($("#cVName").val());
}

function viewEnrolled(id) {
    var ret;
    var object = "id=" + id;
    $.ajax({
        method: 'GET',
        url: 'http://127.0.0.1:5000/studentsEnrolled',
        async: false,
        data: object,
        success: function(response) {
            ret = response;
            console.log(response);
            viewEnrolledTable(response["students"]);
        },
        error: function(response) {
            ret = response.responseText;
            console.log(response.responseText);
        }
    });
    return ret;
}

function viewEnrolledTable(ar) {
    var st = "";
    for (var i = 0; i < ar.length; i++) {
        st += "<tr>" +
            "<td>" + ar[i].roll + "</td>" +
            "<td>" + ar[i].name + "</td>" +
            "<td>" + ar[i].year + "</td>" +
            "</tr>";
    }
    $("#stcTable").html(st);
}

function helperRemoveCourse() {
    
    removeCourse($("#cRName").val());
}

function removeCourse(id) {
    var ret;
    var object = "id=" + id;
    $.ajax({
        method: 'POST',
        url: 'http://127.0.0.1:5000/deleteCourse',
        async: false,
        data: object,
        success: function(response) {
            ret = response;
            console.log(response);
            viewAllCourses();
            blankTable();
        },
        error: function(response){
            ret = response.responseText;
            console.log(response.responseText);
        }
    });
    return ret;
}

function helperRemoveStudent() {
    
    removeStudent($("#sRName").val());
}

function removeStudent(roll) {
    var ret;
    var object = "roll=" + roll;
    $.ajax({
        method: 'POST',
        url: 'http://127.0.0.1:5000/deleteStudent',
        async: false,
        data: object,
        success: function(response) {
            ret = response;
            console.log(response);
            viewAllStudents();
            blankTable();
        },
        error: function(response){
            ret = response.responseText;
            console.log(response.responseText);
        }
    });
    return ret;
}


function helperviewCoursesTaken() {

    viewCoursesTaken($("#sVName").val());
}

function viewCoursesTaken(roll) {
    var ret;
    var object = "roll=" + roll;
    $.ajax({
        method: 'GET',
        url: 'http://127.0.0.1:5000/coursesTaken',
        async: false,
        data: object,
        success: function(response) {
            ret = response;
            console.log(response);
            viewCoursesTakenTable(response["courses"]);
        },
        error: function(response) {
            ret = response.responseText;
            console.log(response.responseText);
        }
    });
    return ret;
}

function viewCoursesTakenTable(ar) {
    var st = "";
    for (var i = 0; i < ar.length; i++) {
        st += "<tr>" +
            "<td>" + ar[i].id + "</td>" +
            "<td>" + ar[i].name + "</td>" +
            "</tr>";
    }
    $("#ctbsTable").html(st);
}

function blankTable() {
    var st = "";
    $("#ctbsTable").html(st);
    $("#stcTable").html(st);
}
module.exports.helperaddNewStudent = helperaddNewStudent;
module.exports.addNewStudent = addNewStudent;
module.exports.helperaddNewCourse = helperaddNewCourse;
module.exports.addNewCourse = addNewCourse;
module.exports.viewAllStudents = viewAllStudents;
module.exports.viewAllStudents1 = viewAllStudents1;
module.exports.viewAllCourses = viewAllCourses;
module.exports.viewAllCourses1 = viewAllCourses1;
module.exports.addToStudentDropdown = addToStudentDropdown;
module.exports.addToCourseDropdown = addToCourseDropdown;
module.exports.helperAddStudentToCourse = helperAddStudentToCourse;
module.exports.addStudentToCourse = addStudentToCourse;
module.exports.helperdropStudentFromCourse = helperdropStudentFromCourse;
module.exports.dropStudentFromCourse = dropStudentFromCourse;
module.exports.helperviewEnrolled = helperviewEnrolled;
module.exports.viewEnrolled = viewEnrolled;
module.exports.viewEnrolledTable = viewEnrolledTable;
module.exports.helperRemoveCourse = helperRemoveCourse;
module.exports.removeCourse = removeCourse;
module.exports.helperRemoveStudent = helperRemoveStudent;
module.exports.removeStudent = removeStudent;
module.exports.helperviewCoursesTaken = helperviewCoursesTaken;
module.exports.viewCoursesTaken = viewCoursesTaken;
module.exports.viewCoursesTakenTable = viewCoursesTakenTable;
module.exports.blankTable = blankTable;
