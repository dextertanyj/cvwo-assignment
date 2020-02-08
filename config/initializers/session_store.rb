if Rails.env == "production"
    Rails.application.config.session_store :cookie_store,
        domain: "quiet-garden-09538.herokuapp.com/"
else
    Rails.application.config.session_store :cookie_store
end