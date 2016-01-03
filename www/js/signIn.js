var data;
//$(document).ready(function(){
	$('#signInForm #loginButton').click(function()
	{
		var email = $('#signInForm input[name="email"]').val();
		var password = $('#signInForm input[name="password"]').val();
		var success = connectWebSocket(function()
		{
			/*
			 * Handle response BEGINS
			 */
			webSocketHandlerFunctions['signIn'] = function(signInResponse)
			{
				try
				{
					if(signInResponse.success)
					{
				        $.mobile.navigate("#gameList");
					}
					else
					{
						alert('Unable to login. Be sure that email and password are correct.');
					}
				}
				catch(err)
				{
					alert("Error: " + JSON.stringify(err));	
				}
			};
			/*
			 * Handle response ENDS
			 */
			/*
			 * Send request BEGINS
			 */
			var signInRequest = {
				"email": email,
				"password": password,
				"requestType": "signIn"
			};
			data = JSON.stringify(signInRequest);
			websocket.send(data);
			/*
			 * Send request ENDS
			 */
		}, true);
		
//		if(!success)
//		{
//			
//		}
	});
//});