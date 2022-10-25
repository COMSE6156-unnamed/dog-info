# Dog Info API
## How to start the app
- Install node modules:
```
$ npm install
```
- Run the app on localhost:
```
$ npm start
```

## Get information of all dogs
- Path: `/dogs`
- Return value: A list of JSON objects. Ex. `http://localhost:3000/dogs`
```
[
    {
        "id": 1,
        "name": "Dachshund",
        "size": {"id":2,"name":"Small"},
        "categories": [{"id":2,"name":"Hound"}],
        "origins": [{"id":1,"name":"Germany"}],
        "image_url": "https://coms6156-dog-data.s3.amazonaws.com/images/dachshund.jpg","pronunciation_url": "https://coms6156-dog-data.s3.amazonaws.com/pronunciation/dachshund_en_us_1.mp3"
    },
    {
        "id":2,
        "name": "Poodle (Toy
        size": {"id":1,"name":"Toy"},
        "categories": [{"id":5,"name":"Toy"}],
        "origins": [{"id":1,"name":"Germany"},{"id":2,"name":"France"}],
        "image_url": "https://coms6156-dog-data.s3.amazonaws.com/images/toy_poodle.jpg","pronunciation_url": "https://coms6156-dog-data.s3.amazonaws.com/pronunciation/poodle_en_us_1.mp3"
    },
    {
        "id": 3,
        "name": "Labrador Retriever",
        "size": {"id":4,"name":"Large"},
        "categories": [{"id":1,"name":"Sporting"}],
        "origins": [{"id":4,"name":"United Kingdom"}],
        "image_url": "https://coms6156-dog-data.s3.amazonaws.com/images/labrador_retriever.jpg","pronunciation_url": "https://coms6156-dog-data.s3.amazonaws.com/pronunciation/labrador+retriever_en_us_1.mp3"
    },
    ...
]
```

## Get information of a single dog
- Path: `/dogs/:id`
- Currently available ids: 1~50
- Return value: A dog object. Ex. `http://localhost:3000/dogs/1`
```
{
    "id": 1,
    "name": "Dachshund",
    "size": {"id":2,"name":"Small"},
    "categories": [{"id":2,"name":"Hound"}],
    "origins": [{"id":1,"name":"Germany"}],
    "image_url": "https://coms6156-dog-data.s3.amazonaws.com/images/dachshund.jpg",
    "pronunciation_url": "https://coms6156-dog-data.s3.amazonaws.com/pronunciation/dachshund_en_us_1.mp3"
}
```
- Note that each dog might have multiple categories and origins, so these attributes are stored in lists.



## Get a dog's categories
- Path: `/dogs/:id/categories`
- Return value: A list of category objects. Ex. `http://localhost:3000/dogs/43/categories`
```
[
    {
        "id": 4,
        "name": "Terrier"
    },
    {
        "id":5,
        "name":"Toy"
    }
]
```
## Get a dog's origins
- Path: `/dogs/:id/origins`
- Return value: A list of origin objects. Ex. `http://localhost:3000/dogs/32/origins`
```
[
    {
        "id": 2,
        "name": "France"
    },
    {
        "id":15,
        "name":"Belgium"
    }
]
```
## Get a dog's size
- Path `/dogs/:id/size`
- Return value: A size object. Ex. `http://localhost:3000/dogs/1/size`
```
{
    "id": 2,
    "name": "Small"
}
```