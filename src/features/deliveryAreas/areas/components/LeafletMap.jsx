import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { mapboxClient } from 'common/constants';

import { MapContainer, TileLayer } from 'react-leaflet';
import LeafletPanel from './LeafletPanel/LeafletPanel';
import AreaLayer from './AreaLayer/AreaLayer';
import ShopMarker from './ShopMarker';

function LeafletMap() {
  const { draw, shop } = useSelector((state) => ({
    draw: state.mode.draw,
    shop: state.shop.shop,
  }));
  const [map, setMap] = useState(null);
  const [shopLocation, setShopLocation] = useState(null);

  useEffect(() => {
    if (map) {
      if (draw) {
        map._container.style.cursor = 'cell !important';
      } else {
        map._container.style.cursor = 'default';
      }
    }
  }, [draw, map]);

  useEffect(() => {
    const formattedAddress = shop.location.formattedAddress;
    const response = mapboxClient.geocoding
      .forwardGeocode({
        query: formattedAddress,
        countries: ['DE'],
        types: ['address'],
        autocomplete: false,
        fuzzyMatch: false,
      })
      .send();
    response.then((data) => {
      setShopLocation([data.body.features[0].center[1], data.body.features[0].center[0]]);
    });
  }, [shop]);

  const onMapCreate = (map) => {
    setMap(map);
    map.invalidateSize();
  };

  return shopLocation ? (
    <MapContainer
      style={{ width: '100%', height: '100%' }}
      center={shopLocation}
      zoom={11}
      doubleClickZoom={false}
      zoomControl={true}
      whenCreated={onMapCreate}
    >
      <TileLayer
        attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <ShopMarker draw={draw} shop={shop} shopLocation={shopLocation} />
      <LeafletPanel />
      <AreaLayer />
    </MapContainer>
  ) : null;
}

export default LeafletMap;
