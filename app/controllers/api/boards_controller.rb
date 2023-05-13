class Api::BoardsController < ApplicationController
    # before_action :require_login
    
    def index
      @boards = Board.includes(board_pins: :pin).all
      render 'api/boards/index'
    end
    
  
    def create
    @board = Board.new(board_params)
      if @board.save!
        render 'api/boards/show'
    else
        render json: @board.errors, status: :unprocessable_entity
      end
    end

    def show
    @board = Board.includes(:board_pins).find_by(id: params[:id])
    if @board
      render 'api/boards/show'
    else
      render json: { errors: ["This board does not exist"]}
    end
  end
  
    def update
        @board = Board.find_by(id: params[:id])
  
        if @board.update(board_params)
          render 'api/boards/show'
        else
          render 'api/boards/show', status: :unprocessable_entity
        end
  
      end
  
    def destroy
        @board = Board.find_by(id: params[:id])
        @board.destroy!
    end
  
    private
    
    def board_params
      params.require(:board).permit(:name, :description, :user_id)
    end
  end

  