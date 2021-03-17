// ES6+ example
const { EC2Client, DescribeInstancesCommand } = require("@aws-sdk/client-ec2");

const AWSClientService = () => {
    const ec2Client = new EC2Client({ region: "ap-southeast-2" });

    const run = async () => {
        try {
            const data = await ec2Client.send(new DescribeInstancesCommand({}));
            sails.log("Success", JSON.stringify(data));
        }
        catch(err){
            sails.log("Error", err);
        }
    }
    //Dictionary or list
    const functionToDict = {
        "Describe Instances": run,
        2: (var1, var2) => sails.log('hello', var1, var2),
    }

    return functionToDict;
};

module.exports.AWSClientService = AWSClientService;
// export const ec2_dict = {
//     "id": () => console.log('hello')
//   }
  
// const func = dict['id']

// func() // prints: hello