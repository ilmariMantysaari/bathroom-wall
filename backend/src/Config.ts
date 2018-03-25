
interface Config {
  server: {
    port:number
    address:string
  },
  db: {
    host: string,
    user: string,
    pass: string,
    database: string
  }
}

function makeConfig(env: typeof process.env = process.env): Config {

  return {
    server: {
      port: parseInt(env.server_port || "3000"),
      address: env.server_address || "localhost"
    },
    db: {
      host: env.db_host || "",
      user: env.db_user || "",
      pass: env.db_pass || "",
      database: env.db_name || "",
    }
  };
}


const Config = makeConfig();
export default Config;
