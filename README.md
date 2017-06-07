Ajax, Jquery, JSON, Javascript, Bootstrap 4

Working with geolocation and weather APIs. Ran into CORS (Cross Origin Resource Sharing) issues early in development.
Both the geolocation and weather APIs were served from HTTP connections. In order to fix this, I found another geolocation
API with HTTPS and used a CORS workaround for the Open Weather Map URL. This worked and is currently stable on desktop and mobile.

