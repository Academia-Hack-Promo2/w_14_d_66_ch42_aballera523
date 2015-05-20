class TaskSerializer < ActiveModel::Serializer
  attributes :id, :title, :status, :priority, :date, :category_id, :category
end
