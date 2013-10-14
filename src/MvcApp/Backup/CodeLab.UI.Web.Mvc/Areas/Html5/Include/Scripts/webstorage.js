$(function () {
    setDefaultView();

    $('#saveLocalStorage').click(function () {
        htmlData = $('#tododata').html();
        localStorage.setItem('tododata_localstorage', htmlData);
        sessionStorage.setItem('tododata_sessionstorage', htmlData);
        $('#todoLocalStorage').html(htmlData);
        $('#todoSessionStorage').html(htmlData);

    });
});

setDefaultView = function () {
    localstorageData = localStorage.getItem('tododata_localstorage');
    sessionstorageData = sessionStorage.getItem('tododata_sessionstorage');
    if (localstorageData) {
        $('#todoLocalStorage').html(localstorageData);
    }

    if (sessionstorageData) {
        $('#todoSessionStorage').html(sessionstorageData);
    }
}