$(document).ready(function() {
    $('select').change(function() {
     $('select option')[0].value=$('select option:selected').val();
     $('select option')[0].innerHTML=$('select option:selected').val();
     $("select").val($('select option:selected').val());
			
			console.log($('select option:selected').val());
    });
  });

$(document).ready(() => {

$.ajax({
    url: "http://localhost:5000/premises", 
    method: 'GET',
    success: function(res){
        if(res.rows.length > 0){
            for(let index = 0; index < res.rows.length; index++) {
                var newRow = $("<tr>");
                var cols = "";
                var premiseId = '';
                var MeterNo = '';
                var Customerid = '';
                var RID = '';
                cols += '<td> '+ res.rows[index].premiseId +'</td>';
                cols += '<td> '+ res.rows[index].MeterNo +'</td>';
                cols += '<td> '+ res.rows[index].Customerid+'</td>';                
                newRow.append(cols);
                $("#allpr .tbody").append(newRow);
            }  

        }
    }
})
})