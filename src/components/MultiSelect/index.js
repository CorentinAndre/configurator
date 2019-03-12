/* eslint-disable filenames/match-exported */

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Box, StdinContext } from 'ink';
import { ItemShape } from './shapes';
import Item from './Item';

const ARROW_UP = '\u001B[A';
const ARROW_DOWN = '\u001B[B';
const ENTER = '\r';
const SPACE = '\u0020';

class MultiSelect extends Component {
  static propTypes = {
    setRawMode: PropTypes.func,
    stdin: PropTypes.any, // eslint-disable-line react/forbid-prop-types
    items: PropTypes.arrayOf(ItemShape),
    onSelect: PropTypes.func.isRequired,
  };

  static defaultProps = {
    items: [],
  };

  state = {
    selected: [],
    activeIndex: null,
  };

  componentDidMount() {
    const { stdin, setRawMode } = this.props;

    setRawMode(true);
    stdin.on('data', this.handleInput);
    if (this.props.items.length > 0) {
      this.setState({
        activeIndex: 0,
      });
    }
  }

  componentWillUnmount() {
    const { stdin, setRawMode } = this.props;

    stdin.removeListener('data', this.handleInput);
    setRawMode(false);
  }

  handleInput = data => {
    const s = String(data);

    switch (s) {
      case ARROW_DOWN:
        this.focusNext();
        break;
      case ARROW_UP:
        this.focusPrev();
        break;
      case SPACE:
        this.toggleCurrent();
        break;
      case ENTER:
        this.handleSelect();
        break;
      default:
        break;
    }
  };

  focusNext = () => {
    this.setState(({ activeIndex }) => {
      const nextValue = activeIndex + 1;
      return nextValue === this.props.items.length
        ? { activeIndex: 0 }
        : { activeIndex: nextValue };
    });
  };

  focusPrev = () => {
    this.setState(({ activeIndex }) => {
      const nextValue = activeIndex - 1;
      return nextValue >= 0
        ? { activeIndex: nextValue }
        : { activeIndex: this.props.items.length - 1 };
    });
  };

  toggleCurrent = () => {
    const containsActiveIndex = this.state.selected.findIndex(
      (one, index) => one === this.props.items[this.state.activeIndex].value,
    );
    // console.log(containsActiveIndex);
    // console.log(this.state.selected);
    if (containsActiveIndex >= 0) {
      this.setState(({ selected }) => {
        const updatedSelection = selected.filter(
          (_, index) => index !== containsActiveIndex,
        );
        return { selected: updatedSelection };
      });
    } else {
      this.setState(({ selected, activeIndex }) => ({
        selected: [...selected, activeIndex],
      }));
    }
  };

  handleSelect = () => {
    return this.props.onSelect(
      this.state.selected.map(index => {
        return this.props.items[index];
      }),
    );
  };

  isSelected = index => {
    return this.state.selected.indexOf(index) >= 0;
  };

  isActive = index => this.state.activeIndex === index;

  render() {
    return (
      <Box flexDirection="column">
        {this.props.items.map(({ label, value }, index) => {
          return (
            <Item
              key={value}
              active={this.isActive(index)}
              selected={this.isSelected(index)}
              label={label}
            />
          );
        })}
      </Box>
    );
  }
}

const MultiSelectWithStdin = ({ items, onSelect }) => {
  return (
    <StdinContext.Consumer>
      {({ stdin, setRawMode }) => {
        return (
          <MultiSelect
            items={items}
            stdin={stdin}
            setRawMode={setRawMode}
            onSelect={onSelect}
          />
        );
      }}
    </StdinContext.Consumer>
  );
};

MultiSelectWithStdin.propTypes = {
  items: PropTypes.arrayOf(ItemShape),
  onSelect: PropTypes.func.isRequired,
};

export default MultiSelectWithStdin;
