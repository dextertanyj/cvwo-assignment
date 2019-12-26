class Api::TodoResource < JSONAPI::Resource
  attributes :title, :description, :completed

  filter :completed
end