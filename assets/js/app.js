$(document).ready(function() {
	var tasks = [];

	$('#add').click(function(){
		var id = 2;
		var today = new Date();
		var date = today.getDate()+'-'+(today.getMonth()+1)+'-'+today.getFullYear();
		var task = $('input[type="text"]').val();
		$('input[type="text"]').val("");
		var status = "Pending";
		var taskList = "<tr scope='row'><td>" + id + "</td><td>" + date + "</td><td>" + task + "</td><td>" + status +"</td></tr>";
		$('tbody').append(taskList);
		tasks.push({
			id: id,
			date: date,
			task: task,
			status: status
		});
		console.log(tasks);
	});

	

});