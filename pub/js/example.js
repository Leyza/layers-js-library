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

    diagram.addComponentDescription("patty", "100% premium beef patty smoked to perfection then charred on the grill. <img style='width: 90%;' src='images/ground_beef_nutrition.jfif'></img>");
    diagram.addComponentDescription("top bun", "Soft bun sprinkled with sesame seeds and freshly baked every morning.");
    diagram.addComponentDescription("bottom bun", "Soft bun freshly baked every morning.");
    diagram.addComponentDescription("tomato", "<img style='width: 90%;' src='images/whole_tomatoes.jpg'></img> Two sweet 1cm thick slices of organic tomatoes from the local farm.");
    diagram.addComponentDescription("lettuce", "Fresh leaves of lettuce.");
    diagram.addComponentDescription("cheese", "A slice of swiss cheese. <img style='width: 100%;' src='images/swiss_cheese_nutrition.jpg'></img>");
    diagram.addComponentDescription("onions", "A few slices of fresh red onions.");

    document.getElementById("verticalsamplejs").innerHTML += `
        diagram.addComponent(<span class="keyword">true</span>, <span class="string">"top bun"</span>, <span class="string">"images/top_bun.png"</span>);
        diagram.addComponent(<span class="keyword">true</span>, <span class="string">"bottom bun"</span>,  <span class="string">"images/bottom_bun.png"</span>, <span class="keyword">60</span>);
        diagram.addComponent(<span class="keyword">true</span>, <span class="string">"patty"</span>, <span class="string">"images/patty.png"</span>, <span class="keyword">60</span>);
        diagram.addComponent(<span class="keyword">true</span>, <span class="string">"cheese"</span>, <span class="string">"images/cheese.png"</span>, <span class="keyword">60</span>, <span class="keyword">30</span>);
        diagram.addComponent(<span class="keyword">true</span>, <span class="string">"lettuce"</span>, <span class="string">"images/lettuce.png"</span>, <span class="keyword">75</span>);
        diagram.addComponent(<span class="keyword">true</span>, <span class="string">"tomato"</span>, <span class="string">"images/tomato.png"</span>, <span class="keyword">70</span>);
        diagram.addComponent(<span class="keyword">true</span>, <span class="string">"onions"</span>, <span class="string">"images/onions.png"</span>, <span class="keyword">80</span>);

        diagram.setLayers([<span class="string">"bottom bun"</span>, <span class="string">"patty"</span>, <span class="string">"lettuce"</span>, <span class="string">"tomato"</span>, <span class="string">"top bun"</span>]);

        diagram.addComponentDescription(<span class="string">"patty"</span>, <span class="string">"100% premium beef patty smoked to perfection then charred on the grill. &lt;img style='width: 90%;' src='images/ground_beef_nutrition.jfif'&gt;&lt;/img&gt;"</span>);
        diagram.addComponentDescription(<span class="string">"top bun"</span>, <span class="string">"Soft bun sprinkled with sesame seeds and freshly baked every morning."</span>);
        diagram.addComponentDescription(<span class="string">"bottom bun"</span>, <span class="string">"Soft bun freshly baked every morning."</span>);
        diagram.addComponentDescription(<span class="string">"tomato"</span>, <span class="string">"&lt;img style='width: 90%;' src='images/whole_tomatoes.jpg'&gt;&lt;/img&gt; Two sweet 1cm thick slices of organic tomatoes from the local farm."</span>);
        diagram.addComponentDescription(<span class="string">"lettuce"</span>, <span class="string">"Fresh leaves of lettuce."</span>);
        diagram.addComponentDescription(<span class="string">"cheese"</span>, <span class="string">"A slice of swiss cheese. &lt;img style='width: 100%;' src='images/swiss_cheese_nutrition.jpg'&gt;&lt;/img&gt;"</span>);
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

    diagram.addComponentDescription("audio jack", "3.5mm phone audio jack.");
    diagram.addComponentDescription("battery", "Lithium ion battery that takes 2 hours to charge and can last a whopping 10 minutes!");
    diagram.addComponentDescription("phone screen", "Bullet proof glass. <br/><br/><br/><br/><br/> Just kidding. <br/><br/><br/><br/><br/> You shattered it already didn't you? <br/><br/><br/><br/><br/> Thanks for paying more money to replace it :)");
    diagram.addComponentDescription("phone case", "Normal phone case.");

    document.getElementById("verticalsamplejs").innerHTML += `
        diagram.addComponent(<span class="keyword">true</span>, <span class="string">"phone case"</span>, <span class="string">"images/phonecase.png"</span>, <span class="keyword">100</span>);
        diagram.addComponent(<span class="keyword">true</span>, <span class="string">"battery"</span>, <span class="string">"images/phonebattery.png"</span>, <span class="keyword">100</span>, <span class="keyword">0</span>, <span class="keyword">90</span>, <span class="string">"center"</span>);
        diagram.addComponent(<span class="keyword">true</span>, <span class="string">"phone screen"</span>, <span class="string">"images/phonescreen.png"</span>, <span class="keyword">100</span>);
        diagram.addComponent(<span class="keyword">true</span>, <span class="string">"audio jack"</span>, <span class="string">"images/phoneaudiojack.png"</span>, <span class="keyword">100</span>, <span class="keyword">0</span>, <span class="keyword">50</span>, <span class="string">"left"</span>);

        diagram.addLayer(<span class="string">"phone case"</span>);
        diagram.addLayer(<span class="string">"audio jack"</span>);
        diagram.addLayer(<span class="string">"battery"</span>);
        diagram.addLayer(<span class="string">"phone screen"</span>);

        diagram.addComponentDescription(<span class="string">"audio jack"</span>, <span class="string">"3.5mm phone audio jack."</span>);
        diagram.addComponentDescription(<span class="string">"battery"</span>, <span class="string">"Lithium ion battery that takes 2 hours to charge and can last a whopping 10 minutes!"</span>);
        diagram.addComponentDescription(<span class="string">"phone screen"</span>, <span class="string">"Bullet proof glass. <span class="keyword">&lt;br/&gt;</span> Just kidding. <span class="keyword">&lt;br/&gt;</span> You shattered it already didn't you? <span class="keyword">&lt;br/&gt;</span> Thanks for paying more money to replace it :)"</span>);
        diagram.addComponentDescription(<span class="string">"phone case"</span>, <span class="string">"Normal phone case."</span>);
    `
}

function generateFlowerComponents(diagram, orientation) {
    if (orientation === "vertical") {
        diagram.addComponent(true, "ceramic flowerpot", "images/flowerpot.png", 30);
        diagram.addComponent(true, "pink flowers", "images/pink_flowers.png", 90, 10);
        diagram.addComponent(true, "pink tulip", "images/pink_rose.png", 100, 0, 50, 50);
        diagram.addComponent(true, "red roses", "images/red_roses.png", 100, 0, 50);
        diagram.addComponent(true, "sunflower", "images/sunflower.png", 100, 0, 80, "left");
        diagram.addComponent(true, "small tree", "images/small_tree.png", 100);

        document.getElementById("verticalsamplejs").innerHTML += `
        diagram.addComponent(<span class="keyword">true</span>, <span class="string">"ceramic flowerpot"</span>, <span class="string">"images/flowerpot.png"</span>, <span class="keyword">30</span>);
        diagram.addComponent(<span class="keyword">true</span>, <span class="string">"pink flowers"</span>, <span class="string">"images/pink_flowers.png"</span>, <span class="keyword">90</span>, <span class="keyword">10</span>);
        diagram.addComponent(<span class="keyword">true</span>, <span class="string">"pink tulip"</span>, <span class="string">"images/pink_rose.png"</span>, <span class="keyword">100</span>, <span class="keyword">0</span>, <span class="keyword">50</span>, <span class="keyword">50</span>);
        diagram.addComponent(<span class="keyword">true</span>, <span class="string">"red roses"</span>, <span class="string">"images/red_roses.png"</span>, <span class="keyword">100</span>, <span class="keyword">0</span>, <span class="keyword">50</span>);    
        diagram.addComponent(<span class="keyword">true</span>, <span class="string">"sunflower"</span>, <span class="string">"images/sunflower.png"</span>, <span class="keyword">100</span>, <span class="keyword">0</span>, <span class="keyword">80</span>, <span class="string">"left"</span>);
        diagram.addComponent(<span class="keyword">true</span>, <span class="string">"small tree"</span>, <span class="string">"images/small_tree.png"</span>, <span class="keyword">100</span>);
    `

    } else {
        diagram.addComponent(true, "ceramic flowerpot", "images/flowerpot.png", 100, 0, 50, "bottom");
        diagram.addComponent(true, "pink flowers", "images/pink_flowers.png", 90, 10, 80, "top");
        diagram.addComponent(true, "pink tulip", "images/pink_rose.png", 100, 0, 50, 17);
        diagram.addComponent(true, "red roses", "images/red_roses.png", 100, 0, 65, "top");
        diagram.addComponent(true, "sunflower", "images/sunflower.png", 100, 0, 50, 13);
        diagram.addComponent(true, "small tree", "images/small_tree.png", 100, 0, 62, "top");

        document.getElementById("horizontalsamplejs").innerHTML += `
        diagram.addComponent(<span class="keyword">true</span>, <span class="string">"ceramic flowerpot"</span>, <span class="string">"images/flowerpot.png"</span>, <span class="keyword">100</span>, <span class="keyword">0</span>, <span class="keyword">50</span>, <span class="string">"bottom"</span>);
        diagram.addComponent(<span class="keyword">true</span>, <span class="string">"pink flowers"</span>, <span class="string">"images/pink_flowers.png"</span>, <span class="keyword">90</span>, <span class="keyword">10</span>, <span class="keyword">80</span>, <span class="string">"top"</span>);
        diagram.addComponent(<span class="keyword">true</span>, <span class="string">"pink tulip"</span>, <span class="string">"images/pink_rose.png"</span>, <span class="keyword">100</span>, <span class="keyword">0</span>, <span class="keyword">50</span>, <span class="keyword">17</span>);
        diagram.addComponent(<span class="keyword">true</span>, <span class="string">"red roses"</span>, <span class="string">"images/red_roses.png"</span>, <span class="keyword">100</span>, <span class="keyword">0</span>, <span class="keyword">65</span>, <span class="string">"top"</span>);    
        diagram.addComponent(<span class="keyword">true</span>, <span class="string">"sunflower"</span>, <span class="string">"images/sunflower.png"</span>, <span class="keyword">100</span>, <span class="keyword">0</span>, <span class="keyword">50</span>, <span class="keyword">13</span>);
        diagram.addComponent(<span class="keyword">true</span>, <span class="string">"small tree"</span>, <span class="string">"images/small_tree.png"</span>, <span class="keyword">100</span>, <span class="keyword">0</span>, <span class="keyword">62</span>, <span class="string">"top"</span>);
    `
    }

    diagram.addLayer("ceramic flowerpot");

    diagram.addComponentDescription("ceramic flowerpot", "<img style='width: 90%;' src='images/making_clay_pot.jpg'></img> Hand crafted clay baked flower pot.");
    diagram.addComponentDescription("pink flowers", "Fresh bundle of sweet scented pink flowers.");
    diagram.addComponentDescription("pink tulip", "A single pink tulip.");
    diagram.addComponentDescription("red roses","A bundle of beautiful red roses. Perfect as a gift.");
    diagram.addComponentDescription("sunflower", "<img style='width: 90%;' src='images/sunflowers.jpg'></img> Vibrant yellow young sunflower.");
    diagram.addComponentDescription("small tree", "Lushious potted tree plant.");

    document.getElementById(orientation + "samplejs").innerHTML += `
        diagram.addLayer(<span class="string">"ceramic flowerpot"</span>);

        diagram.addComponentDescription(<span class="string">"ceramic flowerpot"</span>, <span class="string">"&lt;img style='width: 90%;' src='images/making_clay_pot.jpg'&gt;&lt;/img&gt; Hand crafted clay baked flower pot."</span>);
        diagram.addComponentDescription(<span class="string">"pink flowers"</span>, <span class="string">"Fresh bundle of sweet scented pink flowers."</span>);
        diagram.addComponentDescription(<span class="string">"pink tulip"</span>, <span class="string">"A single pink tulip."</span>);
        diagram.addComponentDescription(<span class="string">"red roses"</span>, <span class="string">"A bundle of beautiful red roses. Perfect as a gift."</span>);
        diagram.addComponentDescription(<span class="string">"sunflower"</span>, <span class="string">"&lt;img style='width: 90%;' src='images/sunflowers.jpg'&gt;&lt;/img&gt; Vibrant yellow young sunflower."</span>);
        diagram.addComponentDescription(<span class="string">"small tree"</span>, <span class="string">"Lushious potted tree plant."</span>);
    `

}

function generateSpeakerComponents(diagram) {
    diagram.addComponent(true, "grill mesh", "images/speaker1.png", 50);
    diagram.addComponent(true, "front cover", "images/speaker2.png", 98);
    diagram.addComponent(true, "speaker", "images/speaker3.png", 100, 0, 50);
    diagram.addComponent(true, "speaker cover", "images/speaker4.png", 90);
    diagram.addComponent(true, "back cover", "images/speaker5.png", 100);

    diagram.setLayers(["back cover", "speaker cover", "speaker", "front cover", "grill mesh"]);

    diagram.addComponentDescription("grill mesh", "7mm x 7mm aluminum speaker grill mesh.")
    diagram.addComponentDescription("speaker", "90dB speakers.");

    document.getElementById("horizontalsamplejs").innerHTML += `
        diagram.addComponent(<span class="keyword">true</span>, <span class="string">"grill mesh"</span>, <span class="string">"images/speaker1.png"</span>, <span class="keyword">50</span>);
        diagram.addComponent(<span class="keyword">true</span>, <span class="string">"front cover"</span>, <span class="string">"images/speaker2.png"</span>, <span class="keyword">98</span>);
        diagram.addComponent(<span class="keyword">true</span>, <span class="string">"speaker"</span>, <span class="string">"images/speaker3.png"</span>, <span class="keyword">100</span>, <span class="keyword">0</span>, <span class="keyword">50</span>);
        diagram.addComponent(<span class="keyword">true</span>, <span class="string">"speaker cover"</span>, <span class="string">"images/speaker4.png"</span>, <span class="keyword">90</span>);    
        diagram.addComponent(<span class="keyword">true</span>, <span class="string">"back cover"</span>, <span class="string">"images/speaker5.png"</span>, <span class="keyword">100</span>);

        diagram.setLayers([<span class="string">"back cover"</span>, <span class="string">"speaker cover"</span>, <span class="string">"speaker"</span>, <span class="string">"front cover"</span>, <span class="string">"grill mesh"</span>]);

        diagram.addComponentDescription(<span class="string">"grill mesh"</span>, <span class="string">"7mm x 7mm aluminum speaker grill mesh."</span>);
        diagram.addComponentDescription(<span class="string">"speaker"</span>, <span class="string">"90dB speakers."</span>);
    `
}

function generateDiagram(id, sample, edit, width, height, layers, orientation) {
    const allowEdit = edit == "yes";
    const maxWidth = (width == 'no limit') ? null : width;
    const maxHeight = (height == 'no limit') ? null : height;
    const maxLayers = (layers == 'no limit') ? Infinity : parseInt(layers);

    const diagram = new LayersDiagram(id, "10vw", "30vw", maxWidth, maxHeight, orientation, allowEdit, maxLayers);

    if (orientation == "vertical") {
        diagram.makeDiagram(document.getElementById("verticaldiagramspot"));

        document.getElementById("verticalsamplehtml").innerHTML = `
        &lt;<span class="keyword">div</span> <span class="string">"verticaldiagramspot"</span> &gt; &lt;<span class="keyword">/div</span>&gt;
        `;

        const heightCode = (maxHeight == null) ? `<span class="keyword">${maxHeight}</span>` : `<span class="string">"${maxHeight}"</span>`;
        document.getElementById("verticalsamplejs").innerHTML = `
        <span class="keyword">const</span> diagram = <span class="keyword">new</span> LayersDiagram(<span class="string">"samplediagram"</span>, <span class="string">"10vw"</span>, <span class="string">"30vw"</span>, <span class="string">"30vw"</span>, ${heightCode}, <span class="keyword">${allowEdit}</span>, <span class="keyword">${maxLayers}</span>);
        diagram.makeDiagram(document.getElementById(<span class="string">"verticaldiagramspot"</span>));
    `
    } else {
        diagram.makeDiagram(document.getElementById("horizontaldiagramspot"));

        document.getElementById("horizontalsamplehtml").innerHTML = `
        &lt;<span class="keyword">div</span> <span class="string">"horizontaldiagramspot"</span> &gt; &lt;<span class="keyword">/div</span>&gt;
        `;

        const widthCode = (maxWidth == null) ? `<span class="keyword">${maxWidth}</span>` : `<span class="string">"${maxWidth}"</span>`;
        document.getElementById("horizontalsamplejs").innerHTML = `
        <span class="keyword">const</span> diagram = <span class="keyword">new</span> LayersDiagram(<span class="string">"samplediagram"</span>, <span class="string">"10vw"</span>, <span class="string">"30vw"</span>, ${widthCode}, <span class="string">"36vw"</span>, <span class="keyword">${allowEdit}</span>, <span class="keyword">${maxLayers}</span>);
        diagram.makeDiagram(document.getElementById(<span class="string">"horizontaldiagramspot"</span>));
    `
    }

    if (sample == "Hamburger") {
        generateBurgerComponents(diagram);
    } else if (sample == "Phone") {
        generatePhoneComponents(diagram);
    } else if (sample == "Flowers") {
        generateFlowerComponents(diagram, orientation);
    }else if (sample == "Speaker") {
        generateSpeakerComponents(diagram);
    }
}

function loadverticalexample() {
    const sample = $('#verticalsampletype')[0].value;
    const allowEdit = $('#verticalallowedit')[0].value;
    const height = $('#verticallimitheight')[0].value;
    const layers = $('#verticallimitlayers')[0].value;

    let desc1 = `The following diagram shows a <strong>${sample}.</strong> `
    let desc2 = (allowEdit == "yes") ? "This diagram <strong>can be manipulated</strong> by the user. " : "This diagram <strong>does not allow user modifications.</strong> ";
    let desc3 = (height == "no limit") ? `This diagram has <strong>no height limit</strong>, ` : `This diagram has a <strong>height limit of ${height}</strong>, `;
    let desc4 = (layers == "no limit") ? "and there is <strong>no limit to the number of layers</strong> allowed." : `and the <strong>maximum number of layers allowed is ${layers}</strong>.`;

    document.getElementById("verticaldiagramspot").innerHTML = '';

    document.getElementById("verticaldiagramdescription").innerHTML = desc1 + desc2 + desc3 + desc4;
    generateDiagram("verticalsample", sample, allowEdit, "30vw", height, layers, "vertical");
}


function loadhorizontalexample() {
    const sample = $('#horizontalsampletype')[0].value;
    const allowEdit = $('#horizontalallowedit')[0].value;
    const width = $('#horizontallimitwidth')[0].value;
    const layers = $('#horizontallimitlayers')[0].value;

    let desc1 = `The following diagram shows a <strong>${sample}.</strong> `
    let desc2 = (allowEdit == "yes") ? "This diagram <strong>can be manipulated</strong> by the user. " : "This diagram <strong>does not allow user modifications.</strong> ";
    let desc3 = (width == "no limit") ? `This diagram has <strong>no width limit</strong>, ` : `This diagram has a <strong>width limit of ${width}</strong>, `;
    let desc4 = (layers == "no limit") ? "and there is <strong>no limit to the number of layers</strong> allowed." : `and the <strong>maximum number of layers allowed is ${layers}</strong>.`;

    document.getElementById("horizontaldiagramspot").innerHTML = '';

    document.getElementById("horizontaldiagramdescription").innerHTML = desc1 + desc2 + desc3 + desc4;
    generateDiagram("horizontalsample", sample, allowEdit, width, "36vw", layers, "horizontal");
}

window.onload = () => { loadverticalexample(); loadhorizontalexample(); };

