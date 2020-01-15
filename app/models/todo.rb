class Todo < ApplicationRecord
  # JSON converts _ to - so we set a custom name for the foriegn key column.
  belongs_to :category, foreign_key: "categoryid", optional: true
  belongs_to :user, foreign_key: "userid"
  validates :title, presence: true
end
