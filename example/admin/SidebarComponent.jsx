import React from 'react';
import Checkbox from 'material-ui/Checkbox';
import {Tabs, Tab} from 'material-ui/Tabs';
import RaisedButton from 'material-ui/RaisedButton';
import Select from 'react-select';
import 'react-select/dist/react-select.css';

var options = [
  {
    value: 'kiambu',
    label: 'Kiambu'
  }, {
    value: 'nairobi',
    label: 'Nairobi'
  }
];

const style = {
  margin: 12
};

const UIComponent = (props) => {

  return (
    <div>
      <Tabs className="sidebar-tabs">
        <Tab label="Data">
          <div className="sidebar-tab-content">
            <div style={{
              padding: '15px'
            }}>
              <h4>County Layer</h4>

              <Checkbox label="Counties" checked={props.checkboxes.counties} onCheck={() => props.onCheckboxChange('counties')}/>
              <h5>Select County to view details</h5>
              <Select name="form-field-name" options={options} simpleValue clearable={false} onChange={props.onCountyChange} disabled={props.disabled.disabled} value={props.selected}/>
              <a className="btn btn-info btn-sm" disabled={props.selected} style={style} href={"/explorer/"+props.selected} role="button" >{props.selected}</a>
            </div>
          </div>
        </Tab>
        <Tab label="About">
          <div className="sidebar-tab-content">
            <div className="padded">
              <h4>Admin Layers</h4>
              <p>Sources for these data layers are as follows:</p>
              <p/>
            </div>
          </div>
        </Tab>
      </Tabs>
    </div>
  );
};

export default UIComponent;
