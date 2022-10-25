const dogFormat = (dog, categories, origins, size) => {
    return {
        id: dog.id,
        name: dog.name,
        size: size,
        categories: categories ? categories : [],
        origins: origins ? origins : [],
        image_url: dog.image_url,
        pronunciation_url: dog.pronunciation_url
    };
};

const dogsFormat = (dogs, categoryMap, originMap, sizeMap) => {
    return dogs.map((dog) => {
        return dogFormat(dog,
            categoryMap.has(dog.id) ? categoryMap.get(dog.id) : [],
            originMap.has(dog.id) ? originMap.get(dog.id) : [],
            sizeMap.has(dog.id) ? sizeMap.get(dog.id) : "NaN");
    });
};

const categoryFormat = (category) => {
    return {
        id: category.id,
        name: category.name
    };
};

const categoriesFormat = (categories) => {
    return categories.map((category) => {
        return categoryFormat(category); 
    })
}

const originFormat = (origin) => {
    return {
        id: origin.id,
        name: origin.name
    }
};

const originsFormat = (origins) => {
    return origins.map((origin) => {
        return originFormat(origin);
    })
}

const func = {
    dogFormat,
    dogsFormat,
    categoryFormat,
    categoriesFormat,
    originFormat,
    originsFormat
}

module.exports = func;