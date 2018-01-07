  $(document).ready(function() {
	  var selectedDate = null;
	  var $hiddenInput = $('#hiddenFieldID');
	setTimeout(function()
	{ 
		$('#example').DataTable( {
			scrollY:"900px",
			scrollX:true,
			scrollCollapse: true,
			// responsive:true,
			columnDefs: [
				{ width: '20%', targets: 0 }
			],
			fixedColumns: true,
			paginate:true,
			dom:
				"<'row'<'col-sm-4'l><'col-sm-5 text-center'B><'col-sm-3'f>>" +
				"<'row'<'col-sm-12'rt>>" +
				"<'row '<'col-sm-5'i><'col-sm-7'p>>",
				buttons: [
					{
						extend:    'copyHtml5',
						text:      '<i class="fa fa-copy"></i>',
						titleAttr: 'Copy'
					},
					{
						extend:    'excelHtml5',
						text:      '<i class="fa fa-file-excel-o"></i>',
						titleAttr: 'Excel'
					},
					{
						extend:    'csvHtml5',
						text:      '<i class="fa fa-file-text-o"></i>',
						titleAttr: 'CSV'
					},
					{
						extend:    'pdfHtml5',
						text:      '<i class="fa fa-file-pdf-o"></i>',
						titleAttr: 'PDF'
					}
				]
			} );
	  },3000);
});