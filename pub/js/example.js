"use strict"

const newdiagram = new LayersDiagram("testdiagram", "40vw", "10vw", "50vw");
newdiagram.makeDiagram(document.getElementById("fordiagram"));

//newdiagram.addComponent(true, "tbun", "images/bottom_bun.png");
newdiagram.addComponent(true, "tbun", "images/top_bun.png");
newdiagram.addComponent(true, "bbun", "images/bottom_bun.png", 60);
newdiagram.addComponent(true, "patty", "images/patty.png", 60);
newdiagram.addComponent(true, "lettuce", "images/lettuce.png", 75);
newdiagram.addComponent(true, "cheese", "images/cheese.png", 70);

newdiagram.addLayer("bbun");
newdiagram.addLayer("patty");
newdiagram.addLayer("lettuce");
newdiagram.addLayer("tbun");

newdiagram.addComponentDescription("patty", "A very juicy 100% premium beef patty with 20% fat and 80% lean and smoked to perfection then grilled for char marks yes this sentence has no punctuation more text to fill up space whatever else there is to write blah blah blah")
