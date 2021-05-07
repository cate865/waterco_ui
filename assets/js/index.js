//import Cookies from 'js-cookie';
// import Cookies from 'js-cookie';


var selectedRecord = null;
var selectedRecordID = null;
var baseUrl = "http://localhost:5000";

// Get cookie
function getCookie(name) {
    // Split cookie string and get all individual name=value pairs in an array
    var cookieArr = document.cookie.split(";");
    
    // Loop through the array elements
    for(var i = 0; i < cookieArr.length; i++) {
        var cookiePair = cookieArr[i].split("=");
        
        /* Removing whitespace at the beginning of the cookie name
        and compare it with the given string */
        if(name == cookiePair[0].trim()) {
            // Decode the cookie value and return
            console.log('cookie:'+ decodeURIComponent(cookiePair[1]))
            return decodeURIComponent(cookiePair[1]);
        }
    }
    
    // Return null if not found
    return null;
}


//-----------------------------------------------Beginning of user Router-----------------------------------

// User Login
function userLogin(data) {
    var postData = JSON.stringify(data);
    $.ajax({
        type: "POST",
        url: baseUrl + "/users/signin",
        dataType: 'json',
        data: postData,
        contentType: "application/json; charset=utf-8",
        cache: false,
        success: function (response) {
            var data = response.user;
            console.log(data);

            console.log("token:" + response.token);
    
            document.cookie =  'authToken=' + response.token
            window.location.href = "./index.html";
        },
        headers:{
            Accept:"application/json; charset=utf-8",
            Content_Type:"application/json; charset=utf-8",
            Authorization: getCookie('authToken')
        }
       
        
    });
}

function onLoginDetailsSubmit() {
    var formData = {};
    formData["Email"] = document.getElementById("Email").value;
    formData["Password"] = document.getElementById("Password").value;
    
    userLogin(formData);
}

// User sign-Up (Create User)
function addUserRecordToTable(data) {
    var allus = document.getElementById("allus").getElementsByTagName("tbody")[0];
    var newRecord =allus.insertRow(allus.length);

    var cell1 = newRecord.insertCell(0);
    cell1.innerHTML = data.UserID;
    var cell2 = newRecord.insertCell(1);
    cell2.innerHTML = data.UserName;
    var cell3 = newRecord.insertCell(2);
    cell3.innerHTML = data.Email;
    var cell4 = newRecord.insertCell(3);
    cell4.innerHTML = data.createdAt;
    var cell5 = newRecord.insertCell(4);
    cell5.innerHTML = data.updatedAt;
    var cell6 = newRecord.insertCell(5);
    cell6.innerHTML = '<a onclick="onUserEdit(this)">Edit</a> <a onClick="onUserDelete(this)">Delete</a>';   
}

function addUser(data) {
    var postData = JSON.stringify(data);
    $.ajax({
        type: "POST",
        url: baseUrl + "/users/",
        dataType: 'json',
        data: postData,
        contentType: "application/json; charset=utf-8",
        cache: false,
        success: function (response) {
            var data = response.data;
            console.log(data);
            addUserRecordToTable(data);
            window.location.href = "./loginbiller.html";
            
        },
        headers:{
            Accept:"application/json; charset=utf-8",
            Content_Type:"application/json; charset=utf-8",
            Authorization: getCookie('authToken')
        }
       
        
    });
}

function onUserDetailsSubmit() {
  console.log("Function called : add user");
  document.getElementById("loginbox").style.display = "none";
    var formData = {};
    formData["Email"] = document.getElementById("Email").value;
    formData["UserName"] = document.getElementById("UserName").value;
    formData["Password"] = document.getElementById("Password").value;
    
    if (selectedRecord == null) {
        addUser(formData);
    } else {
        updateUserRecord(formData);
    }
    // alert("User Edited Successfully");
    clearUserForm();

}

function onUserDetailsSubmitTwo() {
    var formData = {};
    formData["Email"] = document.getElementById("Email").value;
    formData["UserName"] = document.getElementById("UserName").value;
    formData["Password"] = document.getElementById("Password").value;
    addUser(formData);
    // window.location.href = "./index.html";
    clearUserForm();

}

// Get all users
$(document).ready(function () {
    document.getElementById("loginbox").style.display = "none";
    $.ajax({
        type: "GET",
        url: baseUrl + "/users/",
        cache: false,
        success: function (response) {
            var data = response.data;
            data.forEach((user) => {
                addUserRecordToTable(user);
            });
        },
        headers:{
            Authorization: `token ${getCookie('authToken')}`
        }
    });
});

// View one User
function onUserIdSubmit() {
    var pid = document.getElementById("Userid").value;
    viewOneUser(pid);

}

function viewOneUser(id) {
    $.ajax({
        type: "GET",
        url: baseUrl + "/users/" + id,
        cache: false,
        success: function (response) {
            console.log(response.message);
            console.log(id);
            $("#allus tbody tr").remove();
            var data = response.data;
            data.forEach((user) => {
                addUserRecordToTable(user);
            });
        },
        headers: {
            Authorization: `token ${getCookie('authToken')}`
        }
    });

}

// Updating a user
function onUserEdit(td) {
    document.getElementById("loginbox").style.display = "block";
    selectedRecord = td.parentElement.parentElement;
    selectedRecordID = selectedRecord.cells[0].innerHTML;
    document.getElementById("Email").value = selectedRecord.cells[1].innerHTML;
    document.getElementById("UserName").value = selectedRecord.cells[2].innerHTML;
   
}

function updateUserTableRecord(data) {
    selectedRecord.cells[0].innerHTML = selectedRecordID;
    selectedRecord.cells[1].innerHTML = data.Email;
    selectedRecord.cells[2].innerHTML = data.UserName;
    }


function updateUserRecord(data) {
    var updateData = JSON.stringify(data);
    $.ajax({
        type: 'PUT',
        url: baseUrl + "/users/" + selectedRecordID,
        dataType: 'json',
        data: updateData,
        contentType: "application/json; charset=utf-8",
        cache: false,
        success: function () {
            updateUserTableRecord(data);
        },
        headers:{
            Accept:"application/json; charset=utf-8",
            Content_Type:"application/json; charset=utf-8",
            'Access-Control-Allow-Credentials': true,
            Authorization: `token ${getCookie('authToken')}`
        }
    });

}

function onUserDelete(td) {
    if (confirm('Are you sure you want to delete this record')) {
        var row = td.parentElement.parentElement;
        deleteUserData(row);
        
        
    }

}

function deleteUserData(row){
    $.ajax({
        type: "DELETE",
        url: baseUrl + "/users/" + row.cells[0].innerHTML,
        cache: false,
        success: function (response) {
            console.log(response.message);
            console.log(selectedRecordID);
        },
        headers:{
            Authorization: `token ${getCookie('authToken')}`
        }
    });

}

function clearUserForm() {
    document.getElementById("Email").value = "";
    document.getElementById("UserName").value = "";
    
}

//--------------------------------------End of users router ---------------------------------------------------------
//--------------------------------------Beginning of members router--------------------------------------------------
// Add member
function addMemberRecordToTable(data) {
    var memberslist = document.getElementById("memberslist").getElementsByTagName("tbody")[0];
    var newRecord =memberslist.insertRow(memberslist.length);

    var cell1 = newRecord.insertCell(0);
    cell1.innerHTML = data.Customerid;
    var cell2 = newRecord.insertCell(1);
    cell2.innerHTML = data.CustName;
    var cell3 = newRecord.insertCell(2);
    cell3.innerHTML = data.TelephoneNo;
    var cell4 = newRecord.insertCell(3);
    cell4.innerHTML = data.Email;
    var cell5 = newRecord.insertCell(4);
    cell5.innerHTML = '<a onclick="showOne(this)">View</a> <a onclick="onMemberEdit(this)">Edit</a> <a onClick="onMemberDelete(this)">Delete</a>';   
}

function showOne(recordid){
    // take in ID
    // get /record/id from api    // create divs to show details
    $.ajax({
        type: "GET",
        url: baseUrl + "/members/" + recordid,
        cache: false,
        success: function (response) {
            console.log(response.data[0].Customerid);
            console.log(response.data[0].CustName);
            console.log(response.data[0].TelephoneNo);
            console.log(response.data[0].Email);
            window.location.href = "./clientview.html";
        }
    });
}
 
function onMemberFormSubmit() {
  console.log("Add member called");
    var formData = {};
    formData["CustName"] = document.getElementById("CustName").value;
    formData["TelephoneNo"] = document.getElementById("TelephoneNo").value;
    formData["Email"] = document.getElementById("Email").value;
    

    if (selectedRecord == null) {
        saveMemberFormData(formData);
        // alert("Client Added Successfully");
    } else {
        updateMemberFormRecord(formData);
        // alert("Client Edited Successfully");
    }
    clearMemberForm();
}

function onBillFormSubmit() {
    var formData = {};
    formData["PremiseId"] = document.getElementById("PremiseId").value;
    formData["UserID"] = document.getElementById("UserID").value;
    formData["Reading"] = document.getElementById("Reading").value;

    saveBillFormData(formData);

    clearBillForm();
}

function onPayFormSubmit() {
    var formData = {};
    formData["billid"] = document.getElementById("billid").value;
    formData["PaidAmount"] = document.getElementById("PaidAmount").value;

    savePayFormData(formData);

    clearPayForm();
}

// Adding a member
function saveBillFormData(data) {
    var postData = JSON.stringify(data);
    $.ajax({
        type: "POST",
        url: baseUrl + "/bills/",
        dataType: 'json',
        data: postData,
        contentType: "application/json; charset=utf-8",
        cache: false,
        success: function (response) {
            alert("Bill generated successfully");
        },
        headers:{
            Accept:"application/json; charset=utf-8",
            Content_Type:"application/json; charset=utf-8",
            'Access-Control-Allow-Credentials': true,
            Authorization: `token ${getCookie('authToken')}`
        }
    });
}

// Adding a member
function savePayFormData(data) {
    var postData = JSON.stringify(data);
    $.ajax({
        type: "POST",
        url: baseUrl + "/payments/",
        dataType: 'json',
        data: postData,
        contentType: "application/json; charset=utf-8",
        cache: false,
        success: function (response) {
            console.log("Paid");
            alert("Bill Payment Successful. Thank You");
            close();
        },
        headers:{
            Accept:"application/json; charset=utf-8",
            Content_Type:"application/json; charset=utf-8",
            'Access-Control-Allow-Credentials': true,
            Authorization: `token ${getCookie('authToken')}`
        }
    });
}

// Adding a member
function saveMemberFormData(data) {
    var postData = JSON.stringify(data);
    $.ajax({
        type: "POST",
        url: baseUrl + "/members/",
        dataType: 'json',
        data: postData,
        contentType: "application/json; charset=utf-8",
        cache: false,
        success: function (response) {
            console.log(response.token);
            addMemberRecordToTable(response.data);
            alert("Member was added successfully ");
           
        },
        headers:{
            Accept:"application/json; charset=utf-8",
            Content_Type:"application/json; charset=utf-8",
            'Access-Control-Allow-Credentials': true,
            Authorization: `token ${getCookie('authToken')}`
        }
       
        
    });
}


// Getting all members
$(document).ready(function () {
    $.ajax({
        type: "GET",
        url: baseUrl + "/members/",
        cache: false,
        success: function (response) {
            var data = response.data;
            data.forEach((member) => {
                addMemberRecordToTable(member);
            });
        },
        headers:{
            Authorization: `token ${getCookie('authToken')}`
        }
    });
});

// View one Member
function onMemberIdSubmit() {
    var pid = document.getElementById("Custid").value;
    viewOneMember(pid);

}

function viewOneMember(id) {
    $.ajax({
        type: "GET",
        url: baseUrl + "/members/" + id,
        cache: false,
        success: function (response) {
            console.log(response.message);
            console.log(id);
            $("#memberslist tbody tr").remove();
            var data = response.data;
            data.forEach((Member) => {
                addMemberRecordToTable(Member);
            });
        },
        headers: {
            Authorization: `token ${getCookie('authToken')}`
        }
    });

}

//Updating a member
function onMemberEdit(td) {
    selectedRecord = td.parentElement.parentElement;
    selectedRecordID = selectedRecord.cells[0].innerHTML;
    document.getElementById("CustName").value = selectedRecord.cells[1].innerHTML;
    document.getElementById("TelephoneNo").value = selectedRecord.cells[2].innerHTML;
    document.getElementById("Email").value = selectedRecord.cells[3].innerHTML;
   
}

function updateMemberTableRecord(data) {
    selectedRecord.cells[0].innerHTML = selectedRecordID;
    selectedRecord.cells[1].innerHTML = data.CustName;
    selectedRecord.cells[2].innerHTML = data.TelephoneNo;
    selectedRecord.cells[3].innerHTML = data.Email;
    }


function updateMemberFormRecord(data) {
    var updateData = JSON.stringify(data);
    $.ajax({
        type: 'PUT',
        url: baseUrl + "/members/" + selectedRecordID,
        dataType: 'json',
        data: updateData,
        contentType: "application/json; charset=utf-8",
        cache: false,
        success: function () {
            updateMemberTableRecord(data);
            alert("Member record edited successfully");
        },
        headers:{
            Accept:"application/json; charset=utf-8",
            Content_Type:"application/json; charset=utf-8",
            'Access-Control-Allow-Credentials': true,
            Authorization: `token ${getCookie('authToken')}`
        }
    });

}

// Deleting a member
function onMemberDelete(td) {
    if (confirm('Are you sure you want to delete this record')) {
        var row = td.parentElement.parentElement;
        deleteMemberData(row);
        document.getElementById("memberslist").deleteRow(row.rowIndex);
    }

}

function deleteMemberData(row){
    $.ajax({
        type: "DELETE",
        url: baseUrl + "/members/" + row.cells[0].innerHTML,
        cache: false,
        success: function (response) {
            console.log(response.message);
            console.log(selectedRecordID);
        },
        headers:{
            Authorization: `token ${getCookie('authToken')}`
        }
    });

}

function clearMemberForm() {
    document.getElementById("CustName").value = "";
    document.getElementById("TelephoneNo").value = "";
    document.getElementById("Email").value = "";
    
}

function clearBillForm() {
    document.getElementById("PremiseId").value = "";
    document.getElementById("UserID").value = "";
    document.getElementById("Reading").value = "";
}

function clearPayForm() {
    document.getElementById("billid").value = "";
    document.getElementById("PaidAmount").value = "";
}

//----------------------------------End of Members Router------------------------------

//----------------------------------Beginning of Premises Router----------------------- 
// Add Premise
function addPremiseRecordToTable(data) {
    var Premiseslist = document.getElementById("Premiseslist").getElementsByTagName("tbody")[0];
    var newRecord =Premiseslist.insertRow(Premiseslist.length);

    var cell1 = newRecord.insertCell(0);
    cell1.innerHTML = data.PremiseId;
    var cell2 = newRecord.insertCell(1);
    cell2.innerHTML = data.MeterNo;
    var cell3 = newRecord.insertCell(2);
    cell3.innerHTML = data.Customerid;
    var cell4 = newRecord.insertCell(3);
    cell4.innerHTML = data.Routeid;
    var cell5 = newRecord.insertCell(4);
    cell5.innerHTML = data.createdAt;
    var cell6 = newRecord.insertCell(5);
    cell6.innerHTML = data.updatedAt;
    var cell7 = newRecord.insertCell(6);
    cell7.innerHTML = '<a onclick="onPremiseEdit(this)">Edit</a>';   
}
 
function onPremiseFormSubmit() {
    var formData = {};
    formData["MeterNo"] = document.getElementById("MeterNo").value;
    formData["Customerid"] = document.getElementById("Customerid").value;
    formData["Routeid"] = document.getElementById("Routeid").value;
    

    if (selectedRecord == null) {
        savePremiseFormData(formData);
        // alert("Premise Added Successfully");
    } else {
        updatePremiseFormRecord(formData);
        // alert("Premise Edited Successfully");
    }
    clearPremiseForm();
}

// Adding a Premise
function savePremiseFormData(data) {
    var postData = JSON.stringify(data);
    $.ajax({
        type: "POST",
        url: baseUrl + "/premises/",
        dataType: 'json',
        data: postData,
        contentType: "application/json; charset=utf-8",
        cache: false,
        success: function (response) {
            addPremiseRecordToTable(response.data);
            alert("Member Premise added successfully");
            
        },
        headers:{
            Accept:"application/json; charset=utf-8",
            Content_Type:"application/json; charset=utf-8",
            'Access-Control-Allow-Credentials': true,
            Authorization: `token ${getCookie('authToken')}`
        }
       
        
    });
}


// Getting all Premises
$(document).ready(function () {
    $.ajax({
        type: "GET",
        url: baseUrl + "/premises/",
        cache: false,
        success: function (response) {
            var data = response.data;
            data.forEach((Premise) => {
                addPremiseRecordToTable(Premise);
            });
        },
        headers: {
            Authorization: `token ${getCookie('authToken')}`
        }
    });


});

// Getting all premises by a member
function onMemberIdInput() {
    var pid = document.getElementById("Clientid").value;
    sortByMember(pid);

}

function sortByMember(id) {
    $.ajax({
        type: "GET",
        url: baseUrl + "/premises/member/" + id,
        cache: false,
        success: function (response) {
            console.log(response.message);
            console.log(id);
            $("#Premiseslist tbody tr").remove();
            var data = response.data;
            data.forEach((Premise) => {
                addPremiseRecordToTable(Premise);
            });
        },
        headers: {
            Authorization: `token ${getCookie('authToken')}`
        }
    });

}

// Getting all premises by route
function onRouteIdInput() {
    var pid = document.getElementById("Clientid").value;
    sortByRoute(pid);

}

function sortByRoute(id) {
    $.ajax({
        type: "GET",
        url: baseUrl + "/premises/route/" + id,
        cache: false,
        success: function (response) {
            console.log(response.message);
            console.log(id);
            $("#Premiseslist tbody tr").remove();
            var data = response.data;
            data.forEach((Premise) => {
                addPremiseRecordToTable(Premise);
            });
        },
        headers: {
            Authorization: `token ${getCookie('authToken')}`
        }
    });

}

// View one Premise
function onPremiseIdInput() {
    var pid = document.getElementById("Clientid").value;
    viewOnePremise(pid);

}

function viewOnePremise(id) {
    $.ajax({
        type: "GET",
        url: baseUrl + "/premises/" + id,
        cache: false,
        success: function (response) {
            console.log(response.message);
            console.log(id);
            $("#Premiseslist tbody tr").remove();
            var data = response.data;
            data.forEach((Premise) => {
                addPremiseRecordToTable(Premise);
            });
        },
        headers: {
            Authorization: `token ${getCookie('authToken')}`
        }
    });

}

//Updating a Premise
function onPremiseEdit(td) {
    selectedRecord = td.parentElement.parentElement;
    selectedRecordID = selectedRecord.cells[0].innerHTML;
    document.getElementById("MeterNo").value = selectedRecord.cells[1].innerHTML;
    document.getElementById("Customerid").value = selectedRecord.cells[2].innerHTML;
    document.getElementById("Routeid").value = selectedRecord.cells[3].innerHTML;
   
}

function updatePremiseTableRecord(data) {
    selectedRecord.cells[0].innerHTML = selectedRecordID;
    selectedRecord.cells[1].innerHTML = data.MeterNo;
    selectedRecord.cells[2].innerHTML = data.Customerid;
    selectedRecord.cells[3].innerHTML = data.Routeid;
    }


function updatePremiseFormRecord(data) {
    var updateData = JSON.stringify(data);
    $.ajax({
        type: 'PUT',
        url: baseUrl + "/premises/" + selectedRecordID,
        dataType: 'json',
        data: updateData,
        contentType: "application/json; charset=utf-8",
        cache: false,
        success: function () {
            updatePremiseTableRecord(data);
            alert("Member Premise edited successfully");
        },
        headers:{
            Accept:"application/json; charset=utf-8",
            Content_Type:"application/json; charset=utf-8",
            'Access-Control-Allow-Credentials': true,
            Authorization: `token ${getCookie('authToken')}`
        }
    });

}

function clearPremiseForm() {
    document.getElementById("MeterNo").value = "";
    document.getElementById("Customerid").value = "";
    document.getElementById("Routeid").value = "";
    
}

//----------------------------------End of Premises Router-----------------------------

//---------------------------------Beginning of Routes Router---------------------------
// Add Route
function addRouteRecordToTable(data) {
    var Routeslist = document.getElementById("Routeslist").getElementsByTagName("tbody")[0];
    var newRecord =Routeslist.insertRow(Routeslist.length);

    var cell1 = newRecord.insertCell(0);
    cell1.innerHTML = data.Routeid;
    var cell2 = newRecord.insertCell(1);
    cell2.innerHTML = data.Route_name;
    var cell3 = newRecord.insertCell(2);
    cell3.innerHTML = data.Status;
    var cell4 = newRecord.insertCell(3);
    cell4.innerHTML = '<a onclick="onRouteEdit(this)">Edit</a>';   
}
 
function onRouteFormSubmit() {
    document.getElementById("Status").style.display = "none";
    var formData = {};
    formData["Route_name"] = document.getElementById("Route_name").value;

    if (selectedRecord == null) {
        saveRouteFormData(formData);
        // alert("Route Added Successfully");
    } else {
        formData["Status"] = document.getElementById("Status").value;
        updateRouteFormRecord(formData);
        // alert("Route Edited Successfully");
    }
    clearRouteForm();
}

// Adding a Route
function saveRouteFormData(data) {
    var postData = JSON.stringify(data);
    $.ajax({
        type: "POST",
        url: baseUrl + "/routes/",
        dataType: 'json',
        data: postData,
        contentType: "application/json; charset=utf-8",
        cache: false,
        success: function (response) {
            addRouteRecordToTable(response.data);
            alert("Route Record Added Successfully");
            
        },
        headers:{
            Accept:"application/json; charset=utf-8",
            Content_Type:"application/json; charset=utf-8",
            'Access-Control-Allow-Credentials': true,
            Authorization: `token ${getCookie('authToken')}`
        }
       
        
    });
}


// Getting all Routes
$(document).ready(function () {
    $.ajax({
        type: "GET",
        url: baseUrl + "/routes/",
        cache: false,
        success: function (response) {
            var data = response.data;
            data.forEach((Route) => {
                addRouteRecordToTable(Route);
            });
        },
        headers:{
            Authorization: `token ${getCookie('authToken')}`
        }
    });
});


//Updating a Route
function onRouteEdit(td) {
    document.getElementById("Status").style.display = "block";
    selectedRecord = td.parentElement.parentElement;
    selectedRecordID = selectedRecord.cells[0].innerHTML;
    document.getElementById("Route_name").value = selectedRecord.cells[1].innerHTML;
    document.getElementById("Status").value = selectedRecord.cells[2].innerHTML;
    document.getElementById("submit").value = "Update Route";
   
}

function updateRouteTableRecord(data) {
    selectedRecord.cells[0].innerHTML = selectedRecordID;
    selectedRecord.cells[1].innerHTML = data.Route_name;
    selectedRecord.cells[2].innerHTML = data.Status;
    }


function updateRouteFormRecord(data) {
    var updateData = JSON.stringify(data);
    $.ajax({
        type: 'PUT',
        url: baseUrl + "/routes/" + selectedRecordID,
        dataType: 'json',
        data: updateData,
        contentType: "application/json; charset=utf-8",
        cache: false,
        success: function () {
            updateRouteTableRecord(data);
            alert("Route Record Edited Successfully");
        },
        headers:{
            Accept:"application/json; charset=utf-8",
            Content_Type:"application/json; charset=utf-8",
            'Access-Control-Allow-Credentials': true,
            Authorization: `token ${getCookie('authToken')}`
        }
    });

}

function clearRouteForm() {
    document.getElementById("Route_name").value = "";
    document.getElementById("Status").value = "";
    
}

//---------------------------------End of Routes Router-------------------------------------------------

//-----------------------------------------------Beginning of Payments Router--------------------------------------------
// get all payments
$(document).ready(() => {
$.ajax({
    url: baseUrl + "/payments", 
    method: 'GET',
    dataType : 'json',
    success: function(data){
      if(data.data.length > 0){
        console.log("Fetched payments");
          for(let index = 0; index < data.data.length; index++) {
            var newRow = $("<tr>");
            var cols = "";
            var TransactionID = '';
            var billid = '';
            var PremiseId = '';
            var ExpectedAmount = '';
            var PaidAmount = '';
            var createdAt = '';
            var newExpected = numberWithCommas(data.data[index].ExpectedAmount);
            var newPaidAmount = numberWithCommas(data.data[index].PaidAmount);
            cols += '<td> '+ data.data[index].TransactionID +'</td>';
            cols += '<td> '+ data.data[index].billid +'</td>';
            cols += '<td> '+ data.data[index].PremiseId+'</td>';
            cols += '<td> '+ newExpected+'</td>';
            cols += '<td> '+ newPaidAmount+'</td>';
            cols += '<td> '+ data.data[index].createdAt+'</td>';
            newRow.append(cols);
            $("#allpa .tbody").append(newRow);
          }
    }
  }
})
})
//View Payment by Premise
function onPrIdInput() {
    var pid = document.getElementById("Prid").value;
    sortbyPremise(pid);

}

function sortbyPremise(id) {
    $.ajax({
        type: "GET",
        url: baseUrl + "/payments/premise/" + id,
        cache: false,
        success: function (data) {
            console.log(id);
            $("#allpa tbody tr").remove();
            if(data.data.length > 0){
                console.log("Fetched payments");
                  for(let index = 0; index < data.data.length; index++) {
                    var newRow = $("<tr>");
                    var cols = "";
                    var TransactionID = '';
                    var billid = '';
                    var PremiseId = '';
                    var ExpectedAmount = '';
                    var PaidAmount = '';
                    var createdAt = '';
                    var newExpected = numberWithCommas(data.data[index].ExpectedAmount);
                    var newPaidAmount = numberWithCommas(data.data[index].PaidAmount);
                    cols += '<td> '+ data.data[index].TransactionID +'</td>';
                    cols += '<td> '+ data.data[index].billid +'</td>';
                    cols += '<td> '+ data.data[index].PremiseId+'</td>';
                    cols += '<td> '+ newExpected+'</td>';
                    cols += '<td> '+ newPaidAmount+'</td>';
                    cols += '<td> '+ data.data[index].createdAt+'</td>';
                    newRow.append(cols);
                    $("#allpa .tbody").append(newRow);
                  }
            }
            
            
        },
        headers: {
            Authorization: `token ${getCookie('authToken')}`
        }
    });

}

//------------------------------------------End of Payments Router------------------------------------------------------
//------------------------------------------Beginning of Bills Router---------------------------------------------------
// Get all bills
$(document).ready(() => {
    $.ajax({
        url: baseUrl + "/bills/", 
        method: 'GET',
        dataType : 'json',
        success: function(data){
          if(data.data.length > 0){
            console.log("Fetched bills");
              for(let index = 0; index < data.data.length; index++) {
                var newRow = $("<tr>");
                var cols = "";
                var billid = '';
                var PremiseId = '';
                var UserID = '';
                var Reading = '';
                var Amount = '';
                var Status = '';
                var createdAt = '';
                var newAmount = numberWithCommas(data.data[index].Amount);
                cols += '<td> '+ data.data[index].billid +'</td>';
                cols += '<td> '+ data.data[index].PremiseId +'</td>';
                cols += '<td> '+ data.data[index].UserID+'</td>';
                cols += '<td> '+ data.data[index].Reading+'</td>';
                cols += '<td> '+ newAmount+'</td>';
                cols += '<td> '+ data.data[index].Status+'</td>';
                cols += '<td> '+ data.data[index].createdAt+'</td>';
                newRow.append(cols);
                $("#allbi .tbody").append(newRow);
              }
        }
      }
    })
    })

// Capture a Bill
// premise IDs for select - bills
$(document).ready(() => {
$.ajax({
    url: baseUrl + "/premises", 
    method: 'GET',
    dataType : 'json',
    success: function(data){
      if(data.data.length > 0){
        console.log("Fetched premises IDs");
          for(let index = 0; index < data.data.length; index++) {
            $('#PremiseID').append('<option name="PremiseId" value="' + data.data[index].PremiseId + '">' + data.data[index].PremiseId + '</option>');
          }
    }
  }
})
})

// biller IDs for select - bills
$(document).ready(() => {
$.ajax({
    url: baseUrl + "/users", 
    method: 'GET',
    dataType : 'json',
    success: function(data){
      if(data.data.length > 0){
        console.log("Fetched biller IDs");
          for(let index = 0; index < data.data.length; index++) {
            $('#UserID').append('<option value="' + data.data[index].UserID + '">' + data.data[index].UserID + '</option>');
          }
    }
  }
})
})

// thousand separator
function numberWithCommas(x) {
    return x.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",");
}

//View a bill
function onBillIdInput() {
    var pid = document.getElementById("Billid").value;
    viewOneBill(pid);

}

function viewOneBill(id) {
    $.ajax({
        type: "GET",
        url: baseUrl + "/bills/" + id,
        cache: false,
        success: function (data) {
            $("#allbi tbody tr").remove();
            if(data.data.length > 0){
                console.log("Fetched bills");
                  for(let index = 0; index < data.data.length; index++) {
                    var newRow = $("<tr>");
                    var cols = "";
                    var billid = '';
                    var PremiseId = '';
                    var UserID = '';
                    var Reading = '';
                    var Amount = '';
                    var Status = '';
                    var createdAt = '';
                    var newAmount = numberWithCommas(data.data[index].Amount);
                    cols += '<td> '+ data.data[index].billid +'</td>';
                    cols += '<td> '+ data.data[index].PremiseId +'</td>';
                    cols += '<td> '+ data.data[index].UserID+'</td>';
                    cols += '<td> '+ data.data[index].Reading+'</td>';
                    cols += '<td> '+ newAmount+'</td>';
                    cols += '<td> '+ data.data[index].Status+'</td>';
                    cols += '<td> '+ data.data[index].createdAt+'</td>';
                    newRow.append(cols);
                    $("#allbi .tbody").append(newRow);
                  }
            }
            
            
        },
        headers: {
            Authorization: `token ${getCookie('authToken')}`
        }
    });

}

//-----------------------------------------------End of Bills Router-----------------------------------------------------