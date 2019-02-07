# Objectives
  * Learn to set up a React project from scratch.
  * Learn about Eslint, Jest, Babel and Webpack.
  * Appreciate the things Create React App does for us.
  * Feel warm and fuzzy that we don't _need_ CRA to start a project.

# Requirements
We need `node` & `npm`, as well as packages `live-server` and `eslint` installed _globally_. VSCode's `eslint` extension is recommended. Command line commands are run inside the project folder. This guide uses npm but should work the same using yarn.

# Steps
## 1. Project Structure
  * Create `index.html` and `index.js` files at the root of the project.
  * Inside `index.html`, scaffold a basic html document and create a script tag pointing to a non-existing (for now!) bundle file:
    * ```<script src="bundle/bundle.js"></script>```
  * Inside `index.html`, create a div element with an `id` of `target`, which we'll use to attach our React application to the DOM.
  * Initialize the project by running `npm init -y`.

## 2. Configuring the Linter
  * **Talking points:** the importance of linting. The eslint webpage.
  * Initialize using the command: `eslint --init`. You'll be presented with choices.
  * Choose `Use a popular style guide` option.
  * Choose `Airbnb`, with `React`, and `JSON` format.
  * Allow required dependencies to be installed with npm.
  * Edit the automatically created `.eslintrc.json` file to look like this (intellisense helps):
    ```javascript
    {
      "extends": "airbnb",
      "env": {
          "es6": true,
          "browser": true,
          "node": true,
          "jest": true
      },
      "parserOptions": {
          "ecmaVersion": 2018,
          "sourceType": "module",
          "ecmaFeatures": {
              "jsx": true,
              "spread": true
          }
      },
      "rules": {
          "semi": 2
      }
    }
    ```

## 3. Configuring Testing
  * **Talking points:** the importance of testing. Untested code is legacy code.
  * Install `jest` using the command `npm i --save-dev jest`.
  * Edit `package.json` file so the `test` script looks like this:
    ```javascript
    "test": "jest"
    ```
  * Run `npm test -- --init` to get an automatically generated jest configuration file. You will be asked some questions.
  * When asked, choose environment to use: `jsdom` (browser).
  * Tests can be run by typing `npm test`.

## 4. Configuring the Transpiler
  * **Talking points:** transcompiling, the babel website.
  * We need the following dev-dependencies:
    * @babel/core
    * @babel/preset-env
    * @babel/preset-react
  * Run `npm i --save-dev @babel/core @babel/preset-env @babel/preset-react`.
  * Create a `babel.config.js` file at the root of the project.
  * Put this configuration inside `babel.config.js`:
    ```javascript
    module.exports = {
      "presets": [
        ["@babel/preset-env", { "targets": { "chrome": "60" } }],
        "@babel/preset-react"
      ]
    }
    ```
  * `@babel/preset-env` will configure itself according to the desired targets. Edit browser name and version to get more or less aggressive transpiling of the code. Without this `{ "targets": etc etc } ` configuration object, all the JavaScript code will get transpiled down to ES5, which might be overkill depending on project requirements.

## 5. Configuring the Bundler
  * **Talking points:** concatenation, minification, uglification, the problem of fetching many assets over http.
  * We need the following dev-dependencies:
    * webpack
    * webpack-cli
    * babel-loader
  * Run `npm i --save-dev webpack webpack-cli babel-loader`.
  * Edit `package.json` and add a new script:
    * `"dev": "webpack --watch"`.
  * Create a `webpack.config.js` file at the root of the project.
  * Edit `webpack.config.js` file to add a mode of operation, entry and output points, and extensions:
    ```javascript
      var path = require('path');

      module.exports = {
        // 'production' mode would minify and uglify the code, and use React's production code
        mode: 'development',
        // entry is the starting point for the web made by our files through imports and exports
        entry: path.resolve(__dirname, 'index.js'),
        // all code will get concatenated into a single bundle.js inside a bundle folder
        output: {
          path: path.resolve(__dirname, 'bundle'),
          filename: 'bundle.js',
        },
        // types of files we want Webpack to bundle
        resolve: {
          extensions: ['.js', '.jsx'],
        },
      };
      ```
  * Add a new `module` key to `webpack.config.js` file:
      ```javascript
      var path = require('path');

      module.exports = {
        // etc
        // mode, entry, output, resolve
        // etc
        module: {
          rules: [
            {
              test: /\.(js|jsx)$/,
              exclude: /node_modules/,
              use: {
                loader: 'babel-loader'
              }
            },
          ]
        }
      }
    ```

## 6. Creating a Barebones React App
  * **Talking points:** difference between React and React DOM.
  * Install React and React DOM: `npm i --save react react-dom`
  * Edit index.js as follows:
    ```javascript
    import React from 'react';
    import ReactDOM from 'react-dom';

    function App() {
      return (
        <div>Hello World</div>
      );
    }

    ReactDOM.render(
      <App />, document.querySelector('#target'),
    );
      ```
  * Run Webpack: `npm run dev`
  * Run Live Server in a separate terminal: `live-server`
  * Run tests in a separate terminal: `npm test`

## 7. Adding Support for LESS
  * We need the following dev-dependencies:
    * less
    * less-loader
    * css-loader
    * style-loader
  * Run `npm i --save-dev less less-loader css-loader style-loader`.
  * Edit the `extensions` part inside `webpack.config.js` to look for `.less` files:
    ```javascript
      {
        // etc
        resolve: {
          extensions: ['.js', '.jsx', '.less']
        },
        // etc
      }
    ```
  * Add the following object to the `rules` array inside `webpack.config.js`:
    ```javascript
      {
        test: /\.less$/,
        exclude: /node_modules/,
        use: [
          { loader: 'style-loader' },
          { loader: 'css-loader' },
          { loader: 'less-loader' }
        ]
      }
    ```
  * Create an `index.less` file at the root, add some styles and import it into `index.js` using the following syntax:
    * `import './index.less';`
  * Remember to restart webpack in order to get the configuration changes.

## 8. Final Touches
  * Initialize git repository.
  * Add `node_modules` and `bundle` folders to `.gitignore`.
  * Prevent configuration files from being linted by creating a top-level `.eslintignore` file.
  * Add annoying Airbnb rules to the `eslintrc.json` file with a value of `0` (1 means warning, 2 means error):
  ```javascript
    {
      // etc
      "rules": {
          "semi": 2,
          "annoying-rule-we-want-disabled": 0
      }
    }
  ```
  * Move the React code into `./src/RootComponent` folder and have `index.js` import `RootComponent`.