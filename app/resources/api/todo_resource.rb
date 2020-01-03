class Api::TodoResource < JSONAPI::Resource
  attributes :title, :description, :categoryid, :duedate, :completed
  has_one :category
  filters :categoryid
  filter :completed
end