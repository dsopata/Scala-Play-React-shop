FROM ubuntu:19.04

ENV TZ=Europe/Warsaw
RUN ln -snf /usr/share/zoneinfo/$TZ /etc/localtime && echo $TZ > /etc/timezone

RUN apt update && apt install -y \
  python3-pip \
  unzip \
  wget \
  vim \
  git \
  graphviz

RUN pip3 install --upgrade pip

RUN pip3 install \
  jupyterlab \
  notebook

RUN pip3 install \
  matplotlib==3.0.2 \
  pandas==0.25.3

RUN pip3 install \
  seaborn \
  opencv-python \
  pydot

RUN pip3 install \
  scipy \
  numpy \
  requests \
  pandas-profiling \
  sklearn \
  pydub\
  six \
  spacy

RUN pip3 install \
  rasa \
  nltk \
  textblob \
  tensorflow==2.1.0 \
  tensorlayer \
  keras \
  scipy \
  flask \
  tensorboard==2.1.0 \
  jupyter-tensorboard \
  prompt-toolkit==1.0.15

RUN pip3 install rasa-x -i https://pypi.rasa.com/simple

RUN pip3 install \
  xai \
  aix360 \
  shap \
  lime \
  matplotlib2tikz

EXPOSE 8888
EXPOSE 9000
EXPOSE 5000
EXPOSE 5050
EXPOSE 6006

RUN jupyter-tensorboard enable --system
RUN python3 -m spacy download en
RUN useradd -ms /bin/bash codete
RUN adduser codete sudo

USER codete
WORKDIR /home/codete/
RUN mkdir /home/codete/workshop/
RUN mkdir /home/codete/workshop/tensorboard/
RUN mkdir /home/codete/workshop/tensorboard/logs/
RUN tensorboard --logdir /home/codete/workshop/tensorboard/logs/ &
CMD jupyter lab --ip=0.0.0.0 --NotebookApp.token='' --NotebookApp.password='' --no-browser --notebook-dir=/home/codete/workshop/