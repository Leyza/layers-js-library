"use strict"

// Growing burger diagram
const diagram1 = new LayersDiagram("diagram1", "10vw", "30vw", "30vw", null, true, 10);
diagram1.makeDiagram(document.getElementById("burderedit"));

diagram1.addComponent(true, "top bun", "images/top_bun.png");
diagram1.addComponent(true, "bottom bun", "images/bottom_bun.png", 60);
diagram1.addComponent(true, "patty", "images/patty.png", 60);
diagram1.addComponent(true, "cheese", "images/cheese.png", 60, 30);
diagram1.addComponent(true, "lettuce", "images/lettuce.png", 75);
diagram1.addComponent(true, "tomato", "images/tomato.png", 70);
diagram1.addComponent(true, "onions", "images/onions.png", 80);

diagram1.addLayer("bottom bun");
diagram1.addLayer("patty");
diagram1.addLayer("cheese");
diagram1.addLayer("lettuce");
diagram1.addLayer("top bun");

diagram1.addComponentDescription("patty", "A very juicy 100% premium beef patty with 20% fat and 80% lean and smoked to perfection then charred on the grill.");
diagram1.addComponentDescription("tbun", "Pillowy bun sprinkled with sesame seeds.");
diagram1.addComponentDescription("tomato", "Two sweet 1cm thick slices of organic tomatoes from the local farm.");

// Non-editable phone diagram
const diagram2 = new LayersDiagram("phonediagram", "10vw", "30vw", "50vw", null, false);
diagram2.addComponent(false, "phone case", "images/phonecase.png", 100);
diagram2.addComponent(true, "battery", "images/phonebattery.png", 100);
diagram2.addComponent(false, "phone screen", "images/phonescreen.png");
diagram2.addComponent(false, "audio jack", "images/phoneaudiojack.png", 95);

diagram2.addLayer("phone case");
diagram2.addLayer("audio jack");
diagram2.addLayer("battery");
diagram2.addLayer("phone screen");

diagram2.addComponentDescription("audio jack", "6.35mm phone audio jack.");
diagram2.addComponentDescription("battery", "Lithium ion battery that takes 2 hours to charge and can last a whopping 10minutes!");

diagram2.makeDiagram(document.getElementById("phonenoedit"));

// Overflow burger diagram
const diagram3 = new LayersDiagram("diagram3", "10vw", "30vw", "30vw", "50vw");
diagram3.makeDiagram(document.getElementById("burgerflex"));

diagram3.addComponent(true, "top bun", "images/top_bun.png");
diagram3.addComponent(true, "bottom bun", "images/bottom_bun.png", 60);
diagram3.addComponent(true, "patty", "images/patty.png", 60);
diagram3.addComponent(true, "cheese", "images/cheese.png", 60, 30);
diagram3.addComponent(true, "lettuce", "images/lettuce.png", 75);
diagram3.addComponent(true, "tomato", "images/tomato.png", 70);
diagram3.addComponent(true, "onions", "images/onions.png", 80);

diagram3.addLayer("bottom bun");
diagram3.addLayer("patty");
diagram3.addLayer("lettuce");
diagram3.addLayer("tomato");
diagram3.addLayer("top bun");

diagram3.addComponentDescription("patty", "A very juicy 100% premium beef patty with 20% fat and 80% lean and smoked to perfection then charred on the grill.");
diagram3.addComponentDescription("tbun", "Pillowy bun sprinkled with sesame seeds.");
diagram3.addComponentDescription("tomato", "Two sweet 1cm thick slices of organic tomatoes from the local farm.");
