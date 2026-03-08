from confluent_kafka.admin import AdminClient

def check_kafka_connection(brokers):
    """
    Função para verificar a conexão com o Kafka e listar os tópicos disponíveis.
    
    :param brokers: Lista de brokers no formato 'host:porta'.
    """
    try:
        # Configuração do cliente
        admin_client = AdminClient({'bootstrap.servers': brokers})

        # Verificar a conectividade com o cluster
        cluster_metadata = admin_client.list_topics(timeout=10)
        print(f"Conexão bem-sucedida com os brokers: {brokers}")
        
        # Listar tópicos disponíveis
        print("Tópicos disponíveis no cluster:")
        for topic in cluster_metadata.topics.keys():
            print(f" - {topic}")
    except Exception as e:
        print(f"Erro ao conectar com o Kafka: {e}")

if __name__ == "__main__":
    # Endereços dos brokers (como configurado no Docker Compose)
    brokers = "192.168.3.93:9092,192.168.3.93:9093,192.168.3.93:9094"
    check_kafka_connection(brokers)
