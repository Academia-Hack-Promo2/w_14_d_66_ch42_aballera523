
var Categories = function(container, data){
	url = 'http://localhost:3000/categories'
	this.container = container;

	if (data) {
		this.init(data);
		this.appendSection();
	} else {
		this.getData();
	}
}

Categories.prototype.init = function(data) {
	var category;
	this.categories = [];

	for (var i = 0; i < data.length; i++) {
	 category = new Category(null, data[i]);
	 this.categories.push(category);
	}
};

Categories.prototype.draw = function() {
  var builder = $("<div/>",{class:'row'});

  for(var i = 0; i < this.categories.length; i++) {
    builder.append(this.categories[i].draw());
  }
  return builder;
};

Categories.prototype.getData = function() {
	var self = this;
	$.ajax({
		type: 'get',
		url: 'http://localhost:3000/categories',
		success: function(data){
			self.init(data);
			self.appendSection();
		},
		error: function(xhr){
			console.log('Error Recibiendo Data Categories Del Servidor');
		}
	});
};

Categories.prototype.appendSection = function() {
	if (this.container) {
		this.container.append(this.draw());		
	} else {
		console.log('Error Al Dibujar Categories En El Contenedor');
	}
};