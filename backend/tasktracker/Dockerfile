FROM maven:3.8.6-openjdk-18

# Set the working directory in the container
WORKDIR /app

# Copy only the pom.xml and install dependencies first (this step is cached in Docker)
COPY pom.xml ./
COPY .mvn ./.mvn

RUN mvn dependency:go-offline

# Copy the source code
COPY src ./src

# Expose the port Spring Boot runs on
EXPOSE 8080

# Run the Spring Boot application with DevTools enabled
CMD ["mvn", "clean", "spring-boot:run"]