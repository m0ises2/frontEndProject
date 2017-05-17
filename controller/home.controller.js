sap.ui.define([
    "List/controller/BaseController",
    "sap/ui/core/Fragment",
    "sap/ui/model/json/JSONModel",
    "sap/m/Dialog",
    "sap/m/Button",
    "sap/m/MessageToast",
    'sap/ui/model/Filter'
], function(BaseController, Fragment, JSONModel, Dialog, Button, MessageToast, Filter) {
    "use strict";

    return BaseController.extend("List.controller.home", {
        _saveSuscription: function( suscription ) {
          var that = this;
          $.ajax({
            async: true,
             url: "http://localhost:3000/suscription/",
             method: "POST",
             data: JSON.stringify(suscription),
             contentType: "application/json",
             dataType: "json",
             success: function(result) {
               if ( result.suscription ) {
                 MessageToast.show("Suscription Created", {
                    duration: 4500,
                    width: "35%"
                 });
                 that._onBindingChanged2();
               } else {
                 MessageToast.show("Error creating the Suscription", {
                    duration: 4500,
                    width: "35%"
                 });
               }
             },
             error: function(error) {
               MessageToast.show("Error", {
                  duration: 4500,
                  width: "35%"
               });
             }
          });
        },
        onNewSuscription: function() {
          var dialog = sap.ui.xmlfragment("List.view.fragmento4", this);
          var that = this;

          /*Agregamos los events listeners a los botones: */
          //Botón add:
          sap.ui.getCore().byId("createBtn2").attachPress(function() {
          var suscriptToCreate = {
              donorId: sap.ui.getCore().byId("donorSelect").getSelectedKey(),
              amount: sap.ui.getCore().byId("amount2").getValue(),
              initData: sap.ui.getCore().byId("initDate2").getDateValue(),
              lastDigits: sap.ui.getCore().byId("lastDigits2").getValue(),
              brandCard: sap.ui.getCore().byId("brandCard2").getSelectedKey(),
              typeCard: sap.ui.getCore().byId("typeCard2").getSelectedKey()
            }

            console.log(suscriptToCreate);

            if( suscriptToCreate.amount === "" ||
                suscriptToCreate.initData === "" ||
                suscriptToCreate.lastDigits === ""
            ) {

              MessageToast.show("Fill in the fields", {
                 duration: 4500,
                 width: "35%"
              });
            } else {
              that._saveSuscription(suscriptToCreate);
              dialog.close();
              dialog.destroy();
            }
          });

          //Botón cancelar:
          sap.ui.getCore().byId("cancelBtn2").attachPress(function() {
            dialog.close();
            dialog.destroy();
          });

          //Al cerrar el dialogo con la tecla ESC, es necesario indicarle que se destruya:
          dialog.attachAfterClose(function() {
            dialog.destroy();
          });

          //Agregamos como dependiente el dialogo a la vista:
          this.getView().addDependent(dialog);

          //Abrimos el dialogo:
          dialog.open();
        },
        _saveChanges2: function( suscription, suscriptionId ) {
          console.log(suscriptionId);
          var that = this;
          $.ajax({
            async: true,
             url: "http://localhost:3000/suscription/" + suscriptionId,
             method: "PUT",
             data: JSON.stringify(suscription),
             contentType: "application/json",
            dataType: "json",
             success: function(result) {
               if ( result.suscription ) {
                 MessageToast.show("Changes saved", {
                    duration: 4500,
                    width: "35%"
                 });
                 that._onBindingChanged2();
               } else {
                 MessageToast.show("Error saving changes", {
                    duration: 4500,
                    width: "35%"
                 });
               }
             },
             error: function(error) {
               MessageToast.show("Error", {
                  duration: 4500,
                  width: "35%"
               });
             }
          });
        },
        _onBindingChanged2: function() {
          var oTable2 = this.getView().byId("suscriptionTable");
          var that = this;

          $.ajax({
            async: true,
             url: "http://localhost:3000/suscription/",
             method: "GET",
             success: function(result) {
               that.getView().getModel("data").setProperty('/suscriptions/', result.suscriptions);
             },
             error: function(error) {
               console.log(error);
             }
          });

          //Template para los elementos de la tabla de donors:
          var oTemplate2 = new sap.m.ColumnListItem({
            cells: [
              new sap.m.Text({
                text: "{data>donorId/name/}"
              }),
              new sap.m.Text({
                text: "{data>donorId/lastname/}"
              }),
              new sap.m.Text({
                text: "{data>amount}"
              }),
              new sap.m.Text({
                text: "{data>typeCard}"
              }),
              new sap.m.Text({
                text: "{data>brandCard/}"
              }),
              new sap.m.Text({
                text: "{data>lastDigits/}"
              }),
              new sap.m.Text({
                text: "{data>initData/}"
              })
            ]
          });

          //Limpiamos el binding de la tabla:
          oTable2.unbindItems();

          //Le hacemos bind a la tabla para que muestre las actividades semanales:
          oTable2.bindItems("data>/suscriptions/", oTemplate2);
        },
        _deleteSuscription: function( suscription ) {
          console.log(suscription);
          var that = this;
          $.ajax({
            async: true,
             url: "http://localhost:3000/suscription/" + suscription.suscriptionId,
             method: "DELETE",
             success: function(result) {
               if ( result.suscription ) {
                 MessageToast.show("Deleted", {
                    duration: 4500,
                    width: "35%"
                 });
                 that._onBindingChanged2();
               } else {
                 MessageToast.show("Not Deleted", {
                    duration: 4500,
                    width: "35%"
                 });
               }
             },
             error: function(error) {
               MessageToast.show("Error", {
                  duration: 4500,
                  width: "35%"
               });
             }
          });
        },
        onNewDonor: function(oEvent) {
          var dialog = sap.ui.xmlfragment("List.view.fragmento2", this);
          var that = this;

          /*Agregamos los events listeners a los botones: */
          //Botón add:
          sap.ui.getCore().byId("createBtn").attachPress(function() {
            var donorToCreate = {
              name: sap.ui.getCore().byId("name2").getValue(),
              lastname: sap.ui.getCore().byId("lastname2").getValue(),
              email: sap.ui.getCore().byId("email2").getValue(),
              birthdate: sap.ui.getCore().byId("birthdate2").getDateValue(),
              phone: sap.ui.getCore().byId("phone2").getValue(),
              gender: sap.ui.getCore().byId("gender2").getSelectedKey()
            }

            if(donorToCreate.name === "" || donorToCreate.lastname === "" || donorToCreate.email === "" || donorToCreate.birthdate === "" || donorToCreate.phone === "" || donorToCreate.gender === "") {
              MessageToast.show("Fill in the fields", {
                 duration: 4500,
                 width: "35%"
              });
            } else {
              that._saveDonor(donorToCreate);
              dialog.close();
              dialog.destroy();
            }
          });

          //Botón cancelar:
          sap.ui.getCore().byId("cancelBtn").attachPress(function() {
            dialog.close();
            dialog.destroy();
          });

          //Al cerrar el dialogo con la tecla ESC, es necesario indicarle que se destruya:
          dialog.attachAfterClose(function() {
            dialog.destroy();
          });

          //Agregamos como dependiente el dialogo a la vista:
          this.getView().addDependent(dialog);

          //Abrimos el dialogo:
          dialog.open();
        },
        _saveDonor: function( donor ) {
          var that = this;
          $.ajax({
            async: true,
             url: "http://localhost:3000/donor/",
             method: "POST",
             data: JSON.stringify(donor),
             contentType: "application/json",
             dataType: "json",
             success: function(result) {
               if ( result.donor ) {
                 MessageToast.show("Donor Created", {
                    duration: 4500,
                    width: "35%"
                 });
                 that._onBindingChanged();
               } else {
                 MessageToast.show("Error creating the donor", {
                    duration: 4500,
                    width: "35%"
                 });
               }
             },
             error: function(error) {
               MessageToast.show("Error", {
                  duration: 4500,
                  width: "35%"
               });
             }
          });
        },
        _saveChanges( donor, donorId ) {
          var that = this;
          $.ajax({
            async: true,
             url: "http://localhost:3000/donor/" + donorId,
             method: "PUT",
             data: JSON.stringify(donor),
             contentType: "application/json",
            dataType: "json",
             success: function(result) {
               if ( result.donor ) {
                 MessageToast.show("Changes saved", {
                    duration: 4500,
                    width: "35%"
                 });
                 that._onBindingChanged();
               } else {
                 MessageToast.show("Error saving changes", {
                    duration: 4500,
                    width: "35%"
                 });
               }
             },
             error: function(error) {
               MessageToast.show("Error", {
                  duration: 4500,
                  width: "35%"
               });
             }
          });
        },
        _onBindingChanged: function() {
          var that = this;
          var oTable = this.getView().byId("donorsTable");

          $.ajax({
            async: true,
             url: "http://localhost:3000/donor/",
             method: "GET",
             success: function(result) {
               that.getView().getModel("data").setProperty('/donors/', result.donors);

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
        _deleteDonor: function( donor ) {
          var that = this;
          $.ajax({
            async: true,
             url: "http://localhost:3000/donor/" + donor.donorId,
             method: "DELETE",
             success: function(result) {
               if ( result.donor ) {
                 MessageToast.show("Deleted", {
                    duration: 4500,
                    width: "35%"
                 });
                 that._onBindingChanged();
                 that._onBindingChanged2();

               } else {
                 MessageToast.show("Not Deleted", {
                    duration: 4500,
                    width: "35%"
                 });
               }
             },
             error: function(error) {
               MessageToast.show("Error", {
                  duration: 4500,
                  width: "35%"
               });
             }
          });
        },
        onSearch: function(oEvent) {
          var searchString = oEvent.getSource().getValue();
          // add filter for search
    			var aFilters = [];

    			if (searchString && searchString.length >= 1) {
            var filter = new Filter("name", sap.ui.model.FilterOperator.Contains, searchString);
    				aFilters.push(filter);
    			}

    			// update list binding
    			var oTable = this.getView().byId("donorsTable");
    			var binding = oTable.getBinding("items");
    			binding.filter(aFilters, "Application");
        },
        onItemPress: function(oEvent) {
          var donor = oEvent.getParameter("listItem").getBindingContext("data").getObject();

          var dialog = sap.ui.xmlfragment("List.view.fragmento", this);
          var that = this;
          var oModel = this.getView().getModel("data");

          sap.ui.getCore().byId("name").setValue(donor.name);
          sap.ui.getCore().byId("lastname").setValue(donor.lastname);
          sap.ui.getCore().byId("email").setValue(donor.email);
          sap.ui.getCore().byId("birthdate").setDateValue(new Date(donor.birthdate));
          sap.ui.getCore().byId("phone").setValue(donor.phone);
          sap.ui.getCore().byId("gender").setSelectedKey(donor.gender);

          /*Agregamos los events listeners a los botones: */
          //Botón add:
          sap.ui.getCore().byId("saveBtn").attachPress(function() {
            var donorToSave = {
              name: sap.ui.getCore().byId("name").getValue(),
              lastname: sap.ui.getCore().byId("lastname").getValue(),
              email: sap.ui.getCore().byId("email").getValue(),
              birthdate: sap.ui.getCore().byId("birthdate").getDateValue(),
              phone: sap.ui.getCore().byId("phone").getValue(),
              gender: sap.ui.getCore().byId("gender").getSelectedKey()
            }

            that._saveChanges(donorToSave, donor.donorId);
            dialog.close();
            dialog.destroy();
          });

          //Botón cancelar:
          sap.ui.getCore().byId("deleteBtn").attachPress(function() {

            that._deleteDonor( donor );

            dialog.close();
            dialog.destroy();
          });

          //Al cerrar el dialogo con la tecla ESC, es necesario indicarle que se destruya:
          dialog.attachAfterClose(function() {
            dialog.destroy();
          });

          //Agregamos como dependiente el dialogo a la vista:
          this.getView().addDependent(dialog);

          //Abrimos el dialogo:
          dialog.open();
        },
        onItemPress2: function(oEvent) {
          var suscription = oEvent.getParameter("listItem").getBindingContext("data").getObject();
          var dialog = sap.ui.xmlfragment("List.view.fragmento3", this);
          var that = this;
          var oModel = this.getView().getModel("data");

          sap.ui.getCore().byId("name3").setValue(suscription.donorId.name);
          sap.ui.getCore().byId("name3").setEnabled(false);
          sap.ui.getCore().byId("lastname3").setValue(suscription.donorId.lastname);
          sap.ui.getCore().byId("lastname3").setEnabled(false);
          sap.ui.getCore().byId("amount").setValue(suscription.amount);
          sap.ui.getCore().byId("initDate").setDateValue(new Date(suscription.initData));
          sap.ui.getCore().byId("lastDigits").setValue(suscription.lastDigits);
          sap.ui.getCore().byId("brandCard").setSelectedKey(suscription.brandCard);
          sap.ui.getCore().byId("typeCard").setSelectedKey(suscription.typeCard);

          /*Agregamos los events listeners a los botones: */
          //Botón add:
          sap.ui.getCore().byId("saveBtnSusc").attachPress(function() {
            var suscriptionToSave = {
              name: sap.ui.getCore().byId("name3").getValue(),
              lastname: sap.ui.getCore().byId("lastname3").getValue(),
              amount: sap.ui.getCore().byId("amount").getValue(),
              initData  : sap.ui.getCore().byId("initDate").getDateValue(),
              lastDigits: sap.ui.getCore().byId("lastDigits").getValue(),
              brandCard: sap.ui.getCore().byId("brandCard").getSelectedKey(),
              typeCard: sap.ui.getCore().byId("typeCard").getSelectedKey()
            }
            console.log(suscriptionToSave);

            that._saveChanges2(suscriptionToSave, suscription.suscriptionId);

            dialog.close();
            dialog.destroy();
          });

          //Botón cancelar:
          sap.ui.getCore().byId("deleteBtnSusc").attachPress(function() {

            that._deleteSuscription( suscription );

            dialog.close();
            dialog.destroy();
          });

          //Al cerrar el dialogo con la tecla ESC, es necesario indicarle que se destruya:
          dialog.attachAfterClose(function() {
            dialog.destroy();
          });

          //Agregamos como dependiente el dialogo a la vista:
          this.getView().addDependent(dialog);

          //Abrimos el dialogo:
          dialog.open();
        },
        onInit: function() {
          var oRouter = sap.ui.core.UIComponent.getRouterFor(this);

    			oRouter.getRoute("home").attachMatched(this._onRouteMatched, this);
        },
        _onRouteMatched: function() {
          var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
          var that = this;
          var oTable = this.getView().byId("donorsTable");
          var oTable2 = this.getView().byId("suscriptionTable");
          var aux = this.getView().getModel("data").getProperty("/Logged/");
          // Filtrar si recargan la página o vienen del home:
    			/*if (typeof aux === "undefined") {
    				oRouter.navTo("login", {}, false);
    			} else {*/
            $.ajax({
              async: true,
               url: "http://localhost:3000/donor/",
               method: "GET",
               success: function(result) {
                 that.getView().getModel("data").setProperty('/donors/', result.donors);
               },
               error: function(error) {
                 console.log(error);
               }
            });

            $.ajax({
              async: true,
               url: "http://localhost:3000/suscription/",
               method: "GET",
               success: function(result) {
                 that.getView().getModel("data").setProperty('/suscriptions/', result.suscriptions);
                 console.log(that.getView().getModel("data"));
               },
               error: function(error) {
                 console.log(error);
               }
            });

      			//Template para los elementos de la tabla de donors:
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

            //Template para los elementos de la tabla de donors:
      			var oTemplate2 = new sap.m.ColumnListItem({
      				cells: [
      					new sap.m.Text({
      						text: "{data>donorId/name/}"
      					}),
      					new sap.m.Text({
      						text: "{data>donorId/lastname/}"
      					}),
      					new sap.m.Text({
      						text: "{data>amount}"
      					}),
      					new sap.m.Text({
      						text: "{data>typeCard}"
      					}),
      					new sap.m.Text({
      						text: "{data>brandCard/}"
      					}),
      					new sap.m.Text({
      						text: "{data>lastDigits/}"
      					}),
      					new sap.m.Text({
      						text: "{data>initData/}"
      					})
      				]
      			});

      			//Limpiamos el binding de la tabla:
      			oTable2.unbindItems();

      			//Le hacemos bind a la tabla para que muestre las actividades semanales:
      			oTable2.bindItems("data>/suscriptions/", oTemplate2);
          //}
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
        },
        onTest2: function() {
          window.location.replace('http://localhost:3000/suscription/orderedSuscriptions');
        }
    });
});
