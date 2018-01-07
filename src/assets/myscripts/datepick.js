$(document).ready(function(){
		var date_input=$('input[name="date"]'); //our date input has the name "date"
		//var container=$('.bootstrap-iso form').length>0 ? $('.bootstrap-iso form').parent() : "head";
		date_input.datepicker({
			format: 'dd/mm/yyyy',
			//container: container,
			todayHighlight: true,
			autoclose: true,
		})
	});

// $(function () {
// 	$('#datetimepicker4').datetimepicker();
// });