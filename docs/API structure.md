# API Structure

API structure is defined in [`apiStructure.js`](https://github.com/georgegillams/screen-reader-adventures/blob/main/helpers/common/apiStructure.js) which is available to both client and server. Each API capability has a http-method, path, and full-path.

The actions (Promises) which the server uses to perform each capability are added in [`apiStructureWithActions.js`](https://github.com/georgegillams/screen-reader-adventures/blob/main/server/api/actions/common/apiStructureWithActions.js).

## API request handling

### Security

API requests are rate-limited by delaying requests to the API if the limit of 100 requests/hour is reached.
The server uses CORS, so modern browsers will not allow a webpage other than this one to call it's API.

### API route logic

When an API request comes in, [`server/api.js`](https://github.com/georgegillams/screen-reader-adventures/blob/main/server/api/api.js) will look for an action matching the path and the http method for the action. If a matching API capability is found, the associated action (Promise) is resolved.

If an API action (Promise) resolves and object, it will be returned to the client. If an API action (Promise) throws a [`CategorisedError`](https://github.com/georgegillams/screen-reader-adventures/blob/main/server/utils/common/errors.js) then the server will sent back the error along with a suitable http status code.
