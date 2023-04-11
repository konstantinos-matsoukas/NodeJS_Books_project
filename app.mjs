import http from 'http';
import { BookList } from './booklist.mjs'


const bookList = new BookList()
http.createServer(async(req,res) =>{
        if(req.url === '/books'){
               await bookList.loadBooksFromFile()
               res.write(htmlTop)
               res.write("<ul>")
               bookList.myBooks.books.forEach((book) =>{
                        res.write(`<li>${book.title} --- ${book.author}</li>`)
               })

               res.write("</ul>")

               res.write(htmlBottom)
               res.end()
        }else{
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