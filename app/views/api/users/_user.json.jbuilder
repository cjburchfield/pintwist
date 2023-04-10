
json.user do
    json.extract! @user, :id, :email, :username, :first_name, :last_name, :about, :website, :created_at, :updated_at
    json.photoUrl user.photo.attached? ? user.photo.url : nil
end