class Api::TodoResource < JSONAPI::Resource
  attributes :title, :description, :categoryid, :duedate, :completed

  filters :categoryid
  filter :completed
end