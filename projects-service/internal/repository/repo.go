package repository

import (
	"fmt"
	"log"
	"time"
)

type Project struct {
	ID          string
	Title       string
	Description string
	Status      string
	URL         string
	CreatedAt   time.Time
	UpdatedAt   time.Time
}

var Projects map[string]Project = make(map[string]Project)

func New() {

	Projects = map[string]Project{}

}

func AddProject(data Project) error {
	if Projects == nil {
		New()
	}
	if _, ok := Projects[data.ID]; ok {
		return fmt.Errorf("ID not unique")
	}
	Projects[data.ID] = data
	return nil
}

func FetchAll() (map[string]Project, error) {
	if Projects == nil {
		log.Println("Projects NIL")
		New()
	}
	return Projects, nil
}
