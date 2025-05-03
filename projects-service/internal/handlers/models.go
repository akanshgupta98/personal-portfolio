package handlers

type AddProjectPayload struct {
	Title       string `json:"title"`
	Description string `json:"description"`
	Link        string `json:"link"`
	Status      string `json:"status"`
}

type AddProjectResponse struct {
	Error   bool   `json:"error"`
	Message string `json:"message,omitempty"`
	Data    any    `json:"data,omitempty"`
}

type FetchAllResponse []AddProjectPayload
