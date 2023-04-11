import http from 'http';
import { BookList } from './booklist.mjs'


const bookList = new BookList()
http.createServer(async(req,res) =>{
        if(req.url === '/books'){
               await bookList.loadBooksFromFile()
               res.write(htmlTop)
               res.write("<h1>My Books :</h1>")

               res.write("<a href = '/addbookform'>Add a book</a>")
               res.write("<ul>")
               bookList.myBooks.books.forEach((book) =>{
                        res.write(`<li>${book.title} --- ${book.author}</li>`)
               })

               res.write("</ul>")

               res.write(htmlBottom)
               res.end()
        }
        else if (req.url === '/addbookform'){
                res.write(htmlTop)
                res.write(htmlForm)


                res.write(htmlBottom)
                res.end()

        }
        else if (req.url.startsWith('/loadbook?')){
                const myUrl = new URL("http://" + req.headers.host + req.url)
                
                const newBook = {
                         "title":myUrl.searchParams.get("newBookTitle"),
                         "author":myUrl.searchParams.get("newBookAuthor")
                }
                
                await bookList.addBookToFile(newBook)

                res.writeHead(303, {location: '/books'})
                res.end()

        }
        else{
                res.writeHead(303, {location: '/books'})
                res.end()
        }

}).listen(3000)

const htmlTop = `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
</head>
<body> `;

const htmlBottom = `
</body>
</html>`

const htmlForm = `
<form action = "/loadbook" method = "get" >
<input type = "text" name = "newBookTitle" placeholder = "Title">
<br><br>

<input type = "text" name = "newBookAuthor" placeholder = "Author">
<br><br>

<input type = "submit" value = "Submit">
</form>`