"use strict";


(function (global, document, $) { 

    function LayersDiagram(id, sidebarwidth, sidebarheight, diagramwidth = null, diagramheight = null, orientation = "vertical", allowEdit = true, layerlimit = Infinity) {

        this.id = id;
        this.orientation = (orientation == "horizontal") ? "horizontal" : "vertical";
        this.diagramwidth = diagramwidth;
        this.diagramheight = diagramheight;
        this.sidebarwidth = sidebarwidth;
        this.sidebarheight = sidebarheight;
        this.madeDiagram = false;
        this.layerlimit = layerlimit + 1;

        this.layers = 0;
        this.layersOrder = [null];
        this.dummy = {
            "vertical": { image: "images/bottom_bun.png", description: null, overlap: 0, start: 0, size: 100, alignment: "center" },
            "horizontal": { image: "images/desktop_ram.png", description: null, overlap: 0, start: 0, size: 100, alignment: "center" }
        };
        this.components = {};
        this.allowEdit = allowEdit;
        this.sidebarComponents = 0;
        this.sidebar = [];
        this.draggeditem = null;

        if (this.orientation === "vertical" && this.diagramwidth === null) {
            throw "Diagram Creation Error: Vertical diagrams must have a specified set width!";
        } else if (this.orientation === "horizontal" && this.diagramheight === null) {
            throw "Diagram Creation Error: Horizontal diagrams must have a specified set height!";
        }
    }

    LayersDiagram.prototype = {
        makeDiagram: function (element=null) {
            // Draw the diagram

            const layersdiagram = document.createElement("div");
            layersdiagram.id = this.id;
            layersdiagram.className = "layersdiagram";
            layersdiagram.style = `margin: auto; position: relative;`

            const diagram = document.createElement("div");
            diagram.className = "diagrambox";
            diagram.style = `border: 0.5vw solid black; border-radius: 3vw; position: relative;`;

            if (this.allowEdit) {
                if (this.diagramwidth != null) {
                    layersdiagram.style.width = `calc(${this.diagramwidth} + ${this.sidebarwidth})`;
                }

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
                if (this.diagramwidth != null) {
                    layersdiagram.style.width = this.diagramwidth;
                }
            }

            const componentHolder = document.createElement("div");
            componentHolder.style = `position: relative; box-sizing: border-box;`;
            componentHolder.className = "diagram";

            if (this.orientation == "vertical") {
                componentHolder.style.margin = "5% 5% 5% 0";
                componentHolder.style.overflowY = "auto";
                componentHolder.style.overflowX = "hidden";
                componentHolder.style.display = "flex";
                componentHolder.style.flexDirection = "column";

                if (this.diagramheight != null) {
                    layersdiagram.style.height = this.diagramheight;
                    diagram.style.height = `calc(${this.diagramheight} - 1vw)`;
                    componentHolder.style.height = "95%";
                    componentHolder.style.width = "calc(95% + 10px)";
                    //componentHolder.style.marginRight = "calc(5% - 10px)";
                }

            } else {
                componentHolder.style.margin = "0 2% 2% 2%";
                componentHolder.style.overflowY = "hidden";
                componentHolder.style.overflowX = "auto";
                componentHolder.style.display = "flex";
                componentHolder.style.flexDirection = "row";

                layersdiagram.style.height = this.diagramheight;
                diagram.style.height = `calc(${this.diagramheight} - 1vw)`;
                componentHolder.style.height = "calc(93% + 10px)";

                if (this.diagramwidth != null) {
                    diagram.style.width = `calc(${this.diagramwidth} - 1vw)`;
                    componentHolder.style.width = "90%";
                }
            }

            layersdiagram.appendChild(diagram);
            diagram.appendChild(componentHolder);

            //events
            componentHolder.onmouseenter = () => { this.fanout(); };
            componentHolder.onmouseleave = () => { this.collapse(); };

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

            setTimeout(() => {
                this.collapse();
            }, 300);
        },

        addComponent: function (putInSidebar, name, image, overlap = 50, start = 0, size=100, alignment="center") {
            // Create a new component
            let update = false;
            if (name in this.components) {
                update = true;
            }

            const align = (["center", "left", "right", "top", "bottom"].includes(alignment) || !isNaN(alignment)) ? alignment : "center";
            this.components[name] = { image: image, description: null, overlap: overlap, start: start, size: size, alignment: align };

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
                image.style = `padding-top: 1vw; padding-bottom: 1vw; margin: auto; max-width: 95%; max-height: ${this.sidebarwidth}; display: block; position: relative;`;
                image.draggable = false;

                const tooltip = document.createElement("span");
                tooltip.className = "sidebartooltiptext";

                const countbox = document.createElement("div");
                countbox.className = "countbox";

                sidebar.append(sidebarcomponent);
                sidebarcomponent.append(image);
                sidebarcomponent.append(tooltip);
                sidebarcomponent.append(countbox);

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

            const counts = this.layersOrder.reduce((track, curr) => {
                return track[curr] ? ++track[curr] : track[curr] = 1, track
            }, {});

            $(`#${this.id} .sidebar`).children().each((i, c) => {
                c.id = this.sidebar[i];
                c.children[0].src = this.components[this.sidebar[i]].image;
                c.children[1].innerText = this.sidebar[i];

                if (c.id in counts) {
                    c.children[2].innerText = counts[c.id];
                } else {
                    c.children[2].innerText = 0;
                }
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
            } else if (!(componentName in this.components)) {
                throw "Invalid component name.";
            } else {
                throw "Maximum number of layers reached!";
            }

            if (this.madeDiagram) {
                this.updateAllLayers();
            }
        },

        setLayers: function (componentList) {
            // Overwrite and set all layers

            if (Array.isArray(componentList) && componentList.length <= this.layerlimit - 1) {
                const valid = componentList.every(e => e in this.components);
                if (!valid) {
                    throw "setLayers contains an invalid component name.";
                    return;
                }

                this.layersOrder = componentList;
                this.layersOrder.unshift(null);
            } else if (!(Array.isArray(componentList))) {
                throw "TypeError: Argument requires a list of component names.";
            } else {
                throw "Maximum number of layers exceeded!";
            }

            if (this.madeDiagram) {
                this.updateAllLayers();
            }
        },

        shiftLayerUp: function (e) {
            const index = e.target.parentElement.parentElement.style.zIndex - 1;

            if (index < this.layers - 1) {
                const temp = this.layersOrder[index];
                this.layersOrder[index] = this.layersOrder[index + 1];
                this.layersOrder[index + 1] = temp;
            }

            this.updateAllLayers();
        },

        shiftLayerDown: function (e) {
            const index = e.target.parentElement.parentElement.style.zIndex - 1;

            if (index > 1) {
                const temp = this.layersOrder[index];
                this.layersOrder[index] = this.layersOrder[index - 1];
                this.layersOrder[index - 1] = temp;
            }

            this.updateAllLayers();
        },

        removeLayer: function (e) {
            const index = e.target.parentElement.parentElement.style.zIndex - 1;
            this.layersOrder.splice(index, 1);
            this.updateAllLayers();
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
                newlayer.addEventListener('dragstart', (e) => { this.draggeditem = { type: "layer", name: null, zindex: e.target.style.zIndex }; this.fanout(); });
            }

            const image = document.createElement("img");
            image.className = "layerimage";

            if (this.orientation == "vertical") {
                newlayer.style.paddingLeft = "5%";

                if (this.diagramheight == null) {
                    image.style = `width: 100%;`;
                } else {
                    image.style = `width: calc(100% - 10px)`;
                }
            } else {
                newlayer.style.paddingTop = "2%";
                image.style.height = "100%";
            }

            //events
            if (this.allowEdit) {
                image.ondragenter = (e) => { this.dragComponent(e); };
                image.ondragleave = (e) => { this.dragLeaveComponent(e); };
                image.addEventListener("dragover", function (e) { e.preventDefault() });
                image.ondrop = (e) => { this.dropComponent(e); this.draggeditem = null; };
            }
            if (!isDummy) {
                image.onclick = (e) => { this.popupShow(e) };
            }
            image.draggable = false;

            newlayer.append(image);
            diagram.prepend(newlayer);

            if (!isDummy && this.allowEdit) {
                const menu = document.createElement("div");
                menu.style.visibility = "hidden";

                const button1 = document.createElement("img");
                button1.className = "menubutton";

                const button2 = document.createElement("img");
                button2.className = "menubutton";

                const button3 = document.createElement("img");
                button3.className = "menubutton";

                if (this.orientation === "vertical") {
                    menu.className = "verticalmenu";

                    button1.src = 'images/up_arrow.png';
                    button2.src = 'images/down_arrow.png';
                    button3.src = 'images/xbutton.png';
                } else {
                    menu.className = "horizontalmenu";

                    button1.src = 'images/left_arrow.png';
                    button2.src = 'images/right_arrow.png';
                    button3.src = 'images/xbutton.png';
                }

                newlayer.append(menu);
                menu.append(button1);
                menu.append(button2);
                menu.append(button3);

                // button events
                button1.onclick = (e) => { this.shiftLayerUp(e) };
                button2.onclick = (e) => { this.shiftLayerDown(e) };
                button3.onclick = (e) => { this.removeLayer(e) };

                button1.onmouseenter = () => {
                    button1.src = (this.orientation === "vertical") ? 'images/up_arrow_hover.png' : 'images/left_arrow_hover.png';
                }

                button1.onmouseleave = () => {
                    button1.src = (this.orientation === "vertical") ? 'images/up_arrow.png' : 'images/left_arrow.png';
                }

                button2.onmouseenter = () => {
                    button2.src = (this.orientation === "vertical") ? 'images/down_arrow_hover.png' : 'images/right_arrow_hover.png';
                }

                button2.onmouseleave = () => {
                    button2.src = (this.orientation === "vertical") ? 'images/down_arrow.png' : 'images/right_arrow.png';
                }

                button3.onmouseenter = () => {
                    button3.src = 'images/xbutton_hover.png';
                }

                button3.onmouseleave = () => {
                    button3.src = 'images/xbutton.png';
                }

                // layer events for menu
                newlayer.onmouseenter = (e) => {
                    let obj = e.target;
                    if (obj.className != "layer") {
                        if (obj.parentElement.className == "layer") {
                            obj = obj.parentElement;
                        } else {
                            return;
                        }
                    }

                    Array.from(obj.querySelectorAll(".verticalmenu")).forEach((c) => {
                        c.style.visibility = "visible";
                    });

                    Array.from(obj.querySelectorAll(".horizontalmenu")).forEach((c) => {
                        c.style.visibility = "visible";
                    });
                }

                newlayer.onmouseleave = (e) => {
                    let obj = e.target;
                    if (obj.className != "layer") {
                        if (obj.parentElement.className == "layer") {
                            obj = obj.parentElement;
                        } else {
                            return;
                        }
                    }

                    Array.from(obj.querySelectorAll(".verticalmenu")).forEach((c) => {
                        c.style.visibility = "hidden";
                    });

                    Array.from(obj.querySelectorAll(".horizontalmenu")).forEach((c) => {
                        c.style.visibility = "hidden";
                    });
                }
            }


            this.layers++;
        },

        removeTopLayer: function () {
            $(`#${this.id} .diagram`).children()[0].remove();
            this.layers -= 1;
        },

        collapse: function (ignoreIndex = -1) {
            // Compress the layers in the diagram to the top

            let overlap = 0;

            const layers = $(`#${this.id} .diagram`).children();

            if (this.orientation == "vertical") {
                let tallest = 0;

                for (let i = this.layers - 2; i > 0; --i) {
                    let overlapPercent = 0;
                    if (i != ignoreIndex) {
                        overlapPercent = this.components[this.layersOrder[i]].overlap;
                    }

                    if (layers[this.layers - i - 1].offsetHeight > tallest) {
                        tallest = layers[this.layers - i - 1].offsetHeight;
                    }

                    overlap -= layers[this.layers - i - 1].offsetHeight * overlapPercent / 100.0;
                    overlap -= layers[this.layers - i - 2].offsetHeight * this.components[this.layersOrder[i + 1]].start / 100.0;

                    layers[this.layers - i - 1].style.transform = `translateY(${overlap}px)`;
                }

                if (this.layers > 1) {
                    overlap -= layers[this.layers - 1].offsetHeight * this.components[this.layersOrder[this.layers - 1]].start / 100.0;

                    layers[this.layers - 1].style.transform = `translateY(${overlap}px)`;
                }

                $(`#${this.id} .diagram`)[0].style.paddingTop = Math.max(0, tallest - layers[0].offsetHeight) + "px";

            } else {
                let longest = 0;

                for (let i = this.layers - 2; i > 0; --i) {
                    let overlapPercent = 0;
                    if (i != ignoreIndex) {
                        overlapPercent = this.components[this.layersOrder[i]].overlap;
                    }

                    if (layers[this.layers - i - 1].offsetWidth > longest) {
                        longest = layers[this.layers - i - 1].offsetWidth;
                    }

                    overlap -= layers[this.layers - i - 1].offsetWidth * overlapPercent / 100.0;
                    overlap -= layers[this.layers - i - 2].offsetWidth * this.components[this.layersOrder[i + 1]].start / 100.0;

                    layers[this.layers - i - 1].style.transform = `translateX(${overlap}px)`;
                }

                if (this.layers > 1) {
                    overlap -= layers[this.layers - 1].offsetWidth * this.components[this.layersOrder[this.layers - 1]].start / 100.0;

                    layers[this.layers - 1].style.transform = `translateX(${overlap}px)`;
                }

                $(`#${this.id} .diagram`)[0].style.paddingLeft = Math.max(0, longest - layers[0].offsetWidth) + "px";
            }
        },

        fanout: function () {
            // Fan out the layers in the diagram

            $(`#${this.id} .diagram`).children().each((i, c) => {
                if (this.orientation === "vertical") {
                    c.style.transform = "translateY(0%)";
                } else {
                    c.style.transform = "translateX(0%)";
                }
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

            if (this.draggeditem.zindex != index) {
                if (index < this.layers) {
                    if (this.orientation === "vertical") {
                        const shiftup = $(`#${this.id} .diagram`).children()[this.layers - index - 1].offsetHeight * 0.5;
                        $(`#${this.id} .diagram`).children()[this.layers - index - 1].style.transform = `translateY(-${shiftup}px)`;
                    } else {
                        const shiftleft = $(`#${this.id} .diagram`).children()[this.layers - index - 1].offsetWidth * 0.5;
                        $(`#${this.id} .diagram`).children()[this.layers - index - 1].style.transform = `translateX(-${shiftleft}px)`;
                    }
                }
                
                const img = document.createElement("img");
                img.className = "ghost";
                img.src = this.components[component].image;
                img.style = `position: absolute; opacity: 0.5;`;

                if (this.orientation === "vertical") {
                    img.style.width = this.components[component].size + "%";
                    img.style.bottom = "80%";
                    img.style.right = "0%";
                } else {
                    img.style.height = this.components[component].size + "%";
                    img.style.bottom = "0%";
                    img.style.right = "80%";
                }

                $(`#${this.id} .diagram`).children()[this.layers - index].appendChild(img);
            }
        },

        dragLeaveComponent: function (e) {
            // When dragging component leaves a layer
            Array.from(e.target.parentElement.querySelectorAll(".ghost")).forEach((c) => {
                c.remove();
            })

            const index = e.target.parentElement.style.zIndex;
            if (index < this.layers) {
                if (this.orientation === "vertical") {
                    $(`#${this.id} .diagram`).children()[this.layers - index - 1].style.transform = "translateY(0%)";
                } else {
                    $(`#${this.id} .diagram`).children()[this.layers - index - 1].style.transform = "translateX(0%)";
                }
            }
        },

        dropComponent: function (e) {
            // Drop a dragged component/layer into diagram

            e.preventDefault();

            const droploc = e.target;

            if (this.draggeditem.type == "new") {
                if (this.layersOrder.length >= this.layerlimit) {
                    const alertdiv = document.createElement("div");
                    alertdiv.className = "alert";
                    alertdiv.innerText = "Maximum number of allowed layers in the diagram reached!";

                    alertdiv.append(document.createElement("br"));

                    const okaybutton = document.createElement("button");
                    okaybutton.className = "okaybutton";
                    okaybutton.innerText = "Okay";
                    alertdiv.append(okaybutton);

                    $('body').append(alertdiv);

                    // Alert events
                    okaybutton.onclick = (e) => { e.target.parentElement.remove() };

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

            this.dragLeaveComponent(e);

            this.updateAllLayers();
        },

        dropComponentInSidebar: function (e) {
            // Dragging a component to the sidebar to remove it from diagram
            e.preventDefault();

            if (this.draggeditem.type == "layer") {
                const index = parseInt(this.draggeditem.zindex) - 1;

                this.layersOrder.splice(index, 1);

                this.updateAllLayers();
            }
        },

        updateAllLayers: function () {
            // Update all diagram layers according to layersOrder list

            if (this.layers > this.layersOrder.length) {
                const iter = this.layers - this.layersOrder.length;
                for (let i = 0; i < iter; ++i) {
                    this.removeTopLayer();
                }

            } else if (this.layers < this.layersOrder.length) {
                const iter = this.layersOrder.length - this.layers;
                for (let i = 0; i < iter; ++i) {
                    if (this.layers == 0) {
                        this.addDiagramLayer(true);
                    } else {
                        this.addDiagramLayer(false);
                    }
                }
            }

            let index = 0;
            $(`#${this.id} .diagram`).children().each((i, c) => {
                if (this.layersOrder[this.layers - index - 1] != null) {
                    c.children[0].src = this.components[this.layersOrder[this.layers - index - 1]].image;
                    c.children[0].style.position = "relative";

                    if (this.orientation == "vertical") {
                        c.children[0].style.width = this.components[this.layersOrder[this.layers - index - 1]].size + '%';

                        const align = this.components[this.layersOrder[this.layers - index - 1]].alignment;
                        if (!isNaN(align)) {
                            c.children[0].style.left = `${align}%`;
                        } else if (align == "left") {
                            c.children[0].style.left = 0;
                        } else if (align == "right") {
                            c.children[0].style.left = `calc(100% - ${this.components[this.layersOrder[this.layers - index - 1]].size}%)`;
                        } else {
                            c.children[0].style.left = `calc((100% - ${this.components[this.layersOrder[this.layers - index - 1]].size}%) / 2)`;
                        }

                    } else {
                        c.children[0].style.height = this.components[this.layersOrder[this.layers - index - 1]].size + '%';

                        const align = this.components[this.layersOrder[this.layers - index - 1]].alignment;
                        if (!isNaN(align)) {
                            c.children[0].style.top = `${align}%`;
                        } else if (align == "top") {
                            c.children[0].style.top = 0;
                        } else if (align == "bottom") {
                            c.children[0].style.top = `calc(100% - ${this.components[this.layersOrder[this.layers - index - 1]].size}%)`;
                        } else {
                            c.children[0].style.top = `calc((100% - ${this.components[this.layersOrder[this.layers - index - 1]].size}%) / 2)`;
                        }
                    }

                } else {
                    c.children[0].src = this.dummy[this.orientation].image;
                    c.children[0].style.opacity = 0;
                }
                index += 1;
            });

            this.updateAllSidebar();
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
                    popupcontent.innerHTML = this.components[this.layersOrder[obj.style.zIndex - 1]].description;
                }
                else {
                    popupcontent.innerHTML = "There is no description.";
                }

            } else if (obj.className == "sidebarcomponent") {
                //popup.className = "show";
                popupheadercontent.innerText = obj.id;

                if (this.components[obj.id].description != null && this.components[obj.id].description != "") {
                    popupcontent.innerHTML = this.components[obj.id].description;
                } else {
                    popupcontent.innerHTML = "There is no description.";
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

        getAllLayers: function () {
            return this.layersOrder.slice(1);
        },

        getAllComponents: function () {
            return this.components;
        },

        getAllSidebarComponents: function () {
            return this.sidebar;
        }
    }


    global.LayersDiagram = global.LayersDiagram || LayersDiagram

})(window, window.document, $);