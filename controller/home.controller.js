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

        onInit: function() {
          console.log('soy home');
        }
    });

});
