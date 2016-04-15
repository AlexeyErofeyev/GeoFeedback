import controller from './controller';

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
		let popup = document.getElementById('popup');
		popup.style.display = 'block';
	},

	hidePopup:() => {
		let popup          = document.getElementById('popup');
		let userName       = document.getElementById('userName');
		let userPlace      = document.getElementById('userPlace');
		let userExperience = document.getElementById('userExperience');

		view.fieldStandart(userName);
		view.fieldStandart(userPlace);
		view.fieldStandart(userExperience);

		popup.style.display = 'none';
		controller.cleanFeedbackObj();

	},

	fieldErr:(field) => {
		field.style.borderColor = 'red';

		field.addEventListener('focus',(e) => {
			view.fieldStandart(e.target);
		});

		field.addEventListener('blur',(e) => {
			if(field.value.length){
				field.style.borderColor = 'green';
			} else {
				field.style.borderColor = 'red';
			}
		});
	},
	fieldGood:(field) => {
		field.style.borderColor = 'green';
	},
	fieldStandart:(field) => {
		field.style.borderColor = "#c4c4c4";
		field.value = '';
	},
	setNewMark:(arr, myMap) => {
		console.log('УСТАНОВКА НОВОЙ МАРКИ')
		let objectManager = new ymaps.ObjectManager({
            clusterize: true,
            gridSize: 32
        });
		console.log(arr)
		
		objectManager.objects.options.set('preset', 'islands#greenDotIcon');
        objectManager.clusters.options.set('preset', 'islands#greenClusterIcons');
        objectManager.add(arr);
        myMap.geoObjects.add(objectManager);
	}
}

export default view;