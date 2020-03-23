import React, { Component } from 'react';
import MapGL, { Source, Layer } from 'react-map-gl';
import {clusterLayer, clusterCountLayer, unclusteredPointLayer} from './layer';

const MAPBOX_TOKEN = ''; // Set your mapbox token here

export default class Map extends Component<{}, { viewport: {} }> {
    _sourceRef: any = {};
    
    _onViewportChange = viewport => this.setState({viewport});
  constructor(props) {
    super(props);
    
    this.state = {
      viewport: {
        latitude: 40.67,
        longitude: -103.59,
        zoom: 3,
        bearing: 0,
        pitch: 0
      }
    };
    this._sourceRef = React.createRef();
  }

  _onClick = event => {
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
        transitionDuration: 500
      });
    });
  };

  render() {
    return (
      <MapGL
        {...this.state.viewport}
        width="100vw"
        height="100vh"
        onViewportChange={viewport => this.setState({viewport})}
        mapboxApiAccessToken={MAPBOX_TOKEN}
        onClick={this._onClick}
      >
           <Source
          type="geojson"
          data="https://docs.mapbox.com/mapbox-gl-js/assets/earthquakes.geojson"
          cluster={true}
          clusterMaxZoom={14}
          clusterRadius={50}
          ref={this._sourceRef}
        >
          <Layer {...clusterLayer} />
          <Layer {...clusterCountLayer} />
          <Layer {...unclusteredPointLayer} />
        </Source>
      </MapGL>
    );
  }
}