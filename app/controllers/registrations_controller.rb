class RegistrationsController < ApplicationController

    def create
        user = User.create!(
            email: params["data"]["user"]["email"], 
            password: params["data"]["user"]["password"], 
            password_confirmation: params["data"]["user"]["password_confirmation"])
        if user
            puts "created session: " + session.to_h.to_s
            session[:user_id] = user.id
            render json: {
                status: :created,
                user: user
            }
        end
    end
    
end
