class Board < ApplicationRecord
  belongs_to :user
  has_many :board_pins
  has_many :pins, through: :board_pins

  validates :name, presence: true, uniqueness: { scope: :user_id }
end
