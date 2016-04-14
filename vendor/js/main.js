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
        let coords = {},
            adress = '';
        var objectManager = new ymaps.ObjectManager({
            // Чтобы метки начали кластеризоваться, выставляем опцию.
            clusterize: true,
            // ObjectManager принимает те же опции, что и кластеризатор.
            gridSize: 32
        });


        // objectManager.objects.options.set('preset', 'islands#greenDotIcon');
        // objectManager.clusters.options.set('preset', 'islands#greenClusterIcons');
        // objectManager.add(x);

        myMap.events.add('click',e => {
            let XandY = e.get('coords');
            coords = {"x": XandY[0], "y": XandY[1]};

            ymaps.geocode(XandY).then(function(res) {
                adress = res.geoObjects.get(0).properties.get('text');
            });                
            // myMap.geoObjects.add(objectManager);

        });

        window.addEventListener('click',e => {
            
        });

    });

})

.catch(function(e) {
    alert('Ошибка: ' + e.message);
});


