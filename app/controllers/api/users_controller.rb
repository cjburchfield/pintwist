class Api::UsersController < ApplicationController
  wrap_parameters include: User.attribute_names + ['password']

  def create
    @user = User.new(user_params)

    if @user.save
      login!(@user)
      render 'api/users/show'
    else
      render json: { errors: @user.errors.full_messages }, status: :unprocessable_entity
    end
  end

  def show
    @user = User.find(params[:id])

    if @user 
      render 'api/users/show'
    else 
      render json: { errors: ['This user does not exist'] }
  end

  def index 
    @users = User.all 
    render 'api/users/index'
  end

  private

  def user_params
    params.require(:user).permit(:email, :username, :password)
  end
end





