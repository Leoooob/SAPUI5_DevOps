"use strict";

sap.ui.define(["sap/ui/model/json/JSONModel", "sap/ui/core/mvc/Controller"], function (JSONModel, Controller) {
  "use strict";

  return Controller.extend("sap.ui.demo.fiori2.controller.DetailDetail", {
    onInit: function onInit() {
      this.oOwnerComponent = this.getOwnerComponent();
      this.oRouter = this.oOwnerComponent.getRouter();
      this.oModel = this.oOwnerComponent.getModel();
      this.oRouter.getRoute("detailDetail").attachPatternMatched(this._onSupplierMatched, this);
    },
    handleAboutPress: function handleAboutPress() {
      var oNextUIState = this.oOwnerComponent.getHelper().getNextUIState(3);
      this.oRouter.navTo("page2", {
        layout: oNextUIState.layout
      });
    },
    _onSupplierMatched: function _onSupplierMatched(oEvent) {
      this._supplier = oEvent.getParameter("arguments").supplier || this._supplier || "0";
      this.getView().bindElement({
        path: "/ProductCollectionStats/Filters/1/values/" + this._supplier,
        model: "products"
      });
    },
    handleFullScreen: function handleFullScreen() {
      var sNextLayout = this.oModel.getProperty("/actionButtonsInfo/endColumn/fullScreen");
      this.oRouter.navTo("detailDetail", {
        layout: sNextLayout,
        supplier: this._supplier
      });
    },
    handleExitFullScreen: function handleExitFullScreen() {
      var sNextLayout = this.oModel.getProperty("/actionButtonsInfo/endColumn/exitFullScreen");
      this.oRouter.navTo("detailDetail", {
        layout: sNextLayout,
        supplier: this._supplier
      });
    },
    handleClose: function handleClose() {
      var sNextLayout = this.oModel.getProperty("/actionButtonsInfo/endColumn/closeColumn");
      this.oRouter.navTo("master", {
        layout: sNextLayout
      });
    },
    onExit: function onExit() {
      this.oRouter.getRoute("detailDetail").detachPatternMatched(this._onSupplierMatched, this);
    }
  });
}, true);