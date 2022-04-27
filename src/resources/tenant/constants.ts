// element
export const div = document.createElement("div");

// regex

export const regexForEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
export const regexForName = /^[A-Za-z]{4,29}$/;
export const regexForDatabaseName = /^[A-Za-z]+-*[A-Za-z]{4,29}$/;
export const regexForDescription = /^[A-Za-z]*[\sA-Za-z]*$/;
export const regexForUser =
  /^[\dA-Za-z]([._-](?![._-])|[\dA-Za-z]){3,18}[\dA-Za-z]$/;
export const regForPassword = /^[\d!$%&*@A-Za-z]{8,15}$/;
export const requestUserListURL = `api/user?`;
export const requestTenantListUrlInactive = `api/tenants?isDeleted=true&`;
export const requestTenantListUrlActive = `api/tenants?isDeleted=false&`;
export const requestTenantListUrlAll = `api/tenants?`;
export const errorMsg = {
  "400": "Bad Request",
  "401": "Unauthorized",
  "402": "Payment Required",
  "403": "Forbidden Access",
  "404": "Not Found",
  "405": "Method Not Allowed",
  "406": "Not Acceptable",
  "407": "Proxy Authentication Required",
  "408": "Request Timeout",
  "409": "Conflict",
  "410": "Gone",
  "411": "Length Required",
  "412": "Precondition Failed",
  "413": "Payload Too Large",
  "414": "URI Too Long",
  "415": "Unsupported Media Type",
  "416": "Range Not Satisfiable",
  "417": "Expectation Failed",
  "418": "I'm a Teapot",
  "421": "Misdirected Request",
  "422": "Unprocessable Entity",
  "423": "Locked",
  "424": "Failed Dependency",
  "425": "Too Early",
  "426": "Upgrade Required",
  "428": "Precondition Required",
  "429": "Too Many Requests",
  "431": "Request Header Fields Too Large",
  "451": "Unavailable For Legal Reasons",
  "500": "Internal Server Error",
  "501": "Not Implemented",
  "502": "Bad Gateway",
  "503": "Service Unavailable",
  "504": "Gateway Timeout",
  "505": "HTTP Version Not Supported",
  "506": "Variant Also Negotiates",
  "507": "Insufficient Storage",
  "508": "Loop Detected",
  "510": "Not Extended",
  "511": "Network Authentication Required",
};
export const circle = `${process.env.REACT_APP_HOST}/global/images/dashboard/circle.svg`;