package handlers

type AddProjectPayload struct {
	Title       string `json:"title" binding:"required"`
	Description string `json:"description" binding:"required"`
	Link        string `json:"link" binding:"url"`
	Status      string `json:"status" binding:"required"`
}

type AddProjectResponse struct {
	Error   bool   `json:"error"`
	Message string `json:"message,omitempty"`
	Data    any    `json:"data,omitempty"`
}

type FetchAllResponse []AddProjectPayload

type ErrorResponse struct {
	Errors []string `json:"errors"`
}
