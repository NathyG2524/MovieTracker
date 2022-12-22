# MovieTracker
    This web application lets users keep a list of the movies they have watched and assign ratings to each movie. It then provides some useful insight into their movie preferences and habits.


## Table of content

- [Technologies](#technologies)
- [Getting Started](#getting-started)
    - [Backend](#for-the-backend)
    - [Frontend](#for-the-frontend)
- [Features](#features)
- [API](#api-reference)
    - [Error Handling](#error-handling)
    - [EndPoints](#endpoints)

## Technologies

 
## Getting Started

    To start using this web application, simply clone this repository. You can start the app locally by downloading the neccessary dependencies for the frontend and start the app using the command "npm start". In addition you have to download the neccessary dependencies for the backend and run the backend .

clone the repository

``` 
    git clone git@github.com:NathyG2524/MovieTracker.git
```

### For the backend

```
cd movie-tracker
```

install dependencies

```
npm install
```

Start the dev server

```
npm run start:dev
```

### For the Frontend 
open  another terminal and change your directory to the previously cloned repository 

```
cd movieTrackerFrontEnd
```

install dependencies

```
npm install
```

Start the dev server

```
npm run dev
```
 

## Features:

 

    - Movie list: list of movies that I have watched.

               - I should be able to add, edit, delete movies.

 

               - Each movie entry contains the following:

                               - Title

                               - Genre: this should be selected from a fixed list of possible values (Action, Comedy, Adventure, Horror). Assume that a movie only has one genre.

                               - Watch date

                               - Rating: this is a number from 1-5

 

 

    - Dashboard: Based on the movies that I have added, create a section on the web app to show the following -

                - Favorite genre: this is based on the ratings that the user has given to movies of different genres. The genre which has received the highest ratings becomes the favorite.

                - Average number of movies watched per month.

                - Current mood: find the last movie I watched, and show a Happy face emoji if the rating is equal or higher than 4, A neutral face emoji if between 2-3, or sad face if the rating is 0-1.
                [![dashboard](https://ibb.co/hVJ7gSt)](https://ibb.co/hVJ7gSt)
                [![editorfild.png](https://i.postimg.cc/vBg3jdGN/editorfild.png)](https://postimg.cc/KkbPkwkP)




# API Reference

 ### Getting Started

    1.  Base URL: The backend app is hosted at `http://localhost:3000/api/` 

### Error Handling
 
 errors are returned in the following format:

    {
        "error": 400,
        "message": "Bad Request"
    }

    
    The success field is a boolean that indicates whether the request was successful or not.
    The error field is the error code.
    error types are:
        400: Bad Request
        404: Not Found
    The message field is a human-readable message that can be displayed to the user.
    
### Endpoints
---

    1.  GET /movie: Get all roles.

    Fetches all list of movie.
    returns: an object with the following fields:

    Sample: curl -X 'GET' \
    'http://localhost:3000/movie' \
    - H 'accept: application/json'
    
``` json
    [
  {
    "id": 1,
    "title": "HIMYM",
    "watchedDate": "2022-12-22T22:12:18.409Z",
    "genre": "Comedy",
    "rating": 5
  },
  {
    "id": 2,
    "title": "FRIENDS",
    "watchedDate": "2022-12-22T22:12:18.409Z",
    "genre": "Comedy",
    "rating": 5
  },
  {
    "id": 3,
    "title": "The A team",
    "watchedDate": "2022-12-22T22:12:18.409Z",
    "genre": "Action",
    "rating": 4
  }
]
```

    2.  GET /movie/fav: Get favorite genre.

    Fetches all list of favorite genre.
    returns: an object with the following fields:

    Sample: curl -X 'GET' \
    'http://localhost:3000/movie/fav' \
    -H 'accept: application/json'
    
``` json
[
  "Comedy",
  "Action"
]
```

    3.  GET /movie/avg: Get number of movies watched per month.

    Returns average number of movies watched per month.

    Sample: curl -X 'GET' \
    'http://localhost:3000/movie/avg' \
    -H 'accept: application/json'
    
``` json
2
```

     4.  GET /movie/mood: Get rating of lastly watched movies.

    Returns: lastly watched movie rating:

    Sample: curl -X 'GET' \
    'http://localhost:3000/movie/mood' \
    -H 'accept: application/json'
    
``` json
[
  5
]
```

     5.  GET /movie/{id}: Get movie by id.

    Fetches a movie by id.
    returns: an object with the following fields:

    Sample: curl -X 'GET' \
    'http://localhost:3000/movie/2' \
    -H 'accept: */*'
    
``` json
{
  "id": 2,
  "title": "FRIENDS",
  "watchedDate": "2022-12-22T22:12:18.409Z",
  "genre": "Comedy",
  "rating": 5
}
```

    6.  POST /movie/{id}: Create a new movie

    CREATE a new movie.
    returns: an object with the following fields:

    Sample: curl -X 'POST' \
    'http://localhost:3000/movie' \
    -H 'accept: application/json' \
    -H 'Content-Type: application/json' \
    -d '{
    "title": "Spider Man",
    "genre": "Action",
    "rating": 4,
    "watchedDate": "2020-12-22T22:53:26.490Z"
    }'
    
``` json
{
  "status": "200",
  "sucess": true,
  "message": "Created"
}
```

    7.  PATCH /movie/{id}: update movie by id.

    Update a movie by id.
    returns: an object with the following fields:

    Sample: curl -X 'PATCH' \
     'http://localhost:3000/movie/2' \
     -H 'accept: */*' \
    -H 'Content-Type: application/json' \
    -d '{
    "rating": 4
    }'
    
``` json
{
  "updated": 2,
  "success": true,
  "status": 200
}
```

    8.  DELETE /movie/{id}: delete movie by id.

    delete a movie by id.
    returns: an object with the following fields:

    Sample: curl -X 'DELETE' \
    'http://localhost:3000/movie/2' \
    -H 'accept: */*' \
    -H 'Content-Type: application/json' \
    -d '{
    "rating": 4
    }'
    
``` json
{
  "updated": 2,
  "success": true,
  "status": 200
}
```