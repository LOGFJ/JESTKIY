const 
    ws = new WebSocket("ws://192.168.4.56:8080");

ws.onmessage = function(message){
    const json = JSON.parse(message.data);
    console.log(json)
    switch(json.type){
        case 'input':
            const ul = document.querySelector('ul');
            let li = `<li>${json.data.message}</li>`;
            ul.innerHTML += li;
            break;
    }
}

ws.onopen = function(){
    const 
        button = document.querySelector('button'),
        text = document.querySelector('input');
    button.addEventListener('click', function(e){
        e.preventDefault();
        if (text.value.trim().length){
            let message = {
                type: 'output',
                data: {
                    message: text.value.trim()
                }
            };
            ws.send(JSON.stringify(message));
            text.value = '';
        }
    });
}