# social-media

An Express.js + MongoDB app exposing API endpoints for a social media service using JSON Web Tokens for authentication.

## Endpoints
### Public
- `POST /signup` <br>
Register new user
  - Request
    - Form data
      - `username` : \<username>
      - `password` : \<password>
  - Response <br>
    `201`
   <details><summary>Sample response</summary>

      {
        "message": "Signed up successfully!",
        "user": {
          "_id": "620a9df64b80e4d747b9f94e",
          "username": "johndoe",
          "follows": [],
          "__v": 0
        },
        "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InRlc3R1c2VyMjIyd3FkcyIsImlkIjoiNjIwYTlkZjY0YjgwZTRkNzQ3YjlmOTRlIiwiaWF0IjoxNjQ0ODYyOTY2LCJleHAiOjE2NDQ5NDkzNjZ9.780_pR5NENaYXB_wP5S8nc04vqSTZi7wLZreQxF9_vs"
      }

   </details>
#
- `POST /signin` <br>
Login existing user
  - Request
    - Form data
      - `username` : \<username>
      - `password` : \<password>
  - Response<br>
  `200`
  <details><summary>Sample response</summary>

      {
        "message": "Logged in successfully",
        "user": {
          "_id": "6209541e23a674980bf81f40",
          "username": "wkinzu",
          "follows": [],
          "__v": 0
        },
        "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6IndraW56dSIsImlkIjoiNjIwOTU0MWUyM2E2NzQ5ODBiZjgxZjQwIiwiaWF0IjoxNjQ0ODM1NjU4LCJleHAiOjE2NDQ5MjIwNTh9.eeHVtsdx1XCsb_aHx23F44B1vey1jVKPGPdLTw9-9Ek"
      }

  </details>
#
- `GET /user/:username` <br>
View details of a user
  - Request
    - Path parameters
      - `:username`
  - Response<br>
  `200`
  <details><summary>Sample response</summary>

      {
        "data": {
          "_id": "6209541e23a674980bf81f40",
          "username": "wkinzu",
          "follows": [],
          "__v": 0
        }
      }

  </details>
#
- `GET /user/:username/posts` <br>
View posts from a particular user, 10 at a time
  - Request
    - Path parameters
      - `:username`
    - Query parameters
      - `page` = \<page number> <br>
      (Optional; defaults to 1)
  - Response<br>
  `200`
  <details><summary>Sample response</summary>

      {
        "data": {
          "posts": [
            {
              "_id": "620a34a91b3b61072805398f",
              "title": "A note on social media",
              "content": "we should take back control of SM into our own hands. freedom for all ",
              "creator": "6209541e23a674980bf81f40",
              "likedBy": [],
              "comments": [
                {
                  "content": "yes, I absolutely agree",
                  "creator": "620a2b231b3b610728053989",
                  "_id": "620a3cd8948eb92ce1d5a3fd"
                }
              ],
              "__v": 1,
              "likes": []
            },
            {
              "likes": [],
              "_id": "6209547523a674980bf81f42",
              "title": "first day of my life...",
              "content": "...was not too bad actually just went fine",
              "creator": "6209541e23a674980bf81f40",
              "likedBy": [],
              "comments": [],
              "__v": 0
            }
          ],
          "currentPage": 1,
          "totalPages": 1
        }
      }

  </details>
#
- `GET /posts/:postId` <br>
View a particular post
  - Request
    - Path parameters
      - `:postId`
  - Response<br>
  `200`
  <details><summary>Sample response</summary>

      {
        "data": {
          "likes": [],
          "_id": "620a34a91b3b61072805398f",
          "title": "so this happened",
          "content": "someone spilled their coffee over my coat at the cafe yesterday",
          "creator": "6209541e23a674980bf81f40",
          "likedBy": [],
          "comments": [],
          "__v": 0
        }
      }

  </details>
#
- `GET /posts/:postId/comments` <br>
View comments of a particular post
  - Request
    - Path parameters
      - `:postId`
  - Response<br>
  `200`
  <details><summary>Sample response</summary>

      {
        "data": [
          {
            "content": "yes, I absolutely agree",
            "creator": "620a2b231b3b610728053989",
            "_id": "620a3cd8948eb92ce1d5a3fd"
          }
        ]
      }

  </details>
### Authenticated
- `POST /user/:username/follows` <br>
Make a user follow/unfollow the target user
  - Request
    - Headers
      - `Authorization` : Bearer \<user token>
    - Path parameters
      - `:username` <br>
      (username with which the client is authenticated)
    - Form data
      - `targetUserId` : \<userId of user to follow>
  - Response<br>
  `200`
  <details><summary>Sample Response</summary>
  
      {
        "data": {
          "_id": "620a2b231b3b610728053989",
          "username": "jonhdoe",
          "follows": [
            "620954c023a674980bf81f46"
          ],
          "__v": 3
        }
      }
  
  </details>
#
- `GET /posts` <br>
View feed i.e. posts from the followed users, 10 at a time
  - Request
    - Headers
      - `Authorization` : Bearer \<user token>
    - Query parameters
      - `page` = \<page number> <br>
      (Optional; defaults to 1)
  - Response<br>
  `200`
  <details><summary>Sample Response</summary>
  
      {
        "data": {
          "posts": [
            {
              "_id": "620a42bf948eb92ce1d5a437",
              "title": "song recommendations",
              "content": "I just found this new song: xx by shelter",
              "creator": "620954c023a674980bf81f46",
              "likes": [],
              "comments": [],
              "__v": 0
            },
            {
              "_id": "620a34a91b3b61072805398f",
              "title": "A note on social media",
              "content": "we should take back control of SM into our own hands. freedom for all ",
              "creator": "6209541e23a674980bf81f40",
              "comments": [
                {
                  "content": "yes, i think we should move to mastodon",
                  "creator": "620a2b231b3b610728053989",
                  "_id": "620a4204948eb92ce1d5a42e"
                }
              ],
              "__v": 12,
              "likes": [
                "620a2b231b3b610728053989"
              ]
            },
            {
              "_id": "6209547523a674980bf81f42",
              "title": "first day of my life...",
              "content": "...was not too bad actually just went fine",
              "creator": "6209541e23a674980bf81f40",
              "comments": [],
              "__v": 5,
              "likes": [
                "620954c023a674980bf81f46"
              ]
            }
          ],
          "currentPage": 1,
          "totalPages": 1
        }
      }
  
  </details>
#
- `POST /posts` <br>
Create a new post
  - Request
    - Headers
      - `Authorization` : Bearer \<user token>
    - Form data
      - `title` : \<title of the post>
      - `content` : \<content of the post>
  - Response<br>
  `201`
  <details><summary>Sample response</summary>

      {
        "data": {
          "title": "car damage",
          "content": "someone in the parking yesterday hit my car, looks accidentally.",
          "creator": "620a2b231b3b610728053989",
          "likes": [],
          "_id": "620a3eab948eb92ce1d5a404",
          "comments": [],
          "__v": 0
        }
      }

  </details>
#
- `PUT /posts/:postId` <br>
Update an existing post
  - Request
    - Headers
      - `Authorization` : Bearer \<user token>
    - Path parameters
      - `:postId`
    - Form data
      - `content` : \<new content of the post>
  - Response<br>
  `200`
  <details><summary>Sample response</summary>

      {
        "data": {
          "acknowledged": true,
          "modifiedCount": 1,
          "upsertedId": null,
          "upsertedCount": 0,
          "matchedCount": 1
        }
      }

  </details>
#
- `DELETE /posts/:postId` <br>
Delete an existing post
  - Request
    - Headers
      - `Authorization` : Bearer \<user token>
    - Path parameters
      - `:postId`
  - Response<br>
  `204`
#
- `POST /posts/:postId/comments` <br>
Create a new comment on a post
  - Request
    - Headers
      - `Authorization` : Bearer \<user token>
    - Path parameters
      - `:postId`
    - Form data
      - `content` : \<content of the commment>
  - Response<br>
  `201`
  <details><summary>Sample response</summary>
  
      {
        "data": {
          "likes": [],
          "_id": "620a34a91b3b61072805398f",
          "title": "A note on social media",
          "content": "we should take back control of SM into our own hands. freedom for all ",
          "creator": "6209541e23a674980bf81f40",
          "likedBy": [],
          "comments": [
            {
              "content": "yes, I absolutely agree",
              "creator": "620a2b231b3b610728053989",
              "_id": "620a3cd8948eb92ce1d5a3fd"
            }
          ],
          "__v": 1
        }
      }
  
  </details>
#
- `DELETE /posts/:postId/comments/:commentId` <br>
Delete an existing comment on a post
  - Request
    - Headers
      - `Authorization` : Bearer \<user token>
    - Path parameters
      - `:postId`
      - `:commentId`
  - Response<br>
  `204`
#
- `POST /posts/:postId/likes` <br>
Like/dislike a post
  - Request
    - Headers
      - `Authorization` : Bearer \<user token>
    - Path parameters
      - `:postId`
  - Response
  `200`
  <details><summary>Sample response</summary>

      {
        "data": {
          "_id": "620a34a91b3b61072805398f",
          "title": "A note on social media",
          "content": "we should take back control of SM into our own hands. freedom for all ",
          "creator": "6209541e23a674980bf81f40",
          "likedBy": [],
          "comments": [],
          "__v": 9,
          "likes": [
            "620a2b231b3b610728053989"
          ]
        }
      }

  </details>
