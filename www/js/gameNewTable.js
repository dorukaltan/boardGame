var data;
//$(document).ready(function(){
	$('#gameNewTableForm #newTableButton').click(function()
	{
		var tableName = $('#gameNewTableForm input[name="tableName"]').val();
		var tablePassword = $('#gameNewTableForm input[name="tablePassword"]').val();
		var success = connectWebSocket(function()
		{
			/*
			 * Handle response BEGINS
			 */
			webSocketHandlerFunctions['gameCreate'] = function(gameCreateResponse)
			{
				try
				{
					if(gameCreate.success)
					{
				        $.mobile.navigate("#gameLobby");
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
			var gameCreateRequest = {
				"tableName": tableName,
				"tablePassword": tablePassword,
				"requestType": "gameCreate"
			};
			data = JSON.stringify(gameCreateRequest);
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