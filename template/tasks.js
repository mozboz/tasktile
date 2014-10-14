
// importanceMap = {"rect6": {"width": {1: 100, 2: 100, 3: 100, 4: 100, 5: 200, 6: 200}, "height": {1: 60, 2: 120, 3: 180, 4: 240, 5: 120, 6: 240}}};

importanceMap = {"rect6": {1: [100,60], 2: [100,120], 3: [100,180], 4: [100,240], 5: [200,120], 6: [200,240]}};

function getWidth(importance) {
  return importanceMap.rect6[importance][0];
}

function getHeight(importance) {
  return importanceMap.rect6[importance][1];
}

if (Meteor.isClient) {

    Template.taskListItem.helpers({
        tempwidth: function() {
            return getWidth(this.importance);
        },

        tempheight: function() {
            return getHeight(this.importance);
        }
    });

    Template.taskTile.helpers({
        tempwidth: function() {
            return getWidth(this.importance);
        },

        tempheight: function() {
            return getHeight(this.importance);
        }
    });

    Template.taskListItem.events({
        'click input.delete': function () { // <-- here it is
            Tasks.remove(this._id);
        }
        /*
        'click': function () {
            Session.set("selected_player", this._id);
        }
        */
    });

    Template.taskGrid.helpers({
        tasks: function() {
            return Tasks.find();
            // return 1;
            /* return [{
                taskName: 'Introducing Telescope',
                    author: 'Sacha Greif',
                    url: 'http://sachagreif.com/introducing-telescope/'
            },
                {
                    taskName: 'Introducing Telescope',
                    author: 'Sacha Greif',
                    url: 'http://sachagreif.com/introducing-telescope/'
                }
            ]; */
        },

        tempwidth: function() {
            return getWidth(this.importance);
        },

        tempheight: function() {
            return getHeight(this.importance)
        }
    });

    Template.taskList.helpers({
        tasks: function() {
            return Tasks.find();
        },
        importanceOptions: function() {
            return [{importanceValue: 1, importanceName: 'one'},
                {importanceValue: 2, importanceName: 'two'},
                {importanceValue: 3, importanceName: 'three'},
                {importanceValue: 4, importanceName: 'four'},
                {importanceValue: 5, importanceName: 'five'},
                {importanceValue: 6, importanceName: 'six'},
            ]
        },

        tempwidth: function() {
            return getWidth(this.importance);
        },

        tempheight: function() {
            return getHeight(this.importance)
        }

    });

    Template.taskList.events({
        'submit form': function(event) {
            event.preventDefault();
            console.log($(event.target).find('[name=inputTaskName]').val() + ' ' + $(event.target).find('[name=inputImportance]').val());

            var task = {
                taskName: $(event.target).find('[name=inputTaskName]').val(),
                importance: $(event.target).find('[name=inputImportance]').val()
            }
            task._id = Tasks.insert(task);
            // Meteor.Router.to('postPage', post);

        }
    });

}