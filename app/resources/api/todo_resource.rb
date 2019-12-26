class Api::TodoResource < JSONAPI::Resource
  attributes :title, :description
end