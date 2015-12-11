App = React.createClass({

mixins: [ReactMeteorData],



  getMeteorData() {
    return {
      tasks: Task.find({}).fetch()
    };
  },

renderTask () {
  return this.getTasks().map((task) => {
    return <Task key={task._id} task={task}/>;
  });
},

render () {
  return(
    <div className="container">
      <header>
        <h1>
          Todo List
        </h1>
      </header>

      <ul>
        {this.renderTasks()}
      </ul>
    </div>

  );
}
});
