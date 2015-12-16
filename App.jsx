App = React.createClass({

  mixins: [ReactMeteorData],

  getMeteorData() {
    return {tasks: Task.find({}).fetch()};
  },

  renderTask() {
    return this.getTasks().map((task) => {
      return <Task key={task._id} task={task}/>;
    });
  },

  handleSubmit(event) {
    event.preventDefault();
    var text = React.findDOMNode(this.refs.textInput).value.trim();

    // reffering to the mongo db tasks in the file simple todos react.js file
    Tasks.insert({
      text: text,
      createdAt: new Date()
    });

    React.findDOMNode(this.refs.textInput).value = "";

  },

  render() {
    return (
      <div className="container">
        <header>
          <h1>
            Todo List
          </h1>
          {/* form to allow new data in to the Collection through the client side*/}
          <form className="new-task" onSubmit={this.handleSubmit}>
            <input type="text" ref="textInput" placeholder="Type to add new tasks"/>
          </form>
        </header>
        <ul>
          {this.renderTasks()}
        </ul>
      </div>

    );
  }
});
