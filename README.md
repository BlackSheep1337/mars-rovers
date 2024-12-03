<!-- Improved compatibility of back to top link: See: https://github.com/othneildrew/Best-README-Template/pull/73 -->

<a id="readme-top"></a>

<!-- TABLE OF CONTENTS -->
<details>
  <summary>Table of Contents</summary>
  <ol>
    <li>
      <a href="#about-the-project">About The Project</a>
      <ul>
        <li><a href="#built-with">Built With</a></li>
      </ul>
    </li>
    <li>
      <a href="#getting-started">Getting Started</a>
      <ul>
        <li><a href="#installation">Installation</a></li>
      </ul>
    </li>
    <li><a href="#usage">Usage</a></li>
    <li><a href="#contributing">Contributing</a></li>
    <li><a href="#license">License</a></li>
    <li><a href="#contact">Contact</a></li>
  </ol>
</details>

<!-- ABOUT THE PROJECT -->

## About The Project

The Mars Rovers project was created for a technical challenge from Voyager Portal as part of their hiring process for a Fullstack Software Engineer position. The goal was to show my skills by building a full-stack app that works well and follows good coding practices.

This project simulates a system to control rovers on a grid. Users can send commands, track their movements, and manage their states through a functional interface. It uses Node.js for the backend, React for the frontend, and MongoDB as the database. Everything runs in a Docker environment, making it easy to set up and run.

Key Features:
Backend: Built with Node.js, with simple, clear code that ensures good performance and easy updates.
Frontend: Developed with React, offering a clean and user-friendly way to interact with the rovers.
Database: Stores rover data and grid info using MongoDB.
Testing: Focus on unit and functional tests to keep the code reliable.
Deployment: Uses Docker to make running the project simple and consistent.
This project helped me show:

How I write reusable and well-organized code.
My ability to design APIs and create interactive interfaces.
How I connect technical solutions to real-world needs.
My experience with tools like Docker to make development and deployment smooth.

<p align="right">(<a href="#readme-top">back to top</a>)</p>

### Built With

This project was designed using MERN stack Mongo, Express, React and Nodejs.

- [![React][React.js]][React-url]
- [![Node][Node.js]][Node-url]
- [![MongoDB][Mongodb.com]][Mongodb-url]

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- GETTING STARTED -->

## Getting Started

Follow these steps to set up and run the project locally using Docker.


### Installation

1. Clone the repo
   ```sh
    git clone git@github.com:BlackSheep1337/mars-rovers.git
    cd mars-rovers
   ```
2. Set up environment variables
  The backend requires a .env file to run properly. Create a .env file inside the backend folder and add the following variables:
   ```sh
    PORT=5000
    MONGO_URI=mongodb://mongo:27017/roverDB
    JWT_SECRET=YourSecretKeyHere
    TEST_PASSWORD=YourTestPasswordHere
   ```
   Replace YourSecretKeyHere and YourTestPasswordHere with your own secure values.

3. Build and run the project
Use Docker Compose to build and run the containers:
   ```js
    docker-compose up --build
   ```
Access the Project
Frontend: Open your browser at http://localhost:3000

Backend: Access the API at http://localhost:5000

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- USAGE EXAMPLES -->

## Usage

This project lets you manage rovers using an API and a frontend interface. The system automatically generates a Bearer token when you register and log in to an account. After logging in, you will receive the token needed to interact with the other routes.


   ```sh
      Authorization: Bearer <your_token_here>
   ```


You can interact with the backend API directly using tools like Postman or cURL.
Here are some useful examples:

### Register
   ```sh
      POST http://localhost:5000/api/rovers/register
      Content-Type: application/json
      
      {
        "email": "user12@example.com",
        "password": "SecureP@ssw0rd"
      }
   ```

### Login
   ```sh
      POST http://localhost:5000/api/rovers/login
      Content-Type: application/json
      
      {
        "email": "user12@example.com",
        "password": "SecureP@ssw0rd"
      }
   ```

### Send command
   ```sh
      POST http://localhost:5000/api/rovers/commands  
      Content-Type: application/json
      Authorization: Bearer <token>
      
      {
        "position": {
          "x": 1,
          "y": 0,
          "direction": "E"
        },
        "commands": "MRRMMRMRRM"
      }
   ```

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- CONTRIBUTING -->

## Contributing

Contributions are welcome and make this project better! Whether it's reporting bugs, suggesting new features, or submitting pull requests, your input is greatly appreciated.

Here’s how you can contribute:

1. Fork the Project
   Click on the "Fork" button at the top of this repository.

2. Create a Feature Branch
```sh
    git checkout -b feature/AmazingFeature
   ```
3. Commit your Changes
 ```sh
    git commit -m "Add: Description of your feature or fix"
   ```

4. Push to the Branch
 ```sh
    git push origin feature/YourFeatureName
   ```
5. Open a Pull Request
   Go to the original repository and open a pull request explaining your changes.



<!-- LICENSE -->

## License

Distributed under the MIT License. See `LICENSE.txt` for more information.

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- CONTACT -->

## Contact

Email - alexandresg19@gmail.com

Phone (+55) 71 982220370

Linkedin: [https://www.linkedin.com/in/dev-alexandre-pereira/?locale=en_US](https://www.linkedin.com/in/dev-alexandre-pereira/?locale=en_US)

Project Link: [https://github.com/BlackSheep1337/mars-rovers](https://github.com/BlackSheep1337/mars-rovers)

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- MARKDOWN LINKS & IMAGES -->
<!-- https://www.markdownguide.org/basic-syntax/#reference-style-links -->

[contributors-shield]: https://img.shields.io/github/contributors/othneildrew/Best-README-Template.svg?style=for-the-badge
[contributors-url]: https://github.com/othneildrew/Best-README-Template/graphs/contributors
[forks-shield]: https://img.shields.io/github/forks/othneildrew/Best-README-Template.svg?style=for-the-badge
[forks-url]: https://github.com/othneildrew/Best-README-Template/network/members
[stars-shield]: https://img.shields.io/github/stars/othneildrew/Best-README-Template.svg?style=for-the-badge
[stars-url]: https://github.com/othneildrew/Best-README-Template/stargazers
[issues-shield]: https://img.shields.io/github/issues/othneildrew/Best-README-Template.svg?style=for-the-badge
[issues-url]: https://github.com/othneildrew/Best-README-Template/issues
[license-shield]: https://img.shields.io/github/license/othneildrew/Best-README-Template.svg?style=for-the-badge
[license-url]: https://github.com/othneildrew/Best-README-Template/blob/master/LICENSE.txt
[linkedin-shield]: https://img.shields.io/badge/-LinkedIn-black.svg?style=for-the-badge&logo=linkedin&colorB=555
[linkedin-url]: https://linkedin.com/in/othneildrew
[product-screenshot]: images/screenshot.png
[Next.js]: https://img.shields.io/badge/next.js-000000?style=for-the-badge&logo=nextdotjs&logoColor=white
[Next-url]: https://nextjs.org/
[React.js]: https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB
[React-url]: https://reactjs.org/
[Vue.js]: https://img.shields.io/badge/Vue.js-35495E?style=for-the-badge&logo=vuedotjs&logoColor=4FC08D
[Vue-url]: https://vuejs.org/
[Angular.io]: https://img.shields.io/badge/Angular-DD0031?style=for-the-badge&logo=angular&logoColor=white
[Angular-url]: https://angular.io/
[Svelte.dev]: https://img.shields.io/badge/Svelte-4A4A55?style=for-the-badge&logo=svelte&logoColor=FF3E00
[Svelte-url]: https://svelte.dev/
[Laravel.com]: https://img.shields.io/badge/Laravel-FF2D20?style=for-the-badge&logo=laravel&logoColor=white
[Laravel-url]: https://laravel.com
[Bootstrap.com]: https://img.shields.io/badge/Bootstrap-563D7C?style=for-the-badge&logo=bootstrap&logoColor=white
[Bootstrap-url]: https://getbootstrap.com
[JQuery.com]: https://img.shields.io/badge/jQuery-0769AD?style=for-the-badge&logo=jquery&logoColor=white
[JQuery-url]: https://jquery.com
[Node.js]: https://img.shields.io/badge/Node.js-6DA55F?style=flat-square&logo=node.js&logoColor=white
[Node-url]: https://nodejs.org/
[Mongodb.com]: https://img.shields.io/badge/MongoDB-47A248?style=flat-square&logo=mongodb&logoColor=white
[Mongodb-url]: https://www.mongodb.com/
