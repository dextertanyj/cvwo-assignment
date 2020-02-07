class SessionsController < ApplicationController
    include CurrentUserConcern
    before_action :set_current_user, only: [:logged_in]

    def create
        user = User.find_by(email: params["data"]["user"]["email"]).try(:authenticate, params["data"]["user"]["password"])
        if user
            session[:user_id] = user.id
            render json: {
                status: :created,
                user: user
            }
        else
            render json: {
                status: 401
            }, status: 401
        end
    end
    
    def logged_in
        if @current_user
            render json: {
                logged_in: true,
                user: @current_user
            }
        else
            render json: {
                logged_in: false
            }
        end
    end

    def logout
        @current_user = nil
        session[:user_id] = -1
        session.clear
        reset_session
        if session[:user_id] 
            puts "true"
        else 
            puts "false"
        end
        puts session[:user_id]
        puts "Logout Complete"
        render json: {
            status: 200,
            logged_out: true
        }
    end

end
