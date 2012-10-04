var wlInitOptions = {
    connectOnStartup : true
};

WLJSX.bind(window, "load", function() {
    WL.Client.init(wlInitOptions);
});
