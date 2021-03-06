import React, { Component } from "react";
import "./index.css";
import cnCity from "./cnCity";
import { GroupPicker, CascadePicker } from "../../src";

class Picker extends Component {
  constructor(props) {
    super(props);

    this.state = {
      group_show: false,
      group_value: "",
      group_data: [
        [
          {
            label: "A1 (Disabled)",
            value: "A1",
            disable: true
          },
          {
            label: "A2",
            value: "A2"
          },
          {
            label: "A3",
            value: "A3"
          },
          {
            label: "A4 (Disabled)",
            value: "A4",
            disable: true
          },
          {
            label: "A5",
            value: "A5"
          },
          {
            label: "A6",
            value: "A6"
          },
          {
            label: "A7",
            value: "A7"
          }
        ],
        [
          {
            label: "B1",
            value: "B1"
          },
          {
            label: "B2",
            value: "B2"
          },
          {
            label: "B3 (Disabled)",
            value: "B3",
            disable: true
          },
          {
            label: "B4",
            value: "B4"
          }
        ],
        [
          {
            label: "C1",
            value: "C1"
          },
          {
            label: "C2",
            value: "C2"
          },
          {
            label: "C3 (Disabled)",
            value: "C3",
            disable: true
          },
          {
            label: "C4",
            value: "C4"
          }
        ]
      ],

      cascade_show: false,
      cascade_value: ""
    };
  }

  render() {
    return (
      <div className="picker">
        <ul>
          <li>
            <span>GroupPicker</span>
            <input
              type="text"
              onClick={e => {
                e.preventDefault();
                this.setState({ group_show: true });
              }}
              placeholder="Pick a item"
              value={this.state.group_value}
              readOnly={true}
            />
          </li>
          <li>
            <span>CascadePicker</span>
            <input
              type="text"
              value={this.state.cascade_value}
              onClick={e => {
                e.preventDefault();
                this.setState({ cascade_show: true });
              }}
              placeholder="Chose Your cascade value"
              readOnly={true}
            />
          </li>
        </ul>

        <GroupPicker
          data={this.state.group_data}
          dataKeys={{ text: "label" }}
          show={this.state.group_show}
          onOk={selected => {
            let value = "";
            selected.forEach((s, i) => {
              value += this.state.group_data[i][s].value;
            });
            this.setState({
              group_value: value,
              group_show: false
            });
          }}
          onCancel={e => this.setState({ group_show: false })}
          onMaskClick={e => this.setState({ group_show: false })}
        />

        <CascadePicker
          data={cnCity}
          dataKeys={{ text: "name", value: "code", sub: "sub" }}
          show={this.state.cascade_show}
          onOk={selected => {
            let value = cnCity;
            selected.forEach((s, i) => {
              if (i === selected.length - 1) {
                value = value[s].code;
              } else {
                value = value[s].sub;
              }
            });
            this.setState({
              cascade_value: value,
              cascade_show: false
            });
          }}
          onCancel={e => this.setState({ cascade_show: false })}
          onMaskClick={e => this.setState({ cascade_show: false })}
        />
      </div>
    );
  }
}
export default Picker;
