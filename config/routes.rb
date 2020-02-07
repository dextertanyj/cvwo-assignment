Rails.application.routes.draw do
	
	resources :sessions
	resources :registrations

	delete :logout, to: "sessions#logout"
	get :logged_in, to: "sessions#logged_in"

	get 'home/index'
	# For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
	root to: "home#index"

	namespace :api do
		jsonapi_resources :todos
		jsonapi_resources :categories
	end

	 get "*path", to: "home#index", constraints: { format: "html" }
	 
end
