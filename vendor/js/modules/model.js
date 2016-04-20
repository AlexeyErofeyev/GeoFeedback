import controller from './controller';

let model = {
/**
 * Объект для отправки на сервер.
 * Используется при добавлении нового отзыва
 * 
 * @type {Object}
 */
	feedbackObj:{
		op:'add',
		review:{}
	},
/**
 * Метод для определения 
 * координат пользователя
 * 
 * @return {Promise}
 */
	userPosition:() => {
		return new Promise((resolve, reject) => {
			if(navigator.geolocation){
				return navigator.geolocation.getCurrentPosition(function (pos){
					resolve([pos.coords.latitude ,pos.coords.longitude]);
				});
			} else {
				throw new Error('Ваш браузер не поддерживает геолокацию');
			}
		});//return new Promise
	},
/**
 * Устанавливает поле 
 * coords в объекте для 
 * отправки на сервер
 * 
 * @param  {map event}
 * @return {model}
 */
	setCoords:(e) => {
		let XandY = e.get('coords');
		model.feedbackObj.review.coords = {"x": XandY[0], "y": XandY[1]};
		return model;
	},
/**
 * Устанавливает поле 
 * adress в объекте для 
 * отправки на сервер
 * 
 * @param  {map event}
 * @return {model}
 */
	setAddress:(e) => {
		let XandY = e.get('coords');

		ymaps.geocode(XandY).then(function(res) {
			let address = res.geoObjects.get(0).properties.get('text');
			model.feedbackObj.review.address = address;
		});

		return model;
	},
/**
 * Метод для получения всех комментариев 
 * по данному адресу
 * @param  {Event} e [description: Событие клика по карте]
 */
	findComments:(e) => {

		let XandY = e.get('coords');
		let getObj = {
			op:'get',
			address:""
		}

		ymaps.geocode(XandY).then((res) => {
			return new Promise((resolve) => {

			let address = res.geoObjects.get(0).properties.get('text');
			getObj.address = address;
			resolve(address);
			})
		}).then((address) => {
				let xhr = new XMLHttpRequest();

				xhr.open('POST', 'http://localhost:3000/', true);
				xhr.send(JSON.stringify(getObj));
				xhr.addEventListener('load',(e) => {
					controller.showComments(JSON.parse(xhr.responseText),address)
				});

			})

	},
/**
 * Устанавливает поле 
 * name в объекте для 
 * отправки на сервер
 * 
 * @return {model}
 */
	setName:() => {

		model.checkField('userName',(name) => {
			model.feedbackObj.review.name = name;
		});

		return model;

	},
/**
 * Устанавливает поле 
 * place в объекте для 
 * отправки на сервер
 * 
 * @return {model}
 */
	setPlace:() => {

		model.checkField('userPlace',(place) => {
			model.feedbackObj.review.place = place;
		});

		return model;
	},
/**
 * Устанавливает поле 
 * text в объекте для 
 * отправки на сервер
 * 
 * @return {model}
 */
	setExperience:() => {
		model.checkField('userExperience',(text) => {
			model.feedbackObj.review.text = text;
		});

		return model;
	},
/**
 * Устанавливает поле 
 * date в объекте для 
 * отправки на сервер
 * 
 * @return {model}
 */
	setDate:() => {
		let date    = new Date();
		let year    = date.getFullYear();
		let month   = date.getMonth() + 1;
		let day     = date.getDate();
		let hour    = date.getHours();
		let minutes = date.getMinutes();
		let seconds = date.getSeconds();

		model.feedbackObj.review.date = year+'.'+month+'.'+day+' '+hour+':'+minutes+':'+ seconds;
		return model;
	},
/**
 * Используется для проверки
 * полей ввода
 * 
 * @param  {id === id поля которое нужно проверить}
 * @param  {В callback предается значение проверяемого поля}
 * @return {undefinde}
 */
	checkField:(id, callback) => {
		let field = document.getElementById(id);
		let value = field.value;

		if(!value.length){
			controller.fieldErr(field);
		} else {
			controller.fieldGood(field);
			callback(value);
		}
	},
/**
 * Используется для проверки
 * формы перед отправкой
 * 
 * @return {bool}
 */
	checkForm:() => {
		let form = document.getElementById('feedback_form');
		for(let i = 0, l = form.length; i < l ;i++){
			if(form[i].type === 'text' || form[i].type === 'textarea'){
				if(!form[i].value.length){
					return false
				}
			}
		}
		return true;
	},
/**
 * Отправка данных формы на сервер
 * @param  {Object} myMap [description: Карта]
 */
	sendForm:(myMap) => {
		new Promise(resolve => {
			let xhr = new XMLHttpRequest();
			xhr.open('POST', 'http://localhost:3000/', true);

			if(model.checkForm){
				xhr.send(JSON.stringify(model.feedbackObj));

				xhr.addEventListener('load',(e) => {
					
					resolve(JSON.parse(xhr.responseText))
				});
			} 		    
		})
		.then((data) => {
			return model.setMarkArr(data)
		})
		.then((arr) => {
			controller.setNewMark(arr,myMap);
		})
	},
/**
 * Метод для получения всех
 * меток на карте
 * @param  {Object} myMap [description: Карта]
 * @return {[type]}       [description]
 */
	getAllMarks:(myMap) => {
		return new Promise(resolve => {
			let xhr = new XMLHttpRequest();
			xhr.open('post', 'http://localhost:3000/', true);

			xhr.send(JSON.stringify({"op":"all"}));

			xhr.addEventListener('load',(e) => {

				resolve(JSON.parse(xhr.responseText))
			});
						
		}).then((data) => {
			return model.setAllMarksArr(data)
		}).then((arr) => {
			controller.setAllMark(arr, myMap);
		})
	},
/**
 * Метод для очистки отправляемого на сервер объекта
 * @return {[type]} [description]
 */
	cleanFeedbackObj:() => {
		model.feedbackObj = {
			op:'add',
			review:{}
		};
	},
/**
 * Метод для создания массива
 * с форматом для яндекс карт
 * @param  {Array} arr    [description: Массив с объектом пришедшим от сервера]
 * @param  {String} addres [description: Адресс]
 */
	setMarkArr:(arr, addres) => {
		return new Promise(resolve => {

			let newArr = [];
			for(let i = 0, l = arr.length; i < l ;i++){
				newArr[i] = {
					"type": "Feature",
					"geometry": {
						"type": "Point", 
						"coordinates": [arr[i].coords.x, arr[i].coords.y]
					}, 
					"properties": {
						"addres": addres || "",
						"balloonContentFooter": arr[i].name,
						"balloonContentBody": arr[i].text,  
						"balloonContentHeader": arr[i].place
					}
				}			
			}
			resolve(newArr);
			
		});
	},
/**
 * Метод для формирования массива
 * объектов для отображения на карте
 * @param  {Object} obj [description: ]
 * @return {[type]}     [description]
 */
	setAllMarksArr:(obj) => {
		return new Promise(resolve => {
			let newArr = [];
			for(let key in obj){
				model.setMarkArr(obj[key], key)
				.then(arr => {
					newArr.push(...arr);
				})			
			}
			resolve(newArr);
			
		});
	}

}//model!!!!

export default model;