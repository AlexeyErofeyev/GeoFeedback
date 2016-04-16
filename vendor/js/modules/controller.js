import view from './view';
import model from './model';

let controller = {
	showMap:(userPosition) => {
		return view.showMap(userPosition);
	},
	userPosition:() => {
		return model.userPosition();
	},
	newFeedback: (mapE) => {
		model
			.setCoords(mapE)
			.setAddress(mapE);

		model.findComments(mapE);
		view.showPopup();
	},
	showComments:(comments, address) => {
		view.showComments(comments, address);
	},
	fieldErr:(field) => {
		view.fieldErr(field);
	},
	fieldGood:(field) => {
		view.fieldGood(field);
	},
	cleanFeedbackObj:() => {
		model.cleanFeedbackObj();
	},
	hidePopup:() => {
		view.hidePopup();
	},
	sendForm:(myMap) => {
		model
			.setName()
			.setPlace()
			.setExperience()
			.setDate()
			.sendForm(myMap);
	},
	setNewMark:(arr, myMap) => {
		view.setNewMark(arr, myMap);
	},
	addAllMarks:(myMap) => {
		return new Promise(resolve => {
			model.getAllMarks(myMap);
			resolve(myMap);
		})
	},
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