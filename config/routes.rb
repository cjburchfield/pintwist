Rails.application.routes.draw do
  namespace :api, defaults: { format: :json } do
    resources :users, only: [:create, :show, :update, :index] do
      resources :pins, only: [:create]
    end

  resource :session, only: [:show, :create, :destroy]

  resources :pins, only: [:show, :index]

  end
  
  get '*path', to: "static_pages#frontend_index"
end

