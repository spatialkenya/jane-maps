import React from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import injectTapEventPlugin from 'react-tap-event-plugin';

import {
  Jane,
  JaneLayer,
  Source,
  MapLayer,
  Legend,
  Marker
} from '../dist';

import TransportationJaneLayer from './transportation/JaneLayer';
import SchoolJaneLayer from './school/SchoolLayer';
import AdminLayer from './admin/AdminLayer';
import DummyComponent from './DummyComponent';

import '../dist/styles.css';
import './index.css';

injectTapEventPlugin();

const featureSource = {
  type: 'FeatureCollection',
  features: [
    {
      type: 'Feature',
      properties: {},
      geometry: {
        type: 'Point',
        coordinates: [36.8219, -1.2921]
      }
    }
  ]
};

const markerFeature = {
  type: 'Feature',
  properties: {},
  geometry: {
    type: 'Point',
    coordinates: [-74.00390625, 40.71499673906409]
  }
};

const JaneExample = () => {
  const mapboxGLOptions = {
    mapbox_accessToken: 'pk.eyJ1IjoiY3dob25nbnljIiwiYSI6ImNpczF1MXdrdjA4MXcycXA4ZGtyN2x5YXIifQ.3HGyME8tBs6BnljzUVIt4Q',
    center: [
      36.8219, -1.2921
    ],
    zoom: 7,
    minZoom: 5,
    maxZoom: null,
    pitch: 0,
    hash: false,
    navigationControlPosition: 'bottom-right'
  };

  const searchConfig = {
    mapzen_api_key: 'mapzen-ZyMEp5H',
    bounds: {
      minLon: -74.292297,
      maxLon: -73.618011,
      minLat: 40.477248,
      maxLat: 40.958123
    }
  };

  return (
    <MuiThemeProvider>
      <div style={{
        height: '500px',
        width: '500px'
      }}>
        <Jane mapboxGLOptions={mapboxGLOptions} search searchConfig={searchConfig}>
          <JaneLayer id="feature" name="Feature" icon="university" defaultSelected component={< DummyComponent />}>

            <Source id="feature" type="geojson" data={featureSource}/>

            <MapLayer id="feature" source="feature" type="circle" paint={{
              'circle-radius': 10,
              'circle-color': 'steelblue',
              'circle-opacity': 0.7
            }}/>
            <Marker label="Example Marker" feature={markerFeature}/>

            <Legend>
              <div className="legendSection">
                <p>Disclaimer: This map aggregates data from multiple public sources, and DCP cannot verify the accuracy of all records. Not all sites are service locations, among other limitations.
                  <a href="http://docs.capitalplanning.nyc/facdb/#iii-limitations-and-disclaimers">
                    Read more</a>.</p>
              </div>
            </Legend>

          </JaneLayer>

          <TransportationJaneLayer defaultDisabled/>
          <SchoolJaneLayer/>
          <AdminLayer defaultDisabled bounds={[
            [
              32.958984, -5.353521
            ],
            [43.50585, 5.615985]
          ]} />
        </Jane>
      </div>
    </MuiThemeProvider>
  );
};

export default JaneExample;
