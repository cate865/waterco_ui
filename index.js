
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
            $('#PremiseID').append('<option value="' + data.data[index].PremiseId + '">' + data.data[index].PremiseId + '</option>');
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