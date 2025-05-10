package middleware

import (
	"log"
	"net/http"

	"github.com/gin-gonic/gin"
)

func CORSMiddleWare() gin.HandlerFunc {
	return func(c *gin.Context) {
		log.Println("CORS MIDDLEWARE")
		c.Header("Access-Control-Allow-Origin", "*")
		// c.Header("Access-Control-Allow-Credentials", "true")
		c.Header("Access-Control-Allow-Headers", "Content-Type") //, Content-Length, Accept-Encoding,X-CSRF-Token, Authorization, accept,origin,Cache-Control, X-Requested-With")
		// c.Header("Access-Control-Allow-Methods", "POST, PUT, PATCH, GET, OPTIONS,HEAD,DELETE")
		if c.Request.Method == "OPTIONS" {
			c.Status(http.StatusNoContent)
			// c.AbortWithStatus(http.StatusNoContent)
			return
		}
		c.Next()
	}

}

func LogMiddleWare() gin.HandlerFunc {
	return func(c *gin.Context) {
		log.Printf("[LOG(middleware)] Request recieved for: %s with Method: %s", c.Request.URL, c.Request.Method)
		c.Next()
	}
}
