var Task = function(container, data){
  'use strict';
  url = 'http://localhost:3000/tasks';
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
};

Task.prototype.init = function(data) {
  'use strict';
  this.id = data.id;
  this.title = data.title;
  this.status = data.status;
  this.priority = data.priority;
  this.date = data.date;
  this.category = data.category.name; 
  this.category_id = data.category.id; 
};

Task.prototype.draw = function() {
  builder = $('<div/>',{id:'task_'+this.id,class:'col-md-3 col-sm-4 col-xs-12'}).append(
    $("<div/>",{class:"row"}).append(
      $("<div/>",{class:"col-md-12"}).append(
        $("<div/>",{class:"task-degradado"}).append(
          $("<div/>",{class:"row"}).append(
            $("<div/>",{class:"col-md-3"}).append(
              $("<div/>",{class:"task-priority"})
              ),
            $("<div/>",{class:"col-md-9"}).append(
              $("<div/>",{class:"task-date"}).append(
                $("<h4/>",{id:"date_"+this.id, value:this.date}).html(this.date)
                )
              )
            ),
          $("<div/>",{class:"row"}).append(
            $("<div/>",{class:"col-md-12"}).append(
              $("<hr/>"),
              $("<div/>",{class:"task-title", id:"title_"+this.id}).html(this.title),
              $("<hr/>")
              )
            ),
          $("<div/>",{class:"row"}).append(
            $("<div/>",{class:"col-md-12 text-center"}).append(
              $("<div/>",{class:"task-category"}).append(
                $("<strong/>",{id:"category_"+this.id}).html(this.category).attr("data-id",this.category_id)
                )
              )
            )
          ),
        $("<div/>",{class:"row"}).append(
          $("<div/>",{class:"col-md-12"}).append(
            $("<div/>",{class:"task-left", id:this.status+'_status'+'_'+this.id}).append(
              $("<div/>",{class:"task-done", id:'status_'+this.id}).append(                
                $("<input/>",{class:'check', type:"checkbox","checked":"checked","data-toggle":"toggle","data-style":"ios","data-on":"undone","data-onstyle":"danger","data-off":"done","data-offstyle":"success"})
                )
              ),
            $("<div/>",{class:"task-middle", id:this.id}).append(
              $("<div/>",{class:"task-edit btn"}).append(
                $("<i/>",{class:"glyphicon glyphicon-edit"})
                )
              ),
            $("<div/>",{class:"task-right", id:this.id}).append(
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

Task.prototype.functions = function(first_argument) {
  // body...
};

Task.prototype.deleteTask = function(){
   $.ajax({
     type: 'delete',
     data: {_method: 'delete'},
     url: 'http://localhost:3000/tasks/'+this.id,
     success: function(data){
       var header = $('#header');
       var container = $('#cat-cont');
       tasks = new Task(container,header);
     },
     error: function(){
       console.log('error al eliminar')
     }
   });
}
