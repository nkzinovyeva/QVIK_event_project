# Mobile app for the Event platform by QVIK
"Event platform - cost efficient way to create event apps"
## Description
A Front-end part of the project aiming to create versalite and scalable mobile application for the Event platform's end-users.
Written in JavaScript — rendered with native code. With React Native we maintain two platforms and share a common technology — React.

## Getting Started

## Requirements
* [Node.js](https://nodejs.org/)

### Dependencies
* [axios](https://github.com/axios/axios) for networking
* [react-navigation](https://reactnavigation.org/) navigation library.
* [redux](https://redux.js.org/) for state management.
* [redux-persist](https://github.com/rt2zz/redux-persist) as persistance layer.
* [redux-thunk](https://github.com/gaearon/redux-thunk) to dispatch asynchronous actions.

### Installing & Executing program
* Clone the repo
```
git clone https://github.com/nkzinovyeva/event_project.git
```
* Navigate to the cloned folder and Install dependencies
```
cd event_project && npm install
```
* for testing the app locally you need the [Expo](https://expo.io/) app on your phone. 

Install the Expo client app on your iOS or Android phone and connect to the same wireless network as your computer. On Android, use the Expo app to scan the QR code from your terminal to open your project. On iOS, use the built-in QR code scanner of the Camera app
* this will start a development server for you
```
npm start
```
you can also use: 
```
expo start
```
* Running your app on a simulator or virtual device

Expo CLI allows you to run your React Native app on a physical device without setting up a development environment.

If you have Xcode installed or set up your Android development environment, you can launch your app on an Android Virtual Device by running
``` 
npm run android
```
 or on the iOS Simulator (macOS only) by running
 ```
  npm run ios 
  ``` 

## References
* [API Definition](https://qvik.herokuapp.com/swagger-ui.html)
* [API Documentation](https://qvik.herokuapp.com/api-docs)
* Documentation

## Folder structure
`src`: This folder is the main container of all the code inside the application
* `assets`: Asset folder to store all images, vectors, etc.
        
    * `icons`:  Folder to store custom icons font
* `components`:  Folder to store any common component using through the app (such as a generic button).
* `config`: Folder that contains application’s configurations.

    * index.js: File that contains application URLs.
* `constants`: Folder to store any kind of constant that you have.

    * `fonts`: Folder that contains fonts used in the application
    * theme.js: File to store all the styling concerns related to the application theme.
* `navigation`: Folder that contains files for the navigation within the application.
* `redux`: Folder that contains redux related files such as reducers, actions and store.
    * actions.js: This file contains all actions that can be dispatched to redux.
    * reducers.js: This file has all reducers, and expose the combined result.
    * store.js: The file contains all redux middlewares and the store.
* `screens`: Folder that contains all application’s screens.

`App.js`: The main component that starts the whole app.



## Authors


## License
This project is licensed under the [NAME HERE] License - see the LICENSE.md file for details
## Acknowledgments
