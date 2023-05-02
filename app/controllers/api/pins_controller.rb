class Api::PinsController < ApplicationController
    wrap_parameters include: Pin.attribute_names + ['pin_photo']

    def create
        # debugger
        @pin = Pin.new(pin_params)
        # @pin.user_id = current_user.id

        if @pin.save!
          render 'api/pins/show'
        else
          render json: @pin.errors, status: :unprocessable_entity
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
  
    def update
      @pin = Pin.find_by(id: params[:id])

      if @pin.update(pin_params)
        render 'api/pins/show'
      else
        render 'api/pins/show', status: :unprocessable_entity
      end

    end
  
    def destroy
      @pin = Pin.find_by(id: params[:id])
      if @pin 
        @pin.destroy
        render 'api/pins/show'
      else
        render json: { errors: ["This pin does not exist"]}
      end

    end

    def search 
      @pins = Pin.where("lower(title) LIKE ?", "%#{params[:q]}%")
    end
  
    private
  
    def pin_params
      params.require(:pin).permit(:title, :description, :destination_link, :pin_photo, :user_id)
    end
  
  end