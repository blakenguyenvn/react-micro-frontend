This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Prerequisite (!IMPORTANT)

`Using node v12.22.3 (npm v6.14.13)`

We need clone and setup Custom Proxy for React App here:
`git@gitlab.com:simflextech/vin-react-proxy.git`

## Environment

In root folder, create `.env` file with content below:

``

    PORT=8085
    FAST_REFRESH='false'
    REACT_APP_MAP_KEY=
    ESLINT_NO_DEV_ERRORS='true'
    DISABLE_ESLINT_PLUGIN=true

    # API
    REACT_APP_MODE='DEVELOPMENT'
    REACT_APP_PROXY='http://localhost:4000/'
    REACT_APP_API_KEY_DEV='testsupertoken'

``

## Available Scripts

In the project directory, you can run:

### `yarn start`

Runs the app in the development mode.<br>
Open [http://localhost:8085](http://localhost:8085) to view it in the browser.

The page will reload if you make edits.<br>
You will also see any lint errors in the console.

### `yarn test`

Launches the test runner in the interactive watch mode.<br>
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `yarn run build`

Builds the app for production to the `build` folder.<br>
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br>
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `yarn run eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (Webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).
