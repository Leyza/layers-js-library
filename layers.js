
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
        const layersdiagram = document.createElement("div");
        layersdiagram.id = this.id;

        if (this.allowEdit) {
            layersdiagram.style = `width: calc(${this.diagramwidth} + ${this.sidebarwidth}); height: ${this.sidebarheight}; border-radius: 5%; background-color: white; position: relative;`;

            const sidebar = document.createElement("div");
            sidebar.style = `width: calc(${this.sidebarwidth}); height: ${this.sidebarheight}; float: left; background-color: grey; overflow: auto;`
            sidebar.className = "sidebar";
            layersdiagram.appendChild(sidebar);
        }
        else {
            layersdiagram.style = `width: ${this.diagramwidth}; height: ${this.sidebarheight}; border-radius: 5%; background-color: white; position: relative;`;
        }

        const diagram = document.createElement("div");
        diagram.style = `width: ${this.diagramwidth}; margin-left: ${this.sidebarwidth}; margin-top: 2.5%; margin-bottom: 2.5%; 
                        background-color: blue; position: relative; top: 50%; -ms-transform: translateY(-50%); transform: translateY(-50%);`
        diagram.className = "diagram"
        layersdiagram.appendChild(diagram);

        const body = $("body");
        body.append(layersdiagram);
    },

    addComponent: function (putInSidebar, name, image, nutrition=null, price=null, description=null, overlap=50) {
        this.components[name] = { image: image, nutrition: nutrition, price: price, description: description, overlap: overlap };
        if (putInSidebar) {
            this.sidebar.push(name);
            this.makeSidebarComponent(name);
        }
    },

    makeSidebarComponent: function (componentName) {
        if (this.allowEdit) {
            const sidebar = $(`#${this.id} .sidebar`);
            const sidebarcomponent = document.createElement("div");
            sidebarcomponent.className = "sidebarcomponent";
            sidebarcomponent.style = `width: ${this.sidebarwidth}; height: ${this.sidebarwidth}; background-color: pink; border: 2px solid black;`

            sidebar.append(sidebarcomponent);
        }
    },

    addComponentNutritionalInfo: function (componentName, calories=null, protein=null, satFat=null, totFat=null, sugars=null, totalCarb=null, fibre=null, sodium=null, other=null) {

    },

    addComponentPriceInfo: function (componentName, price) {

    },

    addComponentDescription: function (componentName, description="") {

    },

    addLayer: function () {
        const diagram = $(`#${this.id} .diagram`);
        const newlayer = document.createElement("div");
        diagram.prepend(newlayer);

        this.layers++;
        this.updateLayerPositions();
    },

    updateLayerPositions: function () {
        $(`#${this.id} .diagram`).children().each((i, c) => {
            const position = this.layers - i - Math.ceil(this.layers / 2);
            c.style = `width: 90%; height: 20px; margin-left: 5%; background-color: rgb(calc(50 * ${i} + 50), calc(10 * ${i} + 20), 0); 
                        border: 2px solid black; z-index: ${this.layers - i}; transform: translateY(calc(50% * ${position}));`;
        });
    },

    moveLayer: function () {

    }
}
