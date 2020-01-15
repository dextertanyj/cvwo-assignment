class User < ApplicationRecord
    has_secure_password
    has_many :todos, foreign_key: "userid", dependent: :destroy
    has_many :categories, foreign_key: "userid", dependent: :destroy
    validates :email, presence: true, uniqueness: true
end
