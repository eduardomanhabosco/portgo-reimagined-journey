from confluent_kafka import Consumer

def kafka_consumer(broker, topic, group_id):
    """
    Consome mensagens de um tópico Kafka.
    
    :param broker: Endereço do broker Kafka.
    :param topic: Nome do tópico.
    :param group_id: ID do grupo de consumidores.
    """
    consumer = Consumer({
        'bootstrap.servers': broker,
        'group.id': group_id,
        'auto.offset.reset': 'earliest'
    })

    try:
        consumer.subscribe([topic])
        print(f"Consumidor conectado ao tópico: {topic}")

        while True:
            msg = consumer.poll(1.0)  # Tempo de espera por mensagens em segundos
            if msg is None:
                continue
            if msg.error():
                print(f"Erro: {msg.error()}")
                continue

            print(f"Mensagem recebida: {msg.value().decode('utf-8')}")
    except KeyboardInterrupt:
        print("Encerrando consumidor...")
    finally:
        consumer.close()

if __name__ == "__main__":
    broker = "200.132.197.83:9093"
    topic = "my-topic"
    group_id = "my-group"
    kafka_consumer(broker, topic, group_id)
