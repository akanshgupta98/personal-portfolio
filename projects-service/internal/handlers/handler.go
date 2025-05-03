package handlers

import (
	"net/http"
	"projects-service/internal/service"

	"github.com/gin-gonic/gin"
)

func HealthCheck(c *gin.Context) {
	c.JSON(http.StatusOK, gin.H{
		"message": "server is healthy",
	})
}

func AddProject(c *gin.Context) {

	var reqPayload AddProjectPayload
	err := c.BindJSON(&reqPayload)
	if err != nil {
		c.AbortWithError(http.StatusBadRequest, err)
		return
	}

	data := service.AddRecordData{
		Title:       reqPayload.Title,
		Status:      reqPayload.Status,
		URL:         reqPayload.Link,
		Description: reqPayload.Description,
	}

	err = service.AddRecord(data)
	if err != nil {
		c.AbortWithError(http.StatusInternalServerError, err)
		return
	}
	response := AddProjectResponse{
		Error: false,
		Data:  reqPayload,
	}
	c.JSON(http.StatusOK, response)

}

func FetchAll(c *gin.Context) {

	data, err := service.FetchAll()
	if err != nil {
		c.AbortWithError(http.StatusInternalServerError, err)
		return
	}
	var result FetchAllResponse
	for _, val := range data {
		record := AddProjectPayload{
			Title:       val.Title,
			Status:      val.Status,
			Description: val.Description,
			Link:        val.URL,
		}
		result = append(result, record)

	}
	c.JSON(http.StatusOK, result)

}
