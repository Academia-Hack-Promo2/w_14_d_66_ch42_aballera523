$(function(){

  var $tasksSection = $('.tasksSection');
  var tasks = new Tasks($tasksSection);

  var $categoriesSection = $('.categoriesSection');
  var categories = new Categories($categoriesSection);

  $(function(){
  	console.log("aqui");
  	var toogles = $('.task-done');
  	for (var i = 0; i < toogles.length; i++) {
  		
  	};
  }());
//provando

	var printNewCategory = function(data){
		$('#categories').prepend('<option value="' + data.id + '">' + data.name + '</option>');
		
	};
	var newCategory = function(nameCategory){
		$.post('http://localhost:3000/categories',
			{
				name: nameCategory
			},
			function(data, status){
		        if (data.name === nameCategory) {
		        	$('#nameError').html('');
		        	printNewCategory(data);
		        	addCategory(data);
		        	$('#smallModal').modal('toggle');
		        } else {
		        	$('#nameError').html('El nombre de la categoria debe ser unico');
		        	return;
		    	};
		    	
		    	
	    	});
	
	};
	$('#new-category-botton').click(function(){
		$('#smallModal').show();
			$('#newCategoryModal').click(function(){				 
				newCategory($('#categoryName').val());
				
			});
		$("input").empty()
		$('#smallModal').modal('hide');	
	});
	var categorysTask = function(){
		$.get('http://localhost:3000/categories', function(data){
			for (var i = 0; i <= data.length-1; i++) {
				$('#categories').append('<option value="' + data[i].id + '">' + data[i].name + '</option>');
			}
		});
	}
	var	editTask = function(id, edit, query,taskId){
		$.ajax({
		 		url:'http://localhost:3000/tasks/'+id,
		 		type:query,
		 		data: edit,
		 		success: function(data){	
		 			
		 			$('#date_'+id).html(data.date); 
		 			$('#title_'+id).html(data.title);
		 			$('#category_'+id).html(data.category.name);	
		 			console.log(data.status);
		 			$('#'+taskId).attr('id',data.status+'_status'+'_'+data.id)
		 			//id:this.status+'_status'+'_'+this.id
		 			if (data.status=="done") {
		 				$('#status_'+id).children('div').hasClass('toogle btn ios btn-succes off');	
		 			}
		 			else{
		 				$('#status_'+id).children('div').hasClass('toogle btn ios btn-danger');	
		 			}
		 			

		 		}
		 });
	}
	var newTask = function(taskTitle, taskPriority, taskDate, taskCategory){
		$.post('http://localhost:3000/tasks',
				{
					title: taskTitle,
					status: 0,
					priority: taskPriority,
					date: taskDate,
					category_id: taskCategory
				},
				function(data, status){
					console.log('Data: ' + data + '\nStatus: ' + status);
					var newTask = new Task(null, data);
					$('#allTasks').append(newTask.draw());
					$('.check').bootstrapToggle();

				});
	};
	$('#modal_botton').click(function(){
		$('#newCatergory').show();
		categorysTask();
			$('#newCategoryModal').click(function(){				 
				newCategory($('#categoryName').val());
			});
			$('#taskNew').click(function(){
				newTask($('#title').val(), $('select#priority').val(), 
					$('#finish_date').val(), $('select#categories').val());
				$('#myModal').modal('toggle');
			
				}
				);
			});
		//resuelve el super peo de los botones 
	$(document).on("click",'.task-right',function(){
		var id = this.id;
		 $.ajax({
		 		url:'http://localhost:3000/tasks/'+this.id,
		 		type:'post',
		 		data: {_method: 'delete'},
		 		success: function(data){
		 			$('#task_'+id).remove();
		 		}
		 });
	});

	$(document).on("click",'.task-middle',function(){
		var id = this.id;
		$('#newCatergory').hide();
		$('#myModal').modal('show');
		categorysTask();
		$('#taskNew').click(function(){
			var data = {
					 			title: $('#title').val(),
								status: 0,
								priority: $('select#priority').val(),
								date: $('#finish_date').val(),
								category_id: $('select#categories').val()	}
			
			editTask(id, data, "put");
			$('#myModal').modal('toggle');
			$("input").empty()
			console.log(id);
			 
		});

	});
	$(document).on("click",".task-left",function(){
		id = this.id[this.id.length-2]+this.id[this.id.length-1];
		var taskStatus = this.id.split("_",1);
		console.log(taskStatus);
		if (taskStatus=='done') {
			taskStatus= 0
		}
		else {
			taskStatus = 1	
		}
		data = {
			title:$('#title_'+id).html(),
			status:taskStatus,
			priority:0,
			date:$('#date_'+id).html(),
			category_id:$('#category_'+id).data('id')
		}
		editTask(id,data,'put',this.id);
	});

		$(document).on("click",'.category-right',function(){
			id = this.id;
			$.ajax({
				url:'http://localhost:3000/categories/'+this.id,
				type:'post',
				data: {_method: 'delete'},
				success: function(data){
					$(document).ready(function(){
						$('#category_'+id).remove();
					})
					
				},
				error: function(data){
					console.log(data)
					
				}

			});
		});


	});
	var	editCategory = function(id, info){
		$.ajax({
		 		url:'http://localhost:3000/categories/'+id,
		 		type:'put',
		 		data: info,
		 		success: function(data){
		 			$('#name_'+data.id).empty();
		 			$('#name_'+data.id).html(data.name);


		 		//Esta es una solucion, pero es refrescando TODO
		 		// 	$('.categoriesSection').empty();
		 		// 	var $categoriesSection = $('.categoriesSection');
					// var categories = new Categories($categoriesSection);			
		 		}
		 });
	}
	$(document).on("click",'.category-left',function(){
			var id = this.id;
			$('#editModal').modal('show');
			$('#editCategoryModal').click(function(){
				var info = {
					name: $('#editCategoryName').val(),
				}
				editCategory(id, info);
				$("input").empty()
				$('#editModal').modal('hide');				 
			});

	});
	
	var addCategory = function(data){
		console.log(data);
		$("#row-category").append(
			$("<div/>",{id:'category_'+data.id,class:"col-md-3 col-sm-4 col-xs-12"}).append(
				$("<div/>",{class:"row category-header"}).append(
					$("<div/>",{class:"col-md-12"}).append(
						$("<div/>",{class:"degradado text-center"}).append(
							$("<div/>",{class:"row"}).append(
								$("<div/>",{class:"col-md-12  task-category", id:'name_'+data.id}).html(data.name)
								),
							$("<div/>",{class:"row"}).append(
								$("<div/>",{class:"col-md-12"}).append(
									$("<div/>",{class:"category-left", id:data.id}).append(
										$("<div/>",{class:"category-edit btn"}).append(
											$("<i/>",{class:"glyphicon-category glyphicon-edit"})
											)
										),
									$("<div/>",{class:"category-right delete-category", id:data.id}).append(
										$("<div/>",{class: "category-delete btn"}).append(
											$("<i/>",{class:"glyphicon-category glyphicon-trash"})
											)
										)
									)
								)
							)
						)
					)
				)
			);
	}

////////////////////////////////////
 // Everything to handle TimePicker
$('#datetimepicker1').datetimepicker({
      format:'YYYY-MM-DD'
}); // Cierra DateTimePicker
////////////////////////////////////
