import view from './view';
import model from './model';

let controller = {
	newFeedback: (mapE) => {
		view.showPopup();
		let popup = document.getElementById('popup');

		popup.addEventListener('click',popupE => {
			if(popupE.target.classList.contains('feedback_button')){
				console.log('feedback_button')

				model
					.setCoords(mapE)
					.setAddress(mapE)
					.setName()
					.setPlace()
					.setExperience()
					.setDate()
					.getObj();

			} else if(popupE.target.classList.contains('feedback_close')){
				console.log('feedback_close')
			}
		})
	},
	fieldErr:(field) => {
		view.fieldErr(field);
	},
	fieldGood:(field) => {
		view.fieldGood(field);
	}
}

export default controller;