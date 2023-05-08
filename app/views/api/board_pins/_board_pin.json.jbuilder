json.extract! board_pin, :id, :board_id, :pin_id
json.pin do
  json.partial! 'api/pins/pin', pin: board_pin.pin
end
