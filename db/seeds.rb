require 'open-uri'

ApplicationRecord.transaction do 
    puts "Destroying tables..."
    # Unnecessary if using `rails db:seed:replant`
    User.destroy_all
  
    puts "Resetting primary keys..."
    # For easy testing, so that after seeding, the first `User` has `id` of 1
    ApplicationRecord.connection.reset_pk_sequence!('users')
  
    puts "Creating users..."
    # Create one user with an easy to remember username, email, and password:
    User.create!(
      username: 'pintwist-demo', 
      email: 'demo@pintwist.io', 
      password: 'password',
      first_name: 'Pin',
      last_name: 'Twist',
      about: 'This is where a user would input information about themselves or their company.',
      website: 'https://www.linkedin.com/in/jamieburchfield/'
    )
  
    # More users
    10.times do 
      User.create!({
        username: Faker::Internet.unique.username(specifier: 3),
        # username: Faker::Artist.unique.name,
        email: Faker::Internet.unique.safe_email,
        password: 'password',
        first_name: Faker::Name.first_name,
        last_name: Faker::Name.last_name,
        about: Faker::Lorem.paragraph(sentence_count: 3),
        website: Faker::Internet.url,
      }) 
    end

    puts "Destroying pins..."
    Pin.destroy_all 

    puts "Resetting primary keys..."
    ApplicationRecord.connection.reset_pk_sequence!('pins')

    puts "Creating pins..."
    15.times do
      Pin.create!({
        title: Faker::Lorem.sentence(word_count: 3),
        description: Faker::Lorem.paragraph(sentence_count: 3),
        user_id: 1,
        destination_link: Faker::Internet.url
      })
    end

    40.times do
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
    end

    puts "Seeding pin photos..."
    Pin.first(60).each_with_index do |pin, index|
      pin.pin_photo.attach(
        io: URI.open("https://pintwist-seeds.s3.amazonaws.com/#{index + 1}.jpg"),
        filename: "#{index + 1}.jpg"
      )
    end
  
    puts "Done!"
