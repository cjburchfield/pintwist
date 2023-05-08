# pre adding boards
# json.user do
#     json.extract! @user, :id, :email, :username, :first_name, :last_name, :about, :website, :created_at, :updated_at
#     json.photoUrl user.photo.attached? ? user.photo.url : nil
# end

# json.user do
#     json.extract! @user, :id, :email, :username, :first_name, :last_name, :about, :website, :created_at, :updated_at
#     json.photoUrl user.photo.attached? ? user.photo.url : nil
#     json.boards do
#       json.array! @user.boards do |board|
#         json.partial! 'api/boards/board', board: board
#       end
#     end
#   end
  
json.user do
    json.extract! @user, :id, :email, :username, :first_name, :last_name, :about, :website, :created_at, :updated_at
    json.photoUrl user.photo.attached? ? user.photo.url : nil
  
    json.boards do
      json.array! @user.boards do |board|
        json.id board.id
        json.name board.name
        json.description board.description
        json.user_id board.user_id
      end
    end
  end
  