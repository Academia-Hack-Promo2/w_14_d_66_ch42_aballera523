class Task < ActiveRecord::Base
  belongs_to :category

	validates :title, presence: true, length: { maximum: 255 }
	validates :status, presence: true, inclusion: {in: :status}
	validates :priority, presence: true, inclusion: { in: :priority }
	validates :date, presence: true

  enum status: [ :done, :undone ]
  enum priority: [ :low, :medium, :high ]
end
