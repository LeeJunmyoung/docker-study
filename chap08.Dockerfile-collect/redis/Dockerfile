# ref-site https://github.com/dockerfile/redis

# Pull base image.
FROM ubuntu:14.04

# Install wget
RUN \
  apt-get update && \
  apt-get install -y wget

# Install make
RUN \
  apt-get install -y make

# Install gcc
RUN \
  apt-get install -y gcc

# Install Redis.
RUN \
  cd /tmp && \
  wget http://download.redis.io/redis-stable.tar.gz && \
  tar xvzf redis-stable.tar.gz && \
  cd redis-stable && \
  make && \
  make install && \
  cp -f src/redis-sentinel /usr/local/bin && \
  mkdir -p /etc/redis && \
  cp -f *.conf /etc/redis && \
  rm -rf /tmp/redis-stable* && \
  sed -i 's/^\(bind .*\)$/# \1/' /etc/redis/redis.conf && \
  sed -i 's/^\(daemonize .*\)$/# \1/' /etc/redis/redis.conf && \
  sed -i 's/^\(dir .*\)$/# \1\ndir \/data/' /etc/redis/redis.conf && \
  sed -i 's/^\(logfile .*\)$/# \1/' /etc/redis/redis.conf

# Define mountable directories.
VOLUME ["/data"]

# Define working directory.
WORKDIR /data

# Define default command.
CMD ["redis-server", "/etc/redis/redis.conf"]

# Expose ports.
EXPOSE 6379

## build
## docker build --tag redis .


## Run redis-server
## docker run -d --name redis -p 6379:6379 dockerfile/redis


## Run redis-server with persistent data directory. (creates dump.rdb)
## docker run -d -p 6379:6379 -v <data-dir>:/data --name redis dockerfile/redis


## Run redis-server with persistent data directory and password.
## docker run -d -p 6379:6379 -v <data-dir>:/data --name redis dockerfile/redis redis-server /etc/redis/redis.conf --requirepass <password>

## Run redis-cli
## docker run -it --rm --link redis:redis dockerfile/redis bash -c 'redis-cli -h redis'
