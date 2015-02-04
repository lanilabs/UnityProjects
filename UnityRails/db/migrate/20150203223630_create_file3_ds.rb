class CreateFile3Ds < ActiveRecord::Migration
  def change
    create_table :file3_ds do |t|

      t.timestamps
    end
  end
end
