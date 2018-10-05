"use strict";

sap.ui.define(["sap/ui/core/mvc/Controller"], function (Controller) {
  "use strict";

  return Controller.extend("sap.ui.demo.fiori2.controller.Detail", {
    onInit: function onInit() {
      this.oOwnerComponent = this.getOwnerComponent();
      this.oRouter = this.oOwnerComponent.getRouter();
      this.oModel = this.oOwnerComponent.getModel();
      this.oRouter.getRoute("master").attachPatternMatched(this._onProductMatched, this);
      this.oRouter.getRoute("detail").attachPatternMatched(this._onProductMatched, this);
    },
    onSupplierPress: function onSupplierPress(oEvent) {
      var supplierPath = oEvent.getSource().getBindingContext("products").getPath();
      var supplier = supplierPath.split("/").slice(-1).pop();
      var oNextUIState = this.oOwnerComponent.getHelper().getNextUIState(2);
      this.oRouter.navTo("detailDetail", {
        layout: oNextUIState.layout,
        supplier: supplier
      });
    },
    _onProductMatched: function _onProductMatched(oEvent) {
      this._product = oEvent.getParameter("arguments").product || this._product || "0";
      this.getView().bindElement({
        path: "/ProductCollection/" + this._product,
        model: "products"
      });
    },
    onEditToggleButtonPress: function onEditToggleButtonPress() {
      var oObjectPage = this.getView().byId("ObjectPageLayout");
      var bCurrentShowFooterState = oObjectPage.getShowFooter();
      oObjectPage.setShowFooter(!bCurrentShowFooterState);
    },
    handleFullScreen: function handleFullScreen() {
      var sNextLayout = this.oModel.getProperty("/actionButtonsInfo/midColumn/fullScreen");
      this.oRouter.navTo("detail", {
        layout: sNextLayout,
        product: this._product
      });
    },
    handleExitFullScreen: function handleExitFullScreen() {
      var sNextLayout = this.oModel.getProperty("/actionButtonsInfo/midColumn/exitFullScreen");
      this.oRouter.navTo("detail", {
        layout: sNextLayout,
        product: this._product
      });
    },
    handleClose: function handleClose() {
      var sNextLayout = this.oModel.getProperty("/actionButtonsInfo/midColumn/closeColumn");
      this.oRouter.navTo("master", {
        layout: sNextLayout
      });
    },
    onExit: function onExit() {
      this.oRouter.getRoute("master").detachPatternMatched(this._onProductMatched, this);
      this.oRouter.getRoute("detail").detachPatternMatched(this._onProductMatched, this);
    }
  });
}, true);