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
            console.log('some random cookieeeeee'+ decodeURIComponent(cookiePair[1]))
            return decodeURIComponent(cookiePair[1]);
        }
    }
    
    // Return null if not found
    return null;
}


//-----------------------------------------------Beginning of user Router-----------------------------------
// Logging in a user
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
            console.log(response.token);
            document.cookie =  'authToken=' + response.token
            //$.cookie('token',response.data.token)
            
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
    

    // if (selectedRecord == null) {
    //     saveFormData(formData);
    // } else {
    //     updateFormRecord(formData);
    // }
    // clearForm();
}


// Add user
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
            var data = response.user;
            console.log(data);
            console.log(response.token);
            
            //$.cookie('token',response.data.token)
            
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
    var formData = {};
    formData["Email"] = document.getElementById("Email").value;
    formData["UserName"] = document.getElementById("UserName").value;
    formData["Password"] = document.getElementById("Password").value;
    
    addUser(formData);
    console.log("Done");
    

    // if (selectedRecord == null) {
    //     saveFormData(formData);
    // } else {
    //     updateFormRecord(formData);
    // }
    // clearForm();
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
    cell4.innerHTML = '<a onclick="onMemberEdit(this)">Edit</a> <a onClick="onMemberDelete(this)">Delete</a> <a href="index.php?page=memberdash&id="` + data.member_id + `>View</a>';   
}
 
function onMemberFormSubmit() {
  console.log("Add member called");
    var formData = {};
    formData["CustName"] = document.getElementById("CustName").value;
    formData["TelephoneNo"] = document.getElementById("TelephoneNo").value;
    

    if (selectedRecord == null) {
        saveMemberFormData(formData);
    } else {
        updateMemberFormRecord(formData);
    }
    clearMemberForm();
    console.log("Done");
}

// Adding a route
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
            addMemberRecordToTable(response.data);
           
            
        },
        headers:{
            Accept:"application/json; charset=utf-8",
            Content_Type:"application/json; charset=utf-8",
            'Access-Control-Allow-Credentials': true,
            Authorization: `token ${getCookie('authToken')}`
        }
       
        
    });
}


// Getting all routes
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
        }
    });
});


//Updating a route
function onMemberEdit(td) {
    selectedRecord = td.parentElement.parentElement;
    selectedRecordID = selectedRecord.cells[0].innerHTML;
    document.getElementById("CustName").value = selectedRecord.cells[1].innerHTML;
    document.getElementById("TelephoneNo").value = selectedRecord.cells[2].innerHTML;
   
}

function updateMemberTableRecord(data) {
    selectedRecord.cells[0].innerHTML = selectedRecordID;
    selectedRecord.cells[1].innerHTML = data.CustName;
    selectedRecord.cells[2].innerHTML = data.TelephoneNo;
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
        }
    });

}

function onMemberDelete(td) {
    if (confirm('Are you sure you want to delete this record')) {
        var row = td.parentElement.parentElement;
        deleteMemberData(row);
        //document.getElementById("memberslist").deleteRow(row.rowIndex);
        
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
        }
    });

}

function clearMemberForm() {
    document.getElementById("CustName").value = "";
    document.getElementById("TelephoneNo").value = "";
    
}

//----------------------------------End of Members Router------------------------------
   

// get all premises
$(document).ready(() => {
$.ajax({
    url: "http://localhost:5000/premises",
    method: 'GET',
    dataType : 'json',
    success: function(data){
      if(data.data.length > 0){
        console.log("Fetched premises");
          for(let index = 0; index < data.data.length; index++) {
            var newRow = $("<tr>");
            var cols = "";
            var PremiseId = '';
            var MeterNo = '';
            var Customerid = '';
            var Routeid = '';
            var createdAt = '';
            var updatedAt = '';
            cols += '<td> '+ data.data[index].PremiseId +'</td>';
            cols += '<td> '+ data.data[index].MeterNo +'</td>';
            cols += '<td> '+ data.data[index].Customerid+'</td>';
            cols += '<td> '+ data.data[index].Routeid+'</td>';
            cols += '<td> '+ data.data[index].createdAt+'</td>';
            cols += '<td> '+ data.data[index].updatedAt+'</td>';
            newRow.append(cols);
            $("#allpr .tbody").append(newRow);
          }
    }
  }
})
})


// get all clients/customers/members
$(document).ready(() => {
$.ajax({
    url: "http://localhost:5000/members",
    method: 'GET',
    dataType : 'json',
    success: function(data){
      if(data.data.length > 0){
        console.log("Fetched Clients");
          for(let index = 0; index < data.data.length; index++) {
            var newRow = $("<tr>");
            var cols = "";
            var Customerid = '';
            var CustName = '';
            var TelephoneNo = '';
            var Email = '';
            var createdAt = '';
            var updatedAt = '';
            cols += '<td> '+ data.data[index].Customerid +'</td>';
            cols += '<td> '+ data.data[index].CustName +'</td>';
            cols += '<td> '+ data.data[index].TelephoneNo+'</td>';
            cols += '<td> '+ data.data[index].Email+'</td>';
            cols += '<td> '+ data.data[index].createdAt+'</td>';
            cols += '<td> '+ data.data[index].updatedAt+'</td>';
            newRow.append(cols);
            $("#allcl .tbody").append(newRow);
          }
    }
  }
})
})

// get all routes
$(document).ready(() => {
$.ajax({
    url: "http://localhost:5000/routes", 
    method: 'GET',
    dataType : 'json',
    success: function(data){
      if(data.data.length > 0){
        console.log("Fetched routes");
          for(let index = 0; index < data.data.length; index++) {
            var newRow = $("<tr>");
            var cols = "";
            var Routeid = '';
            var Route_name = '';
            var Status = '';
            cols += '<td> '+ data.data[index].Routeid +'</td>';
            cols += '<td> '+ data.data[index].Route_name +'</td>';
            cols += '<td> '+ data.data[index].Status+'</td>';
            newRow.append(cols);
            $("#allro .tbody").append(newRow);
          }
    }
  }
})
})

// get all bills
$(document).ready(() => {
$.ajax({
    url: "http://localhost:5000/bills", 
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


// get all payments
$(document).ready(() => {
$.ajax({
    url: "http://localhost:5000/payments", 
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

// get all billers
$(document).ready(() => {
$.ajax({
    url: "http://localhost:5000/users", 
    method: 'GET',
    dataType : 'json',
    success: function(data){
      if(data.data.length > 0){
        console.log("Fetched billers");
          for(let index = 0; index < data.data.length; index++) {
            var newRow = $("<tr>");
            var cols = "";
            var UserID = '';
            var UserName = '';
            var Email = '';
            var createdAt = '';
            var updatedAt = '';
            cols += '<td> '+ data.data[index].UserID +'</td>';
            cols += '<td> '+ data.data[index].UserName +'</td>';
            cols += '<td> '+ data.data[index].Email+'</td>';
            cols += '<td> '+ data.data[index].createdAt+'</td>';
            cols += '<td> '+ data.data[index].updatedAt+'</td>';
            newRow.append(cols);
            $("#allus .tbody").append(newRow);
          }
    }
  }
})
})


// premise IDs for select - bills
$(document).ready(() => {
$.ajax({
    url: "http://localhost:5000/premises", 
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
    url: "http://localhost:5000/users", 
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
