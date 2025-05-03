package main

import (
	"projects-service/internal/configs"
	"projects-service/internal/server"
)

func main() {

	cfg := configs.New()
	srv := server.New(cfg.ServerCfg.WebPort)
	srv.ListenAndServe()

}
