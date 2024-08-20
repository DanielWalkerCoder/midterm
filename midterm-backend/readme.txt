***BACKEND NOTES***

To create a new backend server using locally stored mongodb data, type npm init -y in the terminal. After typing cd name to go into your new project folder, open it with code . and then type npm install morgan express cors mongoose in the VSC terminal to install the appropriate programs. cors is necessary if you wish a frontend project to be able to communicate with this server. 

Make sure "main" in package.json is server.js and make sure there is a server.js file.

Run nodemon (install if necessary) to start the server and ctrl+c to stop it.