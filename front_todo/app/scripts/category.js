var Category = function(container, data){
  url = 'http://localhost:3000/categories'
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
}

Category.prototype.init = function(data) {
  id = data.id;
  name = data.name;  
};

Category.prototype.draw = function() {

  builder = $("<div/>",{id:'category_'+id,class:"col-xs-12 col-sm-6 col-md-4"}).append(
    $("<div/>",{class:"row category-gradient"}).append(
      $("<div/>",{class:"row category-header"}).append(
        $("<div/>",{class:"col-md-3 category-algo1"}).html("Algo 1"),
        $("<div/>",{class:"col-md-9 category-algo2"}).html("Algo 2")),

      $("<div/>",{class:"row category-name"}).html(name),

      $("<div/>",{class:"row image"}).append(
        $("<img/>",{class:"prueba", src:"images/Categories.jpg"}))),

      //$("<div/>",{class:"row category-category"}).html(this.category_id)),

    $("<div/>",{class:"row category-footer"}).append(
      $("<div/>",{class:"col-md-6 category-done"}).html('Done'),
      $("<div/>",{class:"col-md-3 category-edit"}).html('Update'),
      $("<div/>",{class:"col-md-3 category-delete"}).html('Delete'))
  );
  return builder;
};

Category.prototype.getData = function() {
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
  if (this.container) {
    this.container.append(this.draw());
  } else {
    console.log('Error Al Dibujar Category En El Contenedor');
  }
};