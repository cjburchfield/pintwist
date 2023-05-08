# json.user do
#     json.extract! @user, :id, :email, :username, :first_name, :last_name, :about, :website, :created_at, :updated_at
# end

# pre boards

json.partial! 'api/users/user', user: @user

# json.partial! 'api/users/user', user: @user

# json.user do
#     json.extract! @user, :id, :username, :email
#     json.photo rails_blob_url(@user.photo) if @user.photo.attached?
    
#     json.boards do
#       json.array! @user.boards do |board|
#         json.id board.id
#         json.title board.title
#         json.description board.description
#       end
#     end
#   end
  