'use strict';


const titlediagram = new LayersDiagram("titlediagram", "10vw", "30vw", "60vw", null, "vertical", false, false);
titlediagram.addComponent(false, "Layers.js", "showcase/title.png", 100);
titlediagram.addComponent(false, "About Layers.js", "showcase/description.png", 100);
titlediagram.addComponent(false, "menu", "showcase/menu.png", 110);

titlediagram.setLayers(["menu", "About Layers.js", "Layers.js"]);

titlediagram.makeDiagram(document.getElementById("titlespot"))

titlediagram.addComponentDescription("Layers.js", "Welcome to the Layers.js website. Hover over the title to reveal the about section and menu, or navigate the pages using the links below. <br/> <a style='color: darkblue;' href='/showcase.html'>Showcase</a> <a style='color: darkblue;' href='/example.html'>Examples</a> <a style='color: darkblue;' href='/api.html'>Documentation</a> <a style='color: darkblue;' href='https://github.com/csc309-winter-2022/js-library-wangni39' target='_blank'>Github</a>");
titlediagram.addComponentDescription("About Layers.js", "Layers.js is a javascript library that handles the creation of interactive vertical or horizontal layered diagrams. Such layered diagrams could be used in multiple settings including: a restuarant to allow customers to visualize and customize layered foods such as hamburgers before they order; a phone or other technology company that wants to demonstrate their product both as a whole and with an informative exploded view of its components; an educational setting that can use an interactive diagram to engage students; basically any situation that wants a layered and/or an exploded diagram!")

$("#titlediagram .diagram").children()[3].remove();
$("#titlediagram .diagram").children()[2].innerHTML = `<div class="buttonholder">
            <a href="/showcase.html" class="navbutton">Showcase</a>
            <a href="/example.html" class="navbutton">Examples</a>
            <a href="/api.html" class="navbutton">Documentation</a>
            <a href="https://github.com/Leyza/layers-js-library" target="_blank" class="navbutton">Github</a>
        </div >`;
