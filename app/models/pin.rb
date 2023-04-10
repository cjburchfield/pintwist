# == Schema Information
#
# Table name: pins
#
#  id               :bigint           not null, primary key
#  user_id          :integer          not null
#  title            :string           not null
#  description      :text
#  destination_link :string
#  created_at       :datetime         not null
#  updated_at       :datetime         not null
#
class Pin < ApplicationRecord
    has_one_attached :pin_photo;
    belongs_to :user 
    
    validates :title, presence: true
end
