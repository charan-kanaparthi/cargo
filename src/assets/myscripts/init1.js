 $(document).ready(function() {
    alert("test1 inittt1.....");
	setTimeout(function()
	{ 
		$('#example').DataTable( {
			dom: 'Bfrtip',
			buttons: [
				'copy', 'csv', 'excel', 'pdf', 'print'
			]
			// "processing": true,
			// "bServerSide": true,
			// "sAjaxSource": "http://172.16.32.54/project/public/states",
			// "paginate":true,
		});
	},3000);
} );