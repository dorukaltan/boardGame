var data;
//$(document).ready(function(){
	$('#gameNewTableForm" #newTableButton').click(function()
	{
		var tableName = $('#gameNewTableForm input[name="tableName"]').val();
		var tablePassword = $('#gameNewTableForm input[name="tablePassword"]').val();
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
				        $.mobile.navigate("#gameBoard");
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
			setTimeout('websocket.send(data)', 1000);
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