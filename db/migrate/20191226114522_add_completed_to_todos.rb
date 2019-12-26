class AddCompletedToTodos < ActiveRecord::Migration[6.0]
  def change
  	add_column :todos, :completed, :string
  end
end
