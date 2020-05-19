
build:
	docker build -t ebiznes .
	docker build -f ./DockerfileFrontend -t ebiznes-frontend .

run:
	docker-compose up

up: build run
