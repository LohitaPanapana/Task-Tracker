$(document).ready(function() {
	var tasks = [];
	var count = 0;
	var cnt = 0;
	var taskCount = {
		pending: 0,
		completed: 0
	};

	//Adding initial data in table
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

	//Adding new todo element to array
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

	//Displays the list of todos in HTML table
	function showList(list){
		$('tbody').html("");

		list.forEach(function(item){
			var taskList = "<tr scope='row'><td>" + item.id + "</td><td>" + item.date + "</td><td>" + item.task + "</td><td>" + item.status +"</td></tr>";
			$('tbody').append(taskList);
		})
		countTask();
	}

	//Change the status of tasks from Pending to Completed and vice-versa
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
	});

	//Sort the todos based on date either in ascending order or descending order
	$('#sortByDate').click(function(){
		count = count + 1;
		$('tbody').fadeToggle(500, function(){
			(count % 2 == 0) ? sortByDateASC() : sortByDateDESC();
			showList(tasks);
			$(this).fadeToggle(1000, function(){
			});
		})
	});

	//Sort the todos based on status
	$('#sortByStatus').click(function(){
		cnt++;
		$('tbody').fadeToggle(500, function(){
			(cnt % 2 == 0) ? pendingTask() : completedTask();
			showList(tasks);
			$(this).fadeToggle(1000, function(){
			});
		})
	});

	//Generate chart based on number of pending and completed tasks
	$('#generateChart').click(function(){
		
		$('.canvas').slideDown(1000, function(){
			createChart();
			$('.canvas').css("display","block");
		})
	});

	//Close the chart
	$('.close-btn').click(function(){
		$('.canvas').slideUp(1500, function(){
			$('.canvas').css("display","none");
		})
	});

	//Change the status in corresponding object
	function stateChange(data){
		var index = data.replace(/<td>/g,"").split("</td")[0];
		tasks.forEach(function(task){
			if(task.id == index){
				(task.status === "Completed") ? task.status = "Pending" : task.status = "Completed";
			}
		});
		countTask();
	}

	//Sort the task in ascending order based on date
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

	//Sort the task in descending order based on date
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

	//Sort the task based on status - displays pending tasks first
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

	//Sort the task based on status - displays completed tasks first
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
	
	//Counts the number of pending and completed tasks
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

	//To display chart using Chart.js
	function createChart(){
		Chart.defaults.global.defaultFontColor = '#000';
		Chart.defaults.global.defaultFontWeight = 'bold';

		var ctx = document.getElementById('myChart');
		var myChart = new Chart(ctx, {
			type: 'doughnut',
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