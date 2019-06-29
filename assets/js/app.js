$(document).ready(function() {
	var tasks = [];
	var count = 0;
	var cnt = 0;
	var taskCount = {
		pending: 0,
		completed: 0
	};
	tasks.push({
		id: 1,
		date: '2019-4-20',
		task: 'Attend meeting',
		status: 'Completed'
	},
	{
		id: 2,
		date: '2018-5-31',
		task: 'Prepare documentation',
		status: 'Pending'
	});
	showList(tasks);

	$('#add').click(function(){
		var id = tasks.length + 1;
		var today = new Date();
		var date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
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
	});

	function showList(list){
		$('tbody').html("");

		list.forEach(function(item){
			var taskList = "<tr scope='row'><td>" + item.id + "</td><td>" + item.date + "</td><td>" + item.task + "</td><td>" + item.status +"</td></tr>";
			$('tbody').append(taskList);
		})
		countTask();
	}

	$('tbody').on("click","tr", function(){
		$(this).css("background-color", "rgba(0, 255, 0, 0.5)");
		
		var content = $(this).html();
		if(content.indexOf("Pending") !== -1){
			var data = content.replace("Pending", "Completed");
			$(this).html(data);
		}

		else if(content.indexOf("Completed") !== -1){
			var data = content.replace("Completed", "Pending");
			$(this).html(data);
		}

		stateChange(content);

	})

	$('#sortByDate').click(function(){
		count = count + 1;
		(count % 2 == 0) ? sortByDateASC() : sortByDateDESC();
		showList(tasks);
	});

	$('#sortByStatus').click(function(){
		cnt++;
		(cnt % 2 == 0) ? pendingTask() : completedTask();
		showList(tasks);
	});

	$('#generateChart').click(function(){
		createChart();
		$('.canvas').css("display","block");
	});

	$('.close-btn').click(function(){
		$('.canvas').css("display","none");
	});

	function stateChange(data){
		var index = data.replace(/<td>/g,"").split("</td")[0];
		tasks.forEach(function(task){
			if(task.id == index){
				(task.status === "Completed") ? task.status = "Pending" : task.status = "Completed";
			}
		});
		countTask();
	}

	function sortByDateASC(){
		for(var i = 0; i < tasks.length-1; i++){
			var temp = '';
			for(var j = i+1; j < tasks.length; j++){
				if(new Date(tasks[i].date).getTime() > new Date(tasks[j].date).getTime()){
					temp = tasks[i];
					tasks[i] = tasks[j];
					tasks[j] = temp;
				}
			}
		}
	}

	function sortByDateDESC(){
		for(var i = 0; i < tasks.length-1; i++){
			var temp = '';
			for(var j = i+1; j < tasks.length; j++){
				if(new Date(tasks[i].date).getTime() < new Date(tasks[j].date).getTime()){
					temp = tasks[i];
					tasks[i] = tasks[j];
					tasks[j] = temp;
				}
			}
		}
	}

	function pendingTask(){
		for(var i = 0; i < tasks.length-1; i++){
			var temp ='';
			for(var j = i+1; j < tasks.length; j++){
				if(tasks[i].status > tasks[j].status){
					temp = tasks[i];
					tasks[i] = tasks[j];
					tasks[j] = temp;
				}
			}
		}
	}

	function completedTask(){
		for(var i = 0; i < tasks.length-1; i++){
			var temp ='';
			for(var j = i+1; j < tasks.length; j++){
				if(tasks[i].status < tasks[j].status){
					temp = tasks[i];
					tasks[i] = tasks[j];
					tasks[j] = temp;
				}
			}
		}
	}
	
	function countTask(){
		taskCount.pending = 0;
		taskCount.completed = 0;
		tasks.forEach(function(task){
			if(task.status === "Pending"){
				taskCount.pending++;
			} else if(task.status === "Completed"){
				taskCount.completed++;
			}
		})
	}

	//To display chart
	function createChart(){
		Chart.defaults.global.defaultFontFamily = 'Lato';
		Chart.defaults.global.defaultFontColor = '#000';

		var ctx = document.getElementById('myChart');
		var myChart = new Chart(ctx, {
			type: 'pie',
			data: {
				labels: ['Pending', 'Completed'],
				datasets: [{
					label: 'Number of tasks',
					data: [taskCount.pending, taskCount.completed],
					backgroundColor: [
						'rgba(255, 159, 64, 0.7)',
						'rgba(25, 236, 142, 0.7)',
					],
					borderColor: [
						'rgba(255, 159, 64, 1)',,
						'rgba(25, 236, 142, 1)'
					],
					borderWidth: 1
				}]
			},
			options: {
				scales: {
					yAxes: [{
						ticks: {
							beginAtZero: true
						}
					}]
				}
			}
		});
	}

});