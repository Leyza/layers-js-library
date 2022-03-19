
function LayersDiagram(id, diagramwidth, sidebarwidth, sidebarheight, allowEdit = true) {
    this.id = id;
    this.diagramwidth = diagramwidth;
    this.sidebarwidth = sidebarwidth;
    this.sidebarheight = sidebarheight;

    this.layers = 0;
    this.layersOrder = [];
    this.components = {};
    this.allowEdit = allowEdit;
    this.sidebar = [];
}

LayersDiagram.prototype = {
    makeDiagram: function () {
        // Draw the diagram

        const layersdiagram = document.createElement("div");
        layersdiagram.id = this.id;

        if (this.allowEdit) {
            layersdiagram.style = `width: calc(${this.diagramwidth} + ${this.sidebarwidth}); height: ${this.sidebarheight}; margin: 10vw; border-radius: 5%; background-color: white; position: relative;`;

            const sidebar = document.createElement("div");
            sidebar.style = `width: calc(${this.sidebarwidth}); height: ${this.sidebarheight}; float: left; background-color: grey; overflow: auto;`
            sidebar.className = "sidebar";
            layersdiagram.appendChild(sidebar);
        }
        else {
            layersdiagram.style = `width: ${this.diagramwidth}; height: ${this.sidebarheight}; margin: 10vw; border-radius: 5%; background-color: white; position: relative;`;
        }

        const diagram = document.createElement("div");
        diagram.style = `width: ${this.diagramwidth}; margin-left: ${this.sidebarwidth}; margin-top: 2.5%; margin-bottom: 2.5%; 
                        background-color: blue; position: relative; top: 50%; -ms-transform: translateY(-50%); transform: translateY(-50%);`
        diagram.className = "diagram"
        layersdiagram.appendChild(diagram);

        const body = $("body");
        body.append(layersdiagram);

        this.addLayer(null);
    },

    addComponent: function (putInSidebar, name, image, overlap = 50) {
        // Create a new component

        let update = false;
        if (name in this.components) {
            update = true;
        }

        this.components[name] = { image: image, nutrition: null, price: null, description: null, overlap: overlap };
        if (putInSidebar) {
            if (!update) {
                this.sidebar.push(name);
                this.makeSidebarComponent(name);
            }
            else {
                this.updateSidebarComponent(name);
            }
        }
    },

    makeSidebarComponent: function (componentName) {
        // Make a component icon in sidebar

        if (this.allowEdit) {
            const sidebar = $(`#${this.id} .sidebar`);
            const sidebarcomponent = document.createElement("div");
            sidebarcomponent.id = componentName;
            sidebarcomponent.className = "sidebarcomponent";
            sidebarcomponent.style = `width: calc(${this.sidebarwidth} - 4px); height: calc(${this.sidebarwidth} - 4px); border: 2px solid black;`;
            sidebarcomponent.draggable = true;

            // events
            //sidebarcomponent.addEventListener('drag', (e) => this.dragSidebarComponent(e));
            sidebarcomponent.addEventListener('dragend', (e) => this.dropSidebarComponent(e));

            const image = document.createElement("img");
            image.src = this.components[componentName].image;
            image.style = "max-width: 100%; max-height: 100%; transform: translateY(50%);";

            sidebar.append(sidebarcomponent);
            sidebarcomponent.append(image);
        }
    },

    updateSidebarComponent: function (componentName) {
        // Update sidebar component image

        $(`#${this.id} #${componentName}`).children()[0].src = this.components[componentName].image;
    },

    addComponentNutritionalInfo: function (componentName, calories=null, protein=null, satFat=null, totFat=null, sugars=null, totalCarb=null, fibre=null, sodium=null, other=null) {
        // Add nutritional info to a component

        if (componentName in this.components) {
            this.components[componentName].nutrition = {
                calories: calories, protein: protein, satFat: satFat, totFat: totFat, sugars: sugars,
                totalCarb: totalCarb, fibre: fibre, sodium: sodium, other: other
            };
        }
    },

    addComponentPriceInfo: function (componentName, price) {
        // Add price info to a component

        if (componentName in this.components) {
            this.components[componentName].price = price;
        }
    },

    addComponentDescription: function (componentName, description) {
        // Add a description to a component

        if (componentName in this.components) {
            this.components[componentName].description = description;
        }
    },

    addLayer: function (componentName=null) {
        // Add a layer to the diagram

        if (componentName == null || componentName in this.components) {
            const diagram = $(`#${this.id} .diagram`);
            const newlayer = document.createElement("div");
            newlayer.className = "layer";
            newlayer.style = `margin-left: 5%; z-index: ${this.layers + 1}; position: relative;`;

            // events
            newlayer.onmouseover = () => { this.fanout() };
            newlayer.onmouseout = () => { this.collapse() };
            newlayer.onclick = () => { this.popup() };

            const image = document.createElement("img");

            if (!(componentName == null)) {
                image.src = this.components[componentName].image;
            }
            else {
                image.src = "";
                newlayer.style += `margin-left: 5%; z-index: ${this.layers + 1}; position: relative; width: 100%; height: 5vw;`;
            }

            //events
            image.ondragenter = (e) => { this.dragComponent(e) };
            image.ondragleave = () => { this.dragLeaveComponent() };

            newlayer.append(image);

            diagram.prepend(newlayer);

            this.layers++;
            this.collapse();
        }
    },

    collapse: function () {
        // Compress the layers in the diagram

        $(`#${this.id} .diagram`).children().each((i, c) => {
            const position = c.style.zIndex - Math.ceil(this.layers / 2);
            c.style.transform = `translateY(calc(50% * ${position}))`;
        });
    },

    fanout: function () {
        // Fan out the layers in the diagram

        $(`#${this.id} .diagram`).children().each((i, c) => {
            c.style.transform = "translateY(0%)";
        });
    },

    getHoveredLayer: function () {
        // Get layer div that mouse is hovered over

        const droploc = document.querySelectorAll(`#${this.id} .layer :hover`);
        if (droploc.length > 0) {
            return droploc[droploc.length - 1].parentElement;
        }
        return null
    },

    dragComponent: function (e) {
        // Move diagram to show dragged component location

        const index = e.target.parentElement.style.zIndex;

        $(`#${this.id} .diagram`).children().each((i, c) => {
            const position = c.style.zIndex - Math.ceil(this.layers / 2);

            if ($(`#${this.id} .diagram`).children().length - i > index) {
                c.style.transform = `translateY(calc(50% * ${position - 1}))`;
            }
            else {
                c.style.transform = `translateY(calc(50% * ${position}))`;
            }
        });
    },

    dragLeaveComponent: function (e) {
        // When dragging component leaves all layers

        const layer = this.getHoveredLayer();

        if (layer == null) {
            this.collapse();
        }
    },

    dropSidebarComponent: function (e) {
        // Drop a dragged sidebar component

        const droploc = document.querySelectorAll(`#${this.id} .layer :hover`);

        if (droploc.length > 0) {
            const index = parseInt(droploc[droploc.length - 1].parentElement.style.zIndex) + 1;

            this.addLayer(e.target.id);

            $(`#${this.id} .diagram`).children().each((i, c) => {
                console.log(`${c.style.zIndex} | ${i}`);
                if (i < this.layers - index) {
                    c.children[0].src = c.parentElement.children[i + 1].children[0].src;
                    console.log(`replaced: ${c.style.zIndex} | ${i}`);
                }
                if (this.layers - i == index) {
                    c.children[0].src = this.components[e.target.id].image;
                    console.log(`new: ${c.style.zIndex} | ${i}`);
                }
            });
        }
    },

    moveLayer: function () {
        // Drag and move a layer in the diagram

    },

    popup: function () {

    }
}
