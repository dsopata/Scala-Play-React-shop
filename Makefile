APP_NAME=ebiznes

build: ## Build the container
	docker build -t $(APP_NAME) .