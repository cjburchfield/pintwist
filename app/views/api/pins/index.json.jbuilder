# @pins.each do |pin|
#         json.extract! @pin, :id, :title, :description, :user_id, :destination_link
#         json.pin_photo url_for(@pin.pin_photo) if @pin.pin_photo.attached?
# end

# working pre boards:

json.array! @pins do |pin|
  json.extract! pin, :id, :title, :description, :user_id, :destination_link
  json.pin_photo url_for(pin.pin_photo) if pin.pin_photo.attached?
end

# json.array! @pins do |pin|
#   json.partial! 'api/pins/pin', pin: pin
# end


