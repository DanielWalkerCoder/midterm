To start a frontend project, type npm create vite@latest in the terminal to create a project folder. Name it and then select React for framework and JavaScript for variant and then run cd 'name' and npm install. After opening in VCS with code ., run npm run dev in VSC to use your frontend in a browser. (dev is in your package.json)

Make sure to install axios if you're connecting to a backend (and install cors in the backend).

Optional: delete main.css and its import in main.jsx

Create a components folder inside src. Each component should have a folder for the component(.jsx) itself and the component's css.




If using global variables, install redux and react-redux. Then make a store.js file.





Get rid of the code in app.jsx and use the snippet rfce through the ES7+ extension to set up a boiler plate. Use import './App.css' if you wish, but clear what you don't want from the app.css file. To make it so that clicking on text doesn't highlight it, use this css:
#root {
  user-select: none;
}
//root is a class established in main.jsx