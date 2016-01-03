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
	
//	splited_cookie = document.cookie.split(";");
	webSocketHandlerFunctions[message.requestType](message);
//	switch(name)
//	{
//		case "authentication request":
//			//FIXME: username cookie might not be the first one
////			username = splited_cookie[0].split("=")[1];
//			//FIXME: get password in a safe way
//			password = prompt("Username is: "+ username + ".\nPlease type your password","");
//			//FIXME: get publisherid from parameters
////			publisherid = getParameterByName("publisherid");
//			publisherid = 1;
////			password = password.toLowerCase();
//			
//			if(password.indexOf(";", 0) == -1)
//			{
//				packet = "authentication request;"+username+";"+password+";"+publisherid;
//				websocket.send(packet);
//			}
//			break;
//		case "authentication response":
//			if(splited_data[1] != "successful")
//			{
//				alert("disconnected because: "+splited_data[1]);
//				websocket.disconnect();
//			}
//			//else
//				//alert("authentication successful");
//			break;
//		case "cupdate":
//			var point = splited_data[1].split(",");
//			var point = new google.maps.LatLng(point[0],point[1]);
//			if(marker != null) 
//				marker.setMap(null);
//			marker = new google.maps.Marker({
//		        position: point,
//		        title:"deneme"
//		    });
//		    marker.setMap(map);
//		    map.setCenter(point);
//			break;
//		case "add publisher":
//			alert(data);
//			break;
//		case "remove publisher":
//			alert(data);
//			break;
//		default:
//			alert("unhandled message", evt.data);
//			break;
//	}
}

function connectWebSocket(callbackFunction)
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
			return false;
		}
	}
	
	websocket.onmessage = function(evt)
    {
    	handle_message(evt);
    };
    
    websocket.onclose = function(evt)
    {
    	if(sira == 0)
    	{
    		server = "10.0.0.251";
    		sira = 1;
    		connect();
    	}
    	else
    	{
    		if(confirm("Socket closed\nYou need to refresh the page.\nDo you want me to do this?"))
    		location.href = location.href;
    	}
    };
//  websocket.onopen = function(evt)
//  {
//  	l("CONNECTED");
//  }
    
   setTimeout(callbackFunction, 100);
   return true;
}