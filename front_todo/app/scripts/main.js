$(function(){

  var $tasksSection = $('.tasksSection');
  var tasks = new Tasks($tasksSection);

  var $categoriesSection = $('.categoriesSection');
  var categories = new Categories($categoriesSection);

//provando

	var printNewCategory = function(data){
		$('#categories').prepend('<option value="' + data.id + '">' + data.name + '</option>');
	};
	var newCatergory = function(nameCategory){
		$.post('http://localhost:3000/categories',
		{
			name: nameCategory
		},
		 function(data, status){
        if (data.name === nameCategory) {
        	$('#nameError').html('');
        	printNewCategory(data);
        	$('#smallModal').modal('toggle');
        }
        else {
        	$('#nameError').html('El nombre de la categoria debe ser unico');
        	return;
      }
    });
	};
	var newTask = function(taskTitle, taskStatus, taskPriority, taskDate, taskCategory){
		$.post('http://localhost:3000/tasks',
				{
					title: taskTitle,
					status: taskStatus,
					priority: taskPriority,
					date: taskDate,
					category_id: taskCategory
				},
				function(data, status){
					console.log('Data: ' + data + '\nStatus: ' + status);
				});
	};
	$('#modal_botton').click(function(){
		$.get('http://localhost:3000/categories', function(data){
			for (var i = 0; i <= data.length-1; i++) {
				$('#categories').append('<option value="' + data[i].id + '">' + data[i].name + '</option>');
			}
		});
			$('#newCategoryModal').click(function(){				 
				newCatergory($('#categoryName').val());
			});
			$('#taskNew').click(function(){
				newTask($('#title').val(), parseInt($('select#status').val()), parseInt($('select#priority').val()), 
					$('#finish_date').val(), parseInt($('select#categories').val()));
				$('#myModal').modal('toggle');
			
				}
				);
			});
		//resuelve el super peo de los botones 
		$(document).on("click",'.task-delete',function(){
			alert('q funcione!!!!');
		});
		$(document).on("click",'.delete-category',function(){
			var id = this.id;
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

////////////////////////////////////
  // Everything to handle TimePicker
$('#datetimepicker1').datetimepicker({
      format:'YYYY-MM-DD'
}); // Cierra DateTimePicker
////////////////////////////////////
