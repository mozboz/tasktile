
FORM_MODE_ADD = 1;
FORM_MODE_EDIT = 2;
taskFormMode = null;

// This dependency automatically changes stuff that requires javascript to change when Session variable 'selectedTask'
// changes. Inline template that doesn't need javascript updating is updated via the helper.
Deps.autorun(function () {
    console.log(Session.get('selectedTask'));
    task = Tasks.findOne(Session.get('selectedTask'));
    if (task) {
        console.log(task);
        $("#inputImportance").val(task.importance);
        $("#inputTaskDueDate").datepicker();
        $("#inputTaskDueDate").datepicker("setDate", task.dueDate);
    }
});

Template.taskForm.helpers({
    task: function() {
        return Tasks.findOne(Session.get('selectedTask')) || {};
    },
    importanceOptions: function() {
        return IMPORTANCES;
    }
});

Template.taskForm.events({
    'submit form': function(event) {
        event.preventDefault();
        console.log($(event.target).find('[name=inputSummary]').val() + ' ' + $(event.target).find('[name=inputImportance]').val());

        var task = {
            tag: $(event.target).find('[name=inputTagName]').val(),
            summary: $(event.target).find('[name=inputSummary]').val(),
            action: $(event.target).find('[name=inputAction]').val(),
            importance: parseInt($(event.target).find('[name=inputImportance]').val()),
            dueDate: $(event.target).find('[name=inputTaskDueDate]').val()
        };
        if (taskFormMode == FORM_MODE_EDIT) {
            task._id = Tasks.update(Session.get('selectedTask'), {$set: task});
        } else {
            Tasks.insert(task);
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
    if (mode == FORM_MODE_EDIT) {
        $('#taskFormSubmitButton').html('Update');
    } else if (mode == FORM_MODE_ADD) {
        $('#taskFormSubmitButton').html('Add');
    }
}

Template.taskGrid.events({
    'click #newTask': function(event) {
        Session.set('selectedTask', 'NULL');
        setTaskFormMode(FORM_MODE_ADD);
        $('#taskForm').modal();
    }
})