
var mysite = {
    CustomEvent: {
        LoginFormSubmitted: 'LoginFormSubmitted'
    },
    Constants: {
        AlertMessage: 'alertMessage',
        LeftView: 'leftContainer',
        RightView: 'rightContainer',
        DataEditorContainerView: 'dataEditorContainerView',
        ContentContainerView: 'contentContainerView'
    },
    DisplayAlertMessage: function (text) {
        $('#' + mysite.Constants.AlertMessage).html(text).slideDown();
    },
    ClearAlertMessage: function () {
        $('#' + mysite.Constants.AlertMessage).html("").fadeOut();
    }
};