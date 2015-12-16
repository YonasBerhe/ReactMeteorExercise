App = React.createClass({

  mixins: [ReactMeteorData],

  getMeteorData() {
    return {tasks: Tasks.find({}, {
        sort: {
          createdAt: -1
        }
      }).fetch()}
  },

  renderTasks() {
    return this.data.tasks.map((task) => {
      return <Task key={task._id} task={task}/>;
    });
  },

  handleSubmit(event) {
    event.preventDefault();
    var text = React.findDOMNode(this.refs.textInput).value.trim();

    Tasks.insert({text: text, createdAt: new Date()});

    React.findDOMNode(this.refs.textInput).value = "";
  },

  render() {
    return (
      <header>
        <div className="container">
            <h1>Todo List</h1>

          <label className="hide-completed">
            <input
              type="checkbox"
              readOnly={true}
              checked={this.state.hide-completed}
              onClick={this.toggleHideCompleted} />
            Hide Completed Tasks
          </label>

          <ul>
            {this.renderTasks()}
          </ul>
        </div>
        <form className="new-Task" onSubmit={this.handleSubmit}>
          <input type="text" ref="textInput" placeholder="Type to add new tasks"/>
        </form>
      </header>
    );
  }
});
