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
    validates :title, presence: true
    
    belongs_to :user

    has_many :board_pins, dependent: :destroy
    has_many :boards, through: :board_pins, dependent: :destroy
    
    has_one_attached :pin_photo
    
    def pin_photo_url
        Rails.application.routes.url_helpers.rails_blob_path(self.pin_photo, only_path: true) if self.pin_photo.attached?
    end
end
