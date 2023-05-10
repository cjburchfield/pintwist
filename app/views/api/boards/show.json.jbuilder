# json.partial! 'api/boards/board', board: @board
# json.pins do
#   json.array! @board.pins do |pin|
#     json.partial! 'api/pins/pin', pin: pin
#   end
# end

# json.board do
#     json.extract! @board, :id, :name, :description, :user_id
  
#     json.board_pins do
#       json.array! @board.board_pins do |board_pin|
#         json.id board_pin.id
#         json.board_id board_pin.board_id
#         json.pin_id board_pin.pin_id
#       end
#     end
#   end
  
# json.board do
#   json.extract! @board, :id, :name, :description, :user_id
  
#   json.pins do
#     json.array! @board.board_pins do |board_pin|
#       json.extract! board_pin.pin, :id, :title, :description, :pinPhoto, :destination_link
#     end
#   end
# end

json.board do
  json.extract! @board, :id, :name, :description, :user_id

  json.board_pins do
    json.array! @board.board_pins do |board_pin|
      json.id board_pin.id
      json.board_id board_pin.board_id
      json.pin_id board_pin.pin_id
      json.pin_photo_url board_pin.pin.pin_photo_url
    end
  end
end
