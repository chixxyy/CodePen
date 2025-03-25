function initialize() {
    var mapOptions = {
        zoom: 10,
        center: new google.maps.LatLng(25.033964, 121.564468),
        mapTypeId: google.maps.MapTypeId.ROADMAP,
        minZoom: 2,
};
    var map = new google.maps.Map(document.getElementById('map'), mapOptions);
    var infoWindow = new google.maps.InfoWindow();
    var marker = new google.maps.Marker({
        position: new google.maps.LatLng(25.033964, 121.564468),
        map: map,
        title: 'Welcome!'
    });
    google.maps.event.addDomListener(window, "resize", function() {
        map.setCenter(mapOptions.center);
});
}
google.maps.event.addDomListener(window, 'load', initialize);