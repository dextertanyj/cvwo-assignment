class Api::TodoResource < JSONAPI::Resource
  attributes :title, :description, :categoryid, :duedate, :completed, :userid
  has_one :category
  filter :userid
  filter :categoryid
  filter :completed
end