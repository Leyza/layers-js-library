"use strict";


(function (global, document, $) { 

    function LayersDiagram(id, sidebarwidth, sidebarheight, diagramwidth, diagramheight = null, allowEdit = true, layerlimit = Infinity) {
        this.id = id;
        this.diagramwidth = diagramwidth;
        this.diagramheight = diagramheight;
        this.sidebarwidth = sidebarwidth;
        this.sidebarheight = sidebarheight;
        this.madeDiagram = false;
        this.layerlimit = layerlimit + 1;

        this.layers = 0;
        this.layersOrder = [null];
        this.components = { "_dummy": { image: "images/bottom_bun.png", description: null, overlap: 0 }};
        this.allowEdit = allowEdit;
        this.sidebarComponents = 0;
        this.sidebar = [];
        this.draggeditem = null;
    }

    LayersDiagram.prototype = {
        makeDiagram: function (element=null) {
            // Draw the diagram

            const layersdiagram = document.createElement("div");
            layersdiagram.id = this.id;
            layersdiagram.className = "layersdiagram";
            layersdiagram.style = `min-height: calc(${this.sidebarheight} + 3vw); margin: auto; position: relative;`

            const diagram = document.createElement("div");
            diagram.className = "diagrambox";
            diagram.style = `width: ${this.diagramwidth}; border: 0.5vw solid black; border-radius: 3vw;`;

            if (this.allowEdit) {
                layersdiagram.style.width = `calc(${this.diagramwidth} + ${this.sidebarwidth})`;

                const sidebar = document.createElement("div");
                sidebar.style = `width: ${this.sidebarwidth}; max-height: ${this.sidebarheight}; margin-top: 3vw; float: left; position: relative; display: flex; flex-direction: column; justify-content: space-between;`
                sidebar.className = "sidebarbox";

                const sidebarComponentHolder = document.createElement("div");
                sidebarComponentHolder.style = `width: calc(100% - 0.5vw); min-height: 0; background-color: lightgrey; overflow-y: auto; overflow-x: hidden;`;
                sidebarComponentHolder.className = "sidebar";

                layersdiagram.appendChild(sidebar);
                sidebar.appendChild(sidebarComponentHolder);

                diagram.style.marginLeft = this.sidebarwidth;
            }
            else {
                layersdiagram.style.width = this.diagramwidth;
            }

            const componentHolder = document.createElement("div");
            componentHolder.style = `width: 90%; margin: 5%; position: relative; transform: translateY(0%);`;
            componentHolder.className = "diagram";

            if (this.diagramheight != null) {
                diagram.style.height = this.diagramheight;
                componentHolder.style.height = "95%";
                componentHolder.style.width = "calc(90% + 10px)";
                componentHolder.style.marginRight = "calc(5% - 10px)";
                componentHolder.style.overflow = "auto";
            }

            layersdiagram.appendChild(diagram);
            diagram.appendChild(componentHolder);

            //events
            componentHolder.onmouseover = () => { this.fanout(); };
            componentHolder.onmouseout = () => { this.collapse(); };

            if (element == null) {
                const body = $("body");
                body.append(layersdiagram);
            }
            else {
                element.append(layersdiagram);
            }

            this.madeDiagram = true;

            if (this.allowEdit) {
                this.updateAllSidebar();
            }
            this.updateAllLayers();
        },

        addComponent: function (putInSidebar, name, image, overlap = 50, start = 0, size=100, alignment="center") {
            // Create a new component
            let update = false;
            if (name in this.components) {
                update = true;
            }

            const align = (["center", "left", "right"].includes(alignment)) ? alignment : "center";
            this.components[name] = { image: image, description: null, overlap: overlap, start: start, size: size, alignment: align };

            if (name == "audio jack") {
                console.log(this.components["audio jack"]);
            }

            if (putInSidebar) {
                if (!update) {
                    this.sidebar.push(name);
                }

                if (this.madeDiagram && this.allowEdit) {
                    this.updateAllSidebar();
                }
            }
        },

        addSidebarComponent: function () {
            // Make a component icon in sidebar

            if (this.allowEdit) {
                const sidebar = $(`#${this.id} .sidebar`);
                const sidebarcomponent = document.createElement("div");
                sidebarcomponent.className = "sidebarcomponent";
                sidebarcomponent.draggable = true;

                // events
                sidebarcomponent.onclick = (e) => { this.popupShow(e) };
                sidebarcomponent.addEventListener('dragstart', (e) => {
                    this.draggeditem = { type: "new", name: e.target.id, zindex: null };
                    e.dataTransfer.setDragImage(e.target.children[0], 0, 0);
                    this.fanout();
                });
                sidebarcomponent.addEventListener("dragover", (e) => { e.preventDefault(); });
                sidebarcomponent.ondragend = () => { this.collapse() };
                sidebarcomponent.ondrop = (e) => { this.dropComponentInSidebar(e); this.draggeditem = null; };

                const image = document.createElement("img");
                image.style = `padding-top: 1vw; padding-bottom: 1vw; margin: auto; max-width: 95%; display: block; position: relative;`;
                image.draggable = false;

                const tooltip = document.createElement("span");
                tooltip.className = "sidebartooltiptext";

                sidebar.append(sidebarcomponent);
                sidebarcomponent.append(image);
                sidebarcomponent.append(tooltip);

                this.sidebarComponents++;
            }
        },

        removeFirstSidebarComponent: function () {
            $(`#${this.id} .sidebar`).children()[0].remove();
            this.sidebarComponents--;
        },

        updateAllSidebar: function () {
            if (this.sidebarComponents > this.sidebar.length) {
                const iter = this.sidebarComponents - this.sidebar.length;
                for (let i = 0; i < iter; ++i) {
                    this.removeFirstSidebarComponent();
                }

            } else if (this.sidebarComponents < this.sidebar.length) {
                const iter = this.sidebar.length - this.sidebarComponents;
                for (let i = 0; i < iter; ++i) {
                    this.addSidebarComponent();
                }
            }

            $(`#${this.id} .sidebar`).children().each((i, c) => {
                c.id = this.sidebar[i];
                c.children[0].src = this.components[this.sidebar[i]].image;
                c.children[1].innerText = this.sidebar[i];
            })
        },

        addComponentDescription: function (componentName, description) {
            // Add a description to a component

            if (componentName in this.components) {
                this.components[componentName].description = description;
            }
        },

        addLayer: function (componentName) {
            // Add layer to layersOrder tracking and update diagram is applicable

            if (componentName in this.components && this.layersOrder.length < this.layerlimit) {
                this.layersOrder.push(componentName);
            }

            if (this.madeDiagram) {
                this.updateAllLayers();
            }
        },

        addDiagramLayer: function (isDummy) {
            // Add a layer to the diagram

            const diagram = $(`#${this.id} .diagram`);
            const newlayer = document.createElement("div");
            newlayer.className = "layer";
            newlayer.style = `z-index: ${this.layers + 1}; position: relative; transition: transform 0.5s ease;`;

            // events
            if (!isDummy) {
                newlayer.draggable = true;
                //newlayer.onmouseover = () => { this.fanout() };
                //newlayer.onmouseout = () => { this.collapse() };
                newlayer.addEventListener('dragstart', (e) => { this.draggeditem = { type: "layer", name: null, zindex: e.target.style.zIndex }; this.fanout(); });
            }

            const image = document.createElement("img");
            image.className = "layerimage";
            if (this.diagramheight == null) {
                image.style = `width: 100%;`;
            } else {
                image.style = `width: calc(100% - 10px)`;
            }

            //events
            if (this.allowEdit) {
                image.ondragenter = (e) => { this.dragComponent(e); };
                image.ondragleave = (e) => { this.dragLeaveComponent(); };
                image.addEventListener("dragover", function (e) { e.preventDefault() });
                image.ondrop = (e) => { this.dropComponent(e); this.draggeditem = null; };
            }
            image.onclick = (e) => { this.popupShow(e) };
            image.draggable = false;

            newlayer.append(image);
            diagram.prepend(newlayer);
            this.layers++;

            setTimeout(() => {
                this.collapse();
            }, 300);
        },

        removeTopLayer: function () {
            $(`#${this.id} .diagram`).children()[0].remove();
            this.layers -= 1;
        },

        collapse: function (ignoreIndex = -1) {
            // Compress the layers in the diagram to the top

            let overlap = 0;

            const layers = $(`#${this.id} .diagram`).children();

            for (let i = this.layers - 2; i > 0; --i) {
                let overlapPercent = 0;
                if (i != ignoreIndex) {
                    overlapPercent = this.components[this.layersOrder[i]].overlap;
                }

                overlap -= layers[this.layers - i - 1].offsetHeight * overlapPercent / 100.0;
                overlap -= layers[this.layers - i - 2].offsetHeight * this.components[this.layersOrder[i + 1]].start / 100.0;

                layers[this.layers - i - 1].style.transform = `translateY(${overlap}px)`;
            }

            if (this.layers > 1) {
                overlap -= layers[this.layers - 1].offsetHeight * this.components[this.layersOrder[this.layers - 1]].start / 100.0;

                layers[this.layers - 1].style.transform = `translateY(${overlap}px)`;
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
            e.preventDefault();

            const index = e.target.parentElement.style.zIndex;

            let component = null;
            if (this.draggeditem.type == "new") {
                component = this.draggeditem.name;
            }
            else if (this.draggeditem.type == "layer") {
                const i = parseInt(this.draggeditem.zindex) - 1;
                component = this.layersOrder[i];
            }
            else {
                console.log("Error in dragComponent: Invalid drag data.");
                return;
            }

            //this.collapse((index > Math.ceil(this.layers / 2)) ? index : index - 1); // For when fan out from the middle
            //this.collapse(index - 1); // For when fan out from the top

            if (this.draggeditem.zindex != index) {
                if (index < this.layers) {
                    const shiftup = $(`#${this.id} .diagram`).children()[this.layers - index - 1].offsetHeight * 0.5;
                    $(`#${this.id} .diagram`).children()[this.layers - index - 1].style.transform = `translateY(-${shiftup}px)`;
                }

                const img = document.createElement("img");
                img.className = "ghost";
                img.src = this.components[component].image;
                img.style = `width: 100%; position: absolute; bottom: 80%; right: 0%; opacity: 0.5;`;

                $(`#${this.id} .diagram`).children()[this.layers - index].appendChild(img);
            }
        },

        dragLeaveComponent: function (e) {
            // When dragging component leaves a layer

            /*const layer = this.getHoveredLayer();
            if (layer == null) {
                this.collapse();
            }*/

            $(`#${this.id} .diagram .ghost`).each((i, c) => {
                c.remove();
            })

            this.fanout();
        },

        dropComponent: function (e) {
            // Drop a dragged component/layer into diagram

            e.preventDefault();

            const droploc = e.target;

            if (this.draggeditem.type == "new") {
                if (this.layersOrder.length >= this.layerlimit) {
                    alert("Maximum number of allowed layers in the diagram reached!");

                } else {
                    const index = parseInt(droploc.parentElement.style.zIndex);

                    this.addLayer(this.draggeditem.name);

                    const newLayerComponent = this.layersOrder.pop();
                    this.layersOrder.splice(index, 0, newLayerComponent);
                }
            }
            else if (this.draggeditem.type == "layer") {
                const index1 = parseInt(droploc.parentElement.style.zIndex) - 1;
                const index2 = parseInt(this.draggeditem.zindex) - 1;

                if (index1 != index2) {
                    const component = this.layersOrder[index2];
                    this.layersOrder.splice(index2, 1);

                    if (index1 > index2) {
                        this.layersOrder.splice(index1, 0, component);
                    }
                    else {
                        this.layersOrder.splice(index1 + 1, 0, component);
                    }
                }
            
            }

            $(`#${this.id} .diagram .ghost`).each((i, c) => {
                c.remove();
            })

            this.updateAllLayers();
            setTimeout(() => {
                this.collapse();
            }, 300);
        },

        dropComponentInSidebar: function (e) {
            // Dragging a component to the sidebar to remove it from diagram
            e.preventDefault();

            if (this.draggeditem.type == "layer") {
                const index = parseInt(this.draggeditem.zindex) - 1;

                console.log(index);
                console.log(this.layersOrder[index]);

                this.layersOrder.splice(index, 1);

                console.log(this.layersOrder);

                //this.removeTopLayer();
                this.updateAllLayers();
            }

            setTimeout(() => {
                this.collapse();
            }, 300);
        },

        updateAllLayers: function () {
            // Update all diagram layers according to layersOrder list

            if (this.layers > this.layersOrder.length) {
                const iter = this.layers - this.layersOrder.length;
                for (let i = 0; i < iter; ++i) {
                    this.removeTopLayer();
                }
                console.log(this.layers == this.layersOrder.length);

            } else if (this.layers < this.layersOrder.length) {
                const iter = this.layersOrder.length - this.layers;
                for (let i = 0; i < iter; ++i) {
                    if (this.layers == 0) {
                        this.addDiagramLayer(true);
                    } else {
                        this.addDiagramLayer(false);
                    }
                }
                console.log(this.layers == this.layersOrder.length);
            }

            let index = 0;
            $(`#${this.id} .diagram`).children().each((i, c) => {
                if (this.layersOrder[this.layers - index - 1] != null) {
                    c.children[0].src = this.components[this.layersOrder[this.layers - index - 1]].image;
                    c.children[0].style.width = this.components[this.layersOrder[this.layers - index - 1]].size + '%';

                    const align = this.components[this.layersOrder[this.layers - index - 1]].alignment;
                    if (align == "center") {
                        c.children[0].style.marginLeft = `calc((100% - ${this.components[this.layersOrder[this.layers - index - 1]].size}%) / 2)`;
                    } else if (align == "left") {
                        c.children[0].style.marginLeft = 0;
                    } else {
                        c.children[0].style.marginLeft = `calc(100% - ${this.components[this.layersOrder[this.layers - index - 1]].size}%)`;
                    }

                } else {
                    c.children[0].src = this.components["_dummy"].image;
                    c.children[0].style.opacity = 0;
                }
                index += 1;
            });
        },

        popupShow: function (e) {
            const popup = document.createElement("div");
            //popup.id = "popup";
            popup.className = "popup";
            $("body").append(popup);

            const popupheader = document.createElement("div");
            popupheader.className = "popupheader";
            popup.append(popupheader);

            const popupview = document.createElement("div");
            popupview.className = "popupview";
            popup.append(popupview);

            const popupcontent = document.createElement("div");
            popupcontent.className = "popupcontent";
            popupview.append(popupcontent);

            const popupheadercontent = document.createElement("div");
            popupheadercontent.className = "popupheadercontent";
            popupheader.append(popupheadercontent);

            const exitbutton = document.createElement("button");
            exitbutton.className = "popupexit";
            popupheader.append(exitbutton);

            //events
            exitbutton.onclick = (ev) => this.popupHide(ev);
            popup.draggable = true;
            popup.ondragstart = () => { return false; };
            popup.onmousedown = (e) => { this.popupdragstart(e); };

            let obj = e.target;
            if ((obj.className != "layer" && obj.parentElement.className == "layer") || (obj.className != "sidebarcomponent" && obj.parentElement.className == "sidebarcomponent")) {
                obj = obj.parentElement;
            }

            if (obj.className == "layer") {
                //popup.className = "show";
                popupheadercontent.innerText = this.layersOrder[obj.style.zIndex - 1];

                if (this.components[this.layersOrder[obj.style.zIndex - 1]].description != null && this.components[this.layersOrder[obj.style.zIndex - 1]].description != "") {
                    popupcontent.innerText = this.components[this.layersOrder[obj.style.zIndex - 1]].description;
                }
                else {
                    popupcontent.innerText = "There is no description.";
                }

            } else if (obj.className == "sidebarcomponent") {
                //popup.className = "show";
                popupheadercontent.innerText = obj.id;

                if (this.components[obj.id].description != null && this.components[obj.id].description != "") {
                    popupcontent.innerText = this.components[obj.id].description;
                } else {
                    popupcontent.innerText = "There is no description.";
                }
            }
        },

        popupHide: function (e) {
            //document.getElementById("popup").className = "hide";
            let p = e.target;
            if (p.className != "popup") {
                p = p.closest(".popup");
            }

            if (p == null) {
                console.log("Could not find popup window to close.");
                return;
            }

            p.remove();
        },

        popupdragstart: function (e) {
            // Drag popup around the screen
            let p = e.target;
            if (p.className != "popup") {
                p = p.closest(".popup");
            }

            if (p == null) {
                return;
            }

            let currX = e.clientX;
            let currY = e.clientY;

            function popupmove(x, y) {
                p.style.left = (p.offsetLeft - x) + 'px';
                p.style.top = (p.offsetTop - y) + 'px';
            }

            function popupdrag(ev) {
                popupmove(currX - ev.clientX, currY - ev.clientY);
                currX = ev.clientX;
                currY = ev.clientY;
            }

            document.addEventListener('mousemove', popupdrag);

            document.onmouseup = (ev) => {
                document.removeEventListener('mousemove', popupdrag);
                document.onmouseup = null;
            }
        },
    }


    global.LayersDiagram = global.LayersDiagram || LayersDiagram

})(window, window.document, $);