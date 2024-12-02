Project Name
This project includes a backend and a frontend, with MongoDB as the database. You can easily set up the project using Docker.

Requirements
To build and run this project, you need to have the following installed on your machine:

Docker
Docker Compose
Project Structure

Project Structure
/
├── backend/
├── frontend/
├── docker-compose.yml
└── README.md

Steps to Build and Run with Docker
Clone the Repository

If you haven't cloned the repository yet, run:

git clone git@github.com:BlackSheep1337/mars-rovers.git
cd mars-rovers

Build and Run with Docker Compose

Make sure you are in the root directory where the docker-compose.yml file is located.

To build and run the project, run the following command:
docker-compose up --build

This will:

Build the backend and frontend images.
Start the MongoDB container.
Run the backend and frontend services.
The backend will be available on port 5000, and the frontend will be on port 3000.

Access the Services

Frontend: Open your browser and go to http://localhost:3000 to see the frontend.
Backend: Open your browser or use Postman to connect to the API at http://localhost:5000.

Stop the Services

When you're done, you can stop all the containers with:
docker-compose down

Environment Variables
You can configure the MongoDB connection URL by setting the MONGO_URI variable. In the docker-compose.yml, it's set to:
MONGO_URI=mongodb://mongo:27017/mydatabase

If you need to change the database name or other configurations, modify this variable accordingly.

Troubleshooting
If you face issues with MongoDB connection or any other service, check the logs:

Backend logs:
docker-compose logs backend

MongoDB logs:
docker-compose logs mongo

If the error persists, try to rebuild the services with:
docker-compose down --volumes --remove-orphans
docker-compose up --build

License
This project is licensed under the MIT License.
