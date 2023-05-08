class AddForeignKeyToPins < ActiveRecord::Migration[7.0]
  def change
    add_foreign_key :pins, :users
  end
end
