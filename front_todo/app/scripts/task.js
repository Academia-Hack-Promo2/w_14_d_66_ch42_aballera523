var Task = function(container, data){
  url = 'http://localhost:3000/tasks'
  this.container = container;  

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
  this.id = data.id;
  this.title = data.title;
  this.status = data.status;
  this.priority = data.priority;
  this.date = data.date;
  this.category = data.category.name;
};

Task.prototype.draw = function() {

  builder = $("<div/>",{id:'task_'+this.id,class:"col-md-3 col-sm-4 col-xs-12"}).append(
    $("<div/>",{class:"row"}).append(
      $("<div/>",{class:"col-md-12"}).append(
        $("<div/>",{class:"task-degradado"}).append(
          $("<div/>",{class:"row"}).append(
            $("<div/>",{class:"col-md-3"}).append(
              $("<div/>",{class:"task-priority"})),
            $("<div/>",{class:"col-md-9"}).append(
              $("<div/>",{class:"task-date"}).append(
                $("<h4/>").html(this.date)))),
          $("<div/>",{class:"row"}).append(
            $("<div/>",{class:"col-md-12"}).append(
              $("<hr/>"),
              $("<div/>",{class:"task-title"}).html(this.title),
              $("<hr/>"))),
          $("<div/>",{class:"row"}).append(
            $("<div/>",{class:"col-md-12 text-center"}).append(
              $("<div/>",{class:"task-category"}).append(
                $("<strong/>").html(this.category))))),
        $("<div/>",{class:"row"}).append(
          $("<div/>",{class:"col-md-12"}).append(
            $("<div/>",{class:"task-left"}).append(
              $("<div/>",{class:"task-done"}).append(                
                $("<input/>",{"type":"checkbox","checked":"checked","data-toggle":"toggle","data-style":"ios","data-on":"undone","data-onstyle":"danger","data-off":"done","data-offstyle":"success"}))),
            $("<div/>",{class:"task-middle"}).append(
              $("<div/>",{class:"task-edit btn"}).append(
                $("<i/>",{class:"glyphicon glyphicon-edit"})
              )
            ),
            $("<div/>",{class:"task-right"}).append(
              $("<div/>",{class:"task-delete btn"}).append(
                $("<i/>",{class:"glyphicon glyphicon-trash"})
              )
            )
          )
        )
      )
    )
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