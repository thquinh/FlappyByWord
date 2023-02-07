package dbconfig

import (
	"context"
	"log"
	"time"

	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/bson/primitive"
	"go.mongodb.org/mongo-driver/mongo"
	"go.mongodb.org/mongo-driver/mongo/options"
	"go.mongodb.org/mongo-driver/mongo/readpref"
)

type Word struct {
	ID   primitive.ObjectID `json:"_id" bson:"_id"`
	Text string             `json:"word" bson:"word"`
}

type Leader struct {
	ID    primitive.ObjectID `json:"_id" bson:"_id"`
	Name  string             `json:"name" bson:"name"`
	Score int32              `json:"score" bson:"score"`
	Time  string             `json:"time" bson:"time"`
}

func SetUpListWord() []Word {
	client, err := mongo.NewClient(options.Client().ApplyURI("mongodb://localhost:27017"))
	if err != nil {
		log.Fatal(err)
	}
	ctx, cancel := context.WithTimeout(context.Background(), 10*time.Second)
	defer cancel()
	err = client.Connect(ctx)
	if err != nil {
		log.Fatal(err)
	}
	defer client.Disconnect(ctx)
	err = client.Ping(ctx, readpref.Primary())
	if err != nil {
		log.Fatal(err)
	}
	var words []Word
	cursor, err := client.Database("dictionary").Collection("basic").Find(ctx, bson.M{})
	if err != nil {
		log.Fatal(err)
	}
	defer cursor.Close(ctx)
	for cursor.Next(ctx) {
		var word Word
		cursor.Decode(&word)
		words = append(words, word)
	}
	if err := cursor.Err(); err != nil {
		log.Fatal(err)
	}
	return words
}

func SetUpLeaderboard() []Leader {
	client, err := mongo.NewClient(options.Client().ApplyURI("mongodb://localhost:27017"))
	if err != nil {
		log.Fatal(err)
	}
	ctx, cancel := context.WithTimeout(context.Background(), 10*time.Second)
	defer cancel()
	err = client.Connect(ctx)
	if err != nil {
		log.Fatal(err)
	}
	defer client.Disconnect(ctx)
	err = client.Ping(ctx, readpref.Primary())
	if err != nil {
		log.Fatal(err)
	}
	var leaders []Leader
	cursor, err := client.Database("dictionary").Collection("leaderboard").Find(ctx, bson.M{})
	if err != nil {
		log.Fatal(err)
	}
	defer cursor.Close(ctx)
	if err = cursor.All(context.Background(), &leaders); err != nil {
		log.Fatal(err)
	}
	return leaders
}
