import Geo from './moduls/geo';


new Promise(resolve => {//Ждем загрузки страницы
    if (document.readyState === 'complete') {
        resolve();
    } else {
        window.onload = resolve;
    }
})
.then(() => {// Узнаем координаты пользователя

    return new Promise((resolve, reject) => {
        let userPosition = new Geo;
        userPosition.getPos(resolve);
    });

})
.then(userPosition => {//Показываем карту

    return new Promise((resolve, reject) => {
        var myMap;

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


    });

})
.then(myMap => {//Вешаем слушатель событий

    return new Promise((resolve, reject) => {
        let coords;
        var objectManager = new ymaps.ObjectManager({
            // Чтобы метки начали кластеризоваться, выставляем опцию.
            clusterize: true,
            // ObjectManager принимает те же опции, что и кластеризатор.
            gridSize: 32
        });


        var x = {
                type: "Feature",
                id: 0,
                geometry: {
                    type: "Point",
                    coordinates: [59.85367273926185, 30.409485187402343]
                },
                 properties: {
                    balloonContent: "Содержимое балуна",
                    clusterCaption: "Еще одна метка", 
                    hintContent: "Текст подсказки"
                    }
                }

        objectManager.objects.options.set('preset', 'islands#greenDotIcon');
        objectManager.clusters.options.set('preset', 'islands#greenClusterIcons');
        objectManager.add(x);

        myMap.events.add('click',e => {
            if(e.target.tagName === 'YMAPS'){
                let XandY = e.get('coords');
                coords = {"x": XandY[0], "y": XandY[1]};
            }                
            // myMap.geoObjects.add(objectManager);

        });

        window.addEventListener('click',e => {
            console.log(e);
        });

        // btn.onclick = function(e) {
        //     console.log(coords);
        // }
    });

})

.catch(function(e) {
    alert('Ошибка: ' + e.message);
});


