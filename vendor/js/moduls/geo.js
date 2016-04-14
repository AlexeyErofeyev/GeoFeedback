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

export default Geo;