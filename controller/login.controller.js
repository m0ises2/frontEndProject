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
            console.log('Lo mando al backend: ', loginData);

            $.ajax({
    		       url: "http://localhost:3000/user/login",
    		       method: "POST",
               crossDomain: true,
               contentType: "application/json",
               dataType: "json",
               data: JSON.stringify(loginData),
    		       success: function(response) {
                console.log(response);
                if(response.acceptedLogin === true) {
                  that.getView().getModel("data").setProperty('/Logged/', true);
                  console.log(that.getView().getModel("data"));
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
