class RegistrationsController < ApplicationController

    def create
        user = User.create!(
            email: params["data"]["user"]["email"], 
            password: params["data"]["user"]["password"], 
            password_confirmation: params["data"]["user"]["password_confirmation"])
        if user
            session[:user_id] = user.id
            render json: {
                status: :created,
                user: user
            }
        end
    end
    
end
