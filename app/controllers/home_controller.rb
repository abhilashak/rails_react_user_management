class HomeController < ApplicationController
  def index
    render json: { hahi: "heheheh" }.to_json
  end
end
