// Constants...


function MAILSETTINGS_BASE_API() {
	return "https://jlls.info/api/mailsettings";
}

function SHOW_LOADING_TEXT() {
	return "<center><p class='loading-symbol'><i class=\"fa fa-spinner fa-pulse\"></i> Loading...</p></center>";
}

// Event Bindings...

$('body').on('hidden.bs.modal', '.modal', function() {
	$(this).removeData('bs.modal');
});	


$(document).on("click", "#btnListProviders", function () {
	go('listProviders','null');
	$("#listProviders-providers").html("<p class='loading-symbol'><i class=\"fa fa-spinner fa-pulse\"></i> Loading...</p>");
	var providers = [];
	$.when(getProviderList()).done(function(x) {
			$.each(x, function(i, item) {
				providers.push("<div class='col-xs-6 col-md-4'><a data-providerid=\""+item[0]+"\" class='thumbnail providerBox' href=\"#\">"+item[1]+"</a></div>");			
			});
			$(".loading-symbol").remove();
			$("#listProviders-providers").append(providers);
			
	});	
});

$(document).on("submit", "#emailsearchform", function() {
	if ($('#emailsearch').val() === '') {
		$('#emailsearch').focus();
		$('#tag-search-form-group').addClass("has-error");
	} else {
		var emailaddr;
		emailaddr = $("#emailsearch").val();
		var split = emailaddr.split("@");
		$("#providerincomingserverinformation").show();
		$("#provideroutgoingserverinformation").show();
		$("#providernotes").show();
		removeProviderData();
		$("#providerincomingserverinformation").append(SHOW_LOADING_TEXT());
		$("#provideroutgoingserverinformation").append(SHOW_LOADING_TEXT());
		$("#providernotes").append(SHOW_LOADING_TEXT());		
		$.when(getSettingsByEmailExtension(split[1]))
			.done(function(x) {
				displayProviderData(x);
				$(".loading-symbol").remove();	
				$('#tag-search-form-group').removeClass("has-error");
			
			})
			.fail(function(e) {
				$(".loading-symbol").remove();				
				$('#tag-search-form-group').addClass("has-error");	
				$('#emailsearch').focus();
				alert('Sorry - settings could not be found for this e-mail address.');
			});
	}
	
	return false;
});

$(document).on("click", ".providerBox", function() {
	var providerId;
	providerId = $(this).data('providerid');
	$("#providerincomingserverinformation").show();
	$("#provideroutgoingserverinformation").show();
	$("#providernotes").show();
	removeProviderData();
	
	$("#providerincomingserverinformation").append(SHOW_LOADING_TEXT());
	$("#provideroutgoingserverinformation").append(SHOW_LOADING_TEXT());
	$("#providernotes").append(SHOW_LOADING_TEXT());
	
	$.when(getSettings(providerId)).done(function(x) {
		displayProviderData(x);
		$(".loading-symbol").remove();	
		
	});
});

// Display methods to show and hide elements...

function go(where, opt) {
	$(".aPage").hide();
	$(".sidebar-hideable").hide();

		
	switch(where) {
		case "home":
			$("#home").show();
			document.title = "MailSettings";
			break;
		case "listProviders":
			$("#listProviders").show();
			document.title = "Providers | MailSettings";
			break;
		case "providerInfo":
			$("#providerserverinformation").show();
			$("#providernotes").show();
			document.title = "Settings | MailSettings";			
			break;
		default:
			alert("Error");
	
	}
	
}

function removeProviderData() {
		document.title = "MailSettings";
		$("#placeholder-incominginfo-text").empty();
		$("#placeholder-outgoinginfo-text").empty();
		$("#placeholder-notes-text").empty();
}

function displayProviderData(x) {
		document.title = x[0] + " | MailSettings";			
	
		var incomingHTML;
		incomingHTML = "<b>Server Type: </b>" + x[1] + "<br />";
		incomingHTML += "<b>Host Name: </b>" + x[2] + "<br />";
	 	incomingHTML += "<b>Port: </b>" + x[3] + "<br />";
		incomingHTML += "<b>SSL: </b>" + x[4] + "<br />";
		$("#placeholder-incominginfo-text").html(incomingHTML);	

		var outgoingHTML;
		outgoingHTML = "<b>Server Type: </b>" + x[5] + "<br />";
		outgoingHTML += "<b>Host Name: </b>" + x[6] + "<br />";
	 	outgoingHTML += "<b>Port: </b>" + x[7] + "<br />";
		outgoingHTML += "<b>SSL: </b>" + x[8] + "<br />";
		$("#placeholder-outgoinginfo-text").html(outgoingHTML);		

		var authNotes;
		authNotes = "<b>Username: </b>" + x[10] + "<br />";
		authNotes += "<br /><p><b>Notes:</b> " + x[9] + "</p>";
		$("#placeholder-notes-text").html(authNotes);
}

// Methods...	

function hello() {
	alert("(c)2015, Jonathan Lovatt.");
}


function getSettingsByEmailExtension(ext) {
	var settingsArray = [];
	return $.Deferred(function() {
		var self = this;
		$.getJSON( MAILSETTINGS_BASE_API(), {
			method: "getproviderbyextension",
			extension: ext
		})
		
		.done(function(data) {
			settingsArray.push(data[0].providername);
			settingsArray.push(data[0].incomingtype);
			settingsArray.push(data[0].incomingserver);
			settingsArray.push(data[0].incomingport);
			settingsArray.push(data[0].incomingssl);
			settingsArray.push(data[0].outgoingtype);
			settingsArray.push(data[0].outgoingserver);
			settingsArray.push(data[0].outgoingport);
			settingsArray.push(data[0].outgoingssl);
			settingsArray.push(data[0].notes);
			settingsArray.push(data[0].username);
			self.resolve(settingsArray);
		})
		.fail(function(jqxhr, textstatus, error) {
			self.reject(error);
		});
	});
}

function getSettings(providerid) {
	var settingsArray = [];
	return $.Deferred(function() {
		var self = this;
		$.getJSON( MAILSETTINGS_BASE_API(), {
			method: "getproviderinfo",
			providerid: providerid
		})
		
		.done(function(data) {
			settingsArray.push(data[0].providername);
			settingsArray.push(data[0].incomingtype);
			settingsArray.push(data[0].incomingserver);
			settingsArray.push(data[0].incomingport);
			settingsArray.push(data[0].incomingssl);
			settingsArray.push(data[0].outgoingtype);
			settingsArray.push(data[0].outgoingserver);
			settingsArray.push(data[0].outgoingport);
			settingsArray.push(data[0].outgoingssl);
			settingsArray.push(data[0].notes);
			settingsArray.push(data[0].username);
			self.resolve(settingsArray);
		})
		.fail(function(jqxhr, textstatus, error) {
			self.reject(error);
		});
	});
}

function getProviderList() {
	providerArray = [];
	return $.Deferred(function() {
		var self = this;
		$.getJSON( MAILSETTINGS_BASE_API(), {
			method: "getproviders"
		  })
			.done(function( data ) {
				$.each(data, function(i, item) {
					providerArray.push([item.providerid, item.providername]);
				});
				self.resolve(providerArray);
			});
		});
}