sap.ui.define([
	"sap/ui/core/UIComponent",
	"sap/ui/Device",
	"List/model/models"
], function(UIComponent,Device,models) {
	"use strict";

	return UIComponent.extend("List.Component", {

		metadata: {
			manifest: "json"
		},
		/**
		 * The component is initialized by UI5 lly during the startup of the app and calls the init method once.
		 * In this function, the FLP and device models are set and the router is initialized.
		 * @public
		 * @override
		 */
		init: function() {
			UIComponent.prototype.init.apply(this, arguments);

			// initialize the error handler with the component
			//this._oErrorHandler = new ErrorHandler(this);

			// set the device model
			//this.setModel(models.createDeviceModel(), "device");
			this.getRouter().initialize();
		}
	});

});
