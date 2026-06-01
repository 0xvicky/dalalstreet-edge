import psycopg2

conn = psycopg2.connect(
    dbname="admin",
    user="admin",
    password="admin123",
    host="localhost",
    port="5432",
)
conn.autocommit = True
cur = conn.cursor()

cur.execute("DROP TABLE IF EXISTS documents CASCADE;")
cur.execute("DROP TABLE IF EXISTS agent_outputs CASCADE;")
cur.execute("DROP TABLE IF EXISTS analyses CASCADE;")
cur.execute("DROP TABLE IF EXISTS stocks CASCADE;")
cur.execute("DROP TABLE IF EXISTS alembic_version CASCADE;")

print("All tables dropped.")
cur.close()
conn.close()
