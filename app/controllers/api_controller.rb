class ApiController < ActionController::API
  include JSONAPI::ActsAsResourceController
  before_action :authentication, only: [:index, :show]
  
  def authentication

    # Check if request is valid using existance of session data.
    if session[:user_id]
      userid = session[:user_id]
      url = request.original_url
      substring = "filter[userid]=" + userid.to_s
      # Check if user is only accessing their own records.
      unless url.include?(substring)
        puts "error 1"
        render json: {
          error: "Unauthorized attempt to access information."
        },
        status: 403
      end
    else
      puts "error 2"
      render json: {
        error: "Not authorized."
      },
      status: 403
    end
  end

end