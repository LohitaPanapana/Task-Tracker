$(document).ready(function() {
	var tasks = [];
	tasks.push({
		id: 1,
		date: '27-5-2019',
		task: 'task',
		status: 'status'
	});
	showList(tasks);

	$('#add').click(function(){
		var id = 2;
		var today = new Date();
		var date = today.getDate()+'-'+(today.getMonth()+1)+'-'+today.getFullYear();
		var task = $('input[type="text"]').val();
		$('input[type="text"]').val("");
		var status = "Pending";
		tasks.push({
			id: id,
			date: date,
			task: task,
			status: status
		});
		showList(tasks);
		console.log(tasks);
	});

	function showList(list){
		$('tbody').html("");

		list.forEach(function(item){
			var taskList = "<tr scope='row'><td>" + item.id + "</td><td>" + item.date + "</td><td>" + item.task + "</td><td>" + item.status +"</td></tr>";
			$('tbody').append(taskList);
		})
	}

	$('tbody').on("click","tr", function(){
		$(this).css("background-color", "rgba(0, 255, 0, 0.5)");
		if($(this).html().indexOf("Pending") !== -1){
			var data = $(this).html().replace("Pending", "Completed");
			$(this).html(data);
		}
	})
});