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
  if (data.name === "uncategorized") {
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
              $("<div/>",{class:"col-md-12  task-category"}).html(this.name)
              ),
            $("<div/>",{class:"row"}).append(
              $("<div/>",{class:"col-md-12"}).append(
                $("<button/>",{class:"category-button"}).append(
                  $("<a/>",{href:"#"}).append(
                    $("<i/>",{class:"glyphicon-category glyphicon-edit"})
                    )
                  ),
                $("<button/>",{class:"category-button delete-category", id:this.id}).append(
                  $("<a/>",{href:"#"}).append(
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