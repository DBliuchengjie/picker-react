import React from "react";
import PropTypes from "prop-types";
import GroupPicker from "./GroupPicker";
import equal from "isEquall";

class MultiCascadePicker extends React.Component {
  constructor(props) {
    super(props);
    const { data, selectIndexs, dataKeys } = this.props;
    const { columns, newSelectIndexs } = this.parseData(selectIndexs);
    this.state = {
      columns,
      selectIndexs: newSelectIndexs
    };

    this.parseData = this.parseData.bind(this);
    this.updateColumn = this.updateColumn.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    if (!equal(this.props.data, nextProps.data)) {
      const { columns, newSelectIndexs } = this.parseData(
        nextProps.selectIndexs,
        nextProps
      );
      this.setState({
        columns,
        selectIndexs: newSelectIndexs
      });
    }
  }

  parseData(selectIndexs = [], props) {
    const { data, dataKeys } = props || this.props;
    let i = 0,
      dataItem = JSON.parse(JSON.stringify(data)),
      columns = [],
      newSelectIndexs = [];

    do {
      columns.push(dataItem);
      const selectIndex = dataItem[selectIndexs[i]] ? selectIndexs[i] : 0;
      newSelectIndexs.push(selectIndex);

      dataItem =
        Array.isArray(dataItem) &&
        dataItem[selectIndex] &&
        dataItem[selectIndex][dataKeys.sub];
      i++;
    } while (dataItem);

    return { columns, newSelectIndexs };
  }

  updateDataBySelected(selectIndexs, cb) {
    const { columns, newSelectIndexs } = this.parseData(selectIndexs);

    this.setState(
      {
        columns,
        selectIndexs: newSelectIndexs
      },
      () => cb()
    );
  }

  updateColumn(item, i, groupIndex, selectIndexs, picker) {
    this.updateDataBySelected(selectIndexs, () => {
      if (this.props.onChange) this.props.onChange(selectIndexs);
      picker.setState({
        selectIndexs: this.state.selectIndexs
      });
    });
  }

  handleChange(selectIndexs) {
    if (this.props.onOk) this.props.onOk(this.state.selectIndexs);
  }

  render() {
    const { className, show, dataKeys, onOk, onCancel, lang } = this.props;
    const { selectIndexs, columns } = this.state;
    return (
      <GroupPicker
        show={show}
        className={className}
        onChange={this.updateColumn}
        onOk={() => {
          if (onOk) onOk(selectIndexs);
        }}
        defaultSelectIndexs={selectIndexs}
        data={columns}
        dataKeys={dataKeys}
        onCancel={onCancel}
        lang={lang}
      >
        <div>xzxzx</div>
      </GroupPicker>
    );
  }
}

MultiCascadePicker.propTypes = {
  className: PropTypes.string,
  data: PropTypes.array.isRequired,
  dataKeys: PropTypes.object,
  defaultSelectIndexs: PropTypes.array,
  selectIndexs: PropTypes.array,
  onChange: PropTypes.func,
  onOk: PropTypes.func,
  onCancel: PropTypes.func,
  show: PropTypes.bool,
  lang: PropTypes.object
};

MultiCascadePicker.defaultProps = {
  data: [],
  dataKeys: {
    text: "text",
    value: "value",
    disable: "disable",
    sub: "sub"
  },
  show: false,
  lang: { leftBtn: "取消", rightBtn: "确定" }
};

export default MultiCascadePicker;
