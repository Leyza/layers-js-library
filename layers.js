
function LayersDiagram(allowEdit=true) {
    this.layers = 0;
    this.layersOrder = [];
    this.components = {};
    this.allowEdit = allowEdit;
    this.sidebar = [];
}

LayersDiagram.prototype = {
    addComponent: function (putInSidebar) {

    }

    addComponentNutritionalInfo: function (componentName, calories=null, protein=null, satFat=null, totFat=null, sugars=null, totalCarb=null, fibre=null, sodium=null, other=null) {

    }

    addComponentPriceInfo: function (componentName, price) {

    }

    addComponentDescription: function (componentName, description="") {

    }

    addLayer: function () {

    }

    moveLayer: function () {

    }
}
