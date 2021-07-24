var app;
class UI {

	align(position) {
		this.position = {x: 0.0, y: 0.0, width: 351, height: 345, a: 1.777777777777778};
		if(position.x != this.position.x || position.y != this.position.y || position.width != this.position.width || position.height != this.position.height || position.a != this.position.a) {
			var realWidth = position.width / position.a * {x: 0.0, y: 0.0, width: 351, height: 345, a: 1.777777777777778}.a
			$('.container').css({'top': position.y, 'left': position.x, 'width': realWidth, 'height': position.height});
			this.position = position;
			this.rebuild(this.mode);
		}
	}


    rebuild(val) {
        this.mode = val;
		$('.compass').hide();

		switch(this.mode) {
			case 'minimap':
				$('#compass-round').show();
				break;
			default:
				break;
		}
    }

	update(data) {
		var voiceVehicle = null;
		var voicePress = null;

		for(var key in data) {
			var value = data[key];
			switch(key) {
				case 'Rotation':
					if(this.mode == 'minimap') {
						if($('#compass-round').is(':visible')) {
							$('#compass-round').stop();
							$('#compass-round').css('transform', 'rotate(' + parseFloat(value).toFixed(2) + 'deg)');
						}
					}
				default: break;
			}
		}
	}
}

$(function() {
    var data = window.localStorage.getItem('ui');
    if (data) {
		try {
			app = new UI(JSON.parse(data));
		} catch(e) {
			console.log("Could not parse saved preferences, resetting data!");
			app = new UI();
		}
    } else {
		app = new UI();
	}
})

window.addEventListener('message', function(event) {
    var data = event.data
	if (data.ticket && app) {
		app.keepTicket = true;
	}

    switch (data.type) {
		case 'init':
			$('.container').show();

			$.post('https://szymczakovv_compass/ready', JSON.stringify());
        case 'update':
			if (app) {
				if(data.data) {
					app.update(data.data);
				}
				if(data.anchor) {
					app.align(data.anchor);
				}
			}
            break;
		case 'rebuild':
			if (app) {
				app.rebuild(data.value);
			}
			break;
        default:
            break;
    }
});