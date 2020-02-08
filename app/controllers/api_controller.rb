class ApiController < ActionController::API
	include JSONAPI::ActsAsResourceController
	before_action :authentication, only: [:index, :show]
  
	def authentication
	# Check if request is valid using existance of session data.
	puts "accessing session: " + session.to_h.to_s
		if session[:user_id]
	  		userid = session[:user_id]
			url = request.original_url
			substring = "filter[userid]=" + userid.to_s
			# Check if user is only accessing their own records.
			unless url.include?(substring)
				render file: 'public/404.html', layout: false, status: 403
			end
		else
			render file: 'public/404.html', layout: false, status: 403
		end
	end

end