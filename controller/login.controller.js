sap.ui.define([
    "List/controller/BaseController",
    "sap/ui/core/Fragment",
    "sap/ui/model/json/JSONModel",
    "sap/m/Dialog",
    "sap/m/Button",
    "sap/m/MessageToast"
], function(BaseController, Fragment, JSONModel, Dialog, Button, MessageToast) {
    "use strict";

    return BaseController.extend("List.controller.login", {
      _onBindingChanged: function() {
        var oTable = this.getView().byId("tableControl");
        //Template para los elementos de la tabla:
        var oTemplate = new sap.m.ColumnListItem({
          cells: [
            new sap.m.Text({
              text: "{data>APPLICATIONAGE/}"
            }),
            new sap.m.Text({
              text: "{data>SUPPLY/NAME/}"
            }),
            new sap.m.Text({
              text: "{data>SUPPLY/PRESENTATION/} - {data>SUPPLY/DOSE/} {data>SUPPLY/MUNIT/}"
            }),
            new sap.m.Text({
              text: "{data>SUPPLY/APPLICATIONMETHOD/}"
            }),
            new sap.m.Text({
              text: "{data>APPLIEDQUANTITY/}"
            }),
            new sap.m.Text({
              text: {
                parts: [
                  "data>APPLICATIONDATE/"
                ],
                formatter: formatter.formatDate
              }
            })
          ]
        });

        //Limpiamos el binding de la tabla:
        oTable.unbindItems();

        //Le hacemos bind a la tabla para que muestre las actividades semanales:
        oTable.bindItems("data>/records/", oTemplate);
      },
        onInit: function() {
          this.getView().byId("clientId").setValue("");
          this.getView().byId("email").setValue("");
          this.getView().byId("password").setValue("");
        },
        onLogin: function(oEvent) {
          //
          //var clientId = this.getView().byId("CLIENID").getFields()[0].getValue();
          var clientId = this.getView().byId("clientId").getValue();
          var email = this.getView().byId("email").getValue();
          var password = this.getView().byId("password").getValue();
          var loginData = {};
          var that = this;

          // Validación:
          if ( clientId === "" || email === "" || password === "" ) {
            MessageToast.show('Fill in the fields', {
               duration: 4500,
               width: "45%"
            });
          } else {

            loginData.client = clientId;
            loginData.email = email;
            loginData.password = password;

            $.ajax({
    		       url: "http://localhost:3000/user/login",
    		       method: "POST",
               crossDomain: true,
               contentType: "application/json",
               dataType: "json",
               data: JSON.stringify(loginData),
    		       success: function(response) {                
                if(response.acceptedLogin === true) {
                  that.getView().getModel("data").setProperty('/Logged/', true);
                  that.getRouter().navTo("home", {}, false);
                } else {
                  MessageToast.show("We don't recognize this Client ID, Email or password", {
                     duration: 4500,
                     width: "45%"
                  });
                }
    				   },
    		       error: function(error) {
                  console.log('Error');
                  console.log(error);
    		       }
						});
          }
        }
    });

});
