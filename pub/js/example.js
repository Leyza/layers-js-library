"use strict"

const newdiagram = new LayersDiagram("testdiagram", "40vw", "5vw", "30vw");
newdiagram.makeDiagram();

//newdiagram.addComponent(true, "tbun", "images/bottom_bun.png");
newdiagram.addComponent(true, "tbun", "images/top_bun.png");
newdiagram.addComponent(true, "bbun", "images/bottom_bun.png", 75);
newdiagram.addComponent(true, "patty", "images/patty.png", 55);
newdiagram.addComponent(true, "lettuce", "images/lettuce.png", 75);

newdiagram.addLayer("bbun");
newdiagram.addLayer("patty");
newdiagram.addLayer("lettuce");
newdiagram.addLayer("tbun");
