package main

import (
	"net/http"

	db "github.com/FlappyByWord/FBW-be/dbconfig"
	"github.com/gin-gonic/gin"
)

var (
	words   []db.Word   = db.SetUpListWord()
	leaders []db.Leader = db.SetUpLeaderboard()
)

func GetAllWords(c *gin.Context) {
	c.JSON(http.StatusOK, words)
}

func GetAllLeaders(c *gin.Context) {
	c.JSON(http.StatusOK, leaders)
}

func main() {
	gin.SetMode("release")
	r := gin.Default()
	r.GET("/", GetAllWords)
	r.GET("/leaderboard", GetAllLeaders)
	server := &http.Server{
		Addr:    ":8080",
		Handler: r,
	}
	errr := server.ListenAndServe()
	if errr != nil {
		panic(errr.Error())
	}
}
