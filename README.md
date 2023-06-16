# BiteSense-Api

The Bitesense-Api interacts with the client-side [Mobile-Dev](https://github.com/BiteSense/mobile-dev) and [Machine-Learning](https://github.com/BiteSense/object-detection-model-development), to serving various request from client-side then bridges the requests from client-side to Machine-Learning model

## Features

- Deployed on Google Cloud Platform using Cloud Run for scalability.
- Built with Node.js and Express framework.
- Utilizes Google Cloud services such as Cloud SQL and Cloud Storage.
- Implements a machine learning model for object detection
- Provides CRUD operations for product,users items.

## Prerequisites

Before running the project locally or deploying it, make sure you have the following prerequisites installed:

- Node.js (v16 or above)
- npm package manager
- Google Cloud Platform account with enabled services:
  - Cloud Run
  - Cloud SQL
  - Cloud Storage

## Cloud-Architecture:

![cloud_arch](assets/cloud_architecture.png)

|       Collection       |                                                                                                                                                                   Postman Link                                                                                                                                                                    |
| :--------------------: | :-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------: |
| Backend API collection | [![Run in Postman](https://run.pstmn.io/button.svg)](https://god.gw.postman.com/run-collection/23098382-8a216f89-ea1c-435c-ab14-e8ba5dec13ef?action=collection%2Ffork&source=rip_markdown&collection-url=entityId%3D23098382-8a216f89-ea1c-435c-ab14-e8ba5dec13ef%26entityType%3Dcollection%26workspaceId%3Def567bd0-b3cb-4f29-84a0-6c0994418fad) |

## Getting Started:

Follow the steps below to get the backend API up and running:

1. Make sure you have success deploy Machine Learning Model in <a href="https://github.com/BiteSense/object-detection-model-deployment.git">here</a>

2. Clone this repository to your local machine:

   ```bash
   git clone https://github.com/BiteSense/bitesense-api.git
   ```

3. Navigate to the project directory:

   ```bash
   cd bitesense-api
   ```

4. Install the required dependencies:

   ```bash
   npm install
   ```
5. Set Up database MySQL in phpMyAdmin according to the following specifications <a href="https://github.com/BiteSense/bitesense-api/blob/main/assets/database_model.png">BiteSense Database</a>

6. Set up the environment variables by creating a .env file in the root directory. Use the .env.example file as a template and provide the necessary values.

7. Start the development server:

   ```bash
   npm run start
   ```

6. The API should now be accessible at <http://localhost:8080>.

Tutorials, get you started with understanding and using the Bitesense-Api:

- [Auth-Login](#Auth)
- [Auth-Register](#Register)
- [Auth-Logout](#Logout)
- [Profile-Get Data User](#getDataProfile)
- [Profile-Get Data Preference User](#preference)
- [Profile-Change Profile](#profile)
- [Preference-Input Preference User](#preferenceInput)
- [Preference-Update Preference User](#preferenceUpdate)

## Documentation:

<a name="Auth"></a>

### `Login`

All request require API key. You can find your Api key if you Login. Signin user if already have an account. Return a token to use authenticate and authorization.

```http
POST api/users/login
```

| Parameter  | Type     | Description   |
| :--------- | :------- | :------------ |
| `email`    | `string` | **Required**. |
| `password` | `string` | **Required**. |

### Response

`SUCCESS`

```javascript
{
    "statusCode": 200,
    "status": "success",
    "message": "success login",
    "data": {
        "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6TIsImV4cCI6MTY4NTMzODY5Mn0.sim8HNM8AELtNpwi6NvKZiv_EDO9YAau513u2cyIW_8"
    }
}
```

`FAILED`

```javascript
{
    "statusCode": 400,
    "status": "error",
    "message": "Email not Register"
}
```

<a name="Register"></a>

### `Register`

Create user if any user already have an account.

```http
POST api/users/logout
```

| Parameter    | Type     | Description   |
| :----------- | :------- | :------------ |
| `email`      | `string` | **Required**. |
| `password`   | `string` | **Required**. |
| `repassword` | `string` | **Required**. |
| `username`   | `string` | **Required**. |

### Response

`SUCCESS`

```javascript
{
    "statusCode": 200,
    "status": "success",
    "message": "success register"
}
```

`FAILED`

```javascript
{
    "statusCode": 400,
    "status": "error",
    "message": "Email Already Excist"
}
```

<a name="Logout"></a>

### `Logout`

```http
DELETE api/users/register
```

### Response

`SUCCESS`

```javascript
{
    "statusCode": 200,
    "status": "success",
    "message": "Logout berhasil"
}
```

<a name="getDataProfile"></a>

### `Get Data Profile`

```http
GET api/users/profile
```

### Response

`SUCCESS`

```javascript
{
    "statusCode": 200,
    "status": "success",
    "message": "Success Get Data User",
    "data": {
        "result": {
            "username": "chris",
            "email": "check@gmail.com",
            "no_telepon": null,
            "foto_user": "https://storage.googleapis.com/staging_product/default-profile.jpg"
        }
    }
}
```

<a name="preference"></a>

### Get Data Preference

```http
GET api/users/preference
```

### Response

`SUCCESS`

```javascript
{
    "statusCode": 200,
    "status": "success",
    "message": "success get data",
    "data": {
        "dataPenyakit": [
            {
                "nama_penyakit": "Alergi Kacang",
                "triger_penyakit": "Kacang"
            },
        ],
        "dataKondisi": [
            {
                "name_condition": "Diabetes",
                "triger_condition": "Gula,Fruktosa"
            },
        ],
        "dataFood": [
            {
                "name_food": "Dairy",
                "triger_food": "Laktosa"
            },
        ]
    }
}
```

<a name="profile"></a>

### `Change Profile`

```http
POST api/users/profile
```

| Request                           | Type     | Description   | Parameter  | Status |
| :-------------------------------- | :------- | :------------ | :--------- | :----- |
| `POST api/users/profile/email`    | `string` | **Required**. | `email`    | `Ok`   |
| `POST api/users/profile/username` | `string` | **Required**. | `username` | `Ok`   |
| `POST api/users/profile/telepon`  | `string` | **Required**. | `telepon`  | `Ok`   |
| `POST api/users/profile/upload`   | `file`   | **Required**. | `file`     | `Ok`   |
| `DELETE api/users/profile/delete` | `NONE`   | **Required**. | `NONE`     | `Ok`   |

### Response

`SUCCESS - Email`

```javascript
{
    "statusCode": 200,
    "status": "success",
    "message": "berhasil mengubah email"
}
```

`SUCCESS - Username`

```javascript
{
    "statusCode": 200,
    "status": "success",
    "message": "berhasil mengubah username"
}
```

`SUCCESS - Telepon`

```javascript
{
    "statusCode": 200,
    "status": "success",
    "message": "berhasil mengubah nomor telepon"
}
```

`SUCCESS - Photo Profile`

```javascript
{
    "statusCode": 200,
    "status": "success",
    "message": "success upload image",
    "data": {
        "publicUrl": "https://storage.googleapis.com/staging_product/168525472329231619github.png"
    }
}
```

`SUCCESS - Delete Photo Profile`

```javascript
{
    "statusCode": 200,
    "status": "success",
    "message": "succes delete profile"
}
```

<a name="preferenceInput"></a>

### `Input Preference User`

for Input preferences and also Update Preferences use a body with a request of type json then the number listed on the request body json is a numbering index which can be seen in the following table

`Category Food Intolarance`

| Name Food         | Index |
| :---------------- | :---- |
| `Dairy`           | 1     |
| `Gluten`          | 2     |
| `Kafein`          | 3     |
| `Fruktosa`        | 4     |
| `Biji Bijian`     | 5     |
| `MSG`             | 6     |
| `Salicylates`     | 7     |
| `Ragi`            | 8     |
| `Pewarna Makanan` | 9     |

`Category Condition`

| Name Food    | Index |
| :----------- | :---- |
| `Diabetes`   | 1     |
| `Hipertensi` | 2     |
| `Hamil`      | 3     |
| `Obesitas`   | 4     |
| `Maag`       | 5     |
| `Stroke`     | 6     |
| `Asam Urat`  | 7     |

`Category Disease`

| Name Food             | Index |
| :-------------------- | :---- |
| `Alergi Kacang`       | 1     |
| `Alergi Telur`        | 2     |
| `Alergi Kedelai`      | 3     |
| `Alergi Gandum`       | 4     |
| `Alergi Ikan`         | 5     |
| `Alergi Susu`         | 6     |
| `Alergi Shellfish`    | 7     |
| `Alergi Kacang Pohon` | 8     |

```http
POST api/users/preference
```

### Request

`SUCCESS`

```javascript
{
    "penyakit" : [
        {"id" : 2},
        {"id" : 3},
        {"id" : 5}
    ],
    "makanan" : [
        {"id" : 1},
        {"id" : 3},
        {"id" : 5}
    ],
    "kondisi" : [
        {"id" : 2},
        {"id" : 1},
        {"id" : 4}
    ]
}
```

### Response

`SUCCESS`

```javascript
{
    "statusCode": 200,
    "status": "success",
    "message": "Success Input Data Preference User"
}
```

<a name="preferenceUpdate"></a>

### `Update Preference User`

for Input preferences and also Update Preferences use a body with a request of type json then the number listed on the request body json is a numbering index which can be seen in the following table

`Category Food Intolarance`

| Name Food         | Index |
| :---------------- | :---- |
| `Dairy`           | 1     |
| `Gluten`          | 2     |
| `Kafein`          | 3     |
| `Fruktosa`        | 4     |
| `Biji Bijian`     | 5     |
| `MSG`             | 6     |
| `Salicylates`     | 7     |
| `Ragi`            | 8     |
| `Pewarna Makanan` | 9     |

`Category Condition`

| Name Food    | Index |
| :----------- | :---- |
| `Diabetes`   | 1     |
| `Hipertensi` | 2     |
| `Hamil`      | 3     |
| `Obesitas`   | 4     |
| `Maag`       | 5     |
| `Stroke`     | 6     |
| `Asam Urat`  | 7     |

`Category Disease`

| Name Food             | Index |
| :-------------------- | :---- |
| `Alergi Kacang`       | 1     |
| `Alergi Telur`        | 2     |
| `Alergi Kedelai`      | 3     |
| `Alergi Gandum`       | 4     |
| `Alergi Ikan`         | 5     |
| `Alergi Susu`         | 6     |
| `Alergi Shellfish`    | 7     |
| `Alergi Kacang Pohon` | 8     |

```http
POST api/users/update
```

### Request

`SUCCESS`

```javascript
{
    "penyakit" : [
        {"id" : 2},
        {"id" : 3},
        {"id" : 5}
    ],
    "makanan" : [
        {"id" : 1},
        {"id" : 3},
        {"id" : 5}
    ],
    "kondisi" : [
        {"id" : 2},
        {"id" : 1},
        {"id" : 4}
    ]
}
```

### Response

`SUCCESS`

```javascript
{
    "statusCode": 200,
    "status": "success",
    "message": "Success Update Data Preference User"
}
```
