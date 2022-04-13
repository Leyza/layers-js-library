"use strict"


function generateBurgerComponents(diagram) {
    diagram.addComponent(true, "top bun", "images/top_bun.png");
    diagram.addComponent(true, "bottom bun", "images/bottom_bun.png", 60);
    diagram.addComponent(true, "patty", "images/patty.png", 60);
    diagram.addComponent(true, "cheese", "images/cheese.png", 60, 30);
    diagram.addComponent(true, "lettuce", "images/lettuce.png", 75);
    diagram.addComponent(true, "tomato", "images/tomato.png", 70);
    diagram.addComponent(true, "onions", "images/onions.png", 80);

    diagram.setLayers(["bottom bun", "patty", "lettuce", "tomato", "top bun"]);

    diagram.addComponentDescription("patty", "100% premium beef patty smoked to perfection then charred on the grill.");
    diagram.addComponentDescription("top bun", "Soft bun sprinkled with sesame seeds and freshly baked every morning.");
    diagram.addComponentDescription("bottom bun", "Soft bun freshly baked every morning.");
    diagram.addComponentDescription("tomato", "Two sweet 1cm thick slices of organic tomatoes from the local farm.");
    diagram.addComponentDescription("lettuce", "Fresh leaves of lettuce.");
    diagram.addComponentDescription("cheese", "A slice of melted swiss cheese.");
    diagram.addComponentDescription("onions", "A few slices of fresh red onions.");

    document.getElementById("verticalsamplejs").innerHTML += `
    diagram.addComponent(putInSidebar=<span class="keyword">true</span>, name=<span class="string">"top bun"</span>, image=<span class="string">"images/top_bun.png"</span>);
    diagram.addComponent(putInSidebar=<span class="keyword">true</span>, name=<span class="string">"bottom bun"</span>,  image=<span class="string">"images/bottom_bun.png"</span>, overlap=<span class="keyword">60</span>);
    diagram.addComponent(putInSidebar=<span class="keyword">true</span>, name=<span class="string">"patty"</span>, image=<span class="string">"images/patty.png"</span>, overlap=<span class="keyword">60</span>);
    diagram.addComponent(putInSidebar=<span class="keyword">true</span>, name=<span class="string">"cheese"</span>, image=<span class="string">"images/cheese.png"</span>, overlap=<span class="keyword">60</span>, start=<span class="keyword">30</span>);
    diagram.addComponent(putInSidebar=<span class="keyword">true</span>, name=<span class="string">"lettuce"</span>, image=<span class="string">"images/lettuce.png"</span>, overlap=<span class="keyword">75</span>);
    diagram.addComponent(putInSidebar=<span class="keyword">true</span>, name=<span class="string">"tomato"</span>, image=<span class="string">"images/tomato.png"</span>, overlap=<span class="keyword">70</span>);
    diagram.addComponent(putInSidebar=<span class="keyword">true</span>, name=<span class="string">"onions"</span>, image=<span class="string">"images/onions.png"</span>, overlap=<span class="keyword">80</span>);

    diagram.addLayer(<span class="string">"bottom bun"</span>);
    diagram.addLayer(<span class="string">"patty"</span>);
    diagram.addLayer(<span class="string">"lettuce"</span>);
    diagram.addLayer(<span class="string">"tomato"</span>);
    diagram.addLayer(<span class="string">"top bun"</span>);

    diagram.addComponentDescription(<span class="string">"patty"</span>, <span class="string">"100% premium beef patty smoked to perfection then charred on the grill."</span>);
    diagram.addComponentDescription(<span class="string">"top bun"</span>, <span class="string">"Soft bun sprinkled with sesame seeds and freshly baked every morning."</span>);
    diagram.addComponentDescription(<span class="string">"bottom bun"</span>, <span class="string">"Soft bun freshly baked every morning."</span>);
    diagram.addComponentDescription(<span class="string">"tomato"</span>, <span class="string">"Two sweet 1cm thick slices of organic tomatoes from the local farm."</span>);
    diagram.addComponentDescription(<span class="string">"lettuce"</span>, <span class="string">"Fresh leaves of lettuce."</span>);
    diagram.addComponentDescription(<span class="string">"cheese"</span>, <span class="string">"A slice of melted swiss cheese."</span>);
    diagram.addComponentDescription(<span class="string">"onions"</span>, <span class="string">"A few slices of fresh red onions."</span>);
    `
}

function generatePhoneComponents(diagram) {
    diagram.addComponent(true, "phone case", "images/phonecase.png", 100);
    diagram.addComponent(true, "battery", "images/phonebattery.png", 100, 0, 90, "center");
    diagram.addComponent(true, "phone screen", "images/phonescreen.png", 100);
    diagram.addComponent(true, "audio jack", "images/phoneaudiojack.png", 100, 0, 50, "left");

    diagram.addLayer("phone case");
    diagram.addLayer("audio jack");
    diagram.addLayer("battery");
    diagram.addLayer("phone screen");

    diagram.addComponentDescription("audio jack", "6.35mm phone audio jack.");
    diagram.addComponentDescription("battery", "Lithium ion battery that takes 2 hours to charge and can last a whopping 10 minutes!");
    diagram.addComponentDescription("phone screen", "Bullet proof glass.\n\n\n\n\n Just kidding. \n\n\n\n\n\n You shattered it already didn't you? \n\n\n\n\n\n Thanks for paying more money to replace it :)");
    diagram.addComponentDescription("phone case", "Normal phone case.");

    document.getElementById("verticalsamplejs").innerHTML += `
    diagram.addComponent(putInSidebar=<span class="keyword">true</span>, name=<span class="string">"phone case"</span>, image=<span class="string">"images/phonecase.png"</span>, overlap=<span class="keyword">100</span>);
    diagram.addComponent(putInSidebar=<span class="keyword">true</span>, name=<span class="string">"battery"</span>, image=<span class="string">"images/phonebattery.png"</span>, overlap=<span class="keyword">100</span>, 
                            start=<span class="keyword">0</span>, size=<span class="keyword">90</span>, alignment=<span class="string">"center"</span>);
    diagram.addComponent(putInSidebar=<span class="keyword">true</span>, name=<span class="string">"phone screen"</span>, image=<span class="string">"images/phonescreen.png"</span>, overlap=<span class="keyword">100</span>);
    diagram.addComponent(putInSidebar=<span class="keyword">true</span>, name=<span class="string">"audio jack"</span>, image=<span class="string">"images/phoneaudiojack.png"</span>, overlap=<span class="keyword">100</span>, 
                            start=<span class="keyword">0</span>, size=<span class="keyword">50</span>, alignment=<span class="string">"left"</span>);

    diagram.addLayer(<span class="string">"phone case"</span>);
    diagram.addLayer(<span class="string">"audio jack"</span>);
    diagram.addLayer(<span class="string">"battery"</span>);
    diagram.addLayer(<span class="string">"phone screen"</span>);

    diagram.addComponentDescription(<span class="string">"audio jack"</span>, <span class="string">"6.35mm phone audio jack."</span>);
    diagram.addComponentDescription(<span class="string">"battery"</span>, <span class="string">"Lithium ion battery that takes 2 hours to charge and can last a whopping 10 minutes!"</span>);
    diagram.addComponentDescription(<span class="string">"phone screen"</span>, <span class="string">"Bullet proof glass.\\n\\n\\n\\n\\n Just kidding. \\n\\n\\n\\n\\n\\n 
                                You shattered it already didn't you? \\n\\n\\n\\n\\n\\n Thanks for paying more money to replace it :)"</span>);
    diagram.addComponentDescription(<span class="string">"phone case"</span>, <span class="string">"Normal phone case."</span>);
    `
}

function generateDiagram(sample, edit, height, layers) {
    const allowEdit = edit == "yes";
    const maxHeight = (height == 'no limit') ? null : height;
    const maxLayers = (layers == 'no limit') ? Infinity : parseInt(layers);

    const diagram = new LayersDiagram("samplediagram", "10vw", "30vw", "30vw", maxHeight, allowEdit, maxLayers);
    diagram.makeDiagram(document.getElementById("verticaldiagramspot"));

    document.getElementById("verticalsamplehtml").innerHTML = `<span class="keyword"><</span> <span class="keyword">div</span> id=<span class="string">"verticaldiagramspot"</span> <span class="keyword">></span> <span class="keyword"><</span> <span class="keyword">/div</span> <span class="keyword">></span>`;

    const heightCode = (maxHeight == null) ? `<span class="keyword">${maxHeight}</span>` : `<span class="string">"${maxHeight}"</span>`;
    document.getElementById("verticalsamplejs").innerHTML = `
    <span class="keyword">const</span> diagram = <span class="keyword">new</span> LayersDiagram(id=<span class="string">"samplediagram"</span>, sidebarwidth=<span class="string">"10vw"</span>, sidebarheight=<span class="string">"30vw"</span>, diagramwidth=<span class="string">"30vw"</span>,
                    diagramheight=${heightCode}, allowEdit=<span class="keyword">${allowEdit}</span>, layerlimit=<span class="keyword">${maxLayers}</span>);
    diagram.makeDiagram(document.getElementById(<span class="string">"verticaldiagramspot"</span>));
    `

    if (sample == "Hamburger") {
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

    let desc1 = `The following diagram shows a <strong>${sample}.</strong> `
    let desc2 = (allowEdit == "yes") ? "This diagram <strong>can be manipulated</strong> by the user. " : "This diagram <strong>does not allow user modifications.</strong> ";
    let desc3 = (height == "no limit") ? `This diagram has <strong>no height limit</strong>, ` : `This diagram has a <strong>height limit of ${height}</strong>, `;
    let desc4 = (layers == "no limit") ? "and there is <strong>no limit to the number of layers</strong> allowed." : `and the <strong>maximum number of layers allowed is ${layers}</strong>`;

    document.getElementById("verticaldiagramspot").innerHTML = '';

    document.getElementById("verticaldiagramdescription").innerHTML = desc1 + desc2 + desc3 + desc4;
    generateDiagram(sample, allowEdit, height, layers);
}

window.onload = loadverticalexample;
