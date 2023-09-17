var AWS = require('aws-sdk')
import * as dotenv from 'dotenv'

dotenv.config()


AWS.config.credentials = JSON.parse(process.env.AWS_APPLICATION_CREDENTIALS)

const ssmClient = new AWS.SSM({
    apiVersion: '2014-11-06',
    region: 'us-east-1'
})
function AwsService() {

    let sv = {

        async fetchCredential(parameter){
            
            var params = {
                Name: parameter
            }
        
            var request = await ssmClient.getParameter(params).promise();
            return request.Parameter.Value;
        },
    }

    return sv
}

export default AwsService; 