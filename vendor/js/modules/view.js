let view = {
	showMap:(userPosition) => {
		console.log(1)
		return new Promise((resolve, reject) => {

	        let myMap;

	        function init () {
	            myMap = new ymaps.Map('map', {
	                center: userPosition,
	                zoom: 10
	            }, {
	                searchControlProvider: 'yandex#search'
	            });

	            resolve(myMap);
	        }
	        ymaps.ready(init);

	    });//return new Promise
	},

	showPopup:() => {
		var popup = document.getElementById('popup');
		popup.style.display = 'block';
	},

	fieldErr:(field) => {
		field.style.borderColor = 'red';
	},
	fieldGood:(field) => {
		field.style.borderColor = 'green';
	}
}

export default view;