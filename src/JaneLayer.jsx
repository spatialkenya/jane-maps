import React from 'react';
import PropTypes from 'prop-types';
import FontIcon from 'material-ui/FontIcon';
import IconButton from 'material-ui/IconButton';

const style = {
  fontIcon: {
    fontSize: '18px',
    margin: '8px',
    height: '18px',
    width: '18px',
    color: '#5F5F5F',
    left: 0,
  },
  toggle: {
    position: 'absolute',
    display: 'initial',
    width: 'auto',
    right: '28px',
    top: '7px',
  },
  closeIcon: {
    width: 36,
    height: 36,
    padding: 0,
    position: 'absolute',
    right: 0,
    top: 0,
  },
  closeIconMaterial: {
    fontSize: '15px',
    margin: '8px',
    height: '15px',
    width: '15px',
    float: 'right',
    color: '#5F5F5F',
  }
};

class JaneLayer extends React.Component {

  static contextTypes = {
    registerLayer: PropTypes.func,
    unregisterLayer: PropTypes.func,
    updateLayer: PropTypes.func
  };

  componentDidMount() {
    this.context.registerLayer(this.props.id, this.props);
  }

  componentWillReceiveProps(newProps) {
    if (JSON.stringify(newProps.mapConfig) !== JSON.stringify(this.props.mapConfig)) {
      this.context.updateLayer(this.props.id, newProps);
    }
  }

  componentWillUnmount() {
    this.context.unregisterLayer(this.props.id);
  }

  render() {
    const SidebarComponent = this.props.component;

    return (
      <div style={{ display: this.props.id === this.props.selectedLayer ? 'inline' : 'none' }}>
        <div className="drawer-header">
          <FontIcon className={`fa fa-${this.props.icon}`} style={style.fontIcon} />
          {this.props.name}
          <IconButton
            iconClassName={'fa fa-times'}
            style={style.closeIcon}
            iconStyle={style.closeIconMaterial}
            onTouchTap={this.props.onClose}
          />
        </div>

        { SidebarComponent }
      </div>
    );
  }
}

JaneLayer.displayName = 'JaneLayer';

JaneLayer.propTypes = {
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  icon: PropTypes.string.isRequired,
  component: PropTypes.object.isRequired,
  mapConfig: PropTypes.array.isRequired,
  onClose: PropTypes.func,
  onMapLayerClick: PropTypes.func,
  defaultDisabled: PropTypes.bool,
};

JaneLayer.defaultProps = {
  onMapLayerClick: null,
};

export default JaneLayer;
