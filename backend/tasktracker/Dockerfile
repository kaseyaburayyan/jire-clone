# Use an official OpenJDK runtime as a parent image
FROM openjdk

# Set the working directory in the container
WORKDIR /app

# Copy only the pom.xml and install dependencies first (this step is cached in Docker)
COPY pom.xml ./
COPY mvnw ./
COPY .mvn ./.mvn
RUN ./mvnw dependency:go-offline

# Copy the source code
COPY src ./src

# Expose the port Spring Boot runs on
EXPOSE 8080

# Run the Spring Boot application with DevTools enabled
CMD ["./mvnw", "clean", "spring-boot:run"]
