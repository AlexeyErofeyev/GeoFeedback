import controller from './controller';

let view = {
	showMap:(userPosition) => {
		console.log(userPosition)
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

		var objectManager = new ymaps.ObjectManager({
            clusterize: true,
            geoObjectOpenBalloonOnClick: true,
            clusterOpenBalloonOnClick: false
        });
		
		objectManager.objects.options.set('preset', 'islands#greenDotIcon');
        objectManager.clusters.options.set('preset', 'islands#greenClusterIcons');
        objectManager.add(arr);
        myMap.geoObjects.add(objectManager);
        // view.setBallon(arr, myMap);
	},

	showComments: (comments, address) => {
		let feedback_header = document.getElementById('feedback_header');
		let feedback_list   = document.getElementById('feedback_list');
		let li = [];
		feedback_header.innerHTML = address;
		if(comments.length){
			comments.forEach((item, i, arr) => {
				li.push( '<li class="feedback_item">'+
				'<h4 class="feedback_userInfo">'+item.name+
				'<span>'+item.place+' '+returnDate(item.date)+'</span></h4>'+
				'<p class="feedback_text">'+item.text+'</p></li>')
			})

			feedback_list.innerHTML = li.join()
		} else {
			feedback_list.innerHTML = '<li class="feedback_item">По данному адресу нет отзывов.</li>'
		}

		function returnDate(time) {
			let date = new Date(time);

			let day   = date.getDate();
			let month = date.getMonth();
			let year  = date.getFullYear();

			return day+'.'+month+'.'+year;

		}
	},

	setBallon:(arr, myMap) => {

		let customItemContentLayout = ymaps.templateLayoutFactory.createClass(
        	'<h2 class=ballon_header>{{ properties.balloonContentHeader|raw }}</h2>' +
            '<div class=ballon_body>{{ properties.balloonContentBody|raw }}</div>' +
            '<div class=ballon_footer>{{ properties.balloonContentFooter|raw }}</div>'
	    );//customItemContentLayout

	    let clusterer = new ymaps.Clusterer({
	        clusterDisableClickZoom: true,
	        clusterOpenBalloonOnClick: true,
	        clusterBalloonContentLayout: 'cluster#balloonCarousel',
	        clusterBalloonPanelMaxMapArea: 0,
	        clusterBalloonContentLayoutWidth: 200,
	        clusterBalloonContentLayoutHeight: 130,
	        clusterBalloonPagerSize: 5
	    });//clusterer

	    let placemarks = [];
	    for (var i = 0, l = arr.length; i < l; i++) {
	        let placemark = new ymaps.Placemark(arr[i].geometry.coordinates, {
	            balloonContentHeader: arr[i].properties.hintContent,
	            balloonContentBody: arr[i].properties.balloonContent,
	            balloonContentFooter: arr[i].properties.name
	        });
	        placemarks.push(placemark);
	    }

	    clusterer.add(placemarks);
	    myMap.geoObjects.add(clusterer);

	    clusterer.balloon.open(clusterer.getClusters()[0]);
		console.log('УСТАНОВКА BALOON закончена')

	}
}

export default view;