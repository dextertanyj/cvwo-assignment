class AddUserIdToCategories < ActiveRecord::Migration[6.0]
  def change
    add_column :categories, :userid, :integer
  end
end
