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
		view.showPopup();
		model
            .setCoords(mapE)
            .setAddress(mapE)
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
            .sendForm(myMap)
            model.getObj()
	},
	setNewMark:(arr, myMap) => {
		view.setNewMark(arr, myMap);
	}
}

export default controller;