/**
 * Импорт контроллера
 */
import controller from './modules/controller';

/**
 * Ждем загрузки страницы
 */
new Promise(resolve => {
    if (document.readyState === 'complete') {
        resolve();
    } else {
        window.onload = resolve;
    }
})
/**
 * узнаем координаты пользователя 
 * и передаем в следующий .then().
 * Передается массив
 */

.then(controller.userPosition.bind(null))

/**
 * Показываем карту и 
 * передаем ее в следующий .then()
 */

.then(userPosition => controller.showMap.call(null, userPosition))

.then(myMap => controller.addAllMarks.call(null, myMap))

/**
 * Добавляем слушатели событий
 */

.then(myMap => controller.appEvents.call(null, myMap))

.catch(function(e) {
    alert('Косяк!!!@@$');
    console.log('Ошибка: ' + e);
});


