
const hello = async(req, res) => {
    return res.status(200).send("Hello Doggo")
}

const func = {
    hello
}

module.exports = func