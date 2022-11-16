// Constants for routes
const serverEndpoint = `${process.env.API_HOST}`
const dogsRoute = `/dogs`;

// Constants for dogs controller
const defaultPageSize = 9;
const defaultOffset = 0;
const paginationRelationCurrent = "current";
const paginationRelationPrev = "prev";
const paginationRelationNext = "next";

const constants = {
    defaultPageSize,
    defaultOffset,
    paginationRelationCurrent,
    paginationRelationPrev,
    paginationRelationNext,
    serverEndpoint,
    dogsRoute
};

module.exports = constants;