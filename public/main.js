var rusMonth = ['января', 'февраля', 'марта', 'апреля', 'мая', 'июня', 'июля', 'августа', 'сентября', 'октября', 'ноября', 'декабря'];
var host = 'http://namep.herokuapp.com/';

document.addEventListener('DOMContentLoaded', function() {
	toggleContent(false);
	toggleLoader(true);
	get();
	onEdit();
});

function getDescription(data) {
	var date = localStorage.getItem('date');
	date = new Date(+data.date);
	var description = document.querySelector('.description');
	description.innerHTML = `Последнее изменение ${date.getHours()}:${date.getMinutes()} / ${date.getDate()} ${rusMonth[date.getMonth()]}  ${date.getFullYear()}`;
}

function render(data) {
	var input = document.querySelector('.title-input');
	input.value = data.title;
	getDescription(data);
	toggleLoader(false);
	toggleContent(true);
}


function toggleContent(isShow) {
	var content = document.querySelector('.content');
	if (isShow) {
		content.classList.remove('none');
	} else {
		content.classList.add('none');
	}
}

function toggleLoader(isShow) {
	var loader = document.querySelector('.loader');
	if (isShow) {
		loader.classList.remove('none');
	} else {
		loader.classList.add('none');
	}
}

function onEdit() {
	var input = document.querySelector('.title-input');
	input.onblur = function() {
		let date = new Date().getTime();
		if (input.value.length > 6) {
			post({name: input.value});
		} else {
			document.querySelector('.content-wrapper-wrapper').classList.add('show-error');
		}
	}
	input.onfocus = function() {
		document.querySelector('.content-wrapper-wrapper').classList.remove('show-error');
	}
}



function post(model) {
	toggleContent(false);
	toggleLoader(true);
	var http = new XMLHttpRequest();
	http.open('POST', host+'api/plus', true);
	http.setRequestHeader('Content-type', 'application/json');
	http.onreadystatechange = function (aEvt) {
		if (http.readyState == 4) {
			 if(http.status == 200) {
				 console.log(JSON.parse(http.response));
				render(JSON.parse(http.response).data);
				toggleContent(true);
				toggleLoader(false);
		} else
				console.log("Error loading page\n");
		}
	};
	http.send(JSON.stringify(model));
}

function get() {
	var req = new XMLHttpRequest();
	req.open('GET', host+'api/plus', true); 
	req.onreadystatechange = function (aEvt) {
		if (req.readyState == 4) {
			if(req.status == 200) {
				console.log();
				console.log(JSON.parse(req.response));
				render(JSON.parse(req.response).data);
			} else
				console.log("Error loading page\n");
			}
		};
	req.send(null);
}