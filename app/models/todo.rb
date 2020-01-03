class Todo < ApplicationRecord
  # JSON converts _ to - so we set a custom name for the foriegn key column.
  belongs_to :category, foreign_key: "categoryid", optional: true
  validates :title, presence: true
end
