class UsersController < ApplicationController
  def index
    render json: User.order(:id)
  end

  def show
    render json: User.find(params[:id])
  end

  def create
    user = User.new(user_params)

    if user.save
      render json: user, status: :created
    else
      render json: { errors: user.errors.full_messages },
             status: :unprocessable_entity
    end
  end

  def update
    user = User.find(params[:id])

    if user.update(user_params)
      render json: user
    else
      render json: { errors: user.errors.full_messages },
             status: :unprocessable_entity
    end
  end

  def destroy
    user = User.find(params[:id])

    if user
      user.destroy!
      head :no_content
    else
      render json: { errors: "User not exists" }, status: :not_found
    end
  end

  private

  def user_params
    params.require(:user).permit(:name, :email)
  end
end
