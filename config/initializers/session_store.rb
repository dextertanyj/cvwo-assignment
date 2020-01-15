if Rails.env == "production"
    Rails.application.config.session_store :cookie_store, 
        key: "_todolist_app", 
        domain: "http://quiet-garden-09538.herokuapp.com/"
else
    Rails.application.config.session_store :cookie_store, 
        key: "_todolist_app"
end
