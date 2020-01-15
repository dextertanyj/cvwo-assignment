class AddUserIdToTodos < ActiveRecord::Migration[6.0]
  def change
    add_column :todos, :userid, :integer
  end
end
