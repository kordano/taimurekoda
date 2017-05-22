package main

import (
	"database/sql"
	"fmt"
	"html"
	"log"
	"net/http"

	_ "github.com/go-sql-driver/mysql"
)

type User struct {
	id    int
	email string
}

func connectDb() {
	db, err := sql.Open("mysql", "root:go-rocks@tcp(127.0.0.1:3306)/sys")
	if err != nil {
		log.Fatal(err)
	}
	defer db.Close()

	results, err := db.Query("SELECT id, email from users;")

	if err != nil {
		panic(err.Error())
	}

	for results.Next() {
		var user User
		err = results.Scan(&user.id, &user.email)
		if err != nil {
			panic(err.Error())
		}
		log.Printf(user.email)
	}
}

func echoString(w http.ResponseWriter, r *http.Request) {
	fmt.Fprintf(w, "Hello, %q", html.EscapeString(r.URL.Path))
}

func serveStatic(w http.ResponseWriter, r *http.Request) {
	http.ServeFile(w, r, r.URL.Path[1:])
}

func main() {
	fmt.Printf("connecting to db")
	connectDb()
	fmt.Printf("Starting server")
	http.HandleFunc("/", serveStatic)
	http.HandleFunc("/hi", func(w http.ResponseWriter, r *http.Request) {
		fmt.Fprintf(w, "HI!")
	})
	log.Fatal(http.ListenAndServe(":8081", nil))
}
