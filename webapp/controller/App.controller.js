"use strict";

sap.ui.define(["sap/ui/model/json/JSONModel", "sap/ui/core/mvc/Controller"], function (JSONModel, Controller) {
  "use strict";

  return Controller.extend("sap.ui.demo.fiori2.controller.App", {
    onInit: function onInit() {
      this.oOwnerComponent = this.getOwnerComponent();
      this.oRouter = this.oOwnerComponent.getRouter();
      this.oRouter.attachRouteMatched(this.onRouteMatched, this);
      this.oRouter.attachBeforeRouteMatched(this.onBeforeRouteMatched, this);
    },
    onBeforeRouteMatched: function onBeforeRouteMatched(oEvent) {
      var oModel = this.oOwnerComponent.getModel();
      var sLayout = oEvent.getParameters().arguments.layout;
      var oNextUIState; // If there is no layout parameter, query for the default level 0 layout (normally OneColumn)

      if (!sLayout) {
        oNextUIState = this.oOwnerComponent.getHelper().getNextUIState(0);
        sLayout = oNextUIState.layout;
      }

      oModel.setProperty("/layout", sLayout);
    },
    onRouteMatched: function onRouteMatched(oEvent) {
      var sRouteName = oEvent.getParameter("name");
      var oArguments = oEvent.getParameter("arguments");

      this._updateUIElements(); // Save the current route name


      this.currentRouteName = sRouteName;
      this.currentProduct = oArguments.product;
      this.currentSupplier = oArguments.supplier;
    },
    onStateChanged: function onStateChanged(oEvent) {
      var bIsNavigationArrow = oEvent.getParameter("isNavigationArrow");
      var sLayout = oEvent.getParameter("layout");

      this._updateUIElements(); // Replace the URL with the new layout if a navigation arrow was used


      if (bIsNavigationArrow) {
        this.oRouter.navTo(this.currentRouteName, {
          layout: sLayout,
          product: this.currentProduct,
          supplier: this.currentSupplier
        }, true);
      }
    },
    // Update the close/fullscreen buttons visibility
    _updateUIElements: function _updateUIElements() {
      var oModel = this.oOwnerComponent.getModel();
      var oUIState = this.oOwnerComponent.getHelper().getCurrentUIState();
      oModel.setData(oUIState);
    },
    onExit: function onExit() {
      this.oRouter.detachRouteMatched(this.onRouteMatched, this);
      this.oRouter.detachBeforeRouteMatched(this.onBeforeRouteMatched, this);
    }
  });
}, true);