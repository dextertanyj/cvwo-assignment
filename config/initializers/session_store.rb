if Rails.env == "production"
    Rails.application.config.session_store :cookie_store, 
        domain: "https://quiet-garden-09538.herokuapp.com/"
else
    Rails.application.config.session_store :cookie_store
end