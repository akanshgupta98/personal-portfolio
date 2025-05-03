PROJECT_BINARY = "projectApp"


up_build: build_projects
	@echo "Building all services and starts docker"
	docker-compose down
	docker-compose up --build -d
	@echo "Docker images built and started"

build_projects:
	@echo "Compiling projects-service"
	cd ../projects-service && env GOOS=linux CGO_ENABLED=0 go build -o ${PROJECT_BINARY} ./cmd
	@echo "Done" 

down:
	@echo "Stopping all the containers"
	docker-compose down
	@echo "Done"

start:
	@echo "Starting front-end app"
	cd ../frontend/my-test-app &&  PORT=3002 npm start &
	@echo "Started frontend App"

stop:
	@echo "Stopping front end..." 
	cd ../frontend/my-test-app && npm stop
	@echo "Stopped front end!"  