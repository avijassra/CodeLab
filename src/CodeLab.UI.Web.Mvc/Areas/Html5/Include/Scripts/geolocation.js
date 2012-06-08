$(function () {
    if (navigator.geolocation) {

        function hasPosition(position) {
            var point = new google.maps.LatLng(position.coords.latitude, position.coords.longitude),

            myOptions = {
                zoom: 15,
                center: point,
                mapTypeId: google.maps.MapTypeId.ROADMAP
            },

            mapDiv = document.getElementById("map_canvas"),
            map = new google.maps.Map(mapDiv, myOptions),

            marker = new google.maps.Marker({
                position: point,
                map: map,
                title: "You are here"
            });
        }
        navigator.geolocation.getCurrentPosition(hasPosition);
    }
});