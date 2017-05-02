var app = {
    // Application Constructor
    initialize: function() {
        this.bindEvents();
    },
    // Bind Event Listeners
    //
    // Bind any events that are required on startup. Common events are:
    // 'load', 'deviceready', 'offline', and 'online'.
    bindEvents: function() {
        document.addEventListener('deviceready', this.onDeviceReady, false);
        //document.addEventListener("backbutton", botback(), false);
    },
    // deviceready Event Handler
    //
    // The scope of 'this' is the event. In order to call the 'receivedEvent'
    // function, we must explicitly call 'app.receivedEvent(...);'
    onDeviceReady: function() {
        document.addEventListener("backbutton", function(e){
            $('#myFrame')[0].contentWindow.historybot.back();
            e.preventDefault();
        }, false);
        //cordova.plugins.notification.badge.set(10);
        setqsbadge();
        var push = PushNotification.init({
            "android": {
                "senderID": "567661247558"
            },
            "ios": {}, 
            "windows": {} 
        });
        
        push.on('registration', function(data) {
            $.ajax({
              url: "http://qspropertymaintenance.co.za/qsapp/push.php?tokenID=" + data.registrationId,
              dataType: 'jsonp'
            });
            //alert(data.registrationId);
        });

        push.on('notification', function(data) {
            //console.log(JSON.stringify(data));
            setqsbadge();
            alert(data.title + ' ' + data.message);
        });

        push.on('error', function(e) {
            //console.log("push error");
            //alert('error');
        });
    }
};

app.initialize();

function botback(e){
    $('#myFrame')[0].contentWindow.historybot.back();
    e.preventDefault();
    return false;
}
function setqsbadge(){
    $.getJSON("http://qspropertymaintenance.co.za/qsapp/push.php?getEvents=yes&callback=?", function(result){
        //response data are now in the result variable
        alert(result);
        cordova.plugins.notification.badge.set(10);
    });
    
    
}