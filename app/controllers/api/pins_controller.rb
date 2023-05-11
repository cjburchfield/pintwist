class Api::PinsController < ApplicationController
  wrap_parameters include: Pin.attribute_names + ['pin_photo']

  # def create
  #     @pin = Pin.new(pin_params)
  #     if @pin.save!
  #       render 'api/pins/show'
  #     else
  #       render json: @pin.errors, status: :unprocessable_entity
  #     end
  # end

  def create
    @pin = Pin.new(pin_params)
    if @pin.save!
      user = User.find(@pin.user_id)
      user.all_pins_board.board_pins.create(pin: @pin)
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

  def boards
    @pin = Pin.find(params[:pin_id])
    @boards = @pin.boards
    render 'api/board_pins/index'
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