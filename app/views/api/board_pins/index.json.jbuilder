# json.array! @board_pins do |board_pin|
#     json.partial! 'api/board_pins/board_pin', board_pin: board_pin
#   end
  
# json.board_pins do
#     json.array! @board_pins do |board_pin|
#       json.id board_pin.id
#       json.board_id board_pin.board_id
#       json.pin_id board_pin.pin_id
#     end
#   end
  
json.board_pins do
  json.array! @board_pins do |board_pin|
    json.id board_pin.id
    json.board do
      json.id board_pin.board.id
      json.name board_pin.board.name
      # Add more fields as needed
    end
    json.pin do
      json.id board_pin.pin.id
      json.title board_pin.pin.title
      # Add more fields as needed
    end
  end
end
