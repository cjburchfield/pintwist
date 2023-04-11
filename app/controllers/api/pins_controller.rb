class Api::PinsController < ApplicationController
    wrap_parameters include: Pin.attribute_names + ['pin_photo']

    # before_action :require_logged_in, only: [:create, :edit, :update, :destroy]

  
    # def create
    #     @pin = Pin.new(pin_params)
    #     @pin.user_id = params[:user_id]
    
    #     if @pin.save
    #       render 'api/pins/show'
    #     else
    #       render json: { errors: @pin.errors.full_messages }, status: :unprocessable_entity
    #     end
    # end

    def create
      debugger
      if params[:pin].present?
        @pin = Pin.new(pin_params)
        if @pin.save
          render json: @pin, status: :created
        else
          render json: @pin.errors, status: :unprocessable_entity
        end
      else
        render json: { error: "Missing pin parameter" }, status: :unprocessable_entity
      end
    end

    def show
      @pin = Pin.find_by(id: params[:id])
  
      if @pin
        render 'api/pins/show'
      else
        render json: { errors: ["This pin does not exist"]}
      end
    end

    def index 
        @pins = Pin.all
        render 'api/pins/index'
    end
  
#   Forthcoming
#     def update
  
#     end
  
#     Forthcoming
#     def destroy
  
#     end
  
    private
  
    def pin_params
      params.require(:pin).permit(:title, :description, :destination_link, :user_id, :pin_photo)
    end
  
  end