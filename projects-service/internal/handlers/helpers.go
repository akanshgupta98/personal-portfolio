package handlers

import (
	"errors"
	"fmt"
	"net/http"

	"github.com/gin-gonic/gin"
	"github.com/go-playground/validator/v10"
)

func readJSON(c *gin.Context, data any) error {
	err := c.ShouldBindBodyWithJSON(data)
	if err != nil {
		return err
	}
	return nil
}

func writeJSON(c *gin.Context, data any, status ...int) {

	statusCode := http.StatusOK
	if len(status) != 0 {
		statusCode = status[0]
	}
	c.JSON(statusCode, data)

}

func errorJSON(c *gin.Context, err error, status ...int) {

	var errMsgs []string
	var ve validator.ValidationErrors
	statusCode := http.StatusInternalServerError
	if len(status) != 0 {
		statusCode = status[0]
	}

	if errors.As(err, &ve) {
		for _, fe := range ve {
			errMsgs = append(errMsgs, fmt.Sprintf("%s is %s", fe.Field(), getErrorFromTag(fe.Tag())))
		}
	}

	response := ErrorResponse{
		Errors: errMsgs,
	}

	writeJSON(c, response, statusCode)

}

func getErrorFromTag(tag string) string {

	switch tag {
	case "url":
		return "not a valid URL"
	default:
		return tag

	}
}
