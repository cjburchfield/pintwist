# json.array! @boards do |board|
#     json.partial! 'api/boards/board', board: board
#   end
  
# json.boards do
#     json.array! @boards do |board|
#       json.id board.id
#       json.name board.name
#       json.description board.description
#       json.user_id board.user_id
#     end
#   end
  
json.boards do
  json.array! @boards do |board|
    json.id board.id
    json.name board.name
    json.description board.description
    json.user_id board.user_id

    json.board_pins do
      json.array! board.board_pins do |board_pin|
        json.id board_pin.id
        json.board_id board_pin.board_id
        json.pin_id board_pin.pin_id
        json.pin_photo_url board_pin.pin.pin_photo_url
      end
    end
  end
end
