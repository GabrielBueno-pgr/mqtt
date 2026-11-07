const mqtt = require('mqtt')

const cliente = mqtt.connect('mqtt://localhost:1884')

cliente.on('connect', () => {
    console.log('Publicador Conectado!')

    let contador = 0
    const meuintervalo = setInterval(() => {
        contador++

        const leitura = {
            dispositivo: 'sensor-01',
            temperatura: Number((20+ Math.random()*15).toFixed(2)),
            umidade: Math.floor(40 + Math.random()+40),
            timestamp: new Date().toLocaleString()
        }
        const payload = JSON.stringify(leitura)

        if (contador === 1) {
            cliente.publish('iot/sensor/temperatura', payload, { qos: 1 }, (erro) => {
                if (erro) {
                    console.log('Ecoco (Erro 1):', erro)
                } else {
                    console.log('desgraça (Mensagem 1):', payload)
                }
            })
        }
        else if (contador === 2) {
            cliente.publish('iot/sensor/temperatura', payload, { qos: 1 }, (erro) => {
                if (erro) {
                    console.log('Ecoco (Erro 2):', erro)
                } else {
                    console.log('desgraça 2 (Mensagem 2):', payload)
                    clearInterval(meuintervalo)
                }
                
            })
        }
    }, 5000)
})

cliente.on('error', (erro) => {
    console.log('Erro MQTT', erro.message)
})