class Api::CategoryResource < JSONAPI::Resource
  attributes :name
  has_many :todos
end