Rails.application.routes.draw do
  namespace :api, defaults: { format: :json } do
    resources :users, only: [:create, :show, :update, :index] 
    
    resources :pins, only: [:create, :show, :index, :update, :destroy]

    resource :session, only: [:show, :create, :destroy]

  end
  
  get '*path', to: "static_pages#frontend_index"
end



