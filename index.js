
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
            cols += '<td> '+ data.data[index].PremiseId +'</td>';
            cols += '<td> '+ data.data[index].MeterNo +'</td>';
            cols += '<td> '+ data.data[index].Customerid+'</td>';
            cols += '<td> '+ data.data[index].Routeid+'</td>';       
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
            cols += '<td> '+ data.data[index].Customerid +'</td>';
            cols += '<td> '+ data.data[index].CustName +'</td>';
            cols += '<td> '+ data.data[index].TelephoneNo+'</td>';
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
            cols += '<td> '+ data.data[index].billid +'</td>';
            cols += '<td> '+ data.data[index].PremiseId +'</td>';
            cols += '<td> '+ data.data[index].UserID+'</td>';
            cols += '<td> '+ data.data[index].Reading+'</td>';
            cols += '<td> '+ data.data[index].Amount+'</td>';
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
            var ExpectedAmount = '';
            var PaidAmount = '';
            var PremiseId = '';
            cols += '<td> '+ data.data[index].TransactionID +'</td>';
            cols += '<td> '+ data.data[index].billid +'</td>';
            cols += '<td> '+ data.data[index].ExpectedAmount+'</td>';
            cols += '<td> '+ data.data[index].PaidAmount+'</td>';
            cols += '<td> '+ data.data[index].PremiseId+'</td>';
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
            cols += '<td> '+ data.data[index].UserID +'</td>';
            cols += '<td> '+ data.data[index].UserName +'</td>';
            cols += '<td> '+ data.data[index].Email+'</td>';
            newRow.append(cols);
            $("#allus .tbody").append(newRow);
          }
    }
  }
})
})
