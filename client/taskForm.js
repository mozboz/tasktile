
FORM_MODE_ADD = 1;
FORM_MODE_EDIT = 2;
taskFormMode = null;

// This dependency automatically changes stuff that requires javascript to change when Session variable 'selectedTask'
// changes. Inline template that doesn't need javascript updating is updated via the helper.
Deps.autorun(function () {
    console.log(Session.get('selectedTask'));
    task = Tasks.findOne(Session.get('selectedTask'));
    console.log(task);
    if (task) {
        $("#inputImportance").val(task.importance);
        $("#inputTaskDueDate").datepicker();
        $("#inputTaskDueDate").datepicker("setDate", task.dueDate);
    }
});

Template.taskForm.helpers({
    task: function() {
        return Tasks.findOne(Session.get('selectedTask'));
    },
    importanceOptions: function() {
        return IMPORTANCES;
    }
});

Template.taskForm.events({
    'submit form': function(event) {
        event.preventDefault();
        console.log($(event.target).find('[name=inputTaskName]').val() + ' ' + $(event.target).find('[name=inputImportance]').val());

        var task = {
            taskName: $(event.target).find('[name=inputTaskName]').val(),
            importance: $(event.target).find('[name=inputImportance]').val(),
            dueDate: $(event.target).find('[name=inputTaskDueDate]').val()
        };
        if (taskFormMode == FORM_MODE_EDIT) {
            task._id = Tasks.update(Session.get('selectedTask'), {$set: task});
        } else {
            console.log("Only FORM_MODE_EDIT is implemented");
        }
        $('#taskForm').modal('hide');
        refitTiles();
        // Meteor.Router.to('postPage', post);

    }
});

Template.taskTile.events({
    'click': function(event) {
        // See also the Deps.autorun below which takes care of updating anything that needs to be updated from javascript
        Session.set('selectedTask', this._id);
        setTaskFormMode(FORM_MODE_EDIT);
        $('#taskForm').modal();
    }
});

function setTaskFormMode(mode) {
    taskFormMode = mode;
    if (mode==FORM_MODE_EDIT) {
        $('#taskFormSubmitButton').html('Save');
    }
}