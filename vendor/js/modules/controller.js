import view from './view';
import model from './model';

let controller = {
/**
 * Метод для отображения
 * карты
 * @param  {Array} userPosition [description: Массив с координатами пользователя]
 */
	showMap:(userPosition) => {
		return view.showMap(userPosition);
	},
/**
 * Метод для определения 
 * координат пользователя
 */
	userPosition:() => {
		return model.userPosition();
	},
/**
 * Метод для установки координат 
 * пользователя в объекте который 
 * отправляется на сервер
 * @param  {Event} mapE [description: Событие клика по карте]
 */
	newFeedback: (mapE) => {
		model
			.setCoords(mapE)
			.setAddress(mapE);

		model.findComments(mapE);
		view.showPopup();
	},
/**
 * Метод для отображения комментариев 
 * по определенному адресу
 * @param  {Array} comments [description: Массив с отзавами]
 * @param  {String} address  [description: Адрес]
 * @return {[type]}          [description]
 */
	showComments:(comments, address) => {
		view.showComments(comments, address);
	},
/**
 * Группа методов для указания на
 * поля с ошибками и правельно заполненые
 * @param  {String} field [description: id элемента]
 */
	fieldErr:(field) => {
		view.fieldErr(field);
	},
	fieldGood:(field) => {
		view.fieldGood(field);
	},
/**
 * Метод для очистки отправляемого на сервер объекта
 */
	cleanFeedbackObj:() => {
		model.cleanFeedbackObj();
	},
/**
 * Метод для очистки
 * и скрытия popup
 */
	hidePopup:() => {
		view.hidePopup();
	},
/**
 * Отправка данных формы на сервер
 * @param  {Object} myMap [description: Карта]
 */
	sendForm:(myMap) => {
		model
			.setName()
			.setPlace()
			.setExperience()
			.setDate()
			.sendForm(myMap);
	},
/**
 * Метод для установки новой метки
 * @param  {Array} arr   [description: В массиве один объект, 
 * в котором координаты и остальная информация о метке ]
 * @param  {Object} myMap [description: Карта]
 */
	setNewMark:(arr, myMap) => {
		view.setNewMark(arr, myMap);
	},
/**
 * Метод устанавливает все метки на карте
 * @param  {Array} arr   [description: Массив с объектами содержащими
 * информацию о метке]
 * @param  {Object} myMap [description: Карта]
 */
	setAllMark:(arr, myMap) => {
		view.setAllMark(arr, myMap);
	},
/**
 * Метод для получения всех
 * меток на карте
 * @param  {Object} myMap [description: Карта]
 */
	addAllMarks:(myMap) => {
		return new Promise(resolve => {
			model.getAllMarks(myMap);
			resolve(myMap);
		})
	},
/**
 * Метод для активации слушателей событий
 * @param  {Object} myMap [description: Карта]
 * @return {[type]}       [description]
 */
	appEvents:(myMap) => {
		let sendBtn   = document.getElementById('sendBtn');
		let hidePopup = document.getElementById('hidePopup');

		function mapEvents() {
			myMap.events.add('click',e => {
				controller.newFeedback(e);
			});
		};

		function popupEvents() {
			sendBtn.addEventListener('click', e => {

				controller.sendForm(myMap);
				controller.hidePopup();

			});

			hidePopup.addEventListener('click',e => {
				controller.hidePopup();
			});
		};

		return (function init() {
					mapEvents();
					popupEvents();
				})();
	}

}//controller!!!

export default controller;