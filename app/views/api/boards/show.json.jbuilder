
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
