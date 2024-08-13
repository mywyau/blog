# Use Node.js as the base image
FROM node:18

# Set the working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json to the container
COPY package*.json ./

# Install the dependencies
RUN npm install

# Copy all other files to the container
COPY . .

# Ensure the environment file is in place
COPY .env.github-actions .env

# Debug: Check the contents of the .env file
RUN echo "Contents of .env:" && cat .env

# Build the React application
RUN npm run build

# Expose the port that the app will run on
EXPOSE 3000

# Start the application
CMD ["npm", "start"]
