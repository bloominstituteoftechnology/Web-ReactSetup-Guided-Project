# How to Run this App
  * Clone repository.
  * Run `npm install`.
  * Run `npm run webpack` to bundle the app with a watcher.
  * Run `npm run server` to launch the development web server.
  * Run `npm test` to run tests.

# Objectives
  * Learn to set up a React project from scratch.
  * Learn about Eslint, Jest, Enzyme, Babel and Webpack.
  * Appreciate the things Create React App does for us.
  * Feel warm and fuzzy that we don't _need_ CRA to start a project.

# Requirements
We need `node` version 8.1+ & `npm` version 5.2+. VSCode's `eslint` extension is recommended. Commands are run inside the project folder.

# Steps
## 1. Project Structure
  * We need the following dev-dependencies:
    * live-server
  * Run `npm add -D live-server`.
  * Create `index.html` and `index.js` files at the root of the project.
  * Inside `index.html`, scaffold a basic html document and create a script tag pointing to a non-existing (for now!) bundle file:
    * ```<script defer src="bundle/bundle.js"></script>```
  * Inside `index.html`, create a div element with an `id` of `target`, which we'll use to attach our React application to the DOM.
  * Initialize the project by running `npm init -y`.
  * Open the generated `package.json` and edit the `scripts` property:
    ```javascript
    // etc
    "scripts": {
      "server": "live-server",
      "webpack": "webpack --watch",
      "test": "jest --watchAll"
    },
    // etc
    ```

## 2. Configuring the Linter
  * **Talking points:** the importance of linting. The eslint webpage.
  * Initialize using the command: `npx eslint --init`. You'll be presented with choices.
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

## 3. Configuring Testing with Jest
  * **Talking points:** the importance of testing. Untested code is legacy code.
  * Install `jest` using the command `npm add -D jest`.
  * Run `npx jest --init` to get an automatically generated jest configuration file. You will be asked some questions.
  * When asked, choose environment to use: `jsdom` (browser).
  * Create a top-level folder named `setup_tests`.
  * Inside `setup_tests`, create a `__mocks__` folder.
  * Inside `__mocks__` folder, create `fileMock.js` and `styleMock.js` files.
  * Inside `fileMock.js` place the following code:
    ```javascript
      module.exports = 'test-file-stub';
    ```
  * Inside `styleMock.js` place the following code:
    ```javascript
      module.exports = {};
    ```
  * Find the `jest.config.js` file at the root of the project. This was generated automatically.
  * Uncomment `moduleNameMapper` and add the following value:
    ```javascript 
        moduleNameMapper: {
          "\\.(css|less|sass|scss)$": "<rootDir>/setup_tests/__mocks__/styleMock.js",
          "\\.(gif|ttf|eot|svg)$": "<rootDir>/setup_tests/__mocks__/fileMock.js"
        },
    ```

## 4. Configuring UI Testing with Enzyme
  * We need the following dev-dependencies:
    * enzyme
    * enzyme-adapter-react-16
  * Run `npm add -D enzyme enzyme-adapter-react-16`.
  * Create a `setupTests.js` file inside the `setup_tests` top-level folder.
  * Add the following code to `setupTests.js`:
    ```javascript
      import { configure } from 'enzyme';
      import Adapter from 'enzyme-adapter-react-16';

      configure({ adapter: new Adapter() });
    ```
  * Find the `jest.config.js` file at the root of the project.
  * Uncomment `setupFilesAfterEnv` and add the following value:
    ```javascript 
      setupFilesAfterEnv: [
        '<rootDir>setup_tests/setupTests.js',
      ],
    ```

## 5. Configuring Babel
  * **Talking points:** transcompiling, the babel website.
  * We need the following dev-dependencies:
    * @babel/core
    * @babel/preset-env
    * @babel/preset-react
  * Run `npm add -D @babel/core @babel/preset-env @babel/preset-react`.
  * Create a `babel.config.js` file at the root of the project.
  * Put this configuration inside `babel.config.js`:
    ```javascript
      module.exports = {
        presets: [
          ["@babel/preset-env", { "targets": { "chrome": "60" } }],
          "@babel/preset-react"
        ]
      }
    ```
  * `@babel/preset-env` will configure itself according to the desired targets. Edit browser name and version to get more or less aggressive transpiling of the code. Without this `{ "targets": etc etc } ` configuration object, all the JavaScript code will get transpiled down to ES5, which might be overkill depending on project requirements.

## 6. Configuring Webpack
  * **Talking points:** concatenation, minification, uglification, the problem of fetching many assets over http.
  * We need the following dev-dependencies:
    * webpack
    * webpack-cli
    * babel-loader
  * Run `npm add -D webpack webpack-cli babel-loader`.
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

## 7. Creating a Barebones React App
  * **Talking points:** difference between React and React DOM.
  * Install React and React DOM: `npm add react react-dom`
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

## 8. Adding Support for CSS and LESS
  * We need the following dev-dependencies:
    * less
    * less-loader
    * css-loader
    * style-loader
  * Run `npm add -D less less-loader css-loader style-loader`.
  * Edit the `extensions` part inside `webpack.config.js` to look for `.less` files:
    ```javascript
      {
        // etc
        resolve: {
          extensions: ['.js', '.jsx', '.less', '.css']
        },
        // etc
      }
    ```
  * Add the following objects to the `rules` array inside `webpack.config.js`:
    ```javascript
      {
        test: /\.less$/,
        exclude: /node_modules/,
        use: [
          { loader: 'style-loader' },
          { loader: 'css-loader' },
          { loader: 'less-loader' }
        ]
      },
      {
        test: /\.css$/,
        exclude: /node_modules/,
        use: [
          { loader: 'style-loader' },
          { loader: 'css-loader' }
        ]
      }
    ```
  * Create an `index.less` file at the root, add some styles and import it into `index.js` using the following syntax:
    * `import './index.less';`
  * Remember to restart webpack in order to get the configuration changes.

## 9. Adding Support for Class Properties in React Components
  * Run `npm add -D @babel/plugin-proposal-class-properties`.
  * Add a `plugins` key to `babel.config.js`:
    ```javascript
      module.exports = {
        presets: [
          ["@babel/preset-env", { "targets": { "chrome": "60" } }],
          "@babel/preset-react"
        ],
        plugins: [
          '@babel/plugin-proposal-class-properties'
        ]
      }
    ```

## 10. Removing Linting Error with Arrow Functions in React Components
  * With arrow functions we don't need to bind `this` in the constructor.
  * Run `npm add -D babel-eslint`.
  * Inside `.eslintrc` add a `parser` key:
    ```javascript
      {
        "extends": "airbnb",
        "parser": "babel-eslint",
        // etc
      }
     ```
## 11. Have the Bundler Generate a Source Map
  * Add the following field to the configuration in `webpack.config.js`:
    ```javascript
      devtool: 'source-map',
    ```

## 12. Use Webpack Bundle Analyzer Plugin
  * This allows to visually inspect the weight of our npm dependencies.
  * Install Webpack Bundle Analyzer by running `npm add -D webpack-bundle-analyzer`.
  * Pull the analyzer in at the top of `webpack.config.js`.
    ```javascript
      var BundleAnalyzer = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
    ```
  * Create a plugins property on the module.exports object in `webpack.config.js`.
    ```javascript
      plugins: [
        new BundleAnalyzer()
      ],
    ```

## 13. Final Touches
  * Initialize git repository.
  * Add `node_modules` and `bundle` folders to `.gitignore`.
  * Prevent configuration files from being linted by creating a top-level `.eslintignore` file.
  * Add annoying Airbnb rules to the `eslintrc.json` file with a value of `0` (1 means warning, 2 means error):
    ```javascript
      {
        // etc
        "rules": {
            "semi": 2,
            "annoying-rule-we-want-disabled": 0,
            // etc
        }
      }
    ```