# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rake db:seed (or created alongside the db with db:setup).
#
# Examples:
#
#   cities = City.create([{ name: 'Chicago' }, { name: 'Copenhagen' }])
#   Mayor.create(name: 'Emanuel', city: cities.first)

Category.create(name: 'sin categoria')
Category.create(name: 'Negocios')
Category.create(name: 'Familia')
Category.create(name: 'Estudios')
Category.create(name: 'Iglesia')
Category.create(name: 'Gimnasio')
Category.create(name: 'Vacaciones')

Task.create(title: 'Terminar reto', status: 1, priority: 0, date: '2015-05-20', category_id: 3)
Task.create(title: 'Hacer mercado', status: 0, priority: 1, date: '2015-05-20', category_id: 2)
Task.create(title: 'Ir al cine', status: 1, priority: 1, date: '2015-05-20', category_id: 2)
Task.create(title: 'Comprar Pañales', status: 0, priority: 1, date: '2015-05-20', category_id: 2)
Task.create(title: 'Reunión en Hack', status: 0, priority: 1, date: '2015-05-20', category_id: 3)
Task.create(title: 'Estudio biblico', status: 0, priority: 1, date: '2015-05-20', category_id: 4)
Task.create(title: 'Comprar suplementos alimenticios', status: 1, priority: 1, date: '2015-05-20', category_id: 5)
Task.create(title: 'Comprar pasajes', status: 0, priority: 0, date: '2015-05-20', category_id: 6)
Task.create(title: 'Reservar hotel', status: 1, priority: 2, date: '2015-05-20', category_id: 6)
Task.create(title: 'Comprar entradas en Playa El Agua', status: 0, priority: 2, date: '2015-05-20', category_id: 6)
Task.create(title: 'Comprar Biblia', status: 0, priority: 2, date: '2015-05-20', category_id: 4)
Task.create(title: 'Comprar regalo del día del padre', status: 0, priority: 2, date: '2015-05-20', category_id: 2)

