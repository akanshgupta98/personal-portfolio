package service

import (
	"projects-service/internal/repository"
	"strconv"
	"sync/atomic"
	"time"
)

var counter int32

func createID() string {

	return strconv.Itoa(int(atomic.AddInt32(&counter, 1)))

}
func AddRecord(payload AddRecordData) error {
	data := repository.Project{
		ID:          createID(),
		Description: payload.Description,
		Status:      payload.Status,
		CreatedAt:   time.Now(),
		UpdatedAt:   time.Now(),
		Title:       payload.Title,
		URL:         payload.URL,
	}
	err := repository.AddProject(data)
	if err != nil {
		return err

	}
	return nil

}

func FetchAll() (FetchAllData, error) {
	data, err := repository.FetchAll()
	if err != nil {
		return nil, err
	}
	var result FetchAllData
	for _, val := range data {
		record := AddRecordData{
			Title:       val.Title,
			Description: val.Description,
			Status:      val.Status,
			URL:         val.URL,
		}
		result = append(result, record)
	}
	if result == nil {
		result = make(FetchAllData, 1)
	}

	return result, nil

}
