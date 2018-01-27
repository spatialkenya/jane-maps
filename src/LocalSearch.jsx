import React from 'react'; // eslint-disable-line
import PropTypes from 'prop-types';
import _ from 'underscore';

class LocalSearch extends React.Component {

  static displayName = 'LocalSearch';

  static contextTypes = {
    addLocalSearch: PropTypes.func,
    removeLocalSearch: PropTypes.func,
  };

  static propTypes = {
    children: PropTypes.oneOfType([
      PropTypes.array,
      PropTypes.object,
    ]),
  };

  static defaultProps = {
    children: null,
  };

  componentDidMount() {
    this.localsearch = this.props.children;

    this.context.addLocalSearch(this.localsearch);
  }

  componentWillReceiveProps(nextProps) {
    if (!_.isEqual(this.props.children, nextProps.children)) {
      this.context.removeLocalSearch(this.localsearch);

      this.localsearch = nextProps.children;

      this.context.addLocalSearch(this.localsearch);
    }
  }

  componentWillUnmount() {
    this.context.removeLocalSearch(this.localsearch);
  }

  render() {
    return null;
  }
}

export default LocalSearch;
