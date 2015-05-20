class TaskSerializer < ActiveModel::Serializer
  attributes :id, :title, :status, :priority, :date, :category
  belongs_to :category
end
