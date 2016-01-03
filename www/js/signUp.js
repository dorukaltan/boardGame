var data;
//$(document).ready(function(){
	$('#signUpForm #registerButton').click(function()
	{
		var email = $('#signUpForm input[name="email"]').val();
		var password = $('#signUpForm input[name="password"]').val();
		var name = $('#signUpForm input[name="name"]').val();
		var surname = $('#signUpForm input[name="surname"]').val();
		var success = connectWebSocket(function()
		{
			/*
			 * Handle response BEGINS
			 */
			webSocketHandlerFunctions['signUp'] = function(signUpResponse)
			{
				try
				{
					if(signUpResponse.success)
					{
						alert("Registration succeded. Now you can login and play!");
				        $.mobile.navigate("#signIn");
					}
					else
					{
						alert(signUpResponse.errorMessage)
					}
				}
				catch(err)
				{
					alert("Error: " + JSON.stringify(err) + "\n" + JSON.stringify(signUpResponse));	
				}
			};
			/*
			 * Handle response ENDS
			 */
			/*
			 * Send request BEGINS
			 */
			var signUpRequest = {
				"email": email,
				"password": password,
				"name": name,
				"surname": surname,
				"requestType": "signUp"
			};
			data = JSON.stringify(signUpRequest);
			websocket.send(data);
			/*
			 * Send request ENDS
			 */
		});
		
//		if(!success)
//		{
//			
//		}
	});
//});