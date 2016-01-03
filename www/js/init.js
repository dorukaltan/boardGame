var init = function()
{
	places = [
			  		{
			  			"type": "PrivateProperty",	
			  			"name": "EUSTON ROAD 1",
			  			"price": 100
			  		},
			  		{
			  			"type": "PrivateProperty",	
			  			"name": "EUSTON ROAD 2",
			  			"price": 200
			  		},
			  		{
			  			"type": "PrivateProperty",	
			  			"name": "EUSTON ROAD 3",
			  			"price": 300
			  		},
			  		{
			  			"type": "PrivateProperty",	
			  			"name": "EUSTON ROAD 4",
			  			"price": 400
			  		}
			  	];
	corners = [
			  		{
			  			"image": "img/corner.svg"
			  		},
			  		{
			  			"image": "img/corner.svg"
			  		},
			  		{
			  			"image": "img/corner.svg"
			  		},
			  		{
			  			"image": "img/corner.svg"
			  		}
			  	];
	placesPerCorner = 1;
			  
	for(var i in corners)
	{
		i = parseInt(i);
		var corner = corners[i];
		var newCorner = getNewInstance('corner');
		var isLeftCorner = false;
		if(i % 2 == 0)
		{
			newCorner.addClass('left-corner');
			addToGame('<tr>', false);
			isLeftCorner = true;
		}
			
		newCorner.find('img').attr('src', corner.image);
		addToGame(newCorner, false);
//		addToGame(getNewInstance('seperator'));

		var begin = i * placesPerCorner;
		var end = (i + 1) * placesPerCorner;
//		console.log(i);
//		console.log(begin);
//		console.log(end);
//		console.log('*************');
		for(var j = begin; j < end; j++ )
		{
			var place = places[j];
			var newPlace = getNewInstance('place');
			if(place.type == 'PrivateProperty')
			{
				newPlace.find('.colorArea').css('background', '#555555');
				newPlace.find('.name').html(place.name);
				newPlace.find('.price').html(place.price + ' TL');
			}
			addToGame(newPlace, false);
//			addToGame(getNewInstance('seperator'));
		}
		console.log(isLeftCorner)
		if(!isLeftCorner)
		{
			addToGame('</tr>', true);
		}
		
	}
	
	
	$('.place').css('width', '%8.1');
	$('.corner').css('width', '%13.5');
	$('.place').css('height', '100px');
	$('.corner').css('height', '100px');
};

var getNewInstance = function (name)
{
	var selector = '#' + name + 'ToBeCloned';
	var newInstance = $(selector).clone();
	newInstance.removeAttr('id');
	return newInstance;
};
var objectsToBeAdded = [];
var addToGame = function (gameObject, flush)
{
	if(typeof(flush) != undefined)
	{
		
		objectsToBeAdded.push(gameObject);
		if(flush)
		{
			objectsToBeAdded.reverse();
			console.log(objectsToBeAdded);
			var html = '';
			var html_gg;
			while(objectsToBeAdded.length != 0)
			{
				html_gg =  objectsToBeAdded.pop();
				if(typeof(html_gg) == 'object')//check if object is td
				{
					html_gg = html_gg.html();
					html_gg = '<td>' + html_gg + '</td>';
				}
				html += html_gg;
			}
			console.log(html);	
			$('#gameTable').append(html);
		}
			
	}
	else
		$('#gameTable').append(gameObject);
};
//init();