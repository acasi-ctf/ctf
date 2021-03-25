# Based off of https://raw.githubusercontent.com/tiangolo/uwsgi-nginx-docker/master/docker-images/python3.8.dockerfile
# and https://raw.githubusercontent.com/tiangolo/uwsgi-nginx-flask-docker/master/docker-images/python3.8.dockerfile
FROM python:3.9-buster

COPY images/frontend/install-nginx-debian.sh /

RUN bash /install-nginx-debian.sh

EXPOSE 80

# Expose 443, in case of LTS / HTTPS
EXPOSE 443

# Install uWSGI
RUN pip install uwsgi

# Remove default configuration from Nginx
RUN rm /etc/nginx/conf.d/default.conf
# Copy the base uWSGI ini file to enable default dynamic uwsgi process number
COPY images/frontend/uwsgi.ini /etc/uwsgi/

# Install Supervisord
RUN apt-get update && apt-get install -y supervisor \
&& rm -rf /var/lib/apt/lists/*
# Custom Supervisord config
COPY images/frontend/supervisord-debian.conf /etc/supervisor/conf.d/supervisord.conf

# Which uWSGI .ini file should be used, to make it customizable
ENV UWSGI_INI /app/uwsgi.ini

# By default, run 2 processes
ENV UWSGI_CHEAPER 2

# By default, when on demand, run up to 16 processes
ENV UWSGI_PROCESSES 16

# By default, allow unlimited file sizes, modify it to limit the file sizes
# To have a maximum of 1 MB (Nginx's default) change the line to:
# ENV NGINX_MAX_UPLOAD 1m
ENV NGINX_MAX_UPLOAD 0

# By default, Nginx will run a single worker process, setting it to auto
# will create a worker for each CPU core
ENV NGINX_WORKER_PROCESSES 1

# By default, Nginx listens on port 80.
# To modify this, change LISTEN_PORT environment variable.
# (in a Dockerfile or with an option for `docker run`)
ENV LISTEN_PORT 80

# Copy start.sh script that will check for a /app/prestart.sh script and run it before starting the app
COPY images/frontend/start.sh /start.sh
RUN chmod +x /start.sh

# Copy the entrypoint that will generate Nginx additional configs
COPY images/frontend/uwsgi-nginx-entrypoint.sh /uwsgi-nginx-entrypoint.sh
RUN chmod +x /uwsgi-nginx-entrypoint.sh

ENTRYPOINT ["/entrypoint.sh"]

# Run the start script, it will check for an /app/prestart.sh script (e.g. for migrations)
# And then will start Supervisor, which in turn will start Nginx and uWSGI
CMD ["/start.sh"]

RUN pip install flask

# URL under which static (not modified by Python) files will be requested
# They will be served by Nginx directly, without being handled by uWSGI
ENV STATIC_URL /static
# Absolute path in where the static files wil be
ENV STATIC_PATH /app/static

# If STATIC_INDEX is 1, serve / with /static/index.html directly (or the static URL configured)
# ENV STATIC_INDEX 1
ENV STATIC_INDEX 0

# Set working directory
WORKDIR /app

# Make /app/* available to be imported by Python globally to better support several use cases like Alembic migrations.
ENV PYTHONPATH=/app

# Copy the entrypoint that will generate Nginx additional configs
COPY images/frontend/entrypoint.sh /entrypoint.sh
RUN chmod +x /entrypoint.sh

ENTRYPOINT ["/entrypoint.sh"]

# Run the start script provided by the parent image tiangolo/uwsgi-nginx.
# It will check for an /app/prestart.sh script (e.g. for migrations)
# And then will start Supervisor, which in turn will start Nginx and uWSGI
CMD ["/start.sh"]

COPY images/frontend/app-uwsgi.ini /app/uwsgi.ini
COPY frontend /app
