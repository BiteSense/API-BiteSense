# BiteSense-Api

The Bitesense-Api interacts with the client-side [Mobile-Dev](https://github.com/BiteSense/mobile-dev) and [Machine-Learning](https://github.com/BiteSense/object-detection-model-development), to serving various request from client-side then bridges the requests from client-side to Machine-Learning model

## Cloud-Architecture:

![cloud_arch](assets/cloud_architecture.png)

|       Collection       |                                                                                                                                                                   Postman Link                                                                                                                                                                    |
| :--------------------: | :-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------: |
| Backend API collection | [![Run in Postman](https://run.pstmn.io/button.svg)](https://god.gw.postman.com/run-collection/23098382-29753a34-0729-4aea-9324-2080d7026097?action=collection%2Ffork&source=rip_markdown&collection-url=entityId%3D23098382-29753a34-0729-4aea-9324-2080d7026097%26entityType%3Dcollection%26workspaceId%3D8d48ecb2-5360-4889-a18a-58ed2c0cd770) |

## Getting Started:

Tutorials, get you started with understanding and using the Bitesense-Api:

- [Auth-Login](#Auth)
- [Auth-Register](#Register)
- [Auth-Logout](#Logout)
- [Profile-Get Data User](#getDataProfile)
- [Profile-Get Data Preference User](#preference)
- [Profile-Change Profile](#profile)

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
