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

## Get information of a single dog
- Path: `http://localhost:3000/dogs/:id`
- Currently available ids: 1~50
- Return value: A dog object. Ex.
```
{
    "id":1,
    "name":"Dachshund",
    "size":"Small",
    "categories":[{"id":2,"name":"Hound"}],
    "origins":[{"id":1,"name":"Germany"}],
    "image_url":"https://coms6156-dog-data.s3.amazonaws.com/images/dachshund.jpg",
    "pronunciation_url":"https://coms6156-dog-data.s3.amazonaws.com/pronunciation/dachshund_en_us_1.mp3"
}
```

## Get information of all dogs
- Path: `http://localhost:3000/dogs`
- Return value: A list of JSON objects. Each object is in the following format:
```
{
    id: $dog_id,
    name: $dog_name,
    size: $dog_size,
    categories: [{id: category_id, name: category_name}],
    origin: [{id: origin_id, name: origin_name}],
    image_url: $image_url,
    pronunciation_url: $pronunciation_url
}
```
- Note that each dog might have multiple categories and origins.
