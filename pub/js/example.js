"use strict"


function d1() {
    // Growing burger diagram

    const diagram1 = new LayersDiagram("diagram1", "10vw", "30vw", "30vw", null, true, 10);
    diagram1.makeDiagram(document.getElementById("diagramspot"));

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
    diagram1.addComponentDescription("top bun", "Pillowy bun sprinkled with sesame seeds.");
    diagram1.addComponentDescription("tomato", "Two sweet 1cm thick slices of organic tomatoes from the local farm.");
    diagram1.addComponentDescription("cheese", "A slice of swiss cheese.");
}


function d2() {
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
    diagram2.addComponentDescription("phone screen", "Bullet proof glass.\n\n\n\n\n Just kidding. \n\n\n\n\n\n You shattered it already didn't you? \n\n\n\n\n\n Thanks for giving more money to replace it :)");

    diagram2.makeDiagram(document.getElementById("diagramspot"));
}


function d3() {
    // Overflow burger diagram
    const diagram3 = new LayersDiagram("diagram3", "10vw", "30vw", "30vw", "50vw");
    diagram3.makeDiagram(document.getElementById("diagramspot"));

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
    diagram3.addComponentDescription("top bun", "Pillowy bun sprinkled with sesame seeds.");
    diagram3.addComponentDescription("tomato", "Two sweet 1cm thick slices of organic tomatoes from the local farm.");
}

function generateBurgerComponents(diagram) {
    diagram.addComponent(true, "top bun", "images/top_bun.png");
    diagram.addComponent(true, "bottom bun", "images/bottom_bun.png", 60);
    diagram.addComponent(true, "patty", "images/patty.png", 60);
    diagram.addComponent(true, "cheese", "images/cheese.png", 60, 30);
    diagram.addComponent(true, "lettuce", "images/lettuce.png", 75);
    diagram.addComponent(true, "tomato", "images/tomato.png", 70);
    diagram.addComponent(true, "onions", "images/onions.png", 80);

    diagram.addLayer("bottom bun");
    diagram.addLayer("patty");
    diagram.addLayer("lettuce");
    diagram.addLayer("tomato");
    diagram.addLayer("top bun");

    diagram.addComponentDescription("patty", "100% premium beef patty smoked to perfection then charred on the grill.");
    diagram.addComponentDescription("top bun", "Soft bun sprinkled with sesame seeds and freshly baked every morning.");
    diagram.addComponentDescription("bottom bun", "Soft bun freshly baked every morning.");
    diagram.addComponentDescription("tomato", "Two sweet 1cm thick slices of organic tomatoes from the local farm.");
    diagram.addComponentDescription("lettuce", "Fresh leaves of lettuce.");
    diagram.addComponentDescription("cheese", "A slice of melted swiss cheese.");
    diagram.addComponentDescription("onions", "A few slices of fresh red onions.");
}

function generatePhoneComponents(diagram) {
    diagram.addComponent(true, "phone case", "images/phonecase.png", 100);
    diagram.addComponent(true, "battery", "images/phonebattery.png", 100);
    diagram.addComponent(true, "phone screen", "images/phonescreen.png");
    diagram.addComponent(true, "audio jack", "images/phoneaudiojack.png", 95);

    diagram.addLayer("phone case");
    diagram.addLayer("audio jack");
    diagram.addLayer("battery");
    diagram.addLayer("phone screen");

    diagram.addComponentDescription("audio jack", "6.35mm phone audio jack.");
    diagram.addComponentDescription("battery", "Lithium ion battery that takes 2 hours to charge and can last a whopping 10 minutes!");
    diagram.addComponentDescription("phone screen", "Bullet proof glass.\n\n\n\n\n Just kidding. \n\n\n\n\n\n You shattered it already didn't you? \n\n\n\n\n\n Thanks for giving more money to replace it :)");
    diagram.addComponentDescription("phone case", "Normal phone case.");
}

function generateDiagram(sample, edit, height, layers) {
    const allowEdit = edit == "yes";
    const maxHeight = (height == 'no limit') ? null : height;
    const maxLayers = (layers == 'no limit') ? Infinity : parseInt(layers);

    const diagram = new LayersDiagram("samplediagram", "10vw", "30vw", "30vw", maxHeight, allowEdit, maxLayers);
    diagram.makeDiagram(document.getElementById("verticaldiagramspot"));

    if (sample == "Hamburger Sample") {
        generateBurgerComponents(diagram);
    } else {
        generatePhoneComponents(diagram);
    }
}

function loadverticalexample() {
    const sample = $('#sampletype')[0].value;
    const allowEdit = $('#allowedit')[0].value;
    const height = $('#limitheight')[0].value;
    const layers = $('#limitlayers')[0].value;

    document.getElementById("verticaldiagramspot").innerHTML = '';

    generateDiagram(sample, allowEdit, height, layers);
}
