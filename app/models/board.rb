class Board < ApplicationRecord
  belongs_to :user
  has_many :board_pins, dependent: :destroy
  has_many :pins, through: :board_pins, dependent: :destroy

  validates :name, presence: true, uniqueness: { scope: :user_id }
end
