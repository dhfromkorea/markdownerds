Template.collaborators.events({
  'submit .add-collaborator': function(event) {

    event.preventDefault();

    var email = event.target.email.value;
    var docId = Session.get('docId');
    Meteor.call('addCollaborator', docId, email, function(error) {
      if(error) {
        console.error(error);
        return;
      }
      console.log("Succes! Yay!");
      event.target.email.value = "";
    });

  },

  'click .deleteCollab': function(e) {
    e.preventDefault();
    Meteor.call('deleteCollaborator', Session.get('docId'), this.valueOf(), function(error) {
      if(error) {
        console.error(error);
        return;
      }
      console.log("Collaborator DELETED");
    });
  }

});

Template.collaborators.helpers({
  
  userEmailById: function(uid) {
    var user = Meteor.users.findOne({_id: uid});
    console.log(user);
    if(!user) {
      throw new Meteor.Error('user-not-found', 'The user does not exist');
    }
    console.log(user.emails[0].address);
    return user.emails[0].address;
  },

  isOwner: function(uid) {
    if(uid == null) {
      uid = Meteor.userId();
    }
    return this.owner == Meteor.userId();
  }

});