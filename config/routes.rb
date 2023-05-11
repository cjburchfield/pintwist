Rails.application.routes.draw do
  namespace :api, defaults: { format: :json } do

    get 'pins/search', to: "pins#search"

    resources :users, only: [:create, :show, :update, :index]

    resources :pins, only: [:create, :show, :index, :update, :destroy] do
      resources :boards, only: [:index]
    end
    
    resources :boards, only: [:create, :show, :index, :update, :destroy] do
      resources :board_pins, only: [:create, :index, :destroy]
    end

    resource :session, only: [:show, :create, :destroy]

  end

  get '*path', to: "static_pages#frontend_index"
end
