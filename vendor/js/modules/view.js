import controller from './controller';

let view = {
/**
 * Метод для отображения карты
 * @param  {Массив} userPosition [description: координаты пользователя]
 * @return {[Promise]}[description: resolve передает дальше карту]
 */
	showMap:(userPosition) => {
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
/**
 * Метод для отображения 
 * окна popup с формой ввода
 * отзыва
 */

	showPopup:() => {
		let popup = document.getElementById('popup');
		popup.style.display = 'block';
	},

/**
 * Метод для очистки
 * и скрытия popup
 */
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
/**
 * Метод для подсветки
 * полей с ошибкой
 * @param  {String} field [description: принимает id поля которое проверяет]
 */
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
/**
 * Метод для подсветки правельно
 * заполненых полей ввода
 * @param  {String} field [description: принимает id поля которое проверяет]
 */
	fieldGood:(field) => {
		field.style.borderColor = 'green';
	},
/**
 * Метод для приведения подсветки
 * поля к стандартному значению
 * @param  {String} field [description: принимает id поля которое проверяет]
 */
	fieldStandart:(field) => {
		field.style.borderColor = "#c4c4c4";
		field.value = '';
	},
/**
 * Метод для установки новой метки
 * @param  {Array} arr   [description: В массиве один объект, 
 * в котором координаты и остальная информация о метке ]
 * @param  {Object} myMap [description: Карта]
 */
	setNewMark:(arr, myMap) => {
		let clusterer = view.clusterer()().clusterer;
	    clusterer.removeAll();
	    myMap.geoObjects.removeAll();
		controller.addAllMarks(myMap);

	},
/**
 * Метод устанавливает все метки на карте
 * @param  {Array} arr   [description: Массив с объектами содержащими
 * информацию о метке]
 * @param  {Object} myMap [description: Карта]
 */
	setAllMark:(arr, myMap) => {		
		let clusterer = view.clusterer()().clusterer;
		let geoObjects = [];
		let myCollection = new ymaps.GeoObjectCollection();


		console.log(arr)

		var placemarks =[];
		for(var i = 0, len = arr.length; i < len; i++) {
			 var placemark = new ymaps.Placemark(arr[i].geometry.coordinates, {
            // Устаналиваем данные, которые будут отображаться в балуне.
            balloonContentHeader: arr[i].properties.balloonContentHeader,
            balloonContentBody: arr[i].properties.balloonContentBody,
            balloonContentFooter: arr[i].properties.balloonContentFooter
        });
        	placemarks.push(placemark);
	    }
	    clusterer.add(placemarks)
		myMap.geoObjects.add(clusterer);
	},
/**
 * Кластеризатор, подробнее
 * на https://tech.yandex.ru/maps/doc/jsapi/2.0/ref/reference/Clusterer-docpage
 */
	clusterer:() => {
		var customItemContentLayout = ymaps.templateLayoutFactory.createClass(
	        // Флаг "raw" означает, что данные вставляют "как есть" без экранирования html.
	        '<h2 class=ballon_header>{{ properties.balloonContentHeader|raw }}</h2>' +
	            '<div class=ballon_body>{{ properties.balloonContentBody|raw }}</div>' +
	            '<div class=ballon_footer>{{ properties.balloonContentFooter|raw }}</div>'
	    );



		let instance;

		function init() {
			return instance ||(function() {
				return{
					clusterer: clusterer
				}
			})()	
		};

		let clusterer = new ymaps.Clusterer({
			preset: 'twirl#lightblueIcon',
			groupByCoordinates: false,
			clusterDisableClickZoom: true,
	        clusterOpenBalloonOnClick: true,
	        clusterBalloonContentLayout: 'cluster#balloonCarousel',
	        clusterBalloonItemContentLayout: customItemContentLayout,
	        clusterBalloonPanelMaxMapArea: 0,
	        clusterBalloonContentLayoutWidth: 200,
	        clusterBalloonContentLayoutHeight: 130,
	        clusterBalloonPagerSize: 5
		});

		return init;
	},
/**
 * Метод для отображения кометариев
 * в окне popup.
 * @param  {Array} comments [description: Массив содержит все комментарии 
 * по данному адресу на карте]
 * @param  {String} address  [description: Адрес]
 */
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

			feedback_list.innerHTML = li.join('')
		} else {
			feedback_list.innerHTML = '<li class="feedback_item">По данному адресу нет отзывов.</li>'
		}
/**
 * Функция для установки даты озыва
 * @param  {Number} time [description: Время в миллисекундах]
 * @return {String}      [description: Строка типа "15.11.2015"]
 */
		function returnDate(time) {
			let date = new Date(time);

			let day   = date.getDate();
			let month = date.getMonth() + 1;
			let year  = date.getFullYear();

			return day+'.'+month+'.'+year;

		}
	}
}

export default view;