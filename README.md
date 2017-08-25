# 2D JavaScript Physics Engine

## How to contribute

Before contributing, please read through this document paying special attention to the style guide and conventions 
sections. Pull requests that do not conform to the style and convention standards laid out here will not be merged. 
All pull requests must also be associated with an issue. If you want to contribute something that is not currently 
slated as an issue, you must first create an issue so your pull request can be considered. A PR with 
no associated issue will not be merged. Once you have made a PR, request a review from one of the maintainers. 

## Building the project

To get started, ensure that you have [Node.js](https://nodejs.org/en/) installed. Then clone this repository and install the dependencies, like this:
```
npm install
```
Now, to build the single, browser-ready library, run the build task, like this:
```
npm run build
```
The library will be output as `build.js`. You can see a demo by starting a local web server (of any kind you like) and viewing the `test.html` file.

If you're working on some changes and re-running the build task over and over gets tedious, there is also a watch command which will watch for any changes you make and automatically run the build. Start it like this:

```
npm run watch
```

## Running the tests

This library uses the [Jest](https://facebook.github.io/jest/) library for testing. To run the tests:
```
npm run test
```
After the tests run, you will see a coverage report printed to the
screen and generated in the coverage/ folder.

## Style guide

### object and file styles
New files should be named according to the main object that they are associated with. File and object names should both 
be capitalized and use camel-case. Objects should use a builder-style of construction (see conventions below) where functions 
that set properties are named `withPropertyName()`.

### function styles
Every function should have a comment associated with it that defines the input, output and description in the format:
```
/*
INPUT: <my input type>
OUTPUT: <my output type>
<my description>
*/
```
The description should be thorough but not unecessarily verbose; two sentences long at maximum. If the description needs 
to be longer, it might be a hint that the function should be broken up. A function that only returns or sets a value may 
not need comments.

### comment styles
Comments shouldn't be superfluous but always err on the side of more detailed comments. In-line comments should only be 
used when there is a particularly complex bit of logic. Comments should be grammatically correct and not contain spelling errors. 
Comments above functions and classes should be block-style.

## Conventions

### objects
To allow member functions to access the instance they are associated with, the parent object should contain 
a variable called 'self': `var self = this;`. In addition, builder member functions should appear after all other 
functions along with any other 'boilerplate' functions.

### builders
Most objects use a builder-style construction where new objects are initialized with a string of method calls 
in the format: `var obj = new Object().withProperty(arg).withFlag();` The reasoning behind this approach is 
that it keeps the format extensible and allows easy addition and deprecation of features without invalidating past 
releases. The exceptions to this rule are objects that require certain data. In these cases, it doesn't make sense 
to allow users to build them without required arguments and inserting default arguments could become problematic. 
A built object constructor should end with the line `return this;` and each `withProperty()` functions should 
return self. This allows the functions to be called successively.
