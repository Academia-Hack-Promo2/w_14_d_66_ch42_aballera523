class Task < ActiveRecord::Base
  belongs_to :category

	validates :title, presence: true, length: { maximum: 255 }
	validates :status, presence: true, inclusion: { in: %w(low  high  medium),
    message: "%{value} option is not valid" }
	validates :priority, presence: true, inclusion: { in: %w(done undone),
    message: "%{value} option is not valid" }
	validates :date, presence: true

end
