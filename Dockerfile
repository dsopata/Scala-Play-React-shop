FROM ubuntu:19.04

RUN apt-get update

RUN apt-get -y install openjdk-8-jdk vim unzip curl wget dirmngr apt-transport-https lsb-release ca-certificates && \
curl -sL https://deb.nodesource.com/setup_12.x | bash -

#node 12 npm 6.8
RUN apt -y install nodejs
RUN npm i -g npm@6.8

# scala 2.12.8
RUN wget https://dl.bintray.com/sbt/debian/sbt-1.2.8.deb && \
    wget http://downloads.lightbend.com/scala/2.12.8/scala-2.12.8.deb && \
    dpkg -i sbt-1.2.8.deb && \
    dpkg -i scala-2.12.8.deb && \
    rm *.deb

RUN useradd -ms /bin/bash appuser
RUN adduser appuser sudo

USER appuser
WORKDIR /home/appuser/
RUN mkdir /home/appuser/projekt/

WORKDIR /home/appuser/

VOLUME  /home/appuser/projekt

EXPOSE 9000 8000 5000 8888

CMD java -version && \
    scala -version && \
    npm --version && \
    sbt --version
