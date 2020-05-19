FROM ubuntu:19.04

RUN sed -i -e 's|disco|eoan|g' /etc/apt/sources.list
RUN apt-get update

RUN apt-get install openjdk-8-jdk vim unzip curl wget dirmngr apt-transport-https lsb-release ca-certificates  -y && \
curl -sL https://deb.nodesource.com/setup_12.x | bash -

#node 12 npm 6.8
RUN apt -y install nodejs
RUN npm i -g npm@6.8

# scala 2.12.1
RUN wget https://dl.bintray.com/sbt/debian/sbt-1.3.7.deb && \
    wget http://downloads.lightbend.com/scala/2.12.1/scala-2.12.1.deb && \
    dpkg -i sbt-1.3.7.deb && \
    dpkg -i scala-2.12.1.deb && \
    rm *.deb

RUN useradd -ms /bin/bash appuser
RUN adduser appuser sudo

USER appuser
RUN mkdir /home/appuser/project/

WORKDIR /home/appuser/project/
RUN sbt sbtVersion

CMD sbt run
