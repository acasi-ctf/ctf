FROM node:15-alpine
WORKDIR /app

# Install dependencies.
COPY ui/package.json /app
COPY ui/package-lock.json /app
RUN npm install -g npm
RUN npm install --force

# Copy over entire app source.
COPY ui/ /app

CMD ["npm", "start"]
