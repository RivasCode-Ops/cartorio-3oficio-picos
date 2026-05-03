(function () {
  var DEST_LAT = -7.0772;
  var DEST_LNG = -41.467;

  function buildDirectionsUrl(originLat, originLng) {
    var q =
      'https://www.google.com/maps/dir/?api=1&destination=' +
      encodeURIComponent(DEST_LAT + ',' + DEST_LNG) +
      '&travelmode=driving';
    if (typeof originLat === 'number' && typeof originLng === 'number') {
      q += '&origin=' + encodeURIComponent(originLat + ',' + originLng);
    }
    return q;
  }

  function abrirRotaGoogleMaps() {
    if (!navigator.geolocation) {
      window.open(buildDirectionsUrl(), '_blank', 'noopener,noreferrer');
      return;
    }
    navigator.geolocation.getCurrentPosition(
      function (pos) {
        window.open(
          buildDirectionsUrl(pos.coords.latitude, pos.coords.longitude),
          '_blank',
          'noopener,noreferrer'
        );
      },
      function () {
        window.open(buildDirectionsUrl(), '_blank', 'noopener,noreferrer');
      },
      { enableHighAccuracy: false, timeout: 12000, maximumAge: 120000 }
    );
  }

  window.abrirRotaGoogleMaps = abrirRotaGoogleMaps;

  document.addEventListener('DOMContentLoaded', function () {
    if (document.querySelector('.maps-route-float')) return;

    var btn = document.createElement('button');
    btn.type = 'button';
    btn.className = 'maps-route-float';
    btn.setAttribute('aria-label', 'Traçar rota até o cartório no Google Maps');

    var svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    svg.setAttribute('viewBox', '0 0 24 24');
    svg.setAttribute('width', '26');
    svg.setAttribute('height', '26');
    svg.setAttribute('aria-hidden', 'true');
    var path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
    path.setAttribute(
      'd',
      'M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5A2.5 2.5 0 1 1 12 6a2.5 2.5 0 0 1 0 5.5z'
    );
    path.setAttribute('fill', 'currentColor');
    svg.appendChild(path);

    var span = document.createElement('span');
    span.textContent = 'Rota';

    btn.appendChild(svg);
    btn.appendChild(span);
    btn.addEventListener('click', abrirRotaGoogleMaps);

    document.body.appendChild(btn);
  });
})();
