class PlayerController < ApplicationController
  def grab_file_url
  	render text: params.inspect
  end

  def view
  end
end
