import React, { Component } from 'react';
import MapGL, { Source, Layer } from 'react-map-gl';
import {
  clusterLayer,
  clusterCountLayer,
  unclusteredPointLayer,
} from './layer';

const MAPBOX_TOKEN =
  'pk.eyJ1Ijoid2lsc29uLXJvbWVybyIsImEiOiJjazlqcTEycmwxbXl6M2VudmNtOTJiY3VnIn0.ToeGMZjpeIDELTNCUf-I1Q'; // Set your mapbox token here

export default class Map extends Component<{}, { viewport: {} }> {
  _sourceRef: any = {};

  _onViewportChange = (viewport) => this.setState({ viewport });
  constructor(props) {
    super(props);

    this.state = {
      viewport: {
        latitude: 10.50,
        longitude: -43.80,
        zoom: 1.5,
        bearing: 0,
        pitch: 0,
      },
    };
    this._sourceRef = React.createRef();
  }

  _onClick = (event) => {
    const feature = event.features[0];
    const clusterId = feature.properties.cluster_id;

    const mapboxSource = this._sourceRef.current.getSource();

    mapboxSource.getClusterExpansionZoom(clusterId, (err, zoom) => {
      if (err) {
        return;
      }

      this._onViewportChange({
        ...this.state.viewport,
        longitude: feature.geometry.coordinates[0],
        latitude: feature.geometry.coordinates[1],
        zoom,
        transitionDuration: 500,
      });
    });
  };

  render() {
    return (
      <MapGL
        {...this.state.viewport}
        width='100%'
        height='500px'
        onViewportChange={(viewport) => this.setState({ viewport })}
        mapboxApiAccessToken={MAPBOX_TOKEN}
        onClick={this._onClick}
      >
        <Source
          type='geojson'
          data='https://docs.mapbox.com/mapbox-gl-js/assets/earthquakes.geojson'
          cluster={true}
          clusterMaxZoom={14}
          clusterRadius={50}
          ref={this._sourceRef}
        >
          <Layer {...clusterLayer} />
          <Layer {...clusterCountLayer} />
        </Source>
      </MapGL>
    );
  }
}
