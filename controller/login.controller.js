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

        onInit: function() {

        },
        onLogin: function(oEvent) {
          //var clientId = this.getView().byId("CLIENID").getFields()[0].getValue();
          var clientId = this.getView().byId("clientId").getValue();
          var email = this.getView().byId("email").getValue();
          var password = this.getView().byId("password").getValue();
          var loginData = {};

          // Validación:
          if ( clientId === "" || email === "" || password === "" ) {
            MessageToast.show('Fill in the fields', {
               duration: 4500,
               width: "45%"
            });
          } else {
            console.log('Llamada AJAX al backend para logear al usuario.');
            loginData.clienId = clientId;
            loginData.email = email;
            loginData.password = password;
            console.log('Lo mando al backend: ', loginData);
            this.getRouter().navTo("home", {}, false);
          }

        }
    });

});
