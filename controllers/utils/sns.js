// Load the AWS SDK for Node.js
var AWS = require("aws-sdk");
// Set region

const SEConfig = {
  region: "us-east-1",
  apiVersion: "latest",
  accessKeyId: process.env.ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
};

AWS.config.update(SEConfig);

const emitEvent = (dog) => {
  // Create publish parameters
  dog_message = JSON.stringify(dog);
  var params = {
    Message: dog_message, //`{\n\"name\": \"${name}\",\n \"image_url\": \"${image_url}\"\n}` /* required */,
    TopicArn: process.env.TOPIC_ARN_CREATE_DOG,
  };

  // Create promise and SNS service object
  var publishTextPromise = new AWS.SNS().publish(params).promise();

  // Handle promise's fulfilled/rejected states
  publishTextPromise
    .then(function (data) {
      console.log("MessageID is " + data.MessageId);
    })
    .catch(function (err) {
      console.error(err, err.stack);
    });
};

const func = {
  emitEvent,
};

module.exports = func;
