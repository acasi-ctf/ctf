FROM node:17-alpine as npm
WORKDIR /app

# Install dependencies.
COPY ui/package.json /app
COPY ui/package-lock.json /app
RUN npm install -g npm

ENV NODE_OPTIONS=--openssl-legacy-provider

RUN npm install

# Copy over entire app source.
COPY ui/ /app

# Build the app.
RUN npm run build

FROM nginx:mainline

# Copy over static files from npm to nginx.
COPY --from=npm /app/build /usr/share/nginx/html
