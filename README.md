# js-library-wangni39

## Landing Page

https://layers-js-library.herokuapp.com/

## Documentation 

https://layers-js-library.herokuapp.com/api.html

## Getting Started

To start using Layers.js, you must include <strong>layers.js</strong>, <strong>layers_style.css</strong>, and the <strong>jquery library</strong> in the head section of your html page using <strong>script defer</strong> as shown below.

```
<!DOCTYPE html>
<html</span> lang="en">
<head>
    <meta</span> charset="utf-8">
    <title>HTML page title</title>

    <link rel="stylesheet" type="text/css" href="layers_style.css">
    <script defer type="text/javascript" src="https://ajax.googleapis.com/ajax/libs/jquery/3.6.0/jquery.min.js"></script>
    <script defer type="text/javascript" src="js/layers.js"></script>
</head>
```

Now you're ready to start creating diagrams with layers.js! Use the code below to initialize a simple 30vw by 50vw vertical diagram with a 10 layer limit and draw it to the body. You can add your own images and customize your diagram from there. Example complete working implementations with code can be found on the examples page: https://layers-js-library.herokuapp.com/example.html.

```
const diagram = new LayersDiagram("newID", "10vw", "30vw", "30vw", "50vw", "vertical", true, true, 10);
diagram.makeDiagram();
```

## Running Locally
To run the app locally, use `npm start` or `node app.js` to start the express server.
