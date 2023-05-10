class Api::BoardsController < ApplicationController
    # before_action :require_login
    
    def index
    # @boards = Board.where(user_id: params[:user_id])
      @boards = Board.all
    render 'api/boards/index'
    end
  
    def create
    @board = Board.new(board_params)
    @board.user_id = current_user.id
      if @board.save!
        render 'api/boards/show'
    else
        render json: @board.errors, status: :unprocessable_entity
      end
    end

    def show
      @board = Board.find_by(id: params[:id])
       
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
      params.require(:board).permit(:name, :description)
    end
  end

  