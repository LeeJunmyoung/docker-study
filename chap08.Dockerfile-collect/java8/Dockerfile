# ref site : https://github.com/dockerfile/java 

# Pull base image.
FROM ubuntu:14.04

# Install add-apt-repository 
RUN apt-get update
RUN apt-get install -y python-software-properties software-properties-common 

# Install Java.
RUN \
  echo oracle-java8-installer shared/accepted-oracle-license-v1-1 select true | debconf-set-selections && \
  add-apt-repository -y ppa:webupd8team/java && \
  apt-get update && \
  apt-get install -y oracle-java8-installer && \
  rm -rf /var/lib/apt/lists/* && \
  rm -rf /var/cache/oracle-jdk8-installer


# Define working directory.
WORKDIR /data

# Define commonly used JAVA_HOME variable
ENV JAVA_HOME /usr/lib/jvm/java-8-oracle

# Define default command.
CMD ["bash"]

## build
## docker build --tag java8 .

## Usage
## docker run -it --rm dockerfile/java

## Run java
## docker run -it --rm dockerfile/java java

## Run javac
## docker run -it --rm dockerfile/java javac

# public class HelloWorld {
#
#    public static void main(String[] args) {
#        // Prints "Hello, World" to the terminal window.
#        System.out.println("Hello, World");
#    }
# }
