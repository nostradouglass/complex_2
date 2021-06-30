import axios from "axios";
import React from "react";

interface IState {
  seenIndexes: [];
  values: any;
  index: any;
}

interface IProps {}

class Fib extends React.Component<IProps, IState> {
  state: IState = {
    seenIndexes: [],
    values: {},
    index: "",
  };

  componentDidMount() {
    this.fetchValues();
    this.fetchIndexes();
  }

  async fetchValues() {
    const values = await axios.get("/api/values/current");
    this.setState({ values: values.data });
  }

  async fetchIndexes() {
    const seenIndexes = await axios.get("/api/values/all");
    this.setState({
      seenIndexes: seenIndexes.data,
    });
  }

  renderSceneIndexes() {
    return this.state.seenIndexes.map(({ number}) => number).join(', ')
  }

  renderValues() {
    const entries = [];
    for (let key in this.state.values) {
      entries.push(
        <div key={key}>
          For index {key} I calulated {this.state.values[key]}
        </div>
      );
    }
    return entries;
  }

  handleSubmit = async (e: React.SyntheticEvent) => {
    e.preventDefault();

    await axios.post("/api/values", {
      index: this.state.index,
    });
    this.setState({ index: "" });
  };

  render() {
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <label htmlFor="">Enter your index</label>
          <input
            value={this.state.index}
            onChange={(e) => this.setState({ index: e.target.value })}
            type="text"
          />
          <button>Submit</button>
        </form>
        <h3>Indexes I have seen:</h3>
        {this.renderSceneIndexes()}
        <h3>Calculated values</h3>
        {this.renderValues()}
      </div>
    );
  }
}

export default Fib;
