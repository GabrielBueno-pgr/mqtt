const mqtt = require('mqtt')

const cliente = mqtt.connect('mqtt://localhost:1884')

cliente.on('connect', () =>{
    console.log('Conectou bem pia.')

    cliente.subscribe(
        'iot/sensor/temperatura',
        {qos: 0},
        (erro, concedidos) =>{
            if(erro){
                console.log('Erro ao assinar topico', erro)
                return
            }
            console.log('Assinatura Realizada')
        }
    )
})

cliente.on('message', (topico, mensagem)=>{
    console.log('topico', topico)
    console.log('Mensagem', mensagem.toString())
})

cliente.on('error',(erro)=>{
    console.log('Erro MQTT', erro.message)
})

cliente.on('reconnect', ()=>{
    console.log('Tentando reconectar...')
})