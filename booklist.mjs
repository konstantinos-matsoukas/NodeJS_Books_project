import fs from 'fs/promises'

const fileName = "books.json"

class BookList{
    myBooks = { book: [] }

    
    

    async loadBooksFromFile(){
        try{
            const data = await fs.readFile(fileName, "utf-8")
            this.myBooks = JSON.parse(data)
            
        }catch(err){
            throw err 
        }
        
    }
    async addBookToFile(newBook){
        await this.loadBooksFromFile()
        if(!this.isBookInList(newBook)) {
            this.myBooks.books.push(newBook)
            try{
                await fs.writeFile(fileName, JSON.stringify(this.myBooks),{flag:"w+"})
               
            }catch(error){
                throw error
            }
        }
    }

    isBookInList(books){
        
        let bookFound = this.myBooks.books.find(item => (
            item.tile === books.title &&
            item.author === books.author
        ));
        return bookFound
    }
}

export {BookList}