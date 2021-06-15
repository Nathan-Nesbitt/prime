/**
 * 
 * This is the O(n) approach for prime finding, and is not intended to be fast.
 * 
 * Nathan Nesbitt - 2021
 */


var express = require('express');
var router = express.Router();

var checkIfPrime = function(number) {
    return new Promise((success) => {
        if (number <= 3) success(number > 1);
  
        if ((number % 2 === 0) || (number % 3 === 0)) success(false);
        
        let count = 5;
        
        while (Math.pow(count, 2) <= number) {
            if (number % count === 0 || number % (count + 2) === 0) success(false);
            count += 6;
        }
        
        success(true);
    })
}

router.get('/:number', function(req, res, next) {
    var number = req.params.number;
    if(number.length > 16)
        res.status(400).send({"error": "too long of number"})
    else
        checkIfPrime(number)
        .then(result => {
            if(result)
                res.send({"result": "prime"})
            else
                res.send({"result": "not prime"})
        })
});

module.exports = {
    router,
    checkIfPrime
};