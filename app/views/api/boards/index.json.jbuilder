# json.array! @boards do |board|
#     json.partial! 'api/boards/board', board: board
#   end
  
json.boards do
    json.array! @boards do |board|
      json.id board.id
      json.name board.name
      json.description board.description
      json.user_id board.user_id
    end
  end
  