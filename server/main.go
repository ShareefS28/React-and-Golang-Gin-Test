package main

import (
	"fmt"
	"log"
	"server/models"
	"server/routes"

	"gorm.io/driver/postgres"
	"gorm.io/gorm"
)

func main() {
	dsn := "host=localhost user=postgres password=mysecretpassword dbname=postgres port=5432 sslmode=disable"
	db, err := gorm.Open(postgres.Open(dsn), &gorm.Config{})
	if err != nil {
		log.Fatal("Failed to connect database:", err)
	}

	// Save global DB instance
	models.DB = db

	// Auto-migrate User table
	db.AutoMigrate(&models.User{})

	fmt.Println("Database connected and tables migrated!")

	// Start server
	r := routes.SetupRouter()
	r.Run(":8080")
}
