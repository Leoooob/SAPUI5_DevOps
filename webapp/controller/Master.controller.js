"use strict";

sap.ui.define(["sap/ui/model/json/JSONModel", "sap/ui/core/mvc/Controller", "sap/ui/model/Filter", "sap/ui/model/FilterOperator", 'sap/ui/model/Sorter', 'sap/m/MessageBox'], function (JSONModel, Controller, Filter, FilterOperator, Sorter, MessageBox) {
  "use strict";

  return Controller.extend("sap.ui.demo.fiori2.controller.Master", {
    onInit: function onInit() {
      this.oView = this.getView();
      this._bDescendingSort = false;
      this.oProductsTable = this.oView.byId("productsTable");
      this.oRouter = this.getOwnerComponent().getRouter();
    },
    onSearch: function onSearch(oEvent) {
      var oTableSearchState = [];
      var sQuery = oEvent.getParameter("query");

      if (sQuery && sQuery.length > 0) {
        oTableSearchState = [new Filter("Name", FilterOperator.Contains, sQuery)];
      }

      this.oProductsTable.getBinding("items").filter(oTableSearchState, "Application");
    },
    onAdd: function onAdd() {
      MessageBox.show("This functionality is not ready yet.", {
        icon: MessageBox.Icon.INFORMATION,
        title: "Aw, Snap!",
        actions: [MessageBox.Action.OK]
      });
    },
    onSort: function onSort() {
      this._bDescendingSort = !this._bDescendingSort;
      var oBinding = this.oProductsTable.getBinding("items");
      var oSorter = new Sorter("Name", this._bDescendingSort);
      oBinding.sort(oSorter);
    },
    onListItemPress: function onListItemPress(oEvent) {
      var productPath = oEvent.getSource().getBindingContext("products").getPath();
      var product = productPath.split("/").slice(-1).pop();
      var oNextUIState = this.getOwnerComponent().getHelper().getNextUIState(1);
      this.oRouter.navTo("detail", {
        layout: oNextUIState.layout,
        product: product
      });
    }
  });
}, true);