class Api::TodoResource < JSONAPI::Resource
  attributes :title, :description, :categoryid, :completed

  filters :categoryid
  filter :completed
end