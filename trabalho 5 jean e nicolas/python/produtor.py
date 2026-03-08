from confluent_kafka import Producer
import sys

def delivery_report(err, msg):
    """Callback para relatar o status da entrega de mensagens."""
    if err:
        print(f"Erro ao entregar mensagem: {err}", file=sys.stderr)
    else:
        print(f"Mensagem entregue para {msg.topic()} [{msg.partition()}]")

def kafka_producer(brokers, topic, num_messages=10):
    """
    Envia mensagens para um tópico Kafka.
    
    :param brokers: Lista de endereços dos brokers Kafka.
    :param topic: Nome do tópico.
    :param num_messages: Número de mensagens a serem enviadas.
    """
    # Configuração do produtor com múltiplos brokers para resiliência
    producer_conf = {
        'bootstrap.servers': brokers,
        'client.id': 'python-producer'
    }
    
    producer = Producer(producer_conf)

    try:
        for i in range(num_messages):
            message = f"Mensagem {i}"
            producer.produce(topic, value=message, callback=delivery_report)
            print(f"Enviando: {message}")
            # Poll para lidar com o callback de delivery
            producer.poll(0)
        
        # Garante que todas as mensagens foram enviadas antes de finalizar
        producer.flush()
    except Exception as e:
        print(f"Erro ao produzir mensagens: {e}", file=sys.stderr)

if __name__ == "__main__":
    # Lista de brokers separados por vírgula
    brokers = "200.132.197.83:9092,200.132.197.83:9093,200.132.197.83:9094"
    topic = "my-topic"
    kafka_producer(brokers, topic)
