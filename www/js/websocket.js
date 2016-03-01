//var server = "doruk.homelinux.com";
//var server = "doruk.no-ip.org";
var server = "127.0.0.1";
var port = 8081;
var sira = 0;
var websocket;
var webSocketHandlerFunctions = {};
function handle_message(evt)
{
	data = evt.data;
	var message = JSON.parse(data);

	webSocketHandlerFunctions[message.requestType](message);
}

function connectWebSocket(callbackFunction, isSignInRequest)
{
	if(typeof(websocket) != 'undefined' &&
		websocket.readyState == websocket.OPEN)
	{
		callbackFunction();
	}
	else if(isSignInRequest)
	{
		try
		{
			websocket = new MozWebSocket("ws://"+server+":"+ port);
		}
		catch(error)
		{
			try
			{
				websocket = new WebSocket("ws://"+server+":"+ port);
			}
			catch(error)
			{
				alert("unable to connect");
				return false;
			}
		}
		
		websocket.onmessage = function(evt)
	    {
	    	handle_message(evt);
	    };
	    
	    websocket.onclose = function(evt)
	    {

	    	alert("Connection is closed. You will have to login again.");
			$.mobile.navigate("#signIn");
	    };

	    websocket.onopen = function(evt)
	    {
	    	callbackFunction();
		}

	    return true;
	}
	else
	{
		alert("Connection is closed. You will have to login again.");
		$.mobile.navigate("#signIn");
	}
}