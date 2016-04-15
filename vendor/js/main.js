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

.then(userPosition => {
    return controller.showMap(userPosition);
})

.then(myMap => {//Вешаем слушатель событий

    return new Promise((resolve, reject) => {
        // var objectManager = new ymaps.ObjectManager({
        //     // Чтобы метки начали кластеризоваться, выставляем опцию.
        //     clusterize: true,
        //     // ObjectManager принимает те же опции, что и кластеризатор.
        //     gridSize: 32
        // });


        // objectManager.objects.options.set('preset', 'islands#greenDotIcon');
        // objectManager.clusters.options.set('preset', 'islands#greenClusterIcons');
        // objectManager.add(x);

        // myMap.events.add('click',e => {
        //     let XandY = e.get('coords');
        //     coords = {"x": XandY[0], "y": XandY[1]};

        //     ymaps.geocode(XandY).then(function(res) {
        //         adress = res.geoObjects.get(0).properties.get('text');
        //     });                
        //     // myMap.geoObjects.add(objectManager);

        // });

        myMap.events.add('click',e => {
            controller.newFeedback(e);
        });

        let sendBtn   = document.getElementById('sendBtn');
        let hidePopup = document.getElementById('hidePopup');
        
        sendBtn.addEventListener('click', e => {
            controller.sendForm(myMap);
        });

        hidePopup.addEventListener('click',e => {
            controller.hidePopup();
        });

    });

})

.catch(function(e) {
    alert('Косяк!!!@@$');
    console.log('Ошибка: ' + e);
});


