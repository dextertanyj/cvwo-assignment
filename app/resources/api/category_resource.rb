class Api::CategoryResource < JSONAPI::Resource
  attributes :name, :userid
  has_many :todos
  filter :userid
end