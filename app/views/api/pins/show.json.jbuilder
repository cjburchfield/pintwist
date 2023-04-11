json.pin do
    json.extract! @pin, :id, :title, :description, :user_id, :destination_link
    # json.pin_photo url_for(@pin.pin_photo) if @pin.pin_photo.attached?
end