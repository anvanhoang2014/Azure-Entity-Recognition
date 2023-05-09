# Entity Recognition API Using Azure Cognitive Services


## Description
The API serves as an intermediary between the Client and Azure Cognitive Service for Language. It operates as a RESTful API that utilizes HTTP requests for both data retrieval and submission.

---

## Quick Links
- [x] [Working Application](http://159.65.233.166:3000/)
- [x] [API Playground (Swagger)](http://159.65.233.166:3000/api-docs/)

---

## Demo

#### Working Application
<img src="demo/app-demo.gif"> 

#### API Playground (Swagger)
<img src="demo/swagger-demo.gif"> 
  
---
  
## Table of Contents
  

---

## Features
| Features                    | Description                                                             |
| --------------------------- | ----------------------------------------------------------------------- |
| Named Entity Recognition   |  Identify and categorize entities in unstructured text. For example: people, places, organizations, and quantities  |
| Entity Linking   | Identifies and disambiguates the identity of entities found in text. For example, in the sentence "Hi, I'm Bill Gates", the words "Bill Gates" would be identified, with a link to more information on Wikipedia  |
| PII Detection   |   Identify, categorize, and redact sensitive information in unstructured text. For example: phone numbers, email addresses, and forms of identification  |
| Language Detection   |   Automatically detect the user's language when performing the above features |
  
  
 ## Getting Started

---

#### For the program, you will need the following dependencies:

- [x] [Git](https://github.com/git-guides/install-git)
- [x] [Node.js](https://nodejs.dev/en/learn/how-to-install-nodejs/)
- [x] [Azure Cognitive Services (API Key and Endpoint)](https://learn.microsoft.com/en-us/azure/cognitive-services/cognitive-services-apis-create-account?tabs=multiservice%2Canomaly-detector%2Clanguage-service%2Ccomputer-vision%2Cwindows)

#### To run the program, follow these steps:

1. Clone the repo and navigate to it.
2. Run "npm install".
3. Set up environment variables in the `config` folder. Create a `.env` file and add the following as `key=value`:
```bash
HOST = Your Host Address
PORT = Port Number # (ex: 3000)
ENDPOINT = API ENDPOINT #ENDPOINT address from Azure Cognitive Services
TEXT_ANALYTICS_API_KEY = API KEY #API key from Azure Cognitive Services
```
4. Run "npm start".
---
  
## Endpoints
---

<img src="demo/app-demo.gif"> 

### Working Application Endpoints


| Endpoint           | Description                                                             |
| ------------------ | ----------------------------------------------------------------------- |
| `POST /entity/named`   |   Performs Named Entity Recognition for the provided text                   |
| `GET /entity/named/languages`   | Returns the list of languages supported by Named Entity Recognition                     |
| `POST /entity/linking`   |   Performs Entity Linking for the provided text                   |
| `GET /entity/linking/languages`   | Returns the list of languages supported by Entity Linking                     |
| `POST /entity/pii`   |   Performs Personally Identifiable Information (PII) detection for the provided text      |
| `GET /entity/pii/languages`   | Returns the list of languages supported by PII                    |
  
  
  
 ### API Endpoints - JSON response
| Endpoint           | Description                                                             |
| ------------------ | ----------------------------------------------------------------------- |
| `POST /api/named`   |   Performs Named Entity Recognition for the provided text                   |
| `GET /api/named/languages`   | Returns the list of languages supported by Named Entity Recognition                     |
| `POST /api/linking`   |   Performs Entity Linking for the provided text                   |
| `GET /api/linking/languages`   | Returns the list of languages supported by Entity Linking                     |
| `POST /api/pii`   |   Performs Personally Identifiable Information (PII) detection for the provided text      |
| `GET /api/pii/languages`   | Returns the list of languages supported by PII                    |
  
  
 ### Using the API
---

To use the API, send a POST request to the endpoint. The request body should be in JSON format and should contain the following field:
- [x] `sendText`: The text to used for recognition/detection

---

#### Example: POST /api/named

```json
{
  "sendText": "Hi, I'm Bill Gates"
}
```

#### Expected Response
```json
[
  {
    "id": "1",
    "warnings": [],
    "entities": [
      {
        "text": "Bill Gates",
        "category": "Person",
        "offset": 8,
        "length": 10,
        "confidenceScore": 1
      }
    ]
  }
]
```

---

#### Example: POST /api/linking

```json
{
  "sendText": "Hi, I'm Bill Gates"
}
```

#### Expected Response
```json
[
  {
    "id": "1",
    "warnings": [],
    "entities": [
      {
        "name": "Bill Gates",
        "matches": [
          {
            "confidenceScore": 0.14,
            "text": "Bill Gates",
            "offset": 8,
            "length": 10
          }
        ],
        "language": "en",
        "dataSourceEntityId": "Bill Gates",
        "url": "https://en.wikipedia.org/wiki/Bill_Gates",
        "dataSource": "Wikipedia",
        "bingEntitySearchApiId": "0d47c987-0042-5576-15e8-97af601614fa"
      }
    ]
  }
]
```

---

#### Example: POST /api/pii

```json
{
  "sendText": "Bill Gates' cell 9801234567"
}
```

#### Expected Response
```json
[
  {
    "id": "1",
    "warnings": [],
    "redactedText": "**********' cell **********",
    "entities": [
      {
        "text": "Bill Gates",
        "category": "Person",
        "offset": 0,
        "length": 10,
        "confidenceScore": 0.97
      },
      {
        "text": "9801234567",
        "category": "PhoneNumber",
        "offset": 17,
        "length": 10,
        "confidenceScore": 0.8
      }
    ]
  }
]
```