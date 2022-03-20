
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
        layersdiagram.className = "layersdiagram";

        if (this.allowEdit) {
            layersdiagram.style = `width: calc(${this.diagramwidth} + ${this.sidebarwidth}); min-height: ${this.sidebarheight}; margin: auto; border-radius: 5%; background-color: white; position: relative;`;

            const sidebar = document.createElement("div");
            sidebar.style = `width: calc(${this.sidebarwidth}); max-height: ${this.sidebarheight}; float: left; margin: auto; position: relative; background-color: slategray; overflow: auto;`
            sidebar.className = "sidebar";
            layersdiagram.appendChild(sidebar);
        }
        else {
            layersdiagram.style = `width: ${this.diagramwidth}; min-height: ${this.sidebarheight}; margin: 10vw; border-radius: 5%; background-color: white; position: relative;`;
        }

        const diagram = document.createElement("div");
        diagram.style = `width: ${this.diagramwidth}; margin-left: ${this.sidebarwidth}; margin-top: 2.5%; margin-bottom: 2.5%; 
                        background-color: lightgray; position: relative; top: 50%; transform: translateY(0%);`
        diagram.className = "diagram"
        layersdiagram.appendChild(diagram);

        const body = $("body");
        body.append(layersdiagram);

        this.addLayer(null);

        // Add popup window
        const popup = document.createElement("div");
        popup.id = "popup";
        popup.className = "hide";
        layersdiagram.append(popup);

        const exitbutton = document.createElement("button");
        exitbutton.className = "exit";
        exitbutton.innerText = "X";
        popup.append(exitbutton);

        const popupview = document.createElement("div");
        popupview.className = "popupview";
        popup.append(popupview);

        const popupcontent = document.createElement("div");
        popupcontent.className = "popupcontent";
        popupview.append(popupcontent);

        //events
        exitbutton.onclick = () => this.popupHide();

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
            sidebarcomponent.addEventListener('dragstart', (e) => { e.dataTransfer.setData('text', JSON.stringify(["new", e.target.id])) } );

            const image = document.createElement("img");
            image.src = this.components[componentName].image;
            image.style = "max-width: 100%; max-height: 100%; transform: translateY(50%);";
            image.draggable = false;

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
            newlayer.draggable = true;

            // events
            newlayer.onmouseover = () => { this.fanout() };
            newlayer.onmouseout = () => { this.collapse() };
            newlayer.onclick = (e) => { this.popupShow(e) };
            newlayer.addEventListener('dragstart', (e) => { e.dataTransfer.setData('text', JSON.stringify(["layer", e.target.style.zIndex])) });

            const image = document.createElement("img");
            image.className = "layerimage";

            if (!(componentName == null)) {
                image.src = this.components[componentName].image;
            }
            else {
                image.src = "images/bottom_bun.png";
                image.style = "width: 100%; height: 100%; opacity: 0";
                newlayer.style += `margin-left: 5%; z-index: ${this.layers + 1}; position: relative; width: 100%; height: 8vw;`;
            }

            //events
            image.ondragenter = (e) => { this.dragComponent(e) };
            image.ondragleave = () => { this.dragLeaveComponent() };
            image.addEventListener("dragover", function (e) { e.preventDefault() });
            image.ondrop = (e) => { this.dropComponent(e) };
            image.draggable = false;

            newlayer.append(image);
            diagram.prepend(newlayer);

            this.layersOrder.push(componentName);
            this.layers++;

            setTimeout(() => {
                this.collapse();
            }, 300);
        }
    },

    collapse: function (ignoreIndex=-1) {
        // Compress the layers in the diagram

        let greaterOverlap = 0;
        let lesserOverlap = 0;

        const mid = Math.ceil(this.layers / 2);
        const layers = $(`#${this.id} .diagram`).children();

        for (i = mid + 1; i < this.layers; ++i) {
            let overlapPercent = 0;
            if (i != ignoreIndex) {
                overlapPercent = this.components[this.layersOrder[i - 1]].overlap;
            }

            lesserOverlap += layers[this.layers - i].offsetHeight * overlapPercent / 100.0;

            layers[this.layers - i - 1].style.transform = `translateY(${lesserOverlap}px)`;
        }

        for (i = mid - 1; i > 0; --i) {
            let overlapPercent = 0;
            if (i != ignoreIndex) {
                overlapPercent = this.components[this.layersOrder[i]].overlap;
            }

            greaterOverlap -= layers[this.layers - i - 1].offsetHeight * overlapPercent / 100.0;

            layers[this.layers - i - 1].style.transform = `translateY(${greaterOverlap}px)`;
        }

        if (this.layers > 1) {
            layers[this.layers - 1].style.transform = `translateY(${greaterOverlap}px)`
        }
    },

    fanout: function () {
        // Fan out the layers in the diagram

        $(`#${this.id} .diagram`).children().each((i, c) => {
            c.style.transform = "translateY(0%)";
        });
    },

    getHoveredLayer: function () {
        // Get layer div that mouse is hovered over

        const droploc = document.querySelectorAll(`.layer :hover`);

        if (droploc.length > 0) {
            return droploc[droploc.length - 1].parentElement;
        }
        return null
    },

    dragComponent: function (e) {
        // Move diagram to show dragged component location

        const index = e.target.parentElement.style.zIndex;
        this.collapse((index > Math.ceil(this.layers / 2)) ? index : index - 1);
    },

    dragLeaveComponent: function (e) {
        // When dragging component leaves all layers

        const layer = this.getHoveredLayer();

        if (layer == null) {
            this.collapse();
        }
    },

    dropComponent: function (e) {
        // Drop a dragged component/layer into diagram

        e.preventDefault();

        const data = JSON.parse(e.dataTransfer.getData('text'));
        const droploc = e.target;

        if (data[0] == "new") {
            const index = parseInt(droploc.parentElement.style.zIndex);

            this.addLayer(data[1]);

            const newLayerComponent = this.layersOrder.pop();
            this.layersOrder.splice(index, 0, newLayerComponent);
        }
        else if (data[0] == "layer") {
            const index1 = parseInt(droploc.parentElement.style.zIndex) - 1;
            const index2 = parseInt(data[1]) - 1;

            const component = this.layersOrder[index2];
            this.layersOrder.splice(index2, 1);
            if (index1 > index2) {
                this.layersOrder.splice(index1, 0, component);
            }
            else {
                this.layersOrder.splice(index1 + 1, 0, component);
            }
            
        }

        this.updateAllLayers();
        this.collapse();
    },

    updateAllLayers: function () {
        let index = 0;
        $(`#${this.id} .diagram`).children().each((i, c) => {
            if (this.layersOrder[this.layers - index - 1] != null) {
                c.children[0].src = this.components[this.layersOrder[this.layers - index - 1]].image;
            }
            index += 1;
        });
    },

    popupShow: function (e) {
        document.getElementById("popup").className = "show";

        let obj = e.target;
        if (obj.className != "layer" && obj.parentElement.className == "layer") {
            obj = obj.parentElement;
        }

        if (obj.className == "layer") {
            if (this.components[this.layersOrder[obj.style.zIndex - 1]].description != null && this.components[this.layersOrder[obj.style.zIndex - 1]].description != "") {
                $("#popup .popupcontent")[0].innerText = this.components[this.layersOrder[obj.style.zIndex - 1]].description;
            }
            else {
                $("#popup .popupcontent")[0].innerText = "There is no description.";
            }
        }
    },

    popupHide: function () {
        document.getElementById("popup").className = "hide";
    }
}
