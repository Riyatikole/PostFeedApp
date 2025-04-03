Project: Post-Feed-App
Description: This is a MERN Stack application containerized with Docker and orchestrated with Docker Compose. The app consists of: 
•	MongoDB (Database)
•	Express.js (Backend)
•	React (Vite) (Frontend)
 
Setup and Installation:
	Clone the repository from this Github link: https://github.com/Riyatikole/PostFeedApp.git
	Ensure you have Docker & Docker Compose Installed on your machine and engine is running
	To build and start the app, run: docker compose up –build -d | docker compose up -d
	This will start the MongoDB, Backend and Frontend services
	Automatically setup the necessary network
	Deployed Links:
	Frontend: http://localhost:5173/
	Backend: http://localhost:8000/
	Mongodb: http://localhost:27017/
	After viewing the App, to stop all running containers, run: docker compose down
	To check running containers, run: docker ps
	To check logs, run: docker compose logs container_ID (use docker ps command to get ID)

Details about the Project:
Tech Stach
•	Frontend: React(Vite)
•	Backend: NodeJs + ExpressJs 
•	Database: MongoDB
•	Containerization: Docker & Docker Compose
About:
•	When you will go to http://localhost:5173, You will be first asked to enter your name
•	You will be directed to main page which shows the latest posts if available or will display the text to create a new post
•	You can create a new post using the + icon on the bottom
•	You can comment on any post by clicking the comment icon under each post
•	You can search for all post content and authors using the search bar, initially after a debounce it will show the results in a dropdown. Once you are sure about the search to make, click the search icon to get all the results.
•	The loader is shown for a debounce of 1000ms
•	You can comment on any resulted post, after the comment it will refresh the page to home page.
•	You can also use the Home icon to return to initial page.
•	Uses docker-compose.yaml for easy deployment

Assumption/Things to Note:
•	The post data and comment data are stored separately and the comments field in post schema is ref to comment schema.
•	App is built for small applications.
•	The data which will be displayed at Main page has no limitations and is assumed to be a working model with a smaller number of posts
•	The UI is kept simple to focus on functionality
•	The search API is on backend side
•	I have use tailwind CSS for better UI experience
