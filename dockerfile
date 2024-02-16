# Use NGINX as the base image
FROM nginx:alpine

# Copy the HTML, CSS, and JavaScript files to the NGINX web server directory
COPY . /usr/share/nginx/html

# Expose port 80 to the outside world
EXPOSE 80

# Start NGINX server when the container starts
CMD ["nginx", "-g", "daemon off;"]
