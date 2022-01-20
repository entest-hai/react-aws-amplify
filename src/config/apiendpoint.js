import awsmobile from '../aws-exports';
// const fhr_lambda_api = "https://1h23llaoi0.execute-api.ap-southeast-1.amazonaws.com/dev/lambda-fhr/lambda-1?filename=";
// const fhr_lambda_api = "https://bln9cf30wj.execute-api.ap-southeast-1.amazonaws.com/default/femomfhr?filename=";
const fhr_lambda_api = "https://bln9cf30wj.execute-api.ap-southeast-1.amazonaws.com/default/FhrProcessingLambdaEcrImageTestColdStart?filename=";
let fhr_api_end_point = fhr_lambda_api + "s3://" + awsmobile.aws_user_files_s3_bucket + "/public/"; 

export {fhr_api_end_point};
