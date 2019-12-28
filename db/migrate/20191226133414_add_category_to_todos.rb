class AddCategoryToTodos < ActiveRecord::Migration[6.0]
  def change
  	add_column :todos, :categoryid, :integer
  end
end
