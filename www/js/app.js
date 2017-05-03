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
            console.log(JSON.stringify(data.registrationId));
        });

        push.on('notification', function(data) {
            console.log(JSON.stringify(data));
            setqsbadge();
            alert(data.title + ' ' + data.message);
        });

        push.on('error', function(e) {
            console.log("push error");
            //alert('error');
        });
    }
};

app.initialize();

function setqsbadge(){
    $.getJSON("http://qspropertymaintenance.co.za/qsapp/push.php?getEvents=yes&callback=?",function(json){
      cordova.plugins.notification.badge.set(json.count);
      push.setApplicationIconBadgeNumber(function() {
            console.log('success');
        }, function() {
            console.log('error');
        }, json.count);
    });
    
    
    
    
}
