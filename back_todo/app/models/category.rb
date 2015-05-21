class Category < ActiveRecord::Base
	has_many :tasks, dependent: :destroy
	validates :name, uniqueness: true ,presence: true, length: { maximum: 20 }
end
