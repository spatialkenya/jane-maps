import React from 'react';
import PropTypes from 'prop-types';
import {JaneLayer, Source, MapLayer} from '../../dist';
import SidebarComponent from './SidebarComponent';
import {sources, countyLayer} from './config';

class AdminLayer extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      checkboxes: {
        counties: true
      },
      select: {
        disabled: false,
      },
      selected:null,
      buttondisabled:true
    };

    this.onCheckboxChange = this.onCheckboxChange.bind(this);
    this.updateSelectedCounty = this.updateSelectedCounty.bind(this);
    this.getBounds = this.getBounds.bind(this);
  }

  onCheckboxChange(name) {
    const checkboxes = {
      ...this.state.checkboxes,
      [name]: !this.state.checkboxes[name]
    };

    const select = {
      ...this.state.select,
      ['disabled']: !this.state.select['disabled']
    };
    this.setState({checkboxes},function(){
      if(!this.state.checkboxes.counties){
        this.setState({selected:''})//reset bounds
      }
    });
    this.setState({select});

  }
  updateSelectedCounty(newCounty) {
    this.setState({selected:newCounty},function(){
      console.log(this.state.selected)
    });
  }
getBounds(){
  if (this.state.selected === 'nairobi'){
    return ([[36.491699219000054,-1.311843077999924],[37.36187744100005, -0.75750732399996]]);
  }
  else{
    if (this.state.selected === 'kiambu'){
      console.log(this.state.selected);
      return ([[36.66345492000005, -1.442145065999966], [37.103703299000074,-1.157910637999976]]);
    }
  }
  return([[
      32.958984,
      -5.353521
  ], [
      43.50585,
      5.615985
  ]]);
}

  renderCounties() {
    if (!this.state.checkboxes.counties) {
      return null;
    }

    return [ < Source id = "counties" type = "geojson" data = {
        sources.countysource.data
      } />, < MapLayer id = 'counties' source = 'counties' {
        ...countyLayer.counties
      } fitFeatureBounds={this.getBounds()}/>
    ].map((child, index) => ({
      ...child,
      key: index
    }));
  }
  render() {
    return (
      <JaneLayer id="county" name="Counties" icon="flag" defaultSelected={this.props.defaultSelected} defaultDisabled={this.props.defaultDisabled} component={< SidebarComponent checkboxes = {
        this.state.checkboxes
      }
      onCheckboxChange = {
        this.onCheckboxChange
      }
      onCountyChange = {
        this.updateSelectedCounty
      }
      disabled = {
        this.state.select
      }
      selected={this.state.selected} />}>
        {this.renderCounties()}
      </JaneLayer>
    );
  }
}

AdminLayer.propTypes = {
  defaultSelected: PropTypes.bool,
  defaultDisabled: PropTypes.bool
};

AdminLayer.defaultProps = {
  defaultSelected: false,
  defaultDisabled: false
};

export default AdminLayer;
