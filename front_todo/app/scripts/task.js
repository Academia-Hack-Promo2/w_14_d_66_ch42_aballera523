var Task = function(container, data){
  url = 'http://localhost:3000/tasks'
  this.container = container;
  console.log(data);

  if(container) {    
    this.id = container.data('task');
  }

  if(data) {    
    this.init(data);
    this.appendSection();
  } else {
    this.getData();
  }
}

Task.prototype.init = function(data) {
  id = data.id;
  title = data.title;
  status = data.status;
  priority = data.priority;
  date = data.date;
  category = data.category.name;
};

Task.prototype.draw = function() {

  builder = $("<div/>",{id:'task_'+id,class:"col-xs-8 col-sm-5 col-md-3"}).append(
    $("<div/>",{class:"row task-gradient"}).append(
      $("<div/>",{class:"row task-header"}).append(
        $("<div/>",{class:"col-md-3 task-priority"}).html(priority),
        $("<div/>",{class:"col-md-9 task-date"}).html(date)),

      $("<div/>",{class:"row task-title"}).html(title),

      $("<div/>",{class:"row image"}).append(
        $("<img/>",{class:"probando", src:"images/task.jpg"})),

      $("<div/>",{class:"row task-category"}).html(category)),

    $("<div/>",{class:"row task-footer"}).append(
      $("<div/>",{class:"col-md-6 task-done"}).html('Done'),
      $("<div/>",{class:"col-md-3 task-edit"}).html('Update'),
      $("<div/>",{class:"col-md-3 task-delete"}).html('Delete'))
  );
  return builder;
};

Task.prototype.getData = function() {
  var self = this;
  $.ajax({
    type: 'get',
    url: 'http://localhost:3000/tasks',
    success: function(data){
      self.init(data);
      self.appendSection();
    },
    error: function(xhr){      
      console.log('Error Recibieno Data Task Del Servidor');
    }
  });
};

Task.prototype.appendSection = function() {
  if (this.container) {
    this.container.append(this.draw());
  } else {
    console.log('Error Al Dibujar Task En El Contenedor');
  }
};