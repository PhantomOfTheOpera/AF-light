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
document.addEventListener("DOMContentLoaded", function () {
    var forms = document.querySelectorAll('form.ajax_form');
    for (var i = 0; i < forms.length; i++) {
        forms[i].onsubmit = function (event) {
            event.preventDefault();
            var inputs = this.querySelectorAll('input, textarea');
            var query = '';
            var obj_name = 'form_' + this.getAttribute('id');
            var form = this;
            var token = (document.querySelector('token') == null) ?
                'false' : document.querySelector('token').innerHTML;
            if (typeof window[obj_name]['validate'] != "undefined") {
                if (window[obj_name]['validate'](form) === false)
                    return false;
            }
            for (var i_1 = 0; i_1 < inputs.length; i_1++)
                query += (inputs[i_1].getAttribute('name') == null) ?
                    '' : inputs[i_1].getAttribute('name') + '=' + encodeURI(inputs[i_1].value) + '&';
            query += 'token=' + encodeURI(token);
            new Ajax({
                method: form.getAttribute('method'),
                url: form.getAttribute('url'),
                data: query,
                success: function (responce) {
                    window[obj_name]['success'](responce);
                },
                error: function (responce) {
                    window[obj_name]['error'](responce);
                }
            });
        };
    }
});
//# sourceMappingURL=AF-light.js.map