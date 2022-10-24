const dogFormat = (dog, categories, origins) => {
    return {
        id: dog.id,
        name: dog.name,
        size: dog.size,
        categories: categories ? categories : [],
        origins: origins ? origins : [],
        image_url: dog.image_url,
        pronunciation_url: dog.pronunciation_url
    };
};

const dogsFormat = (dogs, categoryMap, originMap) => {
    return dogs.map((dog) => {
        return dogFormat(dog,
            categoryMap.has(dog.id) ? categoryMap.get(dog.id) : [],
            originMap.has(dog.id) ? originMap.get(dog.id) : []);
    });
};

const func = {
    dogFormat,
    dogsFormat
}

module.exports = func;