# Feathers-Vue Login Example
Demonstrates how to use Feathers Authentication backend with Vue frontend. Showcases both:
- Username/Password login with local strategy
- oAuth with Google (add more if required)

Protecting the Vue routes with navigation guards is very tricky if you try to add the full verification logic inside the router. Rather, this example illustrates another technique that uses a combination router guard + in-component secure logic.

Every router level component is embedded inside a `secure` container that monitors if `currentUser` is valid or not. If not, replace its content with Login UI.
- Eliminates the need for separate login route
- Redirection to the current route after login becomes easy

![Screenshot](https://i.imgur.com/WoU6Hdb.jpg)

### Login setup
To configure oAuth, set the Google `secret` and `key` values in the `config\default.json` file. You can obtain your own oAuth credentials from [Google App Console]( https://console.developers.google.com/apis/credentials?pli=1).

Default local auth
 - username: demo@local
 - password: demo

Logout button is available in the `About` route for testing. It clears the localstorage and clears the current user, which forces the loginUI to load on the current router-level container.

Tip: To manually `logout` remove the `feathers-jwt` key from the local storage. Run the below from the browser console:
````
window.localStorage.removeItem('feathers-jwt')
````


## Project setup
You can either use `npm` or `pnpm`. 
```
pnpm install
```
Run the above command from the main project folder as well as the `ui` folder also.

### Hot-reloads for development
```
pnpm run dev
```
Run the above command from the main project folder as well as the `ui` folder also (in two separate terminals). Then browse to [ http://localhost:32320/](http://localhost:32320/)



## References

- Register new oAuth App with Github: https://github.com/settings/applications/new
- Auth with FeathersJS: https://docs.feathersjs.com/guides/basics/authentication.html#github-login-oauth
