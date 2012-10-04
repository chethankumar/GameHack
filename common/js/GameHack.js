/**********************************************************************************
 *								GH NAMESPACE
 **********************************************************************************/
var GH = GH || {};

GH.namespace = function (ns_string) { 
	var parts = ns_string.split('.'), //JS String.split -> returns array
	parent = GH, 
	i;

	// strip redundant leading global 
	if (parts[0] === "GH") {
		parts = parts.slice(1); //JS slice(){Array and String}, returns substring or sub-array
	}

	for (i = 0; i < parts.length; i += 1) {
		// create a property if it doesn't exist
		if (typeof parent[parts[i]] === "undefined") {
			parent[parts[i]] = {}; 
		}
		parent = parent[parts[i]]; 
	}

	return parent; 
};

/**********************************************************************************
 *								GH.Constant
 **********************************************************************************/

//Variables used in the app should be defined here and only here
GH.namespace('GH.Constant');
GH.Constant = (function () { 

	var _openCache = function(){
		//WL.EncryptedCache.destroy(onDestroyCompleteHandler, onDestroyErrorHandler);
		WL.EncryptedCache.close(onCloseCompleteHandler, onCloseFailureHandler);
		WL.EncryptedCache.open("$_GH_PREDEFINED_PASSCODE", true, onOpenComplete, onOpenError);
		function onDestroyCompleteHandler(status){//alert("Encrypted cache destroyed");
		}
		function onDestroyErrorHandler(status){//alert("Error destroying Encrypted cache");
		}
		function onCloseCompleteHandler(status){//alert("Encrypted cache closed successfuly");
		}
		function onCloseFailureHandler(status){//alert("Could not close Encrypted cache");
		}
		function onOpenComplete(status){//Do Nothing
			//alert("Encrypted cache succesfully opened");
		}
		function onOpenError(status){
			switch(status){
				case WL.EncryptedCache.ERROR_KEY_CREATION_IN_PROGRESS:
					alert("ERROR: KEY CREATION IN PROGRESS");
					break;
				case WL.EncryptedCache.ERROR_LOCAL_STORAGE_NOT_SUPPORTED:
					alert("ERROR: LOCAL STORAGE NOT SUPPORTED");
					break;
				case WL.EncryptedCache.ERROR_NO_EOC:
					alert("ERROR: NO EOC");
					break;
				case WL.EncryptedCache.ERROR_COULD_NOT_GENERATE_KEY:
					alert("ERROR: COULD NOT GENERATE KEY" +status);
					break;
				case WL.EncryptedCache.ERROR_CREDENTIALS_MISMATCH:
					alert("ERROR: CREDENTIALS MISMATCH");
					break;
				default:
					alert("AN ERROR HAS OCCURED. STATUS :: " + status);
			}
		}	
	};
	
	//public API
	return {
		DEFAULT_TRANSITION	: "none",
		//GH_PASSCODE	: "$_GH_PREDEFINED_PASSCODE",
		GH_USERLIST_KEY	: "$_GH_USERS_LIST_KEY",
		GH_OPEN_CACHE : _openCache
	};

}()); //GH.Constant

/**********************************************************************************
 *								GH.User
 **********************************************************************************/

//Variables used in the app should be defined here and only here
GH.namespace('GH.User');
GH.User = (function () { 

	//public API
	return {
		
		
	};

}()); //GH.User

function wlCommonInit(){
	// Common initialization code goes here
	GH.Constant.GH_OPEN_CACHE();
	$("#car-selection-ok").click(function submitClicked(){
		$.mobile.changePage("#track-selection-page", { transition: "none" });
	});
}
