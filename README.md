# Find-me-a-Movie API Server

A high-performance REST API built with Node.js, Express, and MongoDB, serving a dataset of 1.1M+ movies imported from Kaggle.
This API supports pagination, sorting, search, genre filtering, and secure access with API keys, designed for scalability and production readiness.

Deployed live on Render.


## Features

- Large Dataset: 1.1 million+ movie documents stored in MongoDB.

- Filtering & Search:

- Pagination (page, limit)

- Sorting by popularity, release_date, vote_average

- Text search by title

- Genre-based filtering

- API key authentication

- Rate limiting with express-rate-limit (50 requests per 15 minutes per IP)

- Secure headers via helmet

- CORS configuration for controlled access

- Validation: Strong request validation using Zod schemas

- Logging: Custom request & error logging with unique IDs

- Logs persisted to files (reqLog.txt, errLog.txt)

- Error Handling: Centralized, structured error responses

- Indexes for Performance: Optimized MongoDB indexes on title, overview, genres, popularity, vote_average, and release_date

## Tech Stack

- Node.js

-  Express.js

-  MongoDB (Mongoose)

- Helmet, API Key Auth, Rate Limiting

- Deployment: Render

- Validation: Zod for request validation


## Folder Structure
```
src/
    │
    ├── config/        # Database, CORS & environment configuration
    │            
    │── controllers/   # Route controllers (movies, genres)
    │            
    │── data/          # Static data (genres list)
    │            
    │── middlewares/   # Auth, rate limit, logging, validation, error handling
    │            
    │── models/        # Mongoose schemas & indexes
    │            
    │── routes/        # Express route definitions
    │            
    ├── utils/         # Utility functions (e.g., genre mapping)
    │            
    ├── validations/   # Zod validation schemas

```

## API Endpoints

#### Movies 

| Method | Endpoint    | Description                       |
| :-------- | :------- | :-------------------------------- |
| `GET` | `/api/movies` | Get All Movies (with Pagination) |
| `GET` | `/api/movies/:id` | Get movie by ID |


#### Query Params
  
| Param| Type    | Required   | Default | Description
| :-------- | :------- | :------- |:-- |:--
| `page` | `number` | NO | 1|Page number for pagination |
| `limit` | `number` | NO |20| Number of results per page (1–100)|
| `sort_by` | `string` | NO | `popularity`|Sorting option: popularity, vote_average, release_date
| `search` | `string` | NO |""|Search by movie title (partial match)|
| `with_genres` | `string` | NO |""|Filter by genre (e.g., Action, Comedy)|

#### Headers
| Header | Required    | Description                       |
| :-------- | :------- | :-------------------------------- |
| `x-api-key` | Yes | API key for authentication (server will reject requests without valid key) |


### Example response

- ##### `/api/movies`

```
{
  "page": 1,
  "total_pages": 50,
  "results": [
    {
      "id": 24428,
      "title": "The Avengers",
      "genres": ["Action", "Adventure", "Science Fiction"],
      "vote_average": 7.71,
      "vote_count": 29166,
      "popularity": 98.082,
      "release_date": "2012-04-25T00:00:00.000Z"
    },
    {
      "id": 99861,
      "title": "Avengers: Age of Ultron",
      "genres": ["Action", "Adventure", "Science Fiction"],
      "vote_average": 7.3,
      "vote_count": 20000,
      "popularity": 85.123,
      "release_date": "2015-04-22T00:00:00.000Z"
    }
    ...
  ]
}

```
- #### `/api/movies/:id`

```
{
  "id": 24428,
  "title": "The Avengers",
  "genres": ["Action", "Adventure", "Science Fiction"],
  "vote_average": 7.71,
  "vote_count": 29166,
  "popularity": 98.082,
  "release_date": "2012-04-25T00:00:00.000Z",
  "overview": "Earth's mightiest heroes must come together...",
  "runtime": 143,
  "budget": 220000000,
  "poster_path": "/cezWGskPY5x7GaglTTRN4Fugfb8.jpg",
  "backdrop_path": "/hbn46fQaRmlpBuUrEiFqv0GDL6Y.jpg",
  "original_language": "en"
}


```



## Getting Started (Development)

   #### 1. **Clone the repo:**
    git clone https://github.com/Shinjon101/find-me-a-movie-backend.git
    cd find-me-a-movie-backend
   
   ####  2.  **Install dependencies**
     npm install

   #### 3. Create .env.development.local with:

   ```
PORT=5500
MONGO_URI=<your-mongo-connection-string>
API_ACCESS_KEY=<your-generated-secret>
CLIENT_URL=http://localhost:5173
```
  #### 4.  Generate your access token secret:
   ```
   node "console.log(require('crypto').randomBytes(64).toString('hex'))"
   ```
#### 5.  Run backend in dev:

```
npm run dev
```
#### 6.  Production build:
```
npm run build
npm start
```


## Deployment


#### Backend on Render

- Add a new Web Service in Render

- Connect to repo

- Set build command:

```
npm install
npm run build
```

- Set start command:

```
npm start
```

- Add .env.production.local (with CLIENT_URL= < deployed frontend url >)
