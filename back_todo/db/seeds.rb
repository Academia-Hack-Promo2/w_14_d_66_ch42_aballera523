# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rake db:seed (or created alongside the db with db:setup).
#
# Examples:
#
#   cities = City.create([{ name: 'Chicago' }, { name: 'Copenhagen' }])
#   Mayor.create(name: 'Emanuel', city: cities.first)


categories = Category.create([
	{name: 'Sin Categoria'}, 
	{name: 'Negocios'},
	{name: 'Familia'},
	{name: 'Estudios'},
	{name: 'Iglesia'},
	{name: 'Gimnasio'},
	{name: 'Vacaciones'}
	])

tasks = Task.create([
	{title: 'Terminar reto final de Hack', status: 1, priority: 0, date: '2015-05-22', category_id: 4},
	{title: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Rem ad, iure illo magni harum quos facere a cumque nobis distinctio tenetur voluptates, fuga quae dolor earum eos quod quis neque?', status: 0, priority: 1, date: '2015-05-18', category_id: 3},
	{title: 'Lorem ipsum dolor sit amet, aut? Nam maxime dolore placeat, architecto fugiat dolorum fuga iusto quidem. ipsum dolor sit amet, consectetur adipisicing elit. Odio minus unde ipsum  omnis, voluptas rerum corrupti?', status: 1, priority: 1, date: '2015-05-28', category_id: 3},
	{title: 'Comprar Pañales, donde se encuentre', status: 0, priority: 1, date: '2015-05-20', category_id: 3},
	{title: 'Reunión en Hack para entregar el reto final', status: 0, priority: 1, date: '2015-05-12', category_id: 4},
	{title: 'Estudio biblico', status: 0, priority: 1, date: '2015-05-20', category_id: 5},
	{title: 'Comprar suplementos alimenticios en Goldgym', status: 1, priority: 1, date: '2015-05-10', category_id: 6},
	{title: 'Comprar pasajes para Margarita, salida 01 agosto, retorno 24 agosto', status: 0, priority: 0, date: '2015-05-15', category_id: 7},
	{title: 'Reservar hotel en Playa El Agua, durante las fechas del 01 agosto al 24 agosto', status: 1, priority: 2, date: '2015-05-21', category_id: 7},
	{title: 'Comprar 5 entradas para Playa El Agua: 2 adultos y 3 niños', status: 0, priority: 2, date: '2015-05-22', category_id: 7},
	{title: 'Comprar Biblia', status: 0, priority: 2, date: '2015-05-25', category_id: 5},
	{title: 'Comprar regalo del día del padre', status: 0, priority: 2, date: '2015-05-23', category_id: 3}
	])