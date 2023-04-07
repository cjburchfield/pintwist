# json.partial! 'shared/errors', resource: @user

# json.form do
#   json.extract! @user, :email, :username, :first_name, :last_name, :about, :website

#   json.partial! 'shared/fields', object: @user, as: :user, fields: [:email, :username, :first_name, :last_name, :about, :website]

#   json.submit "Save"
# end
