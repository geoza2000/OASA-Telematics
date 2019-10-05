[![Build Status](https://travis-ci.org/geoza2000/OASA-Telematics.png?branch=master)](https://travis-ci.org/geoza2000/OASA-Telematics)
[![GPLv3 license](https://img.shields.io/badge/License-GPLv3-blue.svg)](http://perso.crans.org/besson/LICENSE.html)

# OASA Telematics 
## Description
This is an API helping me and you implementing the OASA API in a more normal way by parsing a mesh of data.

Public URL: api.oasa-telematics.com/v1/

__WARNING: The API is not ready yet so some endpoints may be missing.__

## Getting started

### Prerequisite
 - npm [https://www.npmjs.com/get-npm]
     - nodemon [https://nodemon.io] _For the dev enviroment only_

### Installing
To be fair, it should be easy to use.

First, clone this project
```
git clone https://github.com/geoza2000/OASA-Telematics.git
```
Then get inside the project directory
```
cd OASA-Telemeatics
```
Install things
```
npm i
```
Finally, run it
```
npm start
``` 

### Development enviroment
If you want to develop on the appication you can run the "dev" script.

First you need to install the nodemon tool _(please install it globally so doen't mess with project package)_
```
npm i -g nodemon
```
Then run the dev enviroment
```
npm run dev
```