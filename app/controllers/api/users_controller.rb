class Api::UsersController < ApplicationController
  def index
    users = User.order(:name)

    render json: users
  end
end
