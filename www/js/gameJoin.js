var data;
//$(document).ready(function(){
	var gameJoin = function(tableId, isWithPassword)
	{
		var tablePassword = null;
		if(isWithPassword)
		{
			tablePassword = prompt('Please type password');
		}

		var success = connectWebSocket(function()
		{
			/*
			 * Handle response BEGINS
			 */
			webSocketHandlerFunctions['gameJoin'] = function(gameJoinResponse)
			{
				try
				{
					if(gameJoinResponse.success)
					{
						var userList = gameJoinResponse.connectedUsers;
						$('#connectedUsersView').empty();
						for(var i in userList)
						{
							var user = userList[i];
							$('#connectedUsersView').append('<li>'+ user.name +'</li>');
						}

						try
						{
							$("#connectedUsersView").listview("refresh");	
						}catch(err){}
						if(!gameJoinResponse.isAdminOfTable)
							$('#startGameButton').hide();
						
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
			var gameJoinRequest = {
				"tableId": tableId,
				"tablePassword": tablePassword,
				"requestType": "gameJoin"
			};
			data = JSON.stringify(gameJoinRequest);
			websocket.send(data);
			/*
			 * Send request ENDS
			 */
		});
		
//		if(!success)
//		{
//			
//		}
	};
//});