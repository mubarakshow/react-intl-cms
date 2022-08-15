# react-intl-cms
This is a monorepo for a translation/copy management system which contains the `app`, `server`, and `cms`.

## Start client app.
- Install required dependencies: `cd app && npm install`
- Run the app: `npm start` - starts on port **3000**


## Start Server
- Install required dependencies: `cd server && npm install`
- Run the server: `npm start` - starts of port **8080**


## Sever API Endpoints
A mini documentation for the API

### updateTranslation
- Endpoint: `/update-tr`
- request type: `PUT`
- request body:
```json
{
  "lng": "",
  "namespace": "",
  "data": {}
}
```




