/* 
Copyright 2017-2017 Amazon.com, Inc. or its affiliates. All Rights Reserved.
Licensed under the Amazon Software License (the "License"). You may not use this file except in compliance with the License. A copy of the License is located at
    http://aws.amazon.com/asl/
or in the "license" file accompanying this file. This file is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, express or implied. 
See the License for the specific language governing permissions and limitations under the License. 
*/

/*Client Webpage Configuration
You will need to have created a Cognito Identity Pool and enabled
SAML support in that pool with an IdP created in the AWS IAM console
using your ADFS metadata document before populating these configurations*/
var configs = {
    'region' : 'us-east-1',
    'identityPool': 'us-east-1:67b1a014-8c91-4ba7-897e-cccccccccccc',
    'adfsUrl': 'https://xxxxxxx.oktapreview.com/app/aenetworkspreview_serverless_1/exke7vy7npzzzzzzzzzz/sso/saml',
    'samlIdpArn': 'arn:aws:iam::111111229211:saml-provider/okta_serverlessapp1',
    'roleSelectedArn' : 'arn:aws:iam::111111229211:role/serverlessapp1_role',
    'relayingPartyId': 'urn:amazon:webservices' //Should not need to change if you followed the ADFS setup blog
}