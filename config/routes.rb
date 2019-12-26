Rails.application.routes.draw do
	get 'home/index'
	# For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
	root to: "home#index"

	namespace :api do
		jsonapi_resources :todos
	end

 	get "*path", to: "home#index", constraints: { format: "html" }
end
