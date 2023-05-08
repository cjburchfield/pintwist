class Api::BoardPinsController < ApplicationController
    # def index
    #   @board_pins = BoardPin.where(board_id: params[:board_id])
    #   render 'api/board_pins/index'
    # end
  
    def create
      @board_pin = BoardPin.new(board_pin_params)
  
      @board = Board.find_by(id: board_pin_params[:board_id])
      @pin = Pin.find_by(id: board_pin_params[:pin_id])
  
      all_pins_board = Board.find_by(name: "All Pins", user_id: @board.user_id)
      BoardPin.create!(board_id: all_pins_board.id, pin_id: @pin.id)
  
      if @board_pin.save
        render 'api/boards/show'
      else
        render json: @board_pin.errors.full_messages, status: :unprocessable_entity
      end
    end
  
    def destroy
      @board_pin = BoardPin.find_by(id: params[:id])
      @board_pin.destroy
    end
  
    private
  
    def board_pin_params
      params.require(:board_pin).permit(:board_id, :pin_id)
    end
  end
  