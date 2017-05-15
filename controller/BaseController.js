sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"sap/ui/core/routing/History",
	"sap/ui/model/Filter"
], function(Controller,History,Filter) {
	"use strict";
	return Controller.extend("List.controller.BaseController", {
		getRouter: function() {
			return sap.ui.core.UIComponent.getRouterFor(this);
		},
		getModel: function(sName) {
			return this.getView().getModel(sName);
		},
		setModel: function(oModel, sName) {
			return this.getView().setModel(oModel, sName);
		},
		onNavBack: function(oEvent) {
			this.getRouter().navTo("sheds", {}, true /*no history*/ );
		}
	});
});
