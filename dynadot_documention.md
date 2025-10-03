Getting Started With Our RESTful API
The Dynadot API is designed for seamless integration with your systems. Our API features predictable resource-oriented URLs, supports JSON-encoded request bodies, returns JSON-encoded and XML-encoded responses, and adheres to standard HTTP methods, authentication, and response codes.
You can use the Dynadot API in both test and live modes. The mode is determined by the API key used to authenticate your requests. Test mode allows you to simulate and validate your API integration without affecting live data or transactions.
The Dynadot API is primarily focused on domain management, order processing, and related services. You can perform actions such as registering, transferring, and renewing domains, managing DNS settings, and viewing or updating account orders.
Please note: The bulk creations, updates, deletes are not supported, and each of those request type is limited to one object or action.
Generating Your API Keys
Before you start making any API requests, it is essential to generate your API Key and API Secret.
These keys are required for authentication and to ensure the security of your actions when interacting with our API.
You can generate both the API Key and API Secret through the API section in your account settings.
1. Log in to your account at Dynadot.
2. Navigate to Tools > API.
3. Generate your API Key and API Secret from this page.


Join our Community
Have any ideas or suggestions? Talk directly to our professional engineers.
Discord
HTTP Method
The API uses standard HTTP methods to perform operations on resources:
Method	Description
GET
GET Request: Retrieve detailed information about a specified resource
POST
POST Request: Create a new resource
PUT
PUT Request: Fully update the specified resource
DELETE
DELETE Request: Remove the specified resource
URL
The base URL for all API requests is:
https://api.dynadot.com/
The Full URL format:
http://api.dynadot.com/restful/version_code/resource/{resource_identify}/action
Example :
https://api.dynadot.com/restful/v1/domains/{domain_name}/search
Version
The current version of the API is
v1.0.0
When constructing the API request URL, it is only necessary to include the major version. Minor and patch updates are designed to be backward-compatible and will not introduce changes that break your existing code. This ensures stability while allowing you to benefit from incremental improvements and fixes without needing to modify your implementation.
When future versions are released, we will maintain backward compatibility for older versions for a period of time. New features and breaking changes will be introduced in major version increments.
Header
The header of an API request contains metadata about the request. This metadata provides essential context for the server to process the request properly. Commonly used headers include:
Content-Type
Specifies the format of the data being sent in the request body. The server uses this information to parse the request correctly. Currently the only acceptable value is: application/json
Example :
Content-Type: application/json
Accept
Informs the server of the response format expected by the client.
Possible values: application/json, application/xml
Example :
Accept: application/json
Authorization
All API requests must include an API key for authentication. You can get your API key from your account dashboard.
You can generate an API key in API setting page
Authentication Header Example :
Authorization: Bearer YOUR_API_KEY
X-Request-ID
The X-Request-ID header is an optional header used to uniquely identify each API request. When included, this header helps track and correlate requests across systems and logs, making it easier to debug and monitor API activity.
The value of the X-Request-ID must be a valid UUID (Universally Unique Identifier), following the standard format: xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx (e.g., 123e4567-e89b-12d3-a456-426614174000).
Example :
X-Request-ID: 550e8400-e29b-41d4-a716-446655440000
X-Signature
The X-Signature header is a mandatory security mechanism for transactional requests, including those that retrieve sensitive information or update data. It ensures the authenticity, integrity, and non-repudiation of API requests by requiring clients to sign the request payload using HMAC-SHA256.

To generate the signature, you'll need the following values
1. API Key: Your unique API key.
2. Full Path And Query: The full path of the API endpoint along with the query parameters.
3. X-Request-Id: The request ID. If it's not available, you can enter empty string.
4. Request Body: The body of the request. If it's empty or null, you can enter empty string.

The string to sign is a combination of the values mentioned above, concatenated in the following order:
apiKey + "\n" + fullPathAndQuery + "\n" + (xRequestId or empty String) + "\n" + (requestBody or empty String)
Example
apiKey = "your_api_key"
fullPathAndQuery = "/v1/some/endpoint?param=value"
xRequestId = "unique-request-id"
requestBody = "{\"key\":\"value\"}"


stringToSign = "your_api_key\n/v1/some/endpoint?param=value\nunique-request-id\n{\"key\":\"value\"}"
Generate the HMAC-SHA256 Signature
After constructing the string to sign, you need to apply HMAC-SHA256 encryption using your secret key. This process will create the signature.
The signature is generated using the following steps:
1. Use HMAC-SHA256 algorithm.
2. Use the stringToSign as the input message.
3. Use the secret as the key.

Apply the generated signature as the value of X-Signature in the request header
Example :
X-Signature: {HMAC-SHA256 Signature}
Body
The body of an API request is used to send data to the server. It is commonly included in POST, PUT, or PATCH requests (not typically for GET or DELETE requests).
Content Format
The format of the body data is determined by the Content-Type header. Some common formats include:
JSON
{
domainName: "domain.com",
showPrice: "yes",
currency: "USD"
}
Typical Use Cases
POST Requests: The POST method is used to create a new resource on the server. The request body usually contains the resource details..
PUT Requests: The PUT method is used to update an existing resource by replacing it entirely. The request body contains the complete updated resource.
GET Requests: The DELETE method is used to remove an existing resource from the server. It does not have a request body.
DELETE Requests: The GET method is used to retrieve an existing resource from the server. It does not have a request body
Response Format
All API responses are returned in either JSON or XML format, which format of the body data is determined by the Accept header, providing the requested data or an error message, if applicable.
Content Format
The response in general contains 3 parts: Code, Message, Data
Code: The status of the request
Message: More description of the status
Data: The Body of the response
JSON/XML
{
Code: "200",
Message: "Success",
Data: {}
}
Error Handling
HTTP Status Codes are standardized three-digit numbers returned by a server to indicate the outcome of a clients request. They provide essential information about whether the request was successfully processed, requires further action, or encountered an error. These codes are divided into five categories, each representing a distinct type of response.
Our API's status codes adhere to the HTTP/1.1 protocol, a widely accepted standard that ensures consistent and reliable communication. By using HTTP/1.1, we leverage features like persistent connections and enhanced caching to optimize client-server interactions.
2xx (Successful): Indicates that the command was received and accepted
4xx (Client Error): Signals that the client made an error in the request, such as providing invalid input or lacking proper authorization.
5xx (Server Error): Indicates that the server encountered an error or is unable to fulfill the request.
Code
Status Name
200
Success
201
Created
202
Accepted
249
Too many requests
400
Bad Request
401
Unauthorized
402
Payment Required
403
Forbidden
404
Not Found
409
Conflict
500
Internal Server Error
501
Not Implemented
502
Bad Gateway
503
Service Unavailable
504
Gateway Timeout
Rate Limiting
Requests should be sent over https (secure socket) for security. Only 1 request can be processed at a time, so please wait for your current request to finish before sending another request.
You will receive different thread counts based on the price level of your account:
Price level	Thread Count	Rate Limit
Regular	1 thread	60/min (1/sec)
Bulk	5 threads	600/min (10/sec)
Super Bulk	25 threads	6000/min (100/sec)
Note: place_auction_bid & get_auction_bid are currently exempt from the above rate limit.
Example :

JSON
{
code: 429,
message: "Too Many Requests",
error: {1 item}
}
Change Log Overview
A Change Log is a detailed record of changes, improvements, bug fixes, and new features introduced in each version of the API. It provides transparency for users and developers by documenting the impact of each update. It is composed of two key parts:
API Version
This part highlights the versioning system of the API, which helps developers track the evolution of features and ensure compatibility. Each API version is identified by a unique version number (e.g., v1.0.1, v2.2.3) and represents a significant milestone or release. Versioning allows users to maintain integrations with minimal disruption by opting into updates when ready.
Change Log History
The Change Log History provides detailed information about updates, bug fixes, deprecations, and enhancements introduced in each version. It outlines specific changes made to endpoints, parameters, authentication mechanisms, or response formats. This section ensures developers have full transparency about what has changed and can adjust their implementations accordingly. By maintaining a clear and detailed change log, we aim to provide developers with the tools and information needed to manage integrations effectively and confidently.
API Version
Our API is currently in version
v1.0.0
Version codes are used to systematically identify and manage API updates. They follow the Semantic Versioning (SemVer) format:
<Major>
<Minor>
<Patch>
Each component of the version code serves a specific purpose and helps developers communicate the scope and type of changes effectively.
Major Version
Definition: Represents significant changes that may break backward compatibility.
Format:
<Major>.x.x
Examples:
v1.0.0
->
v2.0.0
: A complete API redesign or incompatible schema changes.
Minor Version
Definition: Indicates backward-compatible feature additions.
Format:
x.<Minor>.x
Examples:
v1.0.0
->
v1.1.0
: Adding new endpoints or methods while maintaining backward compatibility.
Patch Version
Definition: Refers to backward-compatible bug fixes or minor improvements.
Format:
x.x.<Patch>
Examples:
v1.0.0
->
v1.1.0
: Fixing a minor bug in an API endpoint.
API Change Log
A Change Log is a detailed record of changes, improvements, bug fixes, and new features introduced in each version of software or an API. It provides transparency for users and developers by documenting the impact of each update.
A typical entry in a change log includes:
Description: A brief explanation of what was changed.
Affected Components: Specific modules, endpoints, or features impacted by the change.
Example: Added support for this new API command
<Domain Register>
Change Log History
Keep track of every change to the Dynadot API.
March 15, 2025
v1.0.0
The Dynadot API 1.0.0 introduces a RESTful interface designed for seamless integration with your systems.

It features predictable resource-oriented URLs, supports standard HTTP methods and authentication, and returns responses in both JSON and XML formats.

Each request processes a single object or action, as bulk updates are not supported.

This version focuses on core domain management, order processing, and related services.
Users can register, transfer, and renew domains, manage DNS settings, view or update account orders, as well as access functionalities for aftermarket, site builder, email hosting, and more.

To facilitate collaboration and support, we provide a dedicated Discord channel where users can discuss API usage, share feedback, and receive updates.
March 15, 2025
SEARCH Command
Support multi-thread
Support API Sandbox
If calling the search command, the following parameters should be included:
Request Parameters
Expand All
show_price
Boolean
Optional
currency
String
Optional
Result Parameters
Expand All
domain_name
String
is_available
Boolean
is_premium
String
is_show_price
Boolean
currency
String
registration_price
List
renewal_price
List
transfer_price
String
restore_price
String
Api Request and Header

Production

JSON
GET
https://api.dynadot.com/restful/v1/domains/{domain_name}/search
Accept: application/json
Authorization: Bearer API_KEY
Response

Structure
{
code: "Integer",
message: "String",
data: {
domain_name: "String",
available: "String",
premium: "String",
price_list: [
{
currency: "String",
unit: "String",
transfer: "String",
restore: "String"
}
]
}
}
BULK_SEARCH Command
Support multi-thread
Support API Sandbox
If calling the bulk_search command, the following parameters should be included:
Request Parameters
Expand All
domain_name_list
List
Result Parameters
Expand All
result_list
List
Api Request and Header

Production

JSON
GET
https://api.dynadot.com/restful/v1/domains/bulk_search
Accept: application/json
Authorization: Bearer API_KEY
Response

Structure
{
code: "Integer",
message: "String",
data: {
domain_result_list: [
{
domain_name: "String",
available: "String"
}
]
}
}
SUGGESTION_SEARCH Command
Support multi-thread
Support API Sandbox
If calling the suggestion_search command, the following parameters should be included:
Request Parameters
Expand All
tlds
String
max_count
Integer
Optional
Result Parameters
Expand All
domain_list
List
Api Request and Header

Production

JSON
GET
https://api.dynadot.com/restful/v1/domains/{domain_name}/suggestion_search
Accept: application/json
Authorization: Bearer API_KEY
Response

Structure
{
code: "Integer",
message: "String",
data: {
domain_list: [
"String"
]
}
}
REGISTER Command
Support multi-thread
Support API Sandbox
Require X-Signature
If calling the register command, the following parameters should be included:
Request Parameters
Expand All
domain
Object
currency
String
Optional
register_premium
Boolean
Optional
coupon_code
String
Optional
Result Parameters
Expand All
domain_name
String
expiration_date
Long
Api Request and Header

Production

JSON
POST
https://api.dynadot.com/restful/v1/domains/{domain_name}/register
Content-Type: application/json
Accept: application/json
Authorization: Bearer API_KEY
X-Signature: {signature}
Request Body
{
domain: {13 items},
currency: "String",
register_premium: false,
coupon_code: "String"
}
Response

Structure
{
code: "Integer",
message: "String",
data: {
domain_name: "String",
expiration_date: "Long"
}
}
RENEW Command
Support multi-thread
Support API Sandbox
Require X-Signature
If calling the renew command, the following parameters should be included:
Request Parameters
Expand All
duration
Integer
year
Integer
currency
String
Optional
coupon
String
Optional
no_renew_if_late_renew_fee_needed
Boolean
Optional
Result Parameters
Expand All
expiration_date
Long
Api Request and Header

Production

JSON
POST
https://api.dynadot.com/restful/v1/domains/{domain_name}/renew
Content-Type: application/json
Accept: application/json
Authorization: Bearer API_KEY
X-Signature: {signature}
Request Body
{
duration: 0,
year: 0,
currency: "String",
coupon: "String",
no_renew_if_late_renew_fee_needed: false
}
Response

Structure
{
code: "Integer",
message: "String",
data: {
expiration_date: "Long"
}
}
TRANSFER_IN Command
Support multi-thread
Support API Sandbox
Require X-Signature
If calling the transfer_in command, the following parameters should be included:
Request Parameters
Expand All
domain
Object
currency
String
Optional
transfer_premium
Boolean
Optional
coupon_code
String
Optional
Api Request and Header

Production

JSON
POST
https://api.dynadot.com/restful/v1/domains/{domain_name}/transfer_in
Content-Type: application/json
Accept: application/json
Authorization: Bearer API_KEY
X-Signature: {signature}
Request Body
{
domain: {13 items},
currency: "String",
transfer_premium: false,
coupon_code: "String"
}
Response

Structure
{
code: "Integer",
message: "String"
}
RESTORE Command
Support multi-thread
Support API Sandbox
Require X-Signature
If calling the restore command, the following parameters should be included:
Request Parameters
Expand All
currency
String
Optional
coupon_code
String
Optional
Api Request and Header

Production

JSON
POST
https://api.dynadot.com/restful/v1/domains/{domain_name}/restore
Content-Type: application/json
Accept: application/json
Authorization: Bearer API_KEY
X-Signature: {signature}
Request Body
{
currency: "String",
coupon_code: "String"
}
Response

Structure
{
code: "Integer",
message: "String"
}
GRACE_DELETE Command
Support multi-thread
Support API Sandbox
Require X-Signature
If calling the grace_delete command, the following parameters should be included:
Request Parameters
Expand All
add_to_waiting_list
Boolean
Optional
Api Request and Header

Production

JSON
DELETE
https://api.dynadot.com/restful/v1/domains/{domain_name}/grace_delete
Content-Type: application/json
Accept: application/json
Authorization: Bearer API_KEY
X-Signature: {signature}
Response

Structure
{
code: "Integer",
message: "String"
}
SET_FOLDER Command
Support multi-thread
Support API Sandbox
Require X-Signature
If calling the set_folder command, the following parameters should be included:
Request Parameters
Expand All
Api Request and Header

Production

JSON
PUT
https://api.dynadot.com/restful/v1/domains/{domain_name}/folders/{folder_name}
Content-Type: application/json
Accept: application/json
Authorization: Bearer API_KEY
X-Signature: {signature}
Request Body
{}
Response

Structure
{
code: "Integer",
message: "String"
}
SET_DOMAIN_FORWARDING Command
Support multi-thread
Support API Sandbox
Require X-Signature
If calling the set_domain_forwarding command, the following parameters should be included:
Request Parameters
Expand All
forward_url
String
is_temporary
Boolean
Optional
Api Request and Header

Production

JSON
PUT
https://api.dynadot.com/restful/v1/domains/{domain_name}/domain_forwarding
Content-Type: application/json
Accept: application/json
Authorization: Bearer API_KEY
X-Signature: {signature}
Request Body
{
forward_url: "String",
is_temporary: false
}
Response

Structure
{
code: "Integer",
message: "String"
}
SET_STEALTH_FORWARDING Command
Support multi-thread
Support API Sandbox
Require X-Signature
If calling the set_stealth_forwarding command, the following parameters should be included:
Request Parameters
Expand All
stealth_url
String
stealth_title
String
Api Request and Header

Production

JSON
PUT
https://api.dynadot.com/restful/v1/domains/{domain_name}/stealth_forwarding
Content-Type: application/json
Accept: application/json
Authorization: Bearer API_KEY
X-Signature: {signature}
Request Body
{
stealth_url: "String",
stealth_title: "String"
}
Response

Structure
{
code: "Integer",
message: "String"
}
SET_EMAIL_FORWARDING Command
Support multi-thread
Support API Sandbox
Require X-Signature
If calling the set_email_forwarding command, the following parameters should be included:
Request Parameters
Expand All
forward_type
String
forward_detail_list
List
Optional
mx_record_list
List
Optional
Api Request and Header

Production

JSON
PUT
https://api.dynadot.com/restful/v1/domains/{domain_name}/email_forwarding
Content-Type: application/json
Accept: application/json
Authorization: Bearer API_KEY
X-Signature: {signature}
Request Body
{
forward_type: "String",
forward_detail_list: [1 item],
mx_record_list: [1 item]
}
Response

Structure
{
code: "Integer",
message: "String"
}
SET_RENEW_OPTION Command
Support multi-thread
Support API Sandbox
Require X-Signature
If calling the set_renew_option command, the following parameters should be included:
Request Parameters
Expand All
renew_option
String
Api Request and Header

Production

JSON
PUT
https://api.dynadot.com/restful/v1/domains/{domain_name}/renew_option
Content-Type: application/json
Accept: application/json
Authorization: Bearer API_KEY
X-Signature: {signature}
Request Body
{
renew_option: "String"
}
Response

Structure
{
code: "Integer",
message: "String"
}
SET_CONTACTS Command
Support multi-thread
Support API Sandbox
Require X-Signature
If calling the set_contacts command, the following parameters should be included:
Request Parameters
Expand All
registrant_contact_id
Integer
admin_contact_id
Integer
technical_contact_id
Integer
billing_contact_id
Integer
Api Request and Header

Production

JSON
PUT
https://api.dynadot.com/restful/v1/domains/{domain_name}/contacts
Content-Type: application/json
Accept: application/json
Authorization: Bearer API_KEY
X-Signature: {signature}
Request Body
{
registrant_contact_id: 0,
admin_contact_id: 0,
technical_contact_id: 0,
billing_contact_id: 0
}
Response

Structure
{
code: "Integer",
message: "String"
}
GET_TRANSFER_STATUS Command
Support multi-thread
Support API Sandbox
If calling the get_transfer_status command, the following parameters should be included:
Request Parameters
Expand All
transfer_type
String
Result Parameters
Expand All
domain_transfer_status_list
List
Api Request and Header

Production

JSON
GET
https://api.dynadot.com/restful/v1/domains/{domain_name}/transfer_status
Accept: application/json
Authorization: Bearer API_KEY
Response

Structure
{
code: "Integer",
message: "String",
data: {
domain_transfer_status_list: [
{
order_id: "String",
transfer_status: "String"
}
]
}
}
DOMAIN_GET_NAMESERVER Command
Support multi-thread
Support API Sandbox
If calling the domain_get_nameserver command, the following parameters should be included:
Request Parameters
Expand All
Result Parameters
Expand All
nameserver_list
List
server_name
String
Api Request and Header

Production

JSON
GET
https://api.dynadot.com/restful/v1/domains/{domain_name}/nameservers
Accept: application/json
Authorization: Bearer API_KEY
Response

Structure
{
code: "Integer",
message: "String",
data: {
name_servers: [
{
host: "String",
ns_name: "String"
}
]
}
}
DOMAIN_SET_NAMESERVER Command
Support multi-thread
Support API Sandbox
Require X-Signature
If calling the domain_set_nameserver command, the following parameters should be included:
Request Parameters
Expand All
nameserver_list
List
Api Request and Header

Production

JSON
PUT
https://api.dynadot.com/restful/v1/domains/{domain_name}/nameservers
Content-Type: application/json
Accept: application/json
Authorization: Bearer API_KEY
X-Signature: {signature}
Request Body
{
nameserver_list: [1 item]
}
Response

Structure
{
code: "Integer",
message: "String"
}
SET_HOSTING Command
Support multi-thread
Support API Sandbox
Require X-Signature
If calling the set_hosting command, the following parameters should be included:
Request Parameters
Expand All
hosting_type
String
is_model_view
Boolean
Api Request and Header

Production

JSON
PUT
https://api.dynadot.com/restful/v1/domains/{domain_name}/hosts
Content-Type: application/json
Accept: application/json
Authorization: Bearer API_KEY
X-Signature: {signature}
Request Body
{
hosting_type: "String",
is_model_view: false
}
Response

Structure
{
code: "Integer",
message: "String"
}
SET_PARKING Command
Support multi-thread
Support API Sandbox
Require X-Signature
If calling the set_parking command, the following parameters should be included:
Request Parameters
Expand All
with_ads
Boolean
Optional
Api Request and Header

Production

JSON
PUT
https://api.dynadot.com/restful/v1/domains/{domain_name}/parking
Content-Type: application/json
Accept: application/json
Authorization: Bearer API_KEY
X-Signature: {signature}
Request Body
{
with_ads: false
}
Response

Structure
{
code: "Integer",
message: "String"
}
SET_PRIVACY Command
Support multi-thread
Support API Sandbox
Require X-Signature
If calling the set_privacy command, the following parameters should be included:
Request Parameters
Expand All
privacy_level
String
whois_privacy_option
Boolean
Api Request and Header

Production

JSON
PUT
https://api.dynadot.com/restful/v1/domains/{domain_name}/privacy
Content-Type: application/json
Accept: application/json
Authorization: Bearer API_KEY
X-Signature: {signature}
Request Body
{
privacy_level: "String",
whois_privacy_option: false
}
Response

Structure
{
code: "Integer",
message: "String"
}
SET_DNSSEC Command
Support multi-thread
Support API Sandbox
Require X-Signature
If calling the set_dnssec command, the following parameters should be included:
Request Parameters
Expand All
key_tag
Integer
Optional
digest_type
String
Optional
digest
String
Optional
algorithm
String
flags
String
Optional
public_key
String
Optional
Api Request and Header

Production

JSON
PUT
https://api.dynadot.com/restful/v1/domains/{domain_name}/dnssec
Content-Type: application/json
Accept: application/json
Authorization: Bearer API_KEY
X-Signature: {signature}
Request Body
{
key_tag: 0,
digest_type: "String",
digest: "String",
algorithm: "String",
flags: "String",
public_key: "String"
}
Response

Structure
{
code: "Integer",
message: "String"
}
GET_DNSSEC Command
Support multi-thread
Support API Sandbox
If calling the get_dnssec command, the following parameters should be included:
Request Parameters
Expand All
Result Parameters
Expand All
dnssec_info_list
List
Api Request and Header

Production

JSON
GET
https://api.dynadot.com/restful/v1/domains/{domain_name}/dnssec
Accept: application/json
Authorization: Bearer API_KEY
Response

Structure
{
code: "Integer",
message: "String",
data: {
dnssec_info_list: [
{
key_tag: "Integer",
algorithm: "String",
digest_type: "String",
digest: "String"
}
]
}
}
CLEAR_DNSSEC Command
Support multi-thread
Support API Sandbox
Require X-Signature
If calling the clear_dnssec command, the following parameters should be included:
Request Parameters
Expand All
Api Request and Header

Production

JSON
DELETE
https://api.dynadot.com/restful/v1/domains/{domain_name}/dnssec
Content-Type: application/json
Accept: application/json
Authorization: Bearer API_KEY
X-Signature: {signature}
Response

Structure
{
code: "Integer",
message: "String"
}
CLEAR_DOMAIN_SETTING Command
Support multi-thread
Support API Sandbox
Require X-Signature
If calling the clear_domain_setting command, the following parameters should be included:
Request Parameters
Expand All
service_type
String
Api Request and Header

Production

JSON
PUT
https://api.dynadot.com/restful/v1/domains/{domain_name}/clear_domain_setting
Content-Type: application/json
Accept: application/json
Authorization: Bearer API_KEY
X-Signature: {signature}
Request Body
{
service_type: "String"
}
Response

Structure
{
code: "Integer",
message: "String"
}
SET_DOMAIN_LOCK_STATUS Command
Support multi-thread
Support API Sandbox
Require X-Signature
If calling the set_domain_lock_status command, the following parameters should be included:
Request Parameters
Expand All
lock
Boolean
Api Request and Header

Production

JSON
PUT
https://api.dynadot.com/restful/v1/domains/{domain_name}/domain_lock
Content-Type: application/json
Accept: application/json
Authorization: Bearer API_KEY
X-Signature: {signature}
Request Body
{
lock: false
}
Response

Structure
{
code: "Integer",
message: "String"
}
PUSH Command
Support multi-thread
Support API Sandbox
Require X-Signature
If calling the push command, the following parameters should be included:
Request Parameters
Expand All
receiver_push_username
String
receiver_email
String
Optional
Api Request and Header

Production

JSON
POST
https://api.dynadot.com/restful/v1/domains/{domain_name}/push
Content-Type: application/json
Accept: application/json
Authorization: Bearer API_KEY
X-Signature: {signature}
Request Body
{
receiver_push_username: "String",
receiver_email: "String"
}
Response

Structure
{
code: "Integer",
message: "String"
}
ACCEPT_PUSH Command
Support multi-thread
Support API Sandbox
Require X-Signature
If calling the accept_push command, the following parameters should be included:
Request Parameters
Expand All
push_action
String
Api Request and Header

Production

JSON
POST
https://api.dynadot.com/restful/v1/domains/{domain_name}/accept_push
Content-Type: application/json
Accept: application/json
Authorization: Bearer API_KEY
X-Signature: {signature}
Request Body
{
push_action: "String"
}
Response

Structure
{
code: "Integer",
message: "String"
}
GET_PENDING_PUSH_ACCEPT_REQUEST Command
Support multi-thread
Support API Sandbox
Require X-Signature
If calling the get_pending_push_accept_request command, the following parameters should be included:
Request Parameters
Expand All
Result Parameters
Expand All
domain_name_list
List
Api Request and Header

Production

JSON
GET
https://api.dynadot.com/restful/v1/domains/pending_accept_pushes
Accept: application/json
Authorization: Bearer API_KEY
X-Signature: {signature}
Response

Structure
{
code: "Integer",
message: "String",
data: {
domain_name_list: [
"String"
]
}
}
GET_DNS Command
Support multi-thread
Support API Sandbox
Require X-Signature
If calling the get_dns command, the following parameters should be included:
Request Parameters
Expand All
Result Parameters
Expand All
glue_info
Object
Api Request and Header

Production

JSON
GET
https://api.dynadot.com/restful/v1/domains/{domain_name}/records
Accept: application/json
Authorization: Bearer API_KEY
X-Signature: {signature}
Response

Structure
{
code: "Integer",
message: "String",
data: {
name_server_settings: {
type: "String",
with_ads: "String"
}
}
}
SET_DNS Command
Support multi-thread
Support API Sandbox
Require X-Signature
If calling the set_dns command, the following parameters should be included:
Request Parameters
Expand All
dns_main_list
List
sub_list
List
Optional
ttl
Long
Optional
add_dns_to_current_setting
Boolean
Optional
Api Request and Header

Production

JSON
POST
https://api.dynadot.com/restful/v1/domains/{domain_name}/records
Content-Type: application/json
Accept: application/json
Authorization: Bearer API_KEY
X-Signature: {signature}
Request Body
{
dns_main_list: [1 item],
sub_list: [1 item],
ttl: 0,
add_dns_to_current_setting: false
}
Response

Structure
{
code: "Integer",
message: "String"
}
SET_NOTE Command
Support multi-thread
Support API Sandbox
Require X-Signature
If calling the set_note command, the following parameters should be included:
Request Parameters
Expand All
note
String
Api Request and Header

Production

JSON
PUT
https://api.dynadot.com/restful/v1/domains/{domain_name}/notes
Content-Type: application/json
Accept: application/json
Authorization: Bearer API_KEY
X-Signature: {signature}
Request Body
{
note: "String"
}
Response

Structure
{
code: "Integer",
message: "String"
}
GET_TRANSFER_AUTH_CODE Command
Support multi-thread
Support API Sandbox
Require X-Signature
If calling the get_transfer_auth_code command, the following parameters should be included:
Request Parameters
Expand All
new_code
Boolean
Optional
unlock_domain_for_transfer
Boolean
Optional
Result Parameters
Expand All
auth_code
String
Api Request and Header

Production

JSON
GET
https://api.dynadot.com/restful/v1/domains/{domain_name}/transfer_auth_code
Accept: application/json
Authorization: Bearer API_KEY
X-Signature: {signature}
Response

Structure
{
code: "Integer",
message: "String",
data: {
auth_code: "String"
}
}
DOMAIN_GET_TLD_PRICE Command
Support multi-thread
Support API Sandbox
If calling the domain_get_tld_price command, the following parameters should be included:
Request Parameters
Expand All
currency
String
page_index
Integer
Optional
count_per_page
Integer
Optional
sort
String
Optional
show_multi_year
Boolean
Optional
Result Parameters
Expand All
page_index
Integer
count_per_page
Integer
sort
String
price_level
String
currency
String
show_multi_year_price
Boolean
tld_price_list
List
Api Request and Header

Production

JSON
GET
https://api.dynadot.com/restful/v1/domains/get_tld_price
Accept: application/json
Authorization: Bearer API_KEY
Response

Structure
{
code: "Integer",
message: "String",
data: {
page_index: "Integer",
count_per_page: "Integer",
sort: "String",
price_level: "String",
currency: "String",
show_multi_year_price: "String",
tldPriceList: [
{
tld: "String",
usage: "String",
priceUnit: "String",
allYearsRegisterPrice: [],
allYearsRenewPrice: [],
transferPrice: "String",
restorePrice: "String",
graceFeePrice: "String",
supportPrivacy: "String",
gracePeriodUnit: "String",
renewGracePeriod: "String",
restorePeriod: "String",
deleteGracePeriod: "String",
isIdn: "String",
restriction: "String",
onSale: "String"
}
]
}
}
DOMAIN_LIST Command
Support multi-thread
Support API Sandbox
If calling the domain_list command, the following parameters should be included:
Request Parameters
Expand All
sort
String
Optional
count_per_page
Integer
Optional
page_index
Integer
Optional
status
String
Optional
Result Parameters
Expand All
domain
List
Api Request and Header

Production

JSON
GET
https://api.dynadot.com/restful/v1/domains
Accept: application/json
Authorization: Bearer API_KEY
Response

Structure
{
code: "Integer",
message: "String",
data: {
domainInfo: [
{
domainName: "String",
expiration: "Long",
registration: "Long",
glueInfo: {
name_server_settings: {
type: "String",
with_ads: "String",
forward_to: "String",
forward_type: "String",
website_title: "String",
ttl: "String",
email_forwarding: {
type: "String"
}
}
},
registrant_contactId: "Integer",
admin_contactId: "Integer",
tech_contactId: "Integer",
billing_contactId: "Integer",
locked: "String",
disabled: "String",
udrpLocked: "String",
registrant_unverified: "String",
hold: "String",
privacy: "String",
is_for_sale: "String",
renew_option: "String",
note: "String",
folder_id: "Integer",
folder_name: "String",
status: "String"
}
]
}
}
DOMAIN_INFO Command
Support multi-thread
Support API Sandbox
If calling the domain_info command, the following parameters should be included:
Request Parameters
Expand All
Result Parameters
Expand All
domain_info
Object
Api Request and Header

Production

JSON
GET
https://api.dynadot.com/restful/v1/domains/{domain_name}
Accept: application/json
Authorization: Bearer API_KEY
Response

Structure
{
code: "Integer",
message: "String",
data: {
domainInfo: [
{
domainName: "String",
expiration: "Long",
registration: "Long",
glueInfo: {
name_server_settings: {
type: "String",
with_ads: "String",
forward_to: "String",
forward_type: "String",
website_title: "String",
ttl: "String",
email_forwarding: {
type: "String"
}
}
},
registrant_contactId: "Integer",
admin_contactId: "Integer",
tech_contactId: "Integer",
billing_contactId: "Integer",
locked: "String",
disabled: "String",
udrpLocked: "String",
registrant_unverified: "String",
hold: "String",
privacy: "String",
is_for_sale: "String",
renew_option: "String",
note: "String",
folder_id: "Integer",
folder_name: "String",
status: "String"
}
]
}
}
GET_CONTACT Command
Support multi-thread
Support API Sandbox
If calling the get_contact command, the following parameters should be included:
Request Parameters
Expand All
Result Parameters
Expand All
contact
Object
Api Request and Header

Production

JSON
GET
https://api.dynadot.com/restful/v1/contacts/{contact_id}
Accept: application/json
Authorization: Bearer API_KEY
Response

Structure
{
code: "Integer",
message: "String",
data: {
organization: "String",
name: "String",
email: "String",
phone_number: "String",
phone_cc: "String",
fax_number: "String",
fax_cc: "String",
address1: "String",
address2: "String",
city: "String",
state: "String",
zip: "String",
country: "String"
}
}
CONTACT_LIST Command
Support multi-thread
Support API Sandbox
If calling the contact_list command, the following parameters should be included:
Request Parameters
Expand All
whois_verification_status
String
Optional
count_per_page
Integer
Optional
page_index
Integer
Optional
Result Parameters
Expand All
contact_list
List
Api Request and Header

Production

JSON
GET
https://api.dynadot.com/restful/v1/contacts
Accept: application/json
Authorization: Bearer API_KEY
Response

Structure
{
code: "Integer",
message: "String",
data: {
contact_list: [
{
contact_id: "Integer",
organization: "String",
name: "String",
email: "String",
phone_number: "String",
phone_cc: "String",
fax_number: "String",
fax_cc: "String",
address1: "String",
address2: "String",
city: "String",
state: "String",
zip: "String",
country: "String"
}
]
}
}
CONTACT_CREATE Command
Support multi-thread
Support API Sandbox
Require X-Signature
If calling the contact_create command, the following parameters should be included:
Request Parameters
Expand All
contact
Object
Result Parameters
Expand All
contact_id
Integer
Api Request and Header

Production

JSON
POST
https://api.dynadot.com/restful/v1/contacts
Content-Type: application/json
Accept: application/json
Authorization: Bearer API_KEY
X-Signature: {signature}
Request Body
{
contact: {13 items}
}
Response

Structure
{
code: "Integer",
message: "String",
data: {
contact_id: "Integer"
}
}
CONTACT_UPDATE Command
Support multi-thread
Support API Sandbox
Require X-Signature
If calling the contact_update command, the following parameters should be included:
Request Parameters
Expand All
contact
Object
Result Parameters
Expand All
contact_id
Integer
Api Request and Header

Production

JSON
PUT
https://api.dynadot.com/restful/v1/contacts/{contact_id}
Content-Type: application/json
Accept: application/json
Authorization: Bearer API_KEY
X-Signature: {signature}
Request Body
{
contact: {13 items}
}
Response

Structure
{
code: "Integer",
message: "String",
data: {
contact_id: "Integer"
}
}
CONTACT_DELETE Command
Support multi-thread
Support API Sandbox
Require X-Signature
If calling the contact_delete command, the following parameters should be included:
Request Parameters
Expand All
Result Parameters
Expand All
contact_id
Integer
Api Request and Header

Production

JSON
DELETE
https://api.dynadot.com/restful/v1/contacts/{contact_id}
Content-Type: application/json
Accept: application/json
Authorization: Bearer API_KEY
X-Signature: {signature}
Response

Structure
{
code: "Integer",
message: "String",
data: {
contact_id: "Integer"
}
}
CREATE_CN_AUDIT Command
Support multi-thread
Support API Sandbox
Require X-Signature
If calling the create_cn_audit command, the following parameters should be included:
Request Parameters
Expand All
contact_type
String
individual_id_type
String
individual_url
String
individual_license_id
String
enterprise_id_type
String
Optional
enterprise_license_id
String
Optional
enterprise_url
String
Optional
Api Request and Header

Production

JSON
POST
https://api.dynadot.com/restful/v1/contacts/{contact_id}/create_cn_audit
Content-Type: application/json
Accept: application/json
Authorization: Bearer API_KEY
X-Signature: {signature}
Request Body
{
contact_type: "String",
individual_id_type: "String",
individual_url: "String",
individual_license_id: "String",
enterprise_id_type: "String",
enterprise_license_id: "String",
enterprise_url: "String"
}
Response

Structure
{
code: "Integer",
message: "String"
}
GET_CN_AUDIT_STATUS Command
Support multi-thread
Support API Sandbox
If calling the get_cn_audit_status command, the following parameters should be included:
Request Parameters
Expand All
is_gtld
Boolean
Result Parameters
Expand All
audit_status
String
fail_reason
String
Api Request and Header

Production

JSON
GET
https://api.dynadot.com/restful/v1/contacts/{contact_id}/get_cn_audit_status
Accept: application/json
Authorization: Bearer API_KEY
Response

Structure
{
code: "Integer",
message: "String",
data: {
audit_status: "String"
}
}
SET_CONTACT_EU_SETTING Command
Support multi-thread
Support API Sandbox
Require X-Signature
If calling the set_contact_eu_setting command, the following parameters should be included:
Request Parameters
Expand All
contact_extension
Object
Result Parameters
Expand All
contact_id
Integer
Api Request and Header

Production

JSON
PUT
https://api.dynadot.com/restful/v1/contacts/{contact_id}/set_eu_setting
Content-Type: application/json
Accept: application/json
Authorization: Bearer API_KEY
X-Signature: {signature}
Request Body
{
contact_extension: {2 items}
}
Response

Structure
{
code: "Integer",
message: "String",
data: {
contact_id: "Integer"
}
}
SET_CONTACT_LT_SETTING Command
Support multi-thread
Support API Sandbox
Require X-Signature
If calling the set_contact_lt_setting command, the following parameters should be included:
Request Parameters
Expand All
contact_extension
Object
Result Parameters
Expand All
account_id
Integer
Api Request and Header

Production

JSON
PUT
https://api.dynadot.com/restful/v1/contacts/{contact_id}/set_lt_setting
Content-Type: application/json
Accept: application/json
Authorization: Bearer API_KEY
X-Signature: {signature}
Request Body
{
contact_extension: {2 items}
}
Response

Structure
{
code: "Integer",
message: "String",
data: {
contact_id: "Integer"
}
}
SET_CONTACT_LV_SETTING Command
Support multi-thread
Support API Sandbox
Require X-Signature
If calling the set_contact_lv_setting command, the following parameters should be included:
Request Parameters
Expand All
contact_extension
Object
Result Parameters
Expand All
contact_id
Integer
Api Request and Header

Production

JSON
PUT
https://api.dynadot.com/restful/v1/contacts/{contact_id}/set_lv_setting
Content-Type: application/json
Accept: application/json
Authorization: Bearer API_KEY
X-Signature: {signature}
Request Body
{
contact_extension: {3 items}
}
Response

Structure
{
code: "Integer",
message: "String",
data: {
contact_id: "Integer"
}
}
SET_CONTACT_IT_SETTING Command
Support multi-thread
Support API Sandbox
Require X-Signature
If calling the set_contact_it_setting command, the following parameters should be included:
Request Parameters
Expand All
contact_extension
Object
Result Parameters
Expand All
contact_id
Integer
Api Request and Header

Production

JSON
PUT
https://api.dynadot.com/restful/v1/contacts/{contact_id}/set_it_setting
Content-Type: application/json
Accept: application/json
Authorization: Bearer API_KEY
X-Signature: {signature}
Request Body
{
contact_extension: {3 items}
}
Response

Structure
{
code: "Integer",
message: "String",
data: {
contact_id: "Integer"
}
}
NAMESERVER_GET Command
Support multi-thread
Support API Sandbox
Require X-Signature
If calling the nameserver_get command, the following parameters should be included:
Request Parameters
Expand All
Result Parameters
Expand All
nameserver
Object
Api Request and Header

Production

JSON
GET
https://api.dynadot.com/restful/v1/nameservers/{nameserver}
Accept: application/json
Authorization: Bearer API_KEY
X-Signature: {signature}
Response

Structure
{
code: "Integer",
message: "String",
data: {
server_name: "String",
ip_list: [
"String"
]
}
}
NAMESERVER_LIST Command
Support multi-thread
Support API Sandbox
Require X-Signature
If calling the nameserver_list command, the following parameters should be included:
Request Parameters
Expand All
Result Parameters
Expand All
nameserver_list
List
Api Request and Header

Production

JSON
GET
https://api.dynadot.com/restful/v1/nameservers
Accept: application/json
Authorization: Bearer API_KEY
X-Signature: {signature}
Response

Structure
{
code: "Integer",
message: "String",
data: {
nameserver_list: [
{
server_name: "String",
ip_list: [
"String"
]
}
]
}
}
NAMESERVER_REGISTER Command
Support multi-thread
Support API Sandbox
Require X-Signature
If calling the nameserver_register command, the following parameters should be included:
Request Parameters
Expand All
name_server
Object
Api Request and Header

Production

JSON
POST
https://api.dynadot.com/restful/v1/nameservers/register
Content-Type: application/json
Accept: application/json
Authorization: Bearer API_KEY
X-Signature: {signature}
Request Body
{
name_server: {2 items}
}
Response

Structure
{
code: "Integer",
message: "String"
}
NAMESERVER_ADD_EXTERNAL Command
Support multi-thread
Support API Sandbox
Require X-Signature
If calling the nameserver_add_external command, the following parameters should be included:
Request Parameters
Expand All
Api Request and Header

Production

JSON
POST
https://api.dynadot.com/restful/v1/nameservers/{nameserver}/add_external
Content-Type: application/json
Accept: application/json
Authorization: Bearer API_KEY
X-Signature: {signature}
Request Body
{}
Response

Structure
{
code: "Integer",
message: "String"
}
NAMESERVER_SET_IP Command
Support multi-thread
Support API Sandbox
Require X-Signature
If calling the nameserver_set_ip command, the following parameters should be included:
Request Parameters
Expand All
ip_list
List
Result Parameters
Expand All
host
String
server_id
Integer
Api Request and Header

Production

JSON
PUT
https://api.dynadot.com/restful/v1/nameservers/{nameserver}/set_ip
Content-Type: application/json
Accept: application/json
Authorization: Bearer API_KEY
X-Signature: {signature}
Request Body
{
ip_list: [1 item]
}
Response

Structure
{
code: "Integer",
message: "String",
data: {
host: "String",
server_id: "Integer"
}
}
NAMESERVER_DELETE Command
Support multi-thread
Support API Sandbox
Require X-Signature
If calling the nameserver_delete command, the following parameters should be included:
Request Parameters
Expand All
Api Request and Header

Production

JSON
DELETE
https://api.dynadot.com/restful/v1/nameservers/{nameserver}
Content-Type: application/json
Accept: application/json
Authorization: Bearer API_KEY
X-Signature: {signature}
Response

Structure
{
code: "Integer",
message: "String"
}
GET_INFO Command
Support multi-thread
Support API Sandbox
Require X-Signature
If calling the get_info command, the following parameters should be included:
Request Parameters
Expand All
Result Parameters
Expand All
account_info
Object
Api Request and Header

Production

JSON
GET
https://api.dynadot.com/restful/v1/accounts/info
Accept: application/json
Authorization: Bearer API_KEY
X-Signature: {signature}
Response

Structure
{
code: "Integer",
message: "String",
data: {
account_info: {
username: "String",
forum_name: "String",
avatar_url: "String",
account_contact: {
organization: "String",
name: "String",
email: "String",
phone_number: "String",
phone_cc: "String",
fax_number: "String",
fax_cc: "String",
address1: "String",
address2: "String",
city: "String",
state: "String",
zip: "String",
country: "String"
},
customer_since: "Long",
account_lock: "String",
custom_time_zone: "String",
default_registrant_contact_id: "Integer",
default_admin_contact_id: "Integer",
default_technical_contact_id: "Integer",
default_billing_contact_id: "Integer",
default_name_server_settings: {
type: "String",
with_ads: "String",
forward_to: "String",
forward_type: "String",
website_title: "String",
ttl: "String",
email_forwarding: {
type: "String"
}
},
total_spending: "String",
price_level: "String",
account_balance: "String",
balance_list: [
{
currency: "String",
amount: "String"
}
]
}
}
}
SET_DEFAULT_NAMESERVERS Command
Support multi-thread
Support API Sandbox
Require X-Signature
If calling the set_default_nameservers command, the following parameters should be included:
Request Parameters
Expand All
nameserver_list
List
Result Parameters
Expand All
nameserver_list
List
Api Request and Header

Production

JSON
PUT
https://api.dynadot.com/restful/v1/accounts/default_nameservers
Content-Type: application/json
Accept: application/json
Authorization: Bearer API_KEY
X-Signature: {signature}
Request Body
{
nameserver_list: [1 item]
}
Response

Structure
{
code: "Integer",
message: "String",
data: {
name_servers: [
{
server_name: "String"
}
]
}
}
SET_DEFAULT_DOMAIN_FORWARDING Command
Support multi-thread
Support API Sandbox
Require X-Signature
If calling the set_default_domain_forwarding command, the following parameters should be included:
Request Parameters
Expand All
forward_url
String
is_temporary
Boolean
Optional
Api Request and Header

Production

JSON
PUT
https://api.dynadot.com/restful/v1/accounts/default_domain_forwarding
Content-Type: application/json
Accept: application/json
Authorization: Bearer API_KEY
X-Signature: {signature}
Request Body
{
forward_url: "String",
is_temporary: false
}
Response

Structure
{
code: "Integer",
message: "String"
}
SET_DEFAULT_STEALTH_FORWARDING Command
Support multi-thread
Support API Sandbox
Require X-Signature
If calling the set_default_stealth_forwarding command, the following parameters should be included:
Request Parameters
Expand All
stealth_url
String
stealth_title
String
Optional
Api Request and Header

Production

JSON
PUT
https://api.dynadot.com/restful/v1/accounts/default_stealth_forwarding
Content-Type: application/json
Accept: application/json
Authorization: Bearer API_KEY
X-Signature: {signature}
Request Body
{
stealth_url: "String",
stealth_title: "String"
}
Response

Structure
{
code: "Integer",
message: "String"
}
SET_DEFAULT_EMAIL_FORWARDING Command
Support multi-thread
Support API Sandbox
Require X-Signature
If calling the set_default_email_forwarding command, the following parameters should be included:
Request Parameters
Expand All
email_forward_type
String
email_alias_list
List
Optional
mail_exchange_list
List
Optional
Api Request and Header

Production

JSON
PUT
https://api.dynadot.com/restful/v1/accounts/default_email_forwarding
Content-Type: application/json
Accept: application/json
Authorization: Bearer API_KEY
X-Signature: {signature}
Request Body
{
email_forward_type: "String",
email_alias_list: [1 item],
mail_exchange_list: [1 item]
}
Response

Structure
{
code: "Integer",
message: "String"
}
SET_DEFAULT_CONTACTS Command
Support multi-thread
Support API Sandbox
Require X-Signature
If calling the set_default_contacts command, the following parameters should be included:
Request Parameters
Expand All
registrant_contact_id
Integer
admin_contact_id
Integer
technical_contact_id
Integer
billing_contact_id
Integer
Api Request and Header

Production

JSON
PUT
https://api.dynadot.com/restful/v1/accounts/default_contacts
Content-Type: application/json
Accept: application/json
Authorization: Bearer API_KEY
X-Signature: {signature}
Request Body
{
registrant_contact_id: 0,
admin_contact_id: 0,
technical_contact_id: 0,
billing_contact_id: 0
}
Response

Structure
{
code: "Integer",
message: "String"
}
SET_DEFAULT_PARKING Command
Support multi-thread
Support API Sandbox
Require X-Signature
If calling the set_default_parking command, the following parameters should be included:
Request Parameters
Expand All
with_ads
Boolean
Optional
Api Request and Header

Production

JSON
PUT
https://api.dynadot.com/restful/v1/accounts/default_parking
Content-Type: application/json
Accept: application/json
Authorization: Bearer API_KEY
X-Signature: {signature}
Request Body
{
with_ads: false
}
Response

Structure
{
code: "Integer",
message: "String"
}
SET_DEFAULT_HOSTING Command
Support multi-thread
Support API Sandbox
Require X-Signature
If calling the set_default_hosting command, the following parameters should be included:
Request Parameters
Expand All
hosting_type
String
Api Request and Header

Production

JSON
PUT
https://api.dynadot.com/restful/v1/accounts/default_hosts
Content-Type: application/json
Accept: application/json
Authorization: Bearer API_KEY
X-Signature: {signature}
Request Body
{
hosting_type: "String"
}
Response

Structure
{
code: "Integer",
message: "String"
}
SET_DEFAULT_RENEW_OPTION Command
Support multi-thread
Support API Sandbox
Require X-Signature
If calling the set_default_renew_option command, the following parameters should be included:
Request Parameters
Expand All
renew_option
String
Api Request and Header

Production

JSON
PUT
https://api.dynadot.com/restful/v1/accounts/default_renew_option
Content-Type: application/json
Accept: application/json
Authorization: Bearer API_KEY
X-Signature: {signature}
Request Body
{
renew_option: "String"
}
Response

Structure
{
code: "Integer",
message: "String"
}
SET_DEFAULT_DNS Command
Support multi-thread
Support API Sandbox
Require X-Signature
If calling the set_default_dns command, the following parameters should be included:
Request Parameters
Expand All
dns_main_list
List
sub_list
List
Optional
ttl
Long
Optional
add_dns_to_current_setting
Boolean
Optional
Api Request and Header

Production

JSON
PUT
https://api.dynadot.com/restful/v1/default_records
Content-Type: application/json
Accept: application/json
Authorization: Bearer API_KEY
X-Signature: {signature}
Request Body
{
dns_main_list: [1 item],
sub_list: [1 item],
ttl: 0,
add_dns_to_current_setting: false
}
Response

Structure
{
code: "Integer",
message: "String"
}
CLEAR_DEFAULT_SETTING Command
Support multi-thread
Support API Sandbox
Require X-Signature
If calling the clear_default_setting command, the following parameters should be included:
Request Parameters
Expand All
service_type
String
Api Request and Header

Production

JSON
PUT
https://api.dynadot.com/restful/v1/accounts/clear_default_setting
Content-Type: application/json
Accept: application/json
Authorization: Bearer API_KEY
X-Signature: {signature}
Request Body
{
service_type: "String"
}
Response

Structure
{
code: "Integer",
message: "String"
}
FOLDER_LIST Command
Support multi-thread
Support API Sandbox
If calling the folder_list command, the following parameters should be included:
Request Parameters
Expand All
Result Parameters
Expand All
folder_list
List
Api Request and Header

Production

JSON
GET
https://api.dynadot.com/restful/v1/folders
Accept: application/json
Authorization: Bearer API_KEY
Response

Structure
{
code: "Integer",
message: "String",
data: {
folder_list: [
{
folder_id: "Integer",
folder_name: "String",
default_whois: {
default_whois_enable_status: "String",
default_registrant: {
contact_id: "Integer"
},
default_admin: {
contact_id: "Integer"
},
default_technical: {
contact_id: "Integer"
},
default_billing: {
contact_id: "Integer"
}
},
default_nameservers: {
default_name_server_enable_status: "String",
name_server_settings: {
type: "String",
with_ads: "String"
}
},
default_renew_option: {
default_renew_option_enable_status: "String",
renew_option: "String"
},
default_transfer_lock: {
default_transfer_lock_enable_status: "String",
lock_status: "String"
}
}
]
}
}
FOLDER_CREATE Command
Support multi-thread
Support API Sandbox
Require X-Signature
If calling the folder_create command, the following parameters should be included:
Request Parameters
Expand All
folder_name
String
Result Parameters
Expand All
folder_name
String
folder_id
Integer
Api Request and Header

Production

JSON
POST
https://api.dynadot.com/restful/v1/folders
Content-Type: application/json
Accept: application/json
Authorization: Bearer API_KEY
X-Signature: {signature}
Request Body
{
folder_name: "String"
}
Response

Structure
{
code: "Integer",
message: "String",
data: {
folder_id: "Integer",
folder_name: "String"
}
}
FOLDER_DELETE Command
Support multi-thread
Support API Sandbox
Require X-Signature
If calling the folder_delete command, the following parameters should be included:
Request Parameters
Expand All
Api Request and Header

Production

JSON
DELETE
https://api.dynadot.com/restful/v1/folders/{folder_name}
Content-Type: application/json
Accept: application/json
Authorization: Bearer API_KEY
X-Signature: {signature}
Response

Structure
{
code: "Integer",
message: "String"
}
FOLDER_SET_NAME Command
Support multi-thread
Support API Sandbox
Require X-Signature
If calling the folder_set_name command, the following parameters should be included:
Request Parameters
Expand All
new_folder_name
String
Api Request and Header

Production

JSON
PUT
https://api.dynadot.com/restful/v1/folders/{folder_name}/name
Content-Type: application/json
Accept: application/json
Authorization: Bearer API_KEY
X-Signature: {signature}
Request Body
{
new_folder_name: "String"
}
Response

Structure
{
code: "Integer",
message: "String"
}
FOLDER_SET_DNS Command
Support multi-thread
Support API Sandbox
Require X-Signature
If calling the folder_set_dns command, the following parameters should be included:
Request Parameters
Expand All
dns_main_list
List
dns_sub_list
List
Optional
ttl
String
Optional
apply_for_future_domain
Boolean
Optional
sync_setting_to_existing_domains_in_this_folder
Boolean
Optional
Api Request and Header

Production

JSON
PUT
https://api.dynadot.com/restful/v1/folders/{folder_name}/records
Content-Type: application/json
Accept: application/json
Authorization: Bearer API_KEY
X-Signature: {signature}
Request Body
{
dns_main_list: [1 item],
dns_sub_list: [1 item],
ttl: "String",
apply_for_future_domain: false,
sync_setting_to_existing_domains_in_this_folder: false
}
Response

Structure
{
code: "Integer",
message: "String"
}
FOLDER_SET_NAMESERVER Command
Support multi-thread
Support API Sandbox
Require X-Signature
If calling the folder_set_nameserver command, the following parameters should be included:
Request Parameters
Expand All
folder_nameserver_list
List
apply_for_future_domain
Boolean
Optional
sync_setting_to_existing_domains_in_this_folder
Boolean
Optional
Result Parameters
Expand All
servers
List
Api Request and Header

Production

JSON
PUT
https://api.dynadot.com/restful/v1/folders/{folder_name}/nameservers
Content-Type: application/json
Accept: application/json
Authorization: Bearer API_KEY
X-Signature: {signature}
Request Body
{
folder_nameserver_list: [1 item],
apply_for_future_domain: false,
sync_setting_to_existing_domains_in_this_folder: false
}
Response

Structure
{
code: "Integer",
message: "String",
data: {
servers: [
{
server_name: "String"
}
]
}
}
FOLDER_SET_CONTACTS Command
Support multi-thread
Support API Sandbox
Require X-Signature
If calling the folder_set_contacts command, the following parameters should be included:
Request Parameters
Expand All
reg_contact_id
Integer
admin_contact_id
Integer
tech_contact_id
Integer
bill_contact_id
Integer
apply_for_future_domain
Boolean
Optional
sync_setting_to_existing_domains_in_this_folder
Boolean
Optional
Api Request and Header

Production

JSON
PUT
https://api.dynadot.com/restful/v1/folders/{folder_name}/contacts
Content-Type: application/json
Accept: application/json
Authorization: Bearer API_KEY
X-Signature: {signature}
Request Body
{
reg_contact_id: 0,
admin_contact_id: 0,
tech_contact_id: 0,
bill_contact_id: 0,
apply_for_future_domain: false,
sync_setting_to_existing_domains_in_this_folder: false
}
Response

Structure
{
code: "Integer",
message: "String"
}
FOLDER_SET_PARKING Command
Support multi-thread
Support API Sandbox
Require X-Signature
If calling the folder_set_parking command, the following parameters should be included:
Request Parameters
Expand All
with_ads
Boolean
Optional
apply_for_future_domain
Boolean
Optional
sync_setting_to_existing_domains_in_this_folder
Boolean
Optional
Api Request and Header

Production

JSON
PUT
https://api.dynadot.com/restful/v1/folders/{folder_name}/parking
Content-Type: application/json
Accept: application/json
Authorization: Bearer API_KEY
X-Signature: {signature}
Request Body
{
with_ads: false,
apply_for_future_domain: false,
sync_setting_to_existing_domains_in_this_folder: false
}
Response

Structure
{
code: "Integer",
message: "String"
}
FOLDER_SET_DOMAIN_FORWARDING Command
Support multi-thread
Support API Sandbox
Require X-Signature
If calling the folder_set_domain_forwarding command, the following parameters should be included:
Request Parameters
Expand All
forward_url
String
is_temporary
Boolean
Optional
apply_for_future_domain
Boolean
Optional
sync_setting_to_existing_domains_in_this_folder
Boolean
Optional
Api Request and Header

Production

JSON
PUT
https://api.dynadot.com/restful/v1/folders/{folder_name}/domain_forwarding
Content-Type: application/json
Accept: application/json
Authorization: Bearer API_KEY
X-Signature: {signature}
Request Body
{
forward_url: "String",
is_temporary: false,
apply_for_future_domain: false,
sync_setting_to_existing_domains_in_this_folder: false
}
Response

Structure
{
code: "Integer",
message: "String"
}
FOLDER_SET_STEALTH_FORWARDING Command
Support multi-thread
Support API Sandbox
Require X-Signature
If calling the folder_set_stealth_forwarding command, the following parameters should be included:
Request Parameters
Expand All
stealth_url
String
stealth_title
String
Optional
apply_for_future_domain
Boolean
Optional
sync_setting_to_existing_domains_in_this_folder
Boolean
Optional
Api Request and Header

Production

JSON
PUT
https://api.dynadot.com/restful/v1/folders/{folder_name}/stealth_forwarding
Content-Type: application/json
Accept: application/json
Authorization: Bearer API_KEY
X-Signature: {signature}
Request Body
{
stealth_url: "String",
stealth_title: "String",
apply_for_future_domain: false,
sync_setting_to_existing_domains_in_this_folder: false
}
Response

Structure
{
code: "Integer",
message: "String"
}
FOLDER_SET_EMAIL_FORWARDING Command
Support multi-thread
Support API Sandbox
Require X-Signature
If calling the folder_set_email_forwarding command, the following parameters should be included:
Request Parameters
Expand All
email_forward_type
String
email_alias_list
List
Optional
mail_exchange_list
List
Optional
apply_for_future_domain
Boolean
Optional
sync_setting_to_existing_domains_in_this_folder
Boolean
Optional
Api Request and Header

Production

JSON
PUT
https://api.dynadot.com/restful/v1/folders/{folder_name}/email_forwarding
Content-Type: application/json
Accept: application/json
Authorization: Bearer API_KEY
X-Signature: {signature}
Request Body
{
email_forward_type: "String",
email_alias_list: [1 item],
mail_exchange_list: [1 item],
apply_for_future_domain: false,
sync_setting_to_existing_domains_in_this_folder: false
}
Response

Structure
{
code: "Integer",
message: "String"
}
FOLDER_SET_HOSTING Command
Support multi-thread
Support API Sandbox
Require X-Signature
If calling the folder_set_hosting command, the following parameters should be included:
Request Parameters
Expand All
hosting_type
String
apply_for_future_domain
Boolean
Optional
sync_setting_to_existing_domains_in_this_folder
Boolean
Optional
Api Request and Header

Production

JSON
PUT
https://api.dynadot.com/restful/v1/folders/{folder_name}/hosts
Content-Type: application/json
Accept: application/json
Authorization: Bearer API_KEY
X-Signature: {signature}
Request Body
{
hosting_type: "String",
apply_for_future_domain: false,
sync_setting_to_existing_domains_in_this_folder: false
}
Response

Structure
{
code: "Integer",
message: "String"
}
FOLDER_SET_RENEW_OPTION Command
Support multi-thread
Support API Sandbox
Require X-Signature
If calling the folder_set_renew_option command, the following parameters should be included:
Request Parameters
Expand All
renew_option
String
apply_for_future_domain
Boolean
Optional
sync_setting_to_existing_domains_in_this_folder
Boolean
Optional
Api Request and Header

Production

JSON
PUT
https://api.dynadot.com/restful/v1/folders/{folder_name}/renew_option
Content-Type: application/json
Accept: application/json
Authorization: Bearer API_KEY
X-Signature: {signature}
Request Body
{
renew_option: "String",
apply_for_future_domain: false,
sync_setting_to_existing_domains_in_this_folder: false
}
Response

Structure
{
code: "Integer",
message: "String"
}
FOLDER_CLEAR_SETTING Command
Support multi-thread
Support API Sandbox
Require X-Signature
If calling the folder_clear_setting command, the following parameters should be included:
Request Parameters
Expand All
service_type
String
Api Request and Header

Production

JSON
PUT
https://api.dynadot.com/restful/v1/folders/{folder_name}/clear_setting
Content-Type: application/json
Accept: application/json
Authorization: Bearer API_KEY
X-Signature: {signature}
Request Body
{
service_type: "String"
}
Response

Structure
{
code: "Integer",
message: "String"
}
ORDER_GET_STATUS Command
Support multi-thread
Support API Sandbox
Require X-Signature
If calling the order_get_status command, the following parameters should be included:
Request Parameters
Expand All
Result Parameters
Expand All
order_id
Integer
order_status
String
order_status_list
List
Api Request and Header

Production

JSON
GET
https://api.dynadot.com/restful/v1/orders/{order_id}
Accept: application/json
Authorization: Bearer API_KEY
X-Signature: {signature}
Response

Structure
{
code: "Integer",
message: "String",
data: {
order_id: "Integer",
order_status: "String",
order_status_item_list: [
{
item_type: "String",
item_domain: "String",
item_status: "String"
}
]
}
}
ORDER_GET_HISTORY Command
Support multi-thread
Support API Sandbox
Require X-Signature
If calling the order_get_history command, the following parameters should be included:
Request Parameters
Expand All
domain_name_list
List
Optional
order_id_list
List
Optional
search_type
String
start_time
Long
Optional
end_time
Long
Optional
payment_method
List
Optional
Result Parameters
Expand All
order_list
List
Api Request and Header

Production

JSON
GET
https://api.dynadot.com/restful/v1/orders
Accept: application/json
Authorization: Bearer API_KEY
X-Signature: {signature}
Response

Structure
{
code: "Integer",
message: "String",
data: {
order_list: [
{
order_id: "Integer",
submitted_time: "Long",
currency: "String",
payment_method: "String",
total_cost: "String",
total_paid: "String",
status: "String",
order_item: [
{
type: "String",
name: "String",
duration: "Integer",
cost: "String",
status: "String"
}
]
}
]
}
}
CANCEL_TRANSFER Command
Support multi-thread
Support API Sandbox
Require X-Signature
If calling the cancel_transfer command, the following parameters should be included:
Request Parameters
Expand All
domain_name
String
Api Request and Header

Production

JSON
POST
https://api.dynadot.com/restful/v1/orders/{order_id}/cancel_transfer
Content-Type: application/json
Accept: application/json
Authorization: Bearer API_KEY
X-Signature: {signature}
Request Body
{
domain_name: "String"
}
Response

Structure
{
code: "Integer",
message: "String"
}
AUTHORIZE_TRANSFER_AWAY Command
Support multi-thread
Support API Sandbox
Require X-Signature
If calling the authorize_transfer_away command, the following parameters should be included:
Request Parameters
Expand All
domain_name
String
approve
Boolean
Api Request and Header

Production

JSON
POST
https://api.dynadot.com/restful/v1/orders/{order_id}/authorize_transfer_away
Content-Type: application/json
Accept: application/json
Authorization: Bearer API_KEY
X-Signature: {signature}
Request Body
{
domain_name: "String",
approve: false
}
Response

Structure
{
code: "Integer",
message: "String"
}
SET_TRANSFER_AUTH_CODE Command
Support multi-thread
Support API Sandbox
Require X-Signature
If calling the set_transfer_auth_code command, the following parameters should be included:
Request Parameters
Expand All
domain_name
String
auth_code
String
Api Request and Header

Production

JSON
POST
https://api.dynadot.com/restful/v1/orders/{order_id}/update_transfer_auth_code
Content-Type: application/json
Accept: application/json
Authorization: Bearer API_KEY
X-Signature: {signature}
Request Body
{
domain_name: "String",
auth_code: "String"
}
Response

Structure
{
code: "Integer",
message: "String"
}
ADD_NEW_LEAD Command
Support multi-thread
Require X-Signature
If calling the add_new_lead command, the following parameters should be included:
Request Parameters
Expand All
lead_type
String
domain_name
String
price
String
buyer_name
String
buyer_email
String
Api Request and Header

Production

JSON
POST
https://api.dynadot.com/restful/v1/aftermarkets/leads
Content-Type: application/json
Accept: application/json
Authorization: Bearer API_KEY
X-Signature: {signature}
Request Body
{
lead_type: "String",
domain_name: "String",
price: "String",
buyer_name: "String",
buyer_email: "String"
}
Response

Structure
{
code: "Integer",
message: "String"
}
SET_FOR_SALE Command
Support multi-thread
Require X-Signature
If calling the set_for_sale command, the following parameters should be included:
Request Parameters
Expand All
for_sale_type
String
currency
String
Optional
listing_type
String
Optional
price
String
Optional
minimum_offer_price
String
Optional
installment
String
Optional
maximum_installments
Integer
Optional
category
String
Optional
sub_category
String
Optional
description
String
Optional
allow_seo_index
Boolean
Optional
Api Request and Header

Production

JSON
PUT
https://api.dynadot.com/restful/v1/aftermarkets/domains/{domain_name}/for_sales
Content-Type: application/json
Accept: application/json
Authorization: Bearer API_KEY
X-Signature: {signature}
Request Body
{
for_sale_type: "String",
currency: "String",
listing_type: "String",
price: "String",
minimum_offer_price: "String",
installment: "String",
maximum_installments: 0,
category: "String",
sub_category: "String",
description: "String",
allow_seo_index: false
}
Response

Structure
{
code: "Integer",
message: "String"
}
SET_OTHER_PLATFORM_CONFIRM_ACTION Command
Support multi-thread
Require X-Signature
If calling the set_other_platform_confirm_action command, the following parameters should be included:
Request Parameters
Expand All
action
String
platform_type
String
Api Request and Header

Production

JSON
POST
https://api.dynadot.com/restful/v1/aftermarket/domains/{domain_name}/opt_in_fast_transfer
Content-Type: application/json
Accept: application/json
Authorization: Bearer API_KEY
X-Signature: {signature}
Request Body
{
action: "String",
platform_type: "String"
}
Response

Structure
{
code: "Integer",
message: "String"
}
GET_LISTINGS Command
Support multi-thread
If calling the get_listings command, the following parameters should be included:
Request Parameters
Expand All
currency
String
exclude_pending_sale
Boolean
Optional
show_other_registrar
Boolean
Optional
count_per_page
Integer
page_index
Integer
Result Parameters
Expand All
listing_item_list
List
Api Request and Header

Production

JSON
GET
https://api.dynadot.com/restful/v1/aftermarket/listings
Accept: application/json
Authorization: Bearer API_KEY
Response

Structure
{
code: "Integer",
message: "String",
data: {
listing_item_list: [
{
listing_id: "Integer",
domain: "String",
price: "String",
in_bound_links: "Integer",
age: "Integer",
is_pending_sale_locked: "String"
}
]
}
}
GET_LISTING_ITEM Command
Support multi-thread
If calling the get_listing_item command, the following parameters should be included:
Request Parameters
Expand All
currency
String
Result Parameters
Expand All
listing_item
Object
Api Request and Header

Production

JSON
GET
https://api.dynadot.com/restful/v1/aftermarket/listings/{domain_name}
Accept: application/json
Authorization: Bearer API_KEY
Response

Structure
{
code: "Integer",
message: "String",
data: {
listing_item: {
listing_id: "Integer",
domain: "String",
price: "String",
in_bound_links: "Integer",
age: "Integer",
is_pending_sale_locked: "String"
}
}
}
BUY_IT_NOW Command
Support multi-thread
Require X-Signature
If calling the buy_it_now command, the following parameters should be included:
Request Parameters
Expand All
currency
String
Optional
Api Request and Header

Production

JSON
POST
https://api.dynadot.com/restful/v1/aftermarket/listings/{domain_name}/buy_it_now
Content-Type: application/json
Accept: application/json
Authorization: Bearer API_KEY
X-Signature: {signature}
Request Body
{
currency: "String"
}
Response

Structure
{
code: "Integer",
message: "String"
}
BUY_EXPIRED_CLOSEOUT_DOMAIN Command
Support multi-thread
Require X-Signature
If calling the buy_expired_closeout_domain command, the following parameters should be included:
Request Parameters
Expand All
currency
String
Optional
Api Request and Header

Production

JSON
POST
https://api.dynadot.com/restful/v1/aftermarket/expired_closeouts/{domain_name}/purchase
Content-Type: application/json
Accept: application/json
Authorization: Bearer API_KEY
X-Signature: {signature}
Request Body
{
currency: "String"
}
Response

Structure
{
code: "Integer",
message: "String"
}
BACKORDER_REQUEST_LIST Command
Support multi-thread
If calling the backorder_request_list command, the following parameters should be included:
Request Parameters
Expand All
start_time
Long
end_time
Long
Result Parameters
Expand All
backorder_request_list
List
Api Request and Header

Production

JSON
GET
https://api.dynadot.com/restful/v1/aftermarket/backorders/requests
Accept: application/json
Authorization: Bearer API_KEY
Response

Structure
{
code: "Integer",
message: "String",
data: {
backorder_request_list: [
{
domain_name: "String",
cut_off_time: "Long",
backorder_request_status: "String"
}
]
}
}
ADD_BACKORDER_REQUEST Command
Support multi-thread
Require X-Signature
If calling the add_backorder_request command, the following parameters should be included:
Request Parameters
Expand All
Api Request and Header

Production

JSON
POST
https://api.dynadot.com/restful/v1/aftermarket/backorders/requests/{domain_name}
Content-Type: application/json
Accept: application/json
Authorization: Bearer API_KEY
X-Signature: {signature}
Request Body
{}
Response

Structure
{
code: "Integer",
message: "String"
}
DELETE_BACKORDER_REQUEST Command
Support multi-thread
Require X-Signature
If calling the delete_backorder_request command, the following parameters should be included:
Request Parameters
Expand All
Api Request and Header

Production

JSON
DELETE
https://api.dynadot.com/restful/v1/aftermarket/backorders/requests/{domain_name}
Content-Type: application/json
Accept: application/json
Authorization: Bearer API_KEY
X-Signature: {signature}
Response

Structure
{
code: "Integer",
message: "String"
}
PLACE_AUCTION_BID Command
Support multi-thread
If calling the place_auction_bid command, the following parameters should be included:
Request Parameters
Expand All
currency
String
bid_amount
Double
is_backorder_auction
Boolean
Optional
Result Parameters
Expand All
auction_item_details
Object
Api Request and Header

Production

JSON
POST
https://api.dynadot.com/restful/v1/aftermarket/auctions/bids/{domain_name}
Content-Type: application/json
Accept: application/json
Authorization: Bearer API_KEY
Request Body
{
currency: "String",
bid_amount: 0,
is_backorder_auction: false
}
Response

Structure
{
code: "Integer",
message: "String"
}
GET_AUCTION_BIDS Command
Support multi-thread
If calling the get_auction_bids command, the following parameters should be included:
Request Parameters
Expand All
currency
String
Result Parameters
Expand All
auction_bid_details
List
Api Request and Header

Production

JSON
GET
https://api.dynadot.com/restful/v1/aftermarket/auctions/bids
Accept: application/json
Authorization: Bearer API_KEY
Response

Structure
{
code: "Integer",
message: "String",
data: {
auction_bid_details: [
{
bid_id: "Integer",
auction_id: "Integer",
account_id: "String",
domain: "String",
domain_utf: "String",
is_idn_domain: "String",
auction_type: "String",
current_bid: "String",
proxy_bid: "String",
bid_status: "String",
is_high_bidder: "String",
active_bidders: "Integer",
time_left: "String",
end_time: "String",
end_time_stamp: "Long"
}
]
}
}
GET_CLOSED_AUCTIONS Command
Support multi-thread
If calling the get_closed_auctions command, the following parameters should be included:
Request Parameters
Expand All
currency
String
start_time
Long
end_time
Long
Result Parameters
Expand All
closed_auction_list
List
Api Request and Header

Production

JSON
GET
https://api.dynadot.com/restful/v1/aftermarket/auctions/closed
Accept: application/json
Authorization: Bearer API_KEY
Response

Structure
{
code: "Integer",
message: "String",
data: {
ClosedAuctionList: [
{
auction_id: "Integer",
domain: "String",
auction_status: "String",
bid_price: "String",
bids: "String",
end_time: "String",
end_timestamp: "Long",
auction_won_status: "String",
your_high_bid: "String",
your_proxy_bid: "String"
}
]
}
}
GET_OPEN_AUCTIONS Command
Support multi-thread
If calling the get_open_auctions command, the following parameters should be included:
Request Parameters
Expand All
currency
String
auction_types
List
Optional
Result Parameters
Expand All
auction_detail_info_list
List
Api Request and Header

Production

JSON
GET
https://api.dynadot.com/restful/v1/aftermarket/auctions/open
Accept: application/json
Authorization: Bearer API_KEY
Response

Structure
{
code: "Integer",
message: "String",
data: {
auction_detail_info_list: [
{
auction_id: "Integer",
domain_name_utf: "String",
current_price: "String",
currency: "String",
bids: "Integer",
end_time_utc: "String",
end_time_stamp: "Integer",
revenue: "String",
revenue_currency: "String",
visitors: "Integer",
inbound_links: "Integer",
age: "Integer"
}
]
}
}
GET_AUCTION_DETAILS Command
Support multi-thread
If calling the get_auction_details command, the following parameters should be included:
Request Parameters
Expand All
currency
String
Result Parameters
Expand All
api_auction_item_details
Object
Api Request and Header

Production

JSON
GET
https://api.dynadot.com/restful/v1/aftermarket/auctions/{domain_name}
Accept: application/json
Authorization: Bearer API_KEY
Response

Structure
{
code: "Integer",
message: "String",
data: {
auction_item_details: {
auction_id: "Integer",
domain_name: "String",
utf_name: "String",
is_idn: "String",
auction_type: "String",
current_bid_price: "String",
accepted_bid_price: "String",
currency: "String",
is_high_bidder: "String",
bids: "Integer",
bidders: "Integer",
auction_status_id: "Integer",
time_left: "String",
start_time: "String",
end_time: "String",
revenue: "String",
visitors: "Long",
links: "String",
age: "Integer",
estibot_appraisal: "String",
auction_ended: "String",
customer_bided: "String",
customer_bid: "String",
customer_proxy_bid: "String",
is_premium: "String",
renewal_price: "String",
revenue_currency: "String",
start_price: "String",
bid_history_item_list: [
{
bidder_name: "String",
bid_price: "String",
currency: "String",
timestamp: "Long",
bid_status: "String",
is_proxy_auto_bid: "String"
}
],
auction_status_name: "String"
}
}
}
GET_WHOIS_STATS Command
Support multi-thread
If calling the get_whois_stats command, the following parameters should be included:
Request Parameters
Expand All
domain_name
String
date_type
String
Result Parameters
Expand All
stats
List
Api Request and Header

Production

JSON
GET
https://api.dynadot.com/restful/v1/aftermarket/whois_stats
Accept: application/json
Authorization: Bearer API_KEY
Response

Structure
{
code: "Integer",
message: "String",
data: {
stats: [
{
date: "String",
count: "Long"
}
]
}
}
GET_EXPIRED_CLOSEOUT_DOMAINS Command
Support multi-thread
If calling the get_expired_closeout_domains command, the following parameters should be included:
Request Parameters
Expand All
currency
String
Optional
page_num
Integer
Optional
page_size
Integer
Optional
Result Parameters
Expand All
closeout_item_list
List
Api Request and Header

Production

JSON
GET
https://api.dynadot.com/restful/v1/aftermarket/get_expired_closeout_domains
Accept: application/json
Authorization: Bearer API_KEY
Response

Structure
{
code: "Integer",
message: "String",
data: {
closeout_item_list: [
{
domain_name: "String",
domain_name_utf: "String",
current_price: "String",
is_idn: "String",
end_time_stamp: "Long",
renewal_price: "String",
expired_revenue: "String",
estibot_appraisal: "String",
inbound_links: "Integer",
monthly_visitors: "Integer",
currency: "String",
is_active: "String",
auction_id: "Integer",
closeout_id: "Integer",
age: "Integer",
current_price_usd: "Long",
price_usd: "Long",
seller_price: "Long",
registrar_account_id: "Integer",
order_status: "Integer"
}
]
}
}
TLD_GET_TLD_PRICE Command
Support multi-thread
Support API Sandbox
If calling the tld_get_tld_price command, the following parameters should be included:
Request Parameters
Expand All
currency
String
page_index
Integer
Optional
count_per_page
Integer
Optional
sort
String
Optional
show_multi_year
Boolean
Optional
Result Parameters
Expand All
page_index
Integer
count_per_page
Integer
sort
String
price_level
String
currency
String
show_multi_year_price
Boolean
tld_price_list
List
Api Request and Header

Production

JSON
GET
https://api.dynadot.com/restful/v1/tld/get_tld_price
Accept: application/json
Authorization: Bearer API_KEY
Response

Structure
{
code: "Integer",
message: "String",
data: {
page_index: "Integer",
count_per_page: "Integer",
sort: "String",
price_level: "String",
currency: "String",
show_multi_year_price: "String",
tldPriceList: [
{
tld: "String",
usage: "String",
priceUnit: "String",
allYearsRegisterPrice: [],
allYearsRenewPrice: [],
transferPrice: "String",
restorePrice: "String",
graceFeePrice: "String",
supportPrivacy: "String",
gracePeriodUnit: "String",
renewGracePeriod: "String",
restorePeriod: "String",
deleteGracePeriod: "String",
isIdn: "String",
restriction: "String",
onSale: "String"
}
]
}
}
GET_SITE_BUILDER Command
Support multi-thread
Require X-Signature
If calling the get_site_builder command, the following parameters should be included:
Request Parameters
Expand All
Result Parameters
Expand All
sitebuilder
Object
Api Request and Header

Production

JSON
GET
https://api.dynadot.com/restful/v1/sitebuilders/{domain_name}
Accept: application/json
Authorization: Bearer API_KEY
X-Signature: {signature}
Response

Structure
{
code: "Integer",
message: "String",
data: {
sitebuilder: {
domain_name: "String",
template: "String",
plan: "String",
is_published: "String",
last_update: "Long",
expiration: "Long",
site_url: "String"
}
}
}
LIST_SITE_BUILDER Command
Support multi-thread
Require X-Signature
If calling the list_site_builder command, the following parameters should be included:
Request Parameters
Expand All
Result Parameters
Expand All
sitebuilder_list
List
Api Request and Header

Production

JSON
GET
https://api.dynadot.com/restful/v1/sitebuilders
Accept: application/json
Authorization: Bearer API_KEY
X-Signature: {signature}
Response

Structure
{
code: "Integer",
message: "String",
data: {
sitebuilder_list: [
{
domain_name: "String",
template: "String",
plan: "String",
is_published: "String",
last_update: "Long",
expiration: "Long",
site_url: "String"
}
]
}
}
CREATE_SITE_BUILDER Command
Support multi-thread
Require X-Signature
If calling the create_site_builder command, the following parameters should be included:
Request Parameters
Expand All
set_domain_dns
Boolean
Optional
Result Parameters
Expand All
sitebuilder
Object
Api Request and Header

Production

JSON
POST
https://api.dynadot.com/restful/v1/sitebuilders/{domain_name}
Content-Type: application/json
Accept: application/json
Authorization: Bearer API_KEY
X-Signature: {signature}
Request Body
{
set_domain_dns: false
}
Response

Structure
{
code: "Integer",
message: "String",
data: {
sitebuilder: {
domain_name: "String",
template: "String",
plan: "String",
is_published: "String",
last_update: "Long",
expiration: "Long",
site_url: "String"
}
}
}
UPGRADE_SITE_BUILDER Command
Support multi-thread
Require X-Signature
If calling the upgrade_site_builder command, the following parameters should be included:
Request Parameters
Expand All
set_domain_dns
Boolean
Optional
Result Parameters
Expand All
sitebuilder
Object
Api Request and Header

Production

JSON
POST
https://api.dynadot.com/restful/v1/sitebuilders/{domain_name}/upgrade
Content-Type: application/json
Accept: application/json
Authorization: Bearer API_KEY
X-Signature: {signature}
Request Body
{
set_domain_dns: false
}
Response

Structure
{
code: "Integer",
message: "String",
data: {
sitebuilder: {
domain_name: "String",
template: "String",
plan: "String",
is_published: "String",
last_update: "Long",
expiration: "Long",
site_url: "String"
}
}
}
LIST_COUPONS Command
Support multi-thread
Support API Sandbox
If calling the list_coupons command, the following parameters should be included:
Request Parameters
Expand All
coupon_type
String
Result Parameters
Expand All
coupons
List
Api Request and Header

Production

JSON
GET
https://api.dynadot.com/restful/v1/orders/coupons
Accept: application/json
Authorization: Bearer API_KEY
Response

Structure
{
code: "Integer",
message: "String",
data: {
coupons: [
{
code: "String",
description: "String",
coupon_type: "String",
discount_type: "String",
discount_info: {
Percentage: "String"
},
restriction: {
price_levels: [
"String"
],
uses_per_account: "Integer",
uses_system_wide: "Integer",
uses_per_ip: "Integer",
items_per_account: "Integer",
items_system_wide: "Integer",
items_per_order: "Integer",
items_per_day: "Integer",
domain_duration_min: "Integer",
domain_duration_max: "Integer",
idn_restriction: "String",
tlds: [
"String"
],
currencies: [
"String"
]
},
start_date: "Long",
end_date: "Long"
}
]
}
}