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
  
    puts "Done!"
  end