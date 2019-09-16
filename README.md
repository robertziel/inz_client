<!-- Build Status -->
<a href="https://travis-ci.org/robertziel/simple_panel_react_client">
  <img src="https://travis-ci.org/robertziel/simple_panel_react_client.svg" alt="Build Status" />
</a>

# SIMPLE PANEL REACT CLIENT

Staging: https://simple-panel-react-client.robertz.co (server based in Poland, app may be asleep and take time to wake up)

RAILS API:
https://github.com/robertziel/simple_panel_rails_backend

Init based on https://www.reactboilerplate.com

Run using npm
```
cd react_client
npm run setup
npm start
```

#### API fetchers
* I made a simple fetching methods so that only path, body and afterSuccess callback are required to make a request to API anywhere in the project. All necessary settings and errors handling are handled under the hood and kept DRY in one component. Check: `app/containers/BackendApiConnector/fetchers.js`
* Available fetchers:
  * `apiGet(options: { form, path, afterSuccess })`
  * `apiPost(options: { form, path, body, afterSuccess })`

#### AUTHENTICATION
* all authentication related containers are kept in `app/containers/_authPages`
* `app/containers/BackendApiConnector` is responsible for:
  * handling all requests to API
    * API URL is set in `.env` as `BACKEND_API_URL`
  * keeping signed in currentUser data and authenticationToken:
    * User data are not saved in cookies and application asks API to access them each time it initializes before render proper content
    * authenticationToken is saved in cookies
    * when any API request has authentication problem then:
      * authenticationToken is set to null
      * currentUser is set to null
      * when authenticationToken is null SignInPage is rendered `app/containers/BackendApiConnector/index.js`

#### FORMS
It's hard to make forms DRY, but we can adopt some conventions.
Example form can be found in `containers/_authPages/SignInPage/Form.js`
Component:
* keeps all form params in state and updates them on input's onChange event
* `onSubmit()` function should be responsible for any actions made after form is submitted, in most cases it will be API fetch (check section API fetchers)
* when using API fetcher:
  * define `state.disabled`
  * you should pass `form: this` to fetcher
  * fetcher will call `form.disable()` before and `form.enable()` after AJAX call
  * `state.disabled` is used in submit button as `disabled={this.state.disabled}` to prevent from double submit
Test:
* `shouldDisableFormAfterSubmit(formComponentName, methods: { configure, fillInAndSubmitForm })`
  * Include `import shouldDisableFormAfterSubmit from 'testsHelpers/shouldDisableFormAfterSubmit';` and call in your tests
  * parameters
    * `formComponentName` - component name as string like `'Form'`, is used to find component in wrapper
    * `methods: { configure }` - function which should call enzyme mock and return wrapper containing tested form component
    * `methods: { fillInAndSubmitForm }` - function which fills in and submit form with valid data

#### Notifications
* Based on https://github.com/igorprado/react-notification-system
* `notificationSystem` reference can be accessed from `app/containers/NotificationsSystem`
* notification functions should be defined in `notifications.js` files, with following name format `function *Notify()` like `function randomNameNotify()`

#### UI
* CSS based on https://www.styled-components.com/
  * Global style is defined in `app/styles/global-styles.js`
  * Constants with common variables like colors etc. are defined in `app/styles/constants.js`
  * Containers and components have own SCSS defined in `Wrapper.js`
* Basic commonly used elements like container, grid, h1 are defined in `app/components/_ui-elements` folder
  * The elements' components are based on:
    * https://material-ui.com
    * Custom components are defined in `app/components/_ui-elements/*Core` folder like `DivCore`
  * Each element should be accessible in `app/components/_ui-elements/index.js` as `import { Element1, Element2 } from components/_ui-elements` by exporting its styled version
  * Styled version is defined in `app/components/_ui-elements/*.js` file. For example `app/components/_ui-elements/Div.js`
    * Additional style version can be added like:
    ```
      ${({ topLine }) =>
        topLine &&
        css`
          border-top: 4px solid ${colors.main}
        `
      }
    ```
    So that style version (in that case named `topLine`) can be used in element by adding it to props `<Div topLine />`


##### TO DO:
* fix styles, make sure mobile UI is working well
* Add Users page with actions (show, new, edit, delete)
* Implement User roles system
* Add simple Profile page (show, edit)
