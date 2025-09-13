# Makefile for MyTea project

# Variables
NODE_ENV ?= development
PORT ?= 5173

# Install dependencies
install:
	npm install

# Development
dev:
	npm run dev

# Build for production
build:
	npm run build

# Build and analyze bundle
build-analyze:
	npm run build:analyze

# Preview production build
preview:
	npm run preview

# Run tests
test:
	npm run test

# Run tests in watch mode
test-watch:
	npm run test:watch

# Run tests with coverage
test-coverage:
	npm run test:coverage

# Lint code
lint:
	npm run lint

# Fix linting issues
lint-fix:
	npm run lint:fix

# Type check
type-check:
	npm run type-check

# Clean build artifacts
clean:
	npm run clean

# Run CI pipeline locally
ci:
	npm run ci

# Docker operations
docker-build:
	docker build -t mytea .

docker-run:
	docker run -p $(PORT):4173 -e NODE_ENV=$(NODE_ENV) -e NEWS_API_KEY=$(NEWS_API_KEY) mytea

docker-dev:
	docker-compose up --build

docker-down:
	docker-compose down

# Help
help:
	@echo "Available commands:"
	@echo "  install        - Install dependencies"
	@echo "  dev            - Start development server"
	@echo "  build          - Build for production"
	@echo "  build-analyze  - Build and analyze bundle"
	@echo "  preview        - Preview production build"
	@echo "  test           - Run tests"
	@echo "  test-watch     - Run tests in watch mode"
	@echo "  test-coverage  - Run tests with coverage"
	@echo "  lint           - Lint code"
	@echo "  lint-fix       - Fix linting issues"
	@echo "  type-check     - Type check"
	@echo "  clean          - Clean build artifacts"
	@echo "  ci             - Run CI pipeline locally"
	@echo "  docker-build   - Build Docker image"
	@echo "  docker-run     - Run Docker container"
	@echo "  docker-dev     - Run Docker development environment"
	@echo "  docker-down    - Stop Docker development environment"
	@echo "  help           - Show this help message"

.PHONY: install dev build build-analyze preview test test-watch test-coverage lint lint-fix type-check clean ci docker-build docker-run docker-dev docker-down help