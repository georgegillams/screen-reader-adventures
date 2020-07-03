# API Structure

API structure is defined in [`apiStructure.js`](https://github.com/georgegillams/georgegillams.co.uk/blob/main/helpers/apiStructure.js) which is available to both client and server. Each API capability has a http-method, path, and full-path.

The actions (Promises) which the server uses to perform each capability are added in [`apiStructureWithActions.js`](https://github.com/georgegillams/georgegillams.co.uk/blob/main/server/api/apiStructureWithActions.js).

## API request handling

API requests are rate-limited by delaying requests to the API if the limit of 100 requests/hour is reached.
When an API request comes in, [`server/index.js`](https://github.com/georgegillams/georgegillams.co.uk/blob/main/server/index.js) will look for an action matching the path and the http method for the action. If a matching API capability is found, the associated action (Promise) is resolved.

If an API action (Promise) resolves and object, it will be returned to the client. If an API action (Promise) throws a [`CategorisedError`](https://github.com/georgegillams/georgegillams.co.uk/blob/main/server/utils/errors.js) then the server will sent back the error along with a suitable http status code.
