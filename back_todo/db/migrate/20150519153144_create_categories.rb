class CreateCategories < ActiveRecord::Migration
  def change
    create_table :categories do |t|
      t.string :name, null: false, limit: 20

      t.timestamps null: false
    end
  end
end
