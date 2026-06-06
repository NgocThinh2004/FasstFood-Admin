# FastFood Project

FastFood is a microservices-based application designed for a Fast Food Admin system.

## Architecture

The system is built using a microservices architecture, with a React frontend and several Spring Boot backend services communicating via REST APIs. An API Gateway is used to route traffic to the respective services.

### Services

- **frontend**: A React application built with Vite (`React`, `Vite`, `Axios`, `React Router`).
- **api-gateway**: Spring Cloud Gateway for routing requests to microservices.
- **user-service**: Microservice handling User and Authentication logic (`Spring Boot`, `Spring Data JPA`, `Spring Security`, `MySQL`).
- **product-service**: Microservice handling Product catalog management (`Spring Boot`, `Spring Data JPA`, `MySQL`).
- **order-service**: Microservice handling Order processing (`Spring Boot`, `Spring Data JPA`, `MySQL`).
- **shipper-service**: Microservice handling Shipping and Delivery logic (`Spring Boot`, `Spring Data JPA`, `MySQL`).

## Technology Stack

- **Frontend**: React.js, Vite, Axios, React Router, React Toastify
- **Backend**: Java 17, Spring Boot 3.2.5, Spring Cloud Gateway
- **Database**: MySQL 8.0 (Containerized)
- **Infrastructure**: Docker, Docker Compose

## Getting Started

### Prerequisites
- Docker and Docker Compose
- Java 17
- Node.js & npm/yarn

### Running the System

1. **Start the Databases**
   Run the following command to start all MySQL instances:
   ```bash
   docker-compose up -d
   ```

2. **Start Backend Services**
   Navigate to each microservice folder (`api-gateway`, `user-service`, `product-service`, `order-service`, `shipper-service`) and run:
   ```bash
   mvn spring-boot:run
   ```

3. **Start the Frontend**
   Navigate to the `frontend` directory and install dependencies, then start the dev server:
   ```bash
   cd frontend
   npm install
   npm run dev
   ```
