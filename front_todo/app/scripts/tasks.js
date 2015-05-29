
var Tasks = function(container, data){
	var url = 'http://localhost:3000/tasks';
	this.container = container;
	this.functions = [];

	this.functions.push(function(){
		return($('.task-right').click(function(){
			var id = {'id':$(this).attr('id'),'Task':''};
			task = new Task(id);
			task.deleteTask();
		}))
	});

	if (data) {
		this.init(data);
		this.appendSection();
	} else {
		this.getData();
	}
};

Tasks.prototype.init = function(data) {
	var task;
	this.tasks = [];

	for (var i = 0; i < data.length; i++) {
	 task = new Task(null, data[i]);
	 this.tasks.push(task);
	}
};

Tasks.prototype.draw = function() {
  var builder = $('<div/>',{class:'row'});

  for(var i = 0; i < this.tasks.length; i++) {
    builder.append(this.tasks[i].draw());
  }
  return builder;
};

Tasks.prototype.getData = function() {
	var self = this;
	$.ajax({
		type: 'get',
		url: 'http://localhost:3000/tasks',
		success: function(data){
			self.init(data);
			self.appendSection();
		},
		error: function(xhr){
			console.log('Error Recibieno Data Tasks Del Servidor');
		}
	});
};

Tasks.prototype.appendSection = function() {
	if (this.container) {
		this.container.append(this.draw());		
		$('.check').bootstrapToggle();
	} else {
		console.log('Error Al Dibujar Tasks En El Contenedor');
	}
};