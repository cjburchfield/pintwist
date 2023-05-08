# @users.each do |user|
#       json.partial! 'api/users/user', user: user
# end

# @users.each do |user|
#       json.partial! 'api/users/user', user: user
# end
    

json.users do
      json.array! @users do |user|
        json.id user.id
        json.email user.email
        json.username user.username
        json.first_name user.first_name
        json.last_name user.last_name
        json.about user.about
        json.website user.website
        json.created_at user.created_at
        json.updated_at user.updated_at
        json.photoUrl user.photo.attached? ? user.photo.url : nil
    
        json.boards do
          json.array! user.boards do |board|
            json.id board.id
            json.name board.name
            json.description board.description
            json.user_id board.user_id
          end
        end
      end
    end
    