# json.user do
#     json.extract! @user, :id, :email, :username, :first_name, :last_name, :about, :website, :created_at, :updated_at
# end

json.partial! 'api/users/user', user: @user
