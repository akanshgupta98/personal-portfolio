package configs

type Config struct {
	ServerCfg ServerCfg
}

type ServerCfg struct {
	WebPort string
}

func New() *Config {
	cfg := Config{
		ServerCfg: ServerCfg{
			WebPort: ":80",
		},
	}
	return &cfg
}
