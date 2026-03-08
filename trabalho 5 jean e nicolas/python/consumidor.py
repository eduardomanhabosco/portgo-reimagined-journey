from kafka import KafkaConsumer
from kafka.errors import KafkaError
import sys

def main():
    try:
        # Configurando o consumidor Kafka
        consumer = KafkaConsumer(
            'my-topic',  # Nome do tópico
            bootstrap_servers=['200.132.197.83:9092'],  # Servidores Kafka
            auto_offset_reset='earliest',  # Iniciar leitura do início, se necessário
            group_id='my-group',  # ID do grupo de consumidores
            enable_auto_commit=True,  # Confirmação automática do offset
            value_deserializer=lambda m: m.decode('utf-8'),  # Decodificar mensagens como UTF-8
            consumer_timeout_ms=1000  # Timeout para encerrar caso não haja mensagens
        )

        print("Consumidor Kafka iniciado. Aguardando mensagens...")

        # Loop para consumir mensagens
        for message in consumer:
            print(f"Recebido: {message.value} | Partição: {message.partition} | Offset: {message.offset}")

    except KafkaError as e:
        print(f"Erro no Kafka: {e}")
    except KeyboardInterrupt:
        print("\nInterrompido pelo usuário.")
    finally:
        # Fechar o consumidor ao sair
        try:
            consumer.close()
            print("Consumidor encerrado com sucesso.")
        except Exception as e:
            print(f"Erro ao encerrar consumidor: {e}")

if __name__ == "__main__":
    main()
