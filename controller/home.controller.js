sap.ui.define([
    "List/controller/BaseController",
    "sap/ui/core/Fragment",
    "sap/ui/model/json/JSONModel",
    "sap/m/Dialog",
    "sap/m/Button",
    "sap/m/MessageToast"
], function(BaseController, Fragment, JSONModel, Dialog, Button, MessageToast) {
    "use strict";

    return BaseController.extend("List.controller.home", {
        onItemPress: function(oEvent) {
          alert("presionado");
          console.log(oEvent.getParameter("listItem").getBindingContext("data").getObject());
        },
        onInit: function() {
          var oRouter = sap.ui.core.UIComponent.getRouterFor(this);

    			oRouter.getRoute("home").attachMatched(this._onRouteMatched, this);
        },
        _onRouteMatched: function() {
          var that = this;
          var oTable = this.getView().byId("donorsTable");

          $.ajax({
            async: true,
             url: "http://localhost:3000/donor/",
             method: "GET",
             success: function(result) {
               that.getView().getModel("data").setProperty('/donors/', result.donors);
               console.log(that.getView().getModel("data"));
             },
             error: function(error) {
               console.log(error);
             }
          });

    			//Template para los elementos de la tabla:
    			var oTemplate = new sap.m.ColumnListItem({
    				cells: [
    					new sap.m.Text({
    						text: "{data>name/}"
    					}),
    					new sap.m.Text({
    						text: "{data>lastname/}"
    					}),
    					new sap.m.Text({
    						text: "{data>email}"
    					}),
    					new sap.m.Text({
    						text: "{data>birthdate}"
    					}),
    					new sap.m.Text({
    						text: "{data>phone/}"
    					}),
    					new sap.m.Text({
    						text: "{data>gender/}"
    					})
    				]
    			});

    			//Limpiamos el binding de la tabla:
    			oTable.unbindItems();

    			//Le hacemos bind a la tabla para que muestre las actividades semanales:
    			oTable.bindItems("data>/donors/", oTemplate);
        },
        onLogout: function() {
    			var oHistory, sPreviousHash;
    			var router = sap.ui.core.UIComponent.getRouterFor(this);

    			oHistory = sap.ui.core.routing.History.getInstance();
    			sPreviousHash = oHistory.getPreviousHash();

          this.getView().getModel("data").setProperty('/Logged/', false);

    			if (sPreviousHash !== undefined) {
    				window.history.go(-1);
    			} else {
    				router.navTo("login", {}, false /*no history*/ );
    			}
    		},
        onTest: function() {
          window.location.replace('http://localhost:3000/donor/orderedDonors');
        }
    });
});
