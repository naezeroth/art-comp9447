// Load the SDK and UUID
var AWS = require('aws-sdk');

// Create unique bucket name
var bucketName = 'node-sdk-sample-6e70ecf3-191d-40c3-9f77-68c3eccdf9c4';

var keyName = 'hello_world.txt';

// Create a promise on S3 service object
var s3 = new AWS.S3({ apiVersion: '2006-03-01' });

var params = {
    Bucket: bucketName
    // Bucket: bucketName,
    // Key: keyName
};

// s3.deleteObject(params, function (err, data) {
//     if (err) console.log(err, err.stack); // an error occurred
//     else console.log(data);           // successful response
//     /*
//     data = {
//     }
//     */
// });

s3.deleteBucket(params, function (err, data) {
    if (err) console.log(err, err.stack); // an error occurred
    else console.log(data);           // successful response
});