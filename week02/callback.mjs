function logQuote(quote) {
    console.log(quote);
}

function logQuote2(quote){
    console.log ('This is my quote:', quote);
}

function createQuote(quote, callback) {
const myQuote = `Like I always say, '${quote}'`;
callback(myQuote);
}

createQuote("WebApp I rocks!", logQuote);

createQuote('WebApp I rocks!', logQuote2);
  