class Library { 
    constructor() {
        this.books = [
            { title: "1984", available: true }, 
            { title: "To Kill a Mockingbird", available: true },
            { title: "Moby Dick", available: true },
            { title: "The Great Gatsby", available: true },
        ];
        this.checkbook = new Set();
    }


    async delay() {
        return new Promise((resolve) => setTimeout(resolve, 1000));
    }


    async checkoutBook(title) {
        await this.delay();
        const book = this.books.find((b) => b.title === title);
        if (book && book.available) {
            book.available = false;
            this.checkbook.add(title);
            return `You have successfully checked out '${title}'.`;
        } else if (book) {
            return `Sorry, '${title}' is not available.`;
        }
        return `Sorry, '${title}' is not available in our catalog.`;
    }

    async returnBook(title) {
        await this.delay();
        const book = this.books.find((b) => b.title === title);
        if (book && this.checkbook.has(title)) {
            book.available = true;
            this.checkbook.delete(title);
            return `You have successfully returned '${title}'.`;
        }
        return `You cannot return '${title}' as it was not checked out.`;
    }

    async listAvailableBooks() {
        await this.delay();
        return this.books.filter((b) => b.available).map((b) => b.title);
    }
}


async function runTests() {
    const library = new Library();

    console.log(await library.checkoutBook("The Great Gatsby")); // Test Case 1
    console.log(await library.returnBook("The Great Gatsby"));   // Test Case 2
    console.log(await library.listAvailableBooks());             // Test Case 3
    console.log(await library.checkoutBook("War and Peace"));    // Test Case 4
    console.log(await library.returnBook("1984"));               // Test Case 5

    const [x, y] = await Promise.allSettled([
        library.checkoutBook("Moby Dick"),
        library.checkoutBook("Moby Dick"),
    ]); 
    console.log(x.value); 
    console.log(y.value); 
}

runTests();
