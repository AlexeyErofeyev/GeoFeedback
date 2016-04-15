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
		}).then((data) => {
			return model.setMarkArr(data)
		}).then((arr) => {
			controller.setNewMark(arr, myMap);
		})
	},

	cleanFeedbackObj:() => {
		model.feedbackObj = {
			op:'add',
			review:{}
		};
	},
	getObj:() => {
		console.log(model.feedbackObj);
	},
	setMarkArr:(arr) => {
		return new Promise(resolve => {
				// console.log(arr);
			let newArr = [];
			for(let i = 0, l = arr.length; i < l ;i++){
				newArr[i] = {
					"type": "Feature",
					"id": i,
					"geometry": {
						"type": "Point", 
						"coordinates": [arr[i].coords.x, arr[i].coords.y]
					}, 
					"properties": {
						"balloonContent": arr[i].text,  
						"hintContent": arr[i].place
					}
				}			
			}
			resolve(newArr);
			
		});
	}

}//model!!!!

export default model;