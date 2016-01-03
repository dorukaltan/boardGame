var data;
//$(document).ready(function(){
	$(document).on("pagebeforeshow","#gameList",function()
	{
		var tableName = $('#gameNewTableForm input[name="tableName"]').val();
		var tablePassword = $('#gameNewTableForm input[name="tablePassword"]').val();
		var success = connectWebSocket(function()
		{
			/*
			 * Handle response BEGINS
			 */
			webSocketHandlerFunctions['gameList'] = function(gameListResponse)
			{
				try
				{
					if(gameListResponse.success)
					{
						var tableList = gameListResponse.gameTableList;
						$('#gameListView').empty();
						for(var i in tableList)
						{
							var table = tableList[i];
							$('#gameListView').append('<li><a href="'+ table.tableId +'">'+ table.tableName +'</a></li>');
						}
						$("#gameListView").listview("refresh");
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
			var gameListRequest = {
				"requestType": "gameList"
			};
			data = JSON.stringify(gameListRequest);
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