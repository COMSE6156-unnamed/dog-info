// Constants for routes
const serverEndpoint = `http://localhost:${process.env.PORT || 3000}`
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
    paginationRelationFirst,
    paginationRelationCurrent,
    paginationRelationPrev,
    paginationRelationNext,
    serverEndpoint,
    dogsRoute
};

module.exports = constants;