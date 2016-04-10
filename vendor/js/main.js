function showPosition(pos) {
    console.log(pos)
}


function Geo() {
    this.geoLoc = navigator.geolocation;
}

Geo.prototype.getPos = function(resolve) {
    if(navigator.geolocation){
        return this.geoLoc.getCurrentPosition(function(pos) {
            resolve([pos.coords.latitude ,pos.coords.longitude]);
        });
    } else {
        throw new Error('Ваш браузер не поддерживает геолокацию');
    }
        
};

new Promise(function(resolve) {
    if (document.readyState === 'complete') {
        resolve();
    } else {
        window.onload = resolve;
    }
})
.then(function() {

    return new Promise(function(resolve, reject) {
        var userPosition = new Geo;
        userPosition.getPos(resolve);
    });

})
.then(function(userPosition) {

    return new Promise(function(resolve, reject) {
        var myMap;

        function init () {
            myMap = new ymaps.Map('map', {
                center: userPosition,
                zoom: 10
            }, {
                searchControlProvider: 'yandex#search'
            });
        }

        ymaps.ready(init);

    });

})

.catch(function(e) {
    alert('Ошибка: ' + e.message);
});


