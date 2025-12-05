package handlers

import (
    "server/models"
    "server/utils"
    "net/http"

    "github.com/gin-gonic/gin"
    "golang.org/x/crypto/bcrypt"
)

func RegisterHandler(c *gin.Context) {
    var input models.User
    if err := c.ShouldBindJSON(&input); err != nil {
        c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid input"})
        return
    }

    // Hash password
    hashed, _ := bcrypt.GenerateFromPassword([]byte(input.Password), 14)
    input.Password = string(hashed)

    // Save to DB
    if err := models.DB.Create(&input).Error; err != nil {
        c.JSON(http.StatusBadRequest, gin.H{"error": "Username already exists"})
        return
    }

    c.JSON(http.StatusOK, gin.H{"message": "Registered successfully"})
}

func LoginHandler(c *gin.Context) {
    var input models.User
    if err := c.ShouldBindJSON(&input); err != nil {
        c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid input"})
        return
    }

    // Check Username
    var user models.User
    if err := models.DB.Where("username = ?", input.Username).First(&user).Error; err != nil {
        c.JSON(http.StatusUnauthorized, gin.H{"error": "Invalid credentials"})
        return
    }

    // Compare to HashPassword
    if bcrypt.CompareHashAndPassword([]byte(user.Password), []byte(input.Password)) != nil {
        c.JSON(http.StatusUnauthorized, gin.H{"error": "Invalid credentials"})
        return
    }

    token, _ := utils.GenerateJWT(user.Username)
    c.JSON(http.StatusOK, gin.H{"token": token, "username": user.Username})
}
