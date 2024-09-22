FROM node

# Set the working directory in the container
WORKDIR /app

# Copy the package.json and lock files first for caching dependencies
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application files
COPY . .

# Expose the port the React app runs on
EXPOSE 3000

# Start the React app
CMD ["npm", "start"]
