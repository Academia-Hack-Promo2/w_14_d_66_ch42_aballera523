class CategorySerializer < ActiveModel::Serializer
  attributes :id, :name, :tasks
  belongs_to :tasks
end
