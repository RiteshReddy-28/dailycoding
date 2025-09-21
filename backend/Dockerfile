FROM node:18-alpine

# Create app directory
WORKDIR /usr/src/app

# Install app dependencies
COPY package*.json ./
RUN npm install --production

# Copy app sources
COPY . .

# Expose port
EXPOSE 5000

# Start the app
CMD ["node", "index.js"]
