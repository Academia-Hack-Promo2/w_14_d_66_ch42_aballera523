class CreateTasks < ActiveRecord::Migration
  def change
    create_table :tasks do |t|
      t.string :title, null: false, limit: 255
      t.integer :status, default: 0, null: false
      t.integer :priority, default: 0, null: false
      t.date :date
      t.references :category, index: true, foreign_key: true

      t.timestamps null: false
    end
  end
end
