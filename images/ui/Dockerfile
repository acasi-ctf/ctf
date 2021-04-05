FROM node:15-alpine as npm
WORKDIR /app

# Install dependencies.
COPY ui/package.json /app
COPY ui/package-lock.json /app
RUN npm install -g npm
RUN npm install --force

# Copy over entire app source.
COPY ui/ /app

# Build the app.
RUN npm run build

FROM nginx:mainline

# Copy over static files from npm to nginx.
COPY --from=npm /app/build /usr/share/nginx/html
