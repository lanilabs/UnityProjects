class PlayerController < ApplicationController
  def grab_file_url
  	
  	# Get rid of all older files 
    File3D.all.each do |f|
    	f.stl.destroy
    	f.save
    	f.destroy
    end
    
    # Create a new temporary stl file for viewing in Unity
    file = File3D.new()
    file.stl = params[:stl][:file]
    file.save

    # Get the url of the file
    data = {
    	file_url: file.stl.url
    }

  	render json: data.to_json, status: 200
  end

  def view
  end
end
