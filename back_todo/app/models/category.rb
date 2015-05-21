class Category < ActiveRecord::Base
	before_destroy :recategorized_task
	has_many :tasks, dependent: :destroy
	validates :name, uniqueness: true ,presence: true, length: { maximum: 20 }
	

	def recategorized_task
		#category = Category.where('name = ?', 'uncategorised')
		tasks = Task.where('category_id = ?', self.id)
		tasks.each do |task|
			task.update("category_id"=> 1)
		end
	end

end
