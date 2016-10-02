/**
 * Created by killer on 02/10/16.
 */
var Ajax = (function () {
    function Ajax(object) {
        var xhr = new XMLHttpRequest();
        xhr.open(object.method, object.url, true);
        xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
        xhr.send(object.data);
        xhr.onreadystatechange = function () {
            if (xhr.readyState == 4) {
                if (xhr.status != 200)
                    object.error(xhr.responseText);
                else
                    object.success(xhr.responseText);
            }
        };
    }
    return Ajax;
}());
window.onload = function () {
    var forms = document.querySelectorAll('form.ajax_form');
    for (var i = 0; i < forms.length; i++) {
        forms[i].onsubmit = function (event) {
            event.preventDefault();
            var inputs = this.querySelectorAll('input.active, textarea.active');
            var query = '';
            var form = this;
            if (typeof window['form_' + form.id]['validate'] != "undefined") {
                if (window['form_' + form.id]['validate'](form) === false)
                    return;
            }
            for (var i = 0; i < inputs.length; i++)
                query += inputs[i].getAttribute('name') + '=' + inputs[i].value + '&';
            query = query.slice(0, -1);
            new Ajax({
                method: form.getAttribute('method'),
                url: form.getAttribute('url'),
                data: query,
                success: function (responce) {
                    window['form_' + form.id]['success'](responce);
                },
                error: function (responce) {
                    window['form_' + form.id]['error'](responce);
                }
            });
        };
    }
};
//# sourceMappingURL=AF-light.js.map