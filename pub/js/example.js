"use strict"

const newdiagram = new LayersDiagram("testdiagram", "40vw", "10vw", "50vw");
newdiagram.makeDiagram(document.getElementById("fordiagram"));

//newdiagram.addComponent(true, "tbun", "images/bottom_bun.png");
newdiagram.addComponent(true, "tbun", "images/top_bun.png");
newdiagram.addComponent(true, "bbun", "images/bottom_bun.png", 60);
newdiagram.addComponent(true, "patty", "images/patty.png", 60);
newdiagram.addComponent(true, "lettuce", "images/lettuce.png", 75);
newdiagram.addComponent(true, "tomato", "images/tomato.png", 70);
newdiagram.addComponent(true, "onions", "images/onions.png", 80);

newdiagram.addLayer("bbun");
newdiagram.addLayer("patty");
newdiagram.addLayer("lettuce");
newdiagram.addLayer("tbun");

newdiagram.addComponentDescription("patty", "A very juicy 100% premium beef patty with 20% fat and 80% lean and smoked to perfection then charred on the grill.");
newdiagram.addComponentDescription("tbun", "Pillowy bun sprinkled with sesame seeds.");
newdiagram.addComponentDescription("tomato", "Two sweet 1cm thick slices of organic tomatoes from the local farm.");
