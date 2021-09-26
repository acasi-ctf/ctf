package main

import (
	"database/sql"
	_ "embed"
	"fmt"
	"github.com/gorilla/mux"
	_ "github.com/mattn/go-sqlite3"
	"html/template"
	"net/http"
	"os"
)

//go:embed form.gohtml
var formTemplateText string

func main() {
	err := start()
	if err != nil {
		panic(err)
	}
}

func start() error {
	os.Remove("main.db")

	db, err := sql.Open("sqlite3", "./main.db")
	if err != nil {
		return err
	}
	defer db.Close()

	_, err = db.Exec("create table products(name text)")
	if err != nil {
		return err
	}
	_, err = db.Exec("create table passwords(password text)")
	if err != nil {
		return err
	}

	_, err = db.Exec("insert into products values ('apple'), ('banana'), ('cherry'), ('donut')")
	if err != nil {
		return err
	}
	_, err = db.Exec("insert into passwords values ('password123'), ('password321'), ('password456'), ('password654')")
	if err != nil {
		return err
	}

	formTemplate := template.Must(template.New("fdsa").Parse(formTemplateText))

	router := mux.NewRouter()
	router.HandleFunc("/", func(writer http.ResponseWriter, request *http.Request) {
		if request.Method == http.MethodGet {
			formTemplate.Execute(writer, nil)
		} else if request.Method == http.MethodPost {
			queryTerm := request.FormValue("query")
			query := fmt.Sprintf("select * from products where name like '%%%s%%';", queryTerm)
			result, err := db.Query(query)
			if err != nil {
				formTemplate.Execute(writer, nil)
				return
			}

			var table []string

			for result.Next() {
				var (
					name string
				)
				result.Scan(&name)
				table = append(table, name)
			}

			formTemplate.Execute(writer, table)
		}
	})

	http.ListenAndServe(":8080", router)

	return nil
}
