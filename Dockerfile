FROM node:18-alpine

# Create app directory
WORKDIR /usr/src/app

# Copy package.json and install dependencies
COPY backend/package*.json ./
RUN npm install --production

# Copy backend source
COPY backend/ ./

# Copy frontend static files
COPY frontend/ ./frontend/

# Expose port
EXPOSE 5000

# Start the app
CMD ["node", "index.js"]ne

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
