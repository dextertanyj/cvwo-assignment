class User < ApplicationRecord
    has_secure_password
    # JSON converts _ to - so we set a custom name for the foriegn key column.
    has_many :todos, foreign_key: "userid", dependent: :destroy
    has_many :categories, foreign_key: "userid", dependent: :destroy
    validates :email, presence: true, uniqueness: true
end
