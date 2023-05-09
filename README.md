# Entity Recognition API Using Azure Cognitive Services

## Description
The API serves as an intermediary between the Client and Azure Cognitive Service for Language. It operates as a RESTful API that utilizes HTTP requests for both data retrieval and submission.

---

## Quick Links
- [x] [Working Application](http://159.65.233.166:3000/)

- [x] [API Playground (Swagger)](http://159.65.233.166:3000/api-docs/)

## Demo

---
<a href="">![](https://img.shields.io/badge/LiveDemo-POC-red)</a>

#### Working Application
<gif goes here>

#### API Playground (Swagger)

<gif goes here>

## Table of Contents
  
## Features
  - Named Entity Recognition (NER) - Identify and categorize entities in unstructured text. For example: people, places, organizations, and quantities.
  - Entity Linking - Identifies and disambiguates the identity of entities found in text. For example, in the sentence "Hi, I'm Bill Gates", the words "Bill Gates" would be identified, with a link to more information on Wikipedia.
  - Personally Identifiable Information (PII) Detection - Identify, categorize, and redact sensitive information in unstructured text. For example: phone numbers, email addresses, and forms of identification.
  
| Features           | Description                                                             |
| ------------------ | ----------------------------------------------------------------------- |
| `Named Entity Recognition (NER)`   |   Identify and categorize entities in unstructured text. For example: people, places, organizations, and quantities  |
| `Entity Linking`   | Identifies and disambiguates the identity of entities found in text. For example, in the sentence "Hi, I'm Bill Gates", the words "Bill Gates" would be identified, with a link to more information on Wikipedia  |
| `Personally Identifiable Information (PII) Detection`   |   Identify, categorize, and redact sensitive information in unstructured text. For example: phone numbers, email addresses, and forms of identification  |
  
 ## Getting Started

---
<a href="">![](https://img.shields.io/badge/GettingStarted-Setup-purple) </a>

### Dependencies

- [ ] Node.js
- [ ] Azure Cognitive Services (API Key and Endpoint)

### Running the program
```bash
git clone repo && cd repo
npm install
npm start
```
### Environment Variables
###### Inside the config folder, create a `.env` file and add the following as `key = value`

```bash
HOST = Your Host Address
PORT = Port Number (ex: 3000)
ENDPOINT = "<API ENDPOINT> # ENDPOINT address
TEXT_ANALYTICS_API_KEY = "<API KEY>" # API key
```
  
## Endpoints
---


### Working Application Endpoints
| Endpoint           | Description                                                             |
| ------------------ | ----------------------------------------------------------------------- |
| `POST /entity/named/result`   |   Performs Named Entity Recognition for the provided text                   |
| `GET /entity/named/languages`   | Returns the list of languages supported by Named Entity Recognition                     |
| `POST /entity/linking/result`   |   Performs Entity Linking for the provided text                   |
| `GET /entity/linking/languages`   | Returns the list of languages supported by Entity Linking                     |
| `POST /entity/pii/result`   |   Performs Personally Identifiable Information (PII) detection for the provided text      |
| `GET /entity/pii/languages`   | Returns the list of languages supported by PII                    |
  
  
  
  
 ### API - Endpoints for JSON response
| Endpoint           | Description                                                             |
| ------------------ | ----------------------------------------------------------------------- |
| `POST /api/named/result`   |   Performs Named Entity Recognition for the provided text                   |
| `GET /api/named/languages`   | Returns the list of languages supported by Named Entity Recognition                     |
| `POST /api/linking/result`   |   Performs Entity Linking for the provided text                   |
| `GET /api/linking/languages`   | Returns the list of languages supported by Entity Linking                     |
| `POST /api/pii/result`   |   Performs Personally Identifiable Information (PII) detection for the provided text      |
| `GET /api/pii/languages`   | Returns the list of languages supported by PII                    |
  
  
 ### Using the API (Example)
---

The API can be used by sending a POST request to the endpoint. The request body should be in JSON format and should contain the following fields:
- [ ] `sendText`: The text to used for recognition

### Example: POST /api/named/result

```json
{
  "sendText": "Hi, I'm Bill Gates"
}
```

### Example Response
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
