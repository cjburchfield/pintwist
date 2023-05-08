# pre adding boards
json.pin do
    json.extract! @pin, :id, :title, :description, :user_id, :destination_link
    json.pin_photo url_for(@pin.pin_photo) if @pin.pin_photo.attached?
end

# json.pin do
#     json.extract! @pin, :id, :title, :description, :user_id, :destination_link
#     json.pin_photo url_for(@pin.pin_photo) if @pin.pin_photo.attached?
#     json.boards do
#       json.array! @pin.boards do |board|
#         json.partial! 'api/boards/board', board: board
#       end
#     end
#   end
  
