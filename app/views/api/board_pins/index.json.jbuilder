# json.array! @board_pins do |board_pin|
#     json.partial! 'api/board_pins/board_pin', board_pin: board_pin
#   end
  
json.board_pins do
    json.array! @board_pins do |board_pin|
      json.id board_pin.id
      json.board_id board_pin.board_id
      json.pin_id board_pin.pin_id
    end
  end
  