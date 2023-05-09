# Implementation of Entity Recognition API Using Azure Cognitive Services

## Description
The API serves as an intermediary between the Client and Azure Cognitive Service for Language. It operates as a RESTful API that utilizes HTTP requests for both data retrieval and submission.

---
<a href="http://159.65.233.166:3000/">![](https://img.shields.io/badge/QuickLinks-Demo-blue)</a>

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
  - Entity Linking - Identifies and disambiguates the identity of entities found in text. For example, in the sentence "We went to Seattle last week.", the word "Seattle" would be identified, with a link to more information on Wikipedia.
  - Personally Identifiable Information (PII) Detection - Identify, categorize, and redact sensitive information in unstructured text. For example: phone numbers, email addresses, and forms of identification.
  
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



| Endpoint           | Description                                                             |
| ------------------ | ----------------------------------------------------------------------- |
| `GET /entity/named/languages`   | Returns the list of languages supported by Named Entity Recognition                     |
