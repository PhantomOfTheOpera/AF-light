/**
 * Created by killer on 02/10/16.
 */
class Ajax {
    constructor(object : {
        method: string,
        url: string,
        data: string,
        success: (response:string)=>void,
        error: (response:string)=>void
    }) {
        let xhr : XMLHttpRequest = new XMLHttpRequest();
        xhr.open(object.method, object.url, true);
        xhr.setRequestHeader("Content-type","application/x-www-form-urlencoded");
        xhr.send(object.data);
        xhr.onreadystatechange = function() {
            if (xhr.readyState == 4) {
                if (xhr.status != 200)
                    object.error(xhr.responseText);
                else
                    object.success(xhr.responseText);
            }
        }
    }
}
window.onload = function() {
    let forms : NodeList = document.querySelectorAll('form.ajax_form');
    for (let i : number = 0; i < forms.length; i++) {
        (<HTMLFormElement>forms[i]).onsubmit = function(event) { // listener
            event.preventDefault();
            let inputs : NodeListOf<HTMLInputElement> = this.querySelectorAll('input, textarea');
            let query : string = '';
            let obj_name : string = 'form_' + this.getAttribute('id');
            let form : HTMLFormElement = this;
            let token : string= (document.querySelector('token') == null) ?
                'false' : document.querySelector('token').innerHTML;
            if (typeof window[obj_name]['validate'] != "undefined") {
                if (window[obj_name]['validate'](form) === false)
                    return false;
            }
            for (let i : number = 0; i < inputs.length; i++)
                query += (inputs[i].getAttribute('name') == null) ?
                    '' : inputs[i].getAttribute('name') + '=' +  encodeURI(inputs[i].value) + '&';
            query += 'token=' + encodeURI(token);
            new Ajax({
                method: form.getAttribute('method'),
                url: form.getAttribute('url'),
                data: query,
                success: function(responce) {
                    window[obj_name]['success'](responce);
                },
                error: function(responce){
                    window[obj_name]['error'](responce);
                }
            });
        }
    }
};