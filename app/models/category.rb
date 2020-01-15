class Category < ApplicationRecord
    # JSON converts _ to - so we set a custom name for the foriegn key column.
    has_many :todos, foreign_key: "categoryid", dependent: :destroy
    belongs_to :user, foreign_key: "userid"
    validates :name, presence: true
end
