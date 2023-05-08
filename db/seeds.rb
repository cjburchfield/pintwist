require 'open-uri'

ApplicationRecord.transaction do 
  puts "Destroying tables..."
  User.destroy_all
  Pin.destroy_all
  Board.destroy_all
  BoardPin.destroy_all

  puts "Resetting primary keys..."
  ApplicationRecord.connection.reset_pk_sequence!('users')
  ApplicationRecord.connection.reset_pk_sequence!('pins')
  ApplicationRecord.connection.reset_pk_sequence!('boards')
  ApplicationRecord.connection.reset_pk_sequence!('board_pins')

  puts "Creating users..."
  User.create!(
    username: 'pintwist-demo', 
    email: 'demo@pintwist.io', 
    password: 'password',
    first_name: 'Pin',
    last_name: 'Twist',
    about: 'This is where a user would input information about themselves or their company.',
    website: 'https://www.linkedin.com/in/jamieburchfield/'
  )

  10.times do 
    User.create!({
      username: Faker::Internet.unique.username(specifier: 3),
      email: Faker::Internet.unique.safe_email,
      password: 'password',
      first_name: Faker::Name.first_name,
      last_name: Faker::Name.last_name,
      about: Faker::Lorem.paragraph(sentence_count: 3),
      website: Faker::Internet.url,
    }) 
  end

  puts "Creating pins..."
  15.times do
    Pin.create!({
      title: Faker::Lorem.sentence(word_count: 3),
      description: Faker::Lorem.paragraph(sentence_count: 3),
      user_id: 1,
      destination_link: Faker::Internet.url
    })
  end

  45.times do
    Pin.create!({
    title: Faker::Lorem.sentence(word_count: 3),
    description: Faker::Lorem.paragraph(sentence_count: 3),
    user_id: rand(3..11),
    destination_link: Faker::Internet.url
  })
    end

    5.times do
      Pin.create!({
      title: "London Flat",
      description: "Pinspiration for my London flat search",
      user_id: 2,
      destination_link: "https://nylottery.ny.gov/"
    })
      end

  puts "Creating boards..."
  5.times do
    Board.create!({
      name: Faker::Address.street_name,
      description: Faker::Quotes::Shakespeare,
      user_id: 1
    })
  end

  20.times do
    Board.create!({
      name: Faker::Address.street_name,
      description: Faker::Quotes::Shakespeare,
      user_id: rand(3..11)
    })
  end

  puts "Seeding boards with saved pins..."
  50.times do
    BoardPin.create!({
      board_id: rand(1..28),
      pin_id: rand(1..28)
    })
  end

  puts "Seeding pin photos..."
  Pin.first(65).each_with_index do |pin, index|
    pin.pin_photo.attach(
      io: URI.open("https://pintwist-seeds.s3.amazonaws.com/#{index + 1}.jpg"),
      filename: "#{index + 1}.jpg"
    )
  end

  puts "Done!"
end
