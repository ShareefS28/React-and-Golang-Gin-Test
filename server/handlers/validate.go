package handlers

import (
	"net/http"

	"github.com/gin-gonic/gin"
)

func ValidateHandler(c *gin.Context) {
	username := c.GetString("username")

	c.JSON(http.StatusOK, gin.H{
		"valid":    "true",
		"username": username,
	})
}
