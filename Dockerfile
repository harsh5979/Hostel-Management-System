# Stage 1: Build the application
FROM node:18-alpine AS build

# Set the working directory
WORKDIR /app

# Copy the package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code
COPY . .

# Build the Vite project
RUN npm run build

# Stage 2: Serve the built application using a lightweight web server
FROM nginx:alpine

# Copy built files from the build stage to the Nginx server directory
COPY --from=build /app/dist /usr/share/nginx/html

# Copy Nginx configuration file (optional)
COPY nginx.conf /etc/nginx/nginx.conf

# Expose port 80
EXPOSE 80

# Start Nginx
CMD ["nginx", "-g", "daemon off;"]
