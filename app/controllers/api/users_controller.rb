class Api::UsersController < ApplicationController
  wrap_parameters include: User.attribute_names + ['password']

  # before_action :require_logged_in, only: [:edit, :update]


  def create
    @user = User.new(user_params)

    if @user.save
      login!(@user)
      render 'api/users/show'
    else
      render json: { errors: @user.errors.full_messages }, status: :unprocessable_entity
    end
  end

  def update
    @user = User.find(params[:id])

    # if current_user != @user
    #   debugger
    #   render json: { errors: @user.errors.full_messages }, status: :unprocessable_entity
    # elsif @user.update(user_params)
    if @user.update(user_params)
      render 'api/users/edit'
    else
      render json: { errors: @user.errors.full_messages }, status: :unprocessable_entity
    end
  end

  def show
    @user = User.find_by(id: params[:id])
    
    if @user 
      render 'api/users/show'
    else 
      render json: { errors: ['This user does not exist'] }
    end
  end

  def index 
    @users = User.all 
    render 'api/users/index'
  end

  private

  # def user_params
  #   params.require(:user).permit(:email, :username, :password, :first_name, :last_name, :about, :website)
  # end

  def user_params
    params.require(:user).permit(:email, :username, :password, :first_name, :last_name, :about, :website, :id, :photo)
  end
  
end





