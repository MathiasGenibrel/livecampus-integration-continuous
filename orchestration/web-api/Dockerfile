FROM node:18.16.0-alpine3.17

# Create app directory
RUN mkdir -p /var/www/app && chown -R node:node /var/www/app

# Set working directory
WORKDIR /var/www/app

# Set user to root
USER root

# Update npm
RUN npm install -g npm

# Set user to node (non-root)
USER node

# Copy package.json and package-lock.json
COPY --chown=node:node ../web-api/package*.json ./

# Install app dependencies
RUN npm install && npm cache clean --force --loglevel=error

# Copy app source code
COPY --chown=node:node ../web-api/main.js .

# Copy app source code
CMD ["node", "main.js"]
