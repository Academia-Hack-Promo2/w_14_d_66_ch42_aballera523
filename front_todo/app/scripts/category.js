var Category = function(container, data){
  'use strict';
  url = 'http://localhost:3000/categories';
  this.container = container;

  if(container) {    
    this.id = container.data('category');
  }

  if(data) {    
    this.init(data);
    this.appendSection();
  } else {
    this.getData();
  }
};

Category.prototype.init = function(data) {
  'use strict';
  this.id = data.id;
  if (data.name === "sin categoria") {
    this.name = "Sin categoria";
  } else {
    this.name = data.name;
  } 
};
Category.prototype.draw = function() {

  builder = $("<div/>",{id:'category_'+this.id,class:"col-md-3 col-sm-4 col-xs-12"}).append(
      $("<div/>",{class:"row category-header"}).append(
        $("<div/>",{class:"col-md-12"}).append(
          $("<div/>",{class:"degradado text-center"}).append(
            $("<div/>",{class:"row"}).append(
              $("<div/>",{class:"col-md-12  task-category", id:'name_'+this.id}).html(this.name)
              ),
            $("<div/>",{class:"row"}).append(
              $("<div/>",{class:"col-md-12"}).append(
                $("<div/>",{class:"category-left", id:this.id}).append(
                  $("<div/>",{class:"category-edit btn"}).append(
                    $("<i/>",{class:"glyphicon-category glyphicon-edit"})
                    )
                  ),
                $("<div/>",{class:"category-right delete-category", id:this.id}).append(
                  $("<div/>",{class: "category-delete btn"}).append(
                    $("<i/>",{class:"glyphicon-category glyphicon-trash"})
                    )
                  )
                )
              )
            )
          )
        )
      );
  return builder;
};

Category.prototype.getData = function() {
  'use strict';
  var self = this;
  $.ajax({
    type: 'get',
    url: 'http://localhost:3000/categories',
    success: function(data){
      self.init(data);
      self.appendSection();
    },
    error: function(xhr){      
      console.log('Error Recibieno Data Category Del Servidor');
    }
  });
};

Category.prototype.appendSection = function() {
  'use strict';
  if (this.container) {
    this.container.append(this.draw());
  } else {
    console.log('Error Al Dibujar Category En El Contenedor');
  }
};