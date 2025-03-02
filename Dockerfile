# Use an official Node.js runtime as a parent image with a compatible version
FROM node:20

# Set the working directory
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code
COPY . .

# Copy the .env.local file
COPY .env.local .env.local

# Set environment variable to bind to 0.0.0.0
ENV HOST 0.0.0.0

# Build the application
RUN npm run build

# Expose the port the app runs on
EXPOSE 3000

# Start the application
CMD ["npm", "run", "dev"]
