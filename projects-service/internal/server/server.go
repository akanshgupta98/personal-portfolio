package server

import (
	"projects-service/internal/handlers"
	"projects-service/internal/middleware"

	"github.com/gin-gonic/gin"
)

type Server struct {
	Router *gin.Engine
	Addr   string
}

func New(addr string) *Server {
	mux := gin.Default()
	server := Server{
		Router: mux,
		Addr:   addr,
	}
	return &server

}

func (srv *Server) ListenAndServe() {

	srv.RegisterRoutes()
	srv.Router.Run(srv.Addr)

}

func (s *Server) RegisterRoutes() {
	s.Router.Use(middleware.CORSMiddleWare(), middleware.LogMiddleWare())
	s.Router.GET("/", handlers.HealthCheck)
	s.Router.GET("/projects", handlers.FetchAll)
	s.Router.POST("/projects", handlers.AddProject)

}
