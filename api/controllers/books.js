'use strict';

// Models
var genres = require('../models/genres');
var states = require('../models/states');
var books = require('../models/books');

// Other imports
var utilFunctions = require('../functions/util');

module.exports = {
    getGenres: getGenres,
    getStates: getStates,
    getBooks: getBooks,
    getBook: getBook,
    addBook: addBook,
    editBook: editBook,
    deleteBook: deleteBook
};

function getGenres(req, res) {

    var token = req.swagger.params.token.value;

    utilFunctions.checkToken(token).then(function (rows) {
        if (rows.length === 0) {
            res.status(401).end();
        } else {
            return genres.find({},{
                _id: false,
                code: true,
                name: true
            }, function (err, rows) {
                if (err) {
                    console.error("@Error:", err);
                } else {
                    res.json(utilFunctions.getSuccessResponse({"genres": rows}));
                }
            });
        }
    }, function (reason) {
        res.status(401).end();
    });
}

function getStates(req, res) {

    var token = req.swagger.params.token.value;

    utilFunctions.checkToken(token).then(function (rows) {
        if (rows.length === 0) {
            res.status(401).end();
        } else {
            return states.find({},{
                _id: false,
                code: true,
                name: true
            }, function (err, rows) {
                if (err) {
                    console.error("@Error:", err);
                } else {
                    res.json(utilFunctions.getSuccessResponse({"genres": rows}));
                }
            });
        }
    }, function (reason) {
        res.status(401).end();
    });
}

function getBooks(req, res) {

    var token = req.swagger.params.token.value;

    utilFunctions.checkToken(token).then(function (resp) {
        if (resp.length === 0) {
            res.status(401).end();
        } else {
            var userId = resp[0].userId;
            books.aggregate([
                {
                    $lookup:
                        {
                            from: "genres",
                            localField: "genre",
                            foreignField: "code",
                            as: "genre"
                        }
                },
                {
                    $lookup:
                        {
                            from: "states",
                            localField: "state",
                            foreignField: "code",
                            as: "state"
                        }
                },
                {"$unwind": "$genre"},
                {"$unwind": "$state"},
                {$match: {$and: [{"userId": userId}]}},
                {
                    $project: {
                        "_id": 0,
                        "bookId": 1,
                        "bookCover": 1,
                        "title": 1,
                        "author": 1,
                        "genre": "$genre.name",
                        "state": "$state.name"
                    }
                }
            ]).exec(function (err, books) {
                res.json(utilFunctions.getSuccessResponse({"books": books}));
            });

        }
    }, function (reason) {
        res.status(401).end();
    });
}

function getBook(req, res) {

    var token = req.swagger.params.token.value;
    var bookId = req.swagger.params.bookId.value;

    utilFunctions.checkToken(token).then(function (resp) {
        if (resp.length === 0) {
            res.status(401).end();
        } else {
            var userId = resp[0].userId;
            books.aggregate([
                {
                    $lookup:
                        {
                            from: "genres",
                            localField: "genre",
                            foreignField: "code",
                            as: "genre"
                        }
                },
                {
                    $lookup:
                        {
                            from: "states",
                            localField: "state",
                            foreignField: "code",
                            as: "state"
                        }
                },
                {"$unwind": "$genre"},
                {"$unwind": "$state"},
                {$match: {$and: [{"userId": userId}, {"bookId": bookId}]}},
                {
                    $project: {
                        "_id": 0,
                        "bookId": 1,
                        "bookCover": 1,
                        "title": 1,
                        "author": 1,
                        "genre": "$genre.name",
                        "state": "$state.name"
                    }
                }
            ]).exec(function (err, books) {
                if (books.length === 0){
                    res.json(utilFunctions.getErrorResponse([{
                        "code": "1001",
                        "message": "Book not found"
                    }]));
                }else{
                    res.json(utilFunctions.getSuccessResponse({"books": books}));
                }
            });

        }
    }, function (reason) {
        res.status(401).end();
    });
}

function addBook (req,res){

    var token = req.swagger.params.token.value;
    var book = req.swagger.params.book.value;
    var bookCover = book.bookCover;
    var title = book.title;
    var author = book.author;
    var genre = book.genre;
    var state = book.state;

    utilFunctions.checkToken(token).then(function (resp) {
        if (resp.length === 0) {
            res.status(401).end();
        } else {
            var userId = resp[0].userId;

            if ((bookCover === undefined || bookCover === "")
                || (title === undefined || title === "")
                || (genre === undefined || genre === "" || genre === 0)
                || (state === undefined || state === "" || state === 0)
                || (author === undefined || author === "")
            ){
                res.json(utilFunctions.getErrorResponse([{
                    "code": "1002",
                    "message": "Incomplete or worng values for adding the book to the library"
                }]));
            }
            else{

                utilFunctions.getNextSequenceValue("bookId").then(function(counter){
                    var bookId = counter.sequence_value;
                    var newBook = {
                        "bookId": bookId,
                        "bookCover": bookCover,
                        "title": title,
                        "author": author,
                        "genre": genre,
                        "state": state,
                        "userId": userId
                    };

                    books.create(newBook, function (err, rows) {
                        if (err){
                            console.error('@Error: ', err);
                            res.json(utilFunctions.getErrorResponse([{
                                "code": "1003",
                                "message": "Error adding the book to the library"
                            }]));
                        }else{
                            res.json(utilFunctions.getSuccessResponse({}));
                        }
                    });


                }).catch(function(err){
                    console.log("@Error: getNextSequenceValue", err);
                    res.json(utilFunctions.getErrorResponse([{
                        "code": "1003",
                        "message": "Error adding the book to the library"
                    }]));
                });

            }

        }
    }, function (reason) {
        res.status(401).end();
    });
}

function editBook (req,res){

    var token = req.swagger.params.token.value;
    var bookId = req.swagger.params.bookId.value;
    var book = req.swagger.params.book.value;
    var bookCover = book.bookCover;
    var title = book.title;
    var author = book.author;
    var genre = book.genre;
    var state = book.state;

    utilFunctions.checkToken(token).then(function (resp) {
        if (resp.length === 0) {
            res.status(401).end();
        } else {
            var userId = resp[0].userId;

            return books.find({$and: [{"bookId": bookId}, {"userId": userId}]},{
                _id: false,
                bookCover: true,
                title: true,
                author: true,
                genre: true,
                state: true
            }, function (err, rows) {
                if (err) {
                    console.error("@Error:", err);
                    res.json(utilFunctions.getErrorResponse([{
                        "code": "1004",
                        "message": "Error updating the book in the library"
                    }]));
                } else {
                    if (rows === undefined || rows.length ===0){
                        res.json(utilFunctions.getErrorResponse([{
                            "code": "1005",
                            "message": "The book doesn't exists or it doesn't belong to this user"
                        }]));

                    }else{
                        var newBook = rows[0];

                        if (bookCover !== undefined && bookCover !== "")
                            newBook.bookCover = bookCover;

                        if (title !== undefined && title !== "")
                            newBook.title = title;

                        if (author !== undefined && author !== "")
                            newBook.author = author;

                        if (genre !== undefined && genre !== "")
                            newBook.genre = genre;

                        if (state !== undefined && state !== "")
                            newBook.state = state;

                        books.update({"bookId": bookId}, newBook, function (err, rows) {
                            if (err) {
                                console.error('@Error:: ', err);
                                res.json(utilFunctions.getErrorResponse([{
                                    "code": "1004",
                                    "message": "Error updating the book in the library"
                                }]));
                            }else{
                                res.json(utilFunctions.getSuccessResponse({}));
                            }
                        });

                    }
                }
            });
        }
    }, function (reason) {
        res.status(401).end();
    });
}

function deleteBook(req, res) {

    var token = req.swagger.params.token.value;
    var bookId = req.swagger.params.bookId.value;

    utilFunctions.checkToken(token).then(function (resp) {
        if (resp.length === 0) {
            res.status(401).end();
        } else {
            var userId = resp[0].userId;

            books.remove({$and: [{"userId":userId}, {"bookId": bookId}]}, function (err, result) {
                if (err) {
                    console.error('@Error: ', err);
                    res.json(utilFunctions.getErrorResponse([{
                        "code": "1006",
                        "message": "Error deleting the book of the library, check that the id of the book exists and it belongs to this user"
                    }]));

                }else{
                    if (result.result.n === 0) {
                        res.json(utilFunctions.getErrorResponse([{
                            "code": "1006",
                            "message": "Error deleting the book of the library, check that the id of the book exists and it belongs to this user"
                        }]));

                    } else {
                        res.json(utilFunctions.getSuccessResponse({}));
                    }
                }
            });
        }
    }, function (reason) {
        res.status(401).end();
    });
}
