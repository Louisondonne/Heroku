# Use Node.js 18 as the base image
FROM node:18-alpine

# Update package lists and install security updates using apk for Alpine
RUN apk update && apk upgrade --no-cache && rm -rf /var/cache/apk/*

# Set the working directory
WORKDIR /app

# Copy package.json and package-lock.json if available
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code
COPY . .

# Expose the application port
EXPOSE 3000

# Start the application
CMD ["npm", "start"]
