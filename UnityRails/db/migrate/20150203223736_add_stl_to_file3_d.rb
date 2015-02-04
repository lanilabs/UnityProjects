class AddStlToFile3D < ActiveRecord::Migration
  def self.up
    add_attachment :file3_ds, :stl
  end

  def self.down
    remove_attachment :file3_ds, :stl
  end
end
