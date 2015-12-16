App = React.createClass({

  mixins: [ReactMeteorData],


getIntialState() {
      return {

          hideCompleted: false
      };
    },


    getMeteorData() {
      let query = {};

        // If hide completed is checked, filter tasks
        query = {checked: {$ne: true}};

      return {
        tasks: Tasks.find(query, {sort: {createdAt: -1}}).fetch(),
        incompleteCount: Tasks.find({checked: {$ne: true}}).count(),
        currentUser: Meteor.user()
      };
    },


  renderTasks() {
    return this.data.tasks.map((task) => {
      return <Task key={task._id} task={task}/>;
    });
  },

  handleSubmit(event) {
    event.preventDefault();
    var text = React.findDOMNode(this.refs.textInput).value.trim();

    Tasks.insert({
      text: text,
       createdAt: new Date(),
       owner: Meteor.userId(),
       username: Meteor.user(),username
     });

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
              onClick={this.toggleHideCompleted} />
            Hide Completed Tasks
          </label>

          <ul>
            {this.renderTasks()}
          </ul>
        </div>

        <AccountsUIWrapper />
      {this.data.currentUser ?
        <form className="new-task" onSubmit={this.handleSubmit}>
          <input
            type="text"
            ref="textInput"
            placeholder="New Task" />
        </form>: ''

      }
      </header>
    );
  }
});
