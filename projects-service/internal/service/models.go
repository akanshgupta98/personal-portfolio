package service

type AddRecordData struct {
	Title       string
	Description string
	Status      string
	URL         string
}

type FetchAllData []AddRecordData
