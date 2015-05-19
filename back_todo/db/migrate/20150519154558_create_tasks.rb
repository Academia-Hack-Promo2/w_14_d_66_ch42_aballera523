class CreateTasks < ActiveRecord::Migration
  def change
    create_table :tasks do |t|
      t.string :title, null: false, limit: 150
      t.string :status, null: false, limit: 12
      t.string :priority, null: false, limit: 12
      t.date :date
      t.references :category, index: true, foreign_key: true

      t.timestamps null: false
    end
  end
end
