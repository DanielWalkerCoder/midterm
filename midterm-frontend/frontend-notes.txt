***FRONTEND NOTES***

To start a frontend project, type npm create vite@latest in the terminal to create a project folder. Name it and then select React for framework and JavaScript for variant and then run cd 'name' and npm install. After opening in VCS with code ., run npm run dev in VSC to use your frontend in a browser. (dev is in your package.json)

Make sure to install axios if you're connecting to a backend (and install cors in the backend).

Optional: delete main.css and its import in main.jsx

Create a components folder inside src. Each component should have a folder for the component(.jsx) itself and the component's css.

If using global variables, run npm install @reduxjs/toolkit react-redux. Make a store.js file and a slice file for each global variable. Wrap the top level of render in main.jsx in <Provider store={store}></Provider>. hitSlice.js, Controls.jsx, and Display.jsx are practice files for installing global variables and are not in the actual app. Import useDispatch from 'react-redux' into a component if you want to change a global variable, and import useSelector from 'react-redux' into a component if you want to use a global variable.

Get rid of the code in app.jsx and use the snippet rfce through the ES7+ extension to set up a boiler plate. Use import './App.css' if you wish, but clear what you don't want from the app.css file. To make it so that clicking on text doesn't highlight it, use this css:

#root {
  user-select: none;
}
//root is a class established in main.jsx

To use bootstrap stylings, first install it with npm install bootstrap@latest --save. Then import both the css and js for it with this:

import 'bootstrap/dist/css/bootstrap.min.css'
import "bootstrap/dist/js/bootstrap.bundle.min.js"