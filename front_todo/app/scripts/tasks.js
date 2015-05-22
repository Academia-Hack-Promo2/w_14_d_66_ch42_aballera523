var host = 'http://localhost:3000'

var Tasks = function(container, data){
	this.url = host
	this.container = container;

	if (data) {
		this.init(data);
		this.draw();
	} else {
		this.getData();
	};
}

Tasks.prototype.init = function(data) {
	var tasks;
	this.tasks = [];

};

Task.prototype.getData = function() {
	var self = this;

	$.ajax({
		type: 'get',
		url: host + this.id,
		success: 
	})
};