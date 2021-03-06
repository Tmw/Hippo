import Config

# We don't run a server during test. If one is required,
# you can enable the server option below.
config :hippo, HippoWeb.Endpoint,
  http: [port: 4002],
  server: false

# Print only warnings and errors during test
config :logger, level: :warn

# Configure your database
config :hippo, Hippo.Repo,
  username: System.get_env("DB_USER") || "hippo",
  password: System.get_env("DB_PASS") || "hippo",
  database: System.get_env("DB_NAME") || "hippo-test",
  hostname: System.get_env("DB_HOST") || "localhost",
  pool: Ecto.Adapters.SQL.Sandbox
